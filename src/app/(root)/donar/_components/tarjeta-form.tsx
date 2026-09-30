"use client";
// ─── FORMULARIO DE TARJETA (con tarjeta de vista previa que gira) ───────────
import { useState } from "react";
import { Lock, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { pagarConTarjeta } from "./pasarela";

// ── Utilidades ──────────────────────────────────────────────────────────────
const soloDigitos = (v: string) => v.replace(/\D/g, "");

function marcaDe(numero: string): "visa" | "mastercard" | "amex" | "diners" | "" {
  if (/^4/.test(numero)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(numero)) return "mastercard";
  if (/^3[47]/.test(numero)) return "amex";
  if (/^3(0[0-5]|[68])/.test(numero)) return "diners";
  return "";
}

function formatear(numero: string, marca: string) {
  if (marca === "amex") return numero.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "));
  return numero.replace(/(\d{4})(?=\d)/g, "$1 ");
}

// Algoritmo de Luhn: comprueba que el número de tarjeta sea válido
function luhn(numero: string) {
  let suma = 0;
  let doble = false;
  for (let i = numero.length - 1; i >= 0; i--) {
    let d = Number(numero[i]);
    if (doble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    suma += d;
    doble = !doble;
  }
  return numero.length >= 13 && suma % 10 === 0;
}

const LogoMarca = ({ marca, claro = false }: { marca: string; claro?: boolean }) => {
  if (marca === "visa")
    return <span className={`font-display italic font-extrabold text-2xl tracking-tight ${claro ? "text-white" : "text-[#1a1f71]"}`}>VISA</span>;
  if (marca === "mastercard")
    return (
      <span className="flex items-center -space-x-3">
        <span className="w-8 h-8 rounded-full bg-[#eb001b]" />
        <span className="w-8 h-8 rounded-full bg-[#f79e1b] mix-blend-multiply opacity-90" />
      </span>
    );
  if (marca === "amex")
    return <span className={`font-display font-extrabold text-lg px-2 py-0.5 rounded ${claro ? "bg-white/20 text-white" : "bg-[#2e77bc] text-white"}`}>AMEX</span>;
  if (marca === "diners")
    return <span className={`font-display font-bold text-sm ${claro ? "text-white" : "text-[#004a97]"}`}>Diners Club</span>;
  return null;
};

const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-[15px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#0271bd] focus:ring-4 focus:ring-[#73eafe]/30 transition";

type Props = { monto: number; causa: string; nombre: string; email: string; pasarela: string };

export default function TarjetaForm({ monto, causa, nombre: nombreDonante, email, pasarela }: Props) {
  const [numero, setNumero] = useState("");
  const [titular, setTitular] = useState(nombreDonante.toUpperCase());
  const [venc, setVenc] = useState("");
  const [cvv, setCvv] = useState("");
  const [girada, setGirada] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<"" | "cargando" | "ok">("");
  const [mensaje, setMensaje] = useState("");

  const marca = marcaDe(numero);
  const maxLen = marca === "amex" ? 15 : 16;
  const cvvLen = marca === "amex" ? 4 : 3;
  const numeroVista = formatear(numero.padEnd(maxLen, "•"), marca);

  const validar = () => {
    const e: Record<string, string> = {};
    if (!luhn(numero)) e.numero = "Revisa el número de tu tarjeta.";
    if (titular.trim().length < 3) e.titular = "Escribe el nombre como aparece en la tarjeta.";
    const [mm, aa] = venc.split("/");
    const mes = Number(mm);
    const anio = 2000 + Number(aa);
    const hoy = new Date();
    if (!mm || !aa || mes < 1 || mes > 12 || new Date(anio, mes) <= new Date(hoy.getFullYear(), hoy.getMonth()))
      e.venc = "Fecha no válida.";
    if (cvv.length !== cvvLen) e.cvv = `Debe tener ${cvvLen} dígitos.`;
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const pagar = async () => {
    setMensaje("");
    if (!validar()) return;
    setEstado("cargando");
    const [mes, anio] = venc.split("/");
    const r = await pagarConTarjeta({ numero, nombre: titular, mes, anio, cvv }, { monto, causa, nombre: nombreDonante, email });
    if (r.ok) {
      setEstado("ok");
      setNumero("");
      setCvv("");
    } else {
      setEstado("");
      setMensaje(r.mensaje);
    }
  };

  if (estado === "ok") {
    return (
      <div className="text-center py-10">
        <div className="mx-auto w-20 h-20 rounded-full bg-[#73eafe]/25 text-[#0271bd] flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-[#1a3a6b]">¡Gracias por tu donación!</h3>
        <p className="mt-2 text-zinc-500">Tu aporte de S/ {monto} ya está ayudando a {causa}.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[minmax(0,300px)_1fr] gap-8 items-start">
      {/* ── Tarjeta de vista previa ── */}
      <div className="mx-auto w-full max-w-[300px] [perspective:1200px]">
        <div
          className="relative h-[185px] transition-transform duration-700 [transform-style:preserve-3d]"
          style={{ transform: girada ? "rotateY(180deg)" : "none" }}
        >
          {/* Frente */}
          <div className="absolute inset-0 rounded-2xl p-5 text-white overflow-hidden [backface-visibility:hidden] bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#0271bd] shadow-[0_25px_45px_-20px_rgba(26,58,107,0.8)]">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#73eafe]/20" />
            <div className="absolute -left-10 -bottom-16 w-44 h-44 rounded-full bg-white/10" />
            <div className="relative flex items-start justify-between">
              {/* chip */}
              <span className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 shadow-inner" />
              <div className="h-8 flex items-center"><LogoMarca marca={marca} claro /></div>
            </div>
            <p className="relative mt-6 font-mono text-[17px] tracking-[0.12em] whitespace-nowrap">{numeroVista}</p>
            <div className="relative mt-4 flex items-end justify-between text-[10px] uppercase">
              <div className="min-w-0">
                <p className="text-white/60">Titular</p>
                <p className="text-[13px] font-semibold truncate max-w-[170px]">{titular || "NOMBRE APELLIDO"}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60">Vence</p>
                <p className="text-[13px] font-semibold">{venc || "MM/AA"}</p>
              </div>
            </div>
          </div>
          {/* Reverso */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#0271bd] to-[#1a3a6b] text-white shadow-[0_25px_45px_-20px_rgba(26,58,107,0.8)]">
            <div className="mt-6 h-10 bg-black/70" />
            <div className="mx-5 mt-5 flex items-center gap-3">
              <div className="flex-1 h-9 rounded bg-white/85" />
              <div className="w-14 h-9 rounded bg-white text-[#1a3a6b] font-mono font-bold flex items-center justify-center">{cvv || "•••"}</div>
            </div>
            <p className="mx-5 mt-3 text-[10px] text-white/60">Código de seguridad</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 opacity-80">
          <LogoMarca marca="visa" />
          <LogoMarca marca="mastercard" />
          <LogoMarca marca="amex" />
        </div>
      </div>

      {/* ── Campos ── */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Número de tarjeta</label>
          <div className="relative">
            <input
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              value={formatear(numero, marca)}
              onChange={(e) => setNumero(soloDigitos(e.target.value).slice(0, maxLen))}
              onFocus={() => setGirada(false)}
              className={`${inputCls} pr-20 font-mono tracking-wide sm:tracking-wider ${errores.numero ? "border-red-300" : ""}`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 scale-75 origin-right"><LogoMarca marca={marca} /></span>
          </div>
          {errores.numero && <p className="mt-1 text-xs text-red-500">{errores.numero}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Nombre del titular</label>
          <input
            autoComplete="cc-name"
            placeholder="Como aparece en la tarjeta"
            value={titular}
            onChange={(e) => setTitular(e.target.value.toUpperCase())}
            onFocus={() => setGirada(false)}
            className={`${inputCls} uppercase ${errores.titular ? "border-red-300" : ""}`}
          />
          {errores.titular && <p className="mt-1 text-xs text-red-500">{errores.titular}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Vencimiento</label>
            <input
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/AA"
              value={venc}
              onChange={(e) => {
                const d = soloDigitos(e.target.value).slice(0, 4);
                setVenc(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
              }}
              onFocus={() => setGirada(false)}
              className={`${inputCls} font-mono ${errores.venc ? "border-red-300" : ""}`}
            />
            {errores.venc && <p className="mt-1 text-xs text-red-500">{errores.venc}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">CVV</label>
            <input
              inputMode="numeric"
              autoComplete="cc-csc"
              type="password"
              placeholder={cvvLen === 4 ? "••••" : "•••"}
              value={cvv}
              onChange={(e) => setCvv(soloDigitos(e.target.value).slice(0, cvvLen))}
              onFocus={() => setGirada(true)}
              onBlur={() => setGirada(false)}
              className={`${inputCls} font-mono ${errores.cvv ? "border-red-300" : ""}`}
            />
            {errores.cvv && <p className="mt-1 text-xs text-red-500">{errores.cvv}</p>}
          </div>
        </div>

        {mensaje && (
          <p className="rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3">{mensaje}</p>
        )}

        <button
          type="button"
          onClick={pagar}
          disabled={estado === "cargando"}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1a3a6b] to-[#0271bd] text-white font-bold text-lg py-4 shadow-[0_18px_36px_-16px_rgba(2,113,189,0.9)] hover:brightness-110 transition disabled:opacity-60"
        >
          {estado === "cargando" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
          {estado === "cargando" ? "Procesando..." : `Donar S/ ${monto}`}
        </button>

        <p className="flex items-center justify-center gap-2 text-xs text-zinc-400 text-center">
          <ShieldCheck className="w-4 h-4 text-[#0271bd]" />
          Pago procesado de forma segura por {pasarela}. Family Love no guarda los datos de tu tarjeta.
        </p>
      </div>
    </div>
  );
}
