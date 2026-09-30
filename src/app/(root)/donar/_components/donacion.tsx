"use client";
// ─── DONACIÓN EN 3 PASOS: 1 Causa · 2 Monto y datos · 3 Pagar ───────────────
import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Copy,
  CreditCard,
  Smartphone,
  Heart,
  MessageCircle,
  ShieldCheck,
  User,
  Mail,
} from "lucide-react";
import { causas, montos, pago } from "./datos";
import TarjetaForm from "./tarjeta-form";

const pasos = [
  { titulo: "Causa", sub: "¿A quién ayudas?" },
  { titulo: "Monto", sub: "¿Cuánto donas?" },
  { titulo: "Pagar", sub: "Tarjeta o Yape" },
];

const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 py-3.5 text-[15px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#0271bd] focus:ring-4 focus:ring-[#73eafe]/30 transition";

export default function Donacion() {
  const [paso, setPaso] = useState(0);
  const [causaId, setCausaId] = useState(causas[0].id);
  const [monto, setMonto] = useState<number | null>(50);
  const [otro, setOtro] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [metodo, setMetodo] = useState<"tarjeta" | "yape">("tarjeta");
  const [copiado, setCopiado] = useState(false);
  const [error, setError] = useState("");

  const causa = causas.find((c) => c.id === causaId)!;
  const total = monto ?? (Number(otro) || 0);

  const mensajeWhatsApp = useMemo(() => {
    const t = `Hola Family Love 💙 Acabo de donar S/ ${total} por Yape/Plin para la causa "${causa.nombre}".${nombre ? ` Mi nombre es ${nombre}.` : ""}`;
    return `https://wa.me/${pago.whatsapp}?text=${encodeURIComponent(t)}`;
  }, [total, causa.nombre, nombre]);

  const irA = (n: number) => {
    setError("");
    setPaso(n);
    document.getElementById("donar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const siguiente = () => {
    if (paso === 1) {
      if (!total || total < 1) return setError("Elige un monto o escribe cuánto quieres donar.");
      if (!nombre.trim()) return setError("Escribe tu nombre para poder agradecerte.");
    }
    irA(Math.min(paso + 1, 2));
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(pago.yapeNumero.replace(/\s/g, ""));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sin portapapeles */
    }
  };

  return (
    <section id="donar" className="relative bg-[#f6f9fc] pb-20 md:pb-28 pt-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Indicador de pasos ── */}
        <div className="mx-auto max-w-3xl mb-12">
          <div className="relative grid grid-cols-3">
            {/* barra de progreso */}
            <div className="absolute top-6 left-[16.66%] right-[16.66%] h-1 rounded-full bg-zinc-200" />
            <div
              className="absolute top-6 left-[16.66%] h-1 rounded-full bg-gradient-to-r from-[#0271bd] to-[#73eafe] transition-all duration-500"
              style={{ width: `${(paso / 2) * 66.66}%` }}
            />
            {pasos.map((p, i) => {
              const hecho = i < paso;
              const actual = i === paso;
              return (
                <button
                  key={p.titulo}
                  type="button"
                  onClick={() => i < paso && irA(i)}
                  className={`relative flex flex-col items-center gap-2 ${i < paso ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-lg font-extrabold transition-all duration-300 ${
                      hecho
                        ? "bg-[#73eafe] text-[#1a3a6b]"
                        : actual
                        ? "bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] text-white ring-8 ring-[#73eafe]/25 scale-110"
                        : "bg-white text-zinc-400 border-2 border-zinc-200"
                    }`}
                  >
                    {hecho ? <Check className="w-5 h-5" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className={`font-display font-bold ${actual || hecho ? "text-[#1a3a6b]" : "text-zinc-400"}`}>{p.titulo}</span>
                  <span className="hidden sm:block -mt-2 text-xs text-zinc-400">{p.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* ── Contenido del paso ── */}
          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-45px_rgba(26,58,107,0.55)] border border-zinc-100">
            {/* franja superior de color */}
            <div className="h-1.5 bg-gradient-to-r from-[#1a3a6b] via-[#0271bd] to-[#73eafe]" />

            <div className="p-6 sm:p-10">
              {/* PASO 1: CAUSA */}
              {paso === 0 && (
                <div>
                  <p className="text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Paso 1 de 3</p>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-[#1a3a6b]">Elige la causa que más te mueva</h2>
                  <p className="mt-2 text-zinc-500">Tu donación irá directo a la causa que selecciones.</p>

                  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {causas.map(({ id, nombre: n, Icono, descripcion, foto }) => {
                      const activa = id === causaId;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setCausaId(id)}
                          aria-pressed={activa}
                          className={`group relative h-48 sm:h-52 overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                            activa
                              ? "ring-4 ring-[#73eafe] shadow-[0_20px_40px_-18px_rgba(2,113,189,0.9)] -translate-y-1"
                              : "ring-1 ring-zinc-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-20px_rgba(26,58,107,0.6)]"
                          }`}
                        >
                          <Image
                            src={foto}
                            alt=""
                            fill
                            className={`object-cover transition-transform duration-700 ${activa ? "scale-110" : "group-hover:scale-110"}`}
                            sizes="(max-width: 768px) 50vw, 240px"
                          />
                          <div
                            className={`absolute inset-0 transition-colors duration-300 ${
                              activa
                                ? "bg-gradient-to-t from-[#1a3a6b] via-[#1a3a6b]/75 to-[#0271bd]/40"
                                : "bg-gradient-to-t from-[#1a3a6b]/95 via-[#1a3a6b]/50 to-transparent"
                            }`}
                          />
                          <span
                            className={`absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur transition-colors ${
                              activa ? "bg-[#73eafe] text-[#1a3a6b]" : "bg-white/20 text-white"
                            }`}
                          >
                            <Icono className="w-5 h-5" />
                          </span>
                          {activa && (
                            <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-[#0271bd] flex items-center justify-center shadow">
                              <Check className="w-4 h-4" strokeWidth={3} />
                            </span>
                          )}
                          <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                            <span className="block font-display font-bold leading-tight">{n}</span>
                            <span className="mt-1 block text-xs text-white/80 leading-snug">{descripcion}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASO 2: MONTO Y DATOS */}
              {paso === 1 && (
                <div>
                  <p className="text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Paso 2 de 3</p>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-[#1a3a6b]">¿Cuánto quieres donar?</h2>
                  <p className="mt-2 text-zinc-500">Elige un monto o escribe el que tú quieras.</p>

                  {/* Monto grande */}
                  <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#eaf6fd] to-white border border-[#73eafe]/40 p-6 text-center">
                    <p className="text-sm text-zinc-500">Tu donación</p>
                    <p className="mt-1 font-display font-extrabold text-[#1a3a6b] leading-none" style={{ fontSize: "clamp(2.8rem, 7vw, 4rem)" }}>
                      <span className="text-2xl align-top mr-1 text-[#0271bd]">S/</span>
                      {total || 0}
                    </p>
                    <p className="mt-2 text-sm text-zinc-500">para <b className="text-[#0271bd]">{causa.nombre}</b></p>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {montos.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setMonto(m);
                          setOtro("");
                          setError("");
                        }}
                        className={`rounded-xl py-4 font-display font-extrabold text-lg transition-all ${
                          monto === m
                            ? "bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] text-white shadow-[0_14px_28px_-14px_rgba(2,113,189,0.9)] -translate-y-0.5"
                            : "bg-white border-2 border-zinc-200 text-[#1a3a6b] hover:border-[#73eafe] hover:-translate-y-0.5"
                        }`}
                      >
                        S/ {m}
                      </button>
                    ))}
                    <div className={`relative rounded-xl border-2 transition-all ${monto === null ? "border-[#0271bd] ring-4 ring-[#73eafe]/25" : "border-zinc-200"}`}>
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">S/</span>
                      <input
                        type="number"
                        min={1}
                        inputMode="numeric"
                        placeholder="Otro"
                        value={otro}
                        onFocus={() => setMonto(null)}
                        onChange={(e) => {
                          setMonto(null);
                          setOtro(e.target.value);
                          setError("");
                        }}
                        className="w-full h-full rounded-xl bg-transparent pl-9 pr-2 py-4 font-display font-extrabold text-lg text-[#1a3a6b] placeholder:text-zinc-400 placeholder:font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Tu nombre *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          value={nombre}
                          onChange={(e) => {
                            setNombre(e.target.value);
                            setError("");
                          }}
                          placeholder="Nombre y apellido"
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Correo (para tu constancia)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className={inputCls} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 3: PAGAR */}
              {paso === 2 && (
                <div>
                  <p className="text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Paso 3 de 3</p>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-[#1a3a6b]">Elige cómo pagar</h2>

                  {/* Pestañas de método */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "tarjeta" as const, label: "Tarjeta", sub: "Crédito o débito", Icono: CreditCard },
                      { id: "yape" as const, label: "Yape / Plin", sub: "Con QR o número", Icono: Smartphone },
                    ].map(({ id, label, sub, Icono }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setMetodo(id)}
                        className={`flex items-center gap-3 rounded-2xl p-4 text-left border-2 transition-all ${
                          metodo === id
                            ? "border-[#0271bd] bg-[#0271bd]/5 shadow-[0_12px_28px_-18px_rgba(2,113,189,0.9)]"
                            : "border-zinc-200 hover:border-[#73eafe]"
                        }`}
                      >
                        <span
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            metodo === id ? "bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] text-white" : "bg-[#f6f9fc] text-zinc-500"
                          }`}
                        >
                          <Icono className="w-5 h-5" />
                        </span>
                        <span>
                          <span className={`block font-display font-bold ${metodo === id ? "text-[#1a3a6b]" : "text-zinc-600"}`}>{label}</span>
                          <span className="block text-xs text-zinc-400">{sub}</span>
                        </span>
                        <span
                          className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            metodo === id ? "border-[#0271bd]" : "border-zinc-300"
                          }`}
                        >
                          {metodo === id && <span className="w-2.5 h-2.5 rounded-full bg-[#0271bd]" />}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8">
                    {/* TARJETA */}
                    {metodo === "tarjeta" && (
                      <TarjetaForm monto={total} causa={causa.nombre} nombre={nombre} email={email} pasarela={pago.pasarela} />
                    )}

                    {/* YAPE / PLIN */}
                    {metodo === "yape" && (
                      <div className="grid sm:grid-cols-[210px_1fr] gap-8 items-center">
                        <div className="mx-auto w-52 h-52 rounded-3xl bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] p-3 shadow-xl">
                          <div className="relative w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                            {pago.yapeQr ? (
                              <Image src={pago.yapeQr} alt="Código QR de Yape de Family Love" fill className="object-contain p-2" sizes="200px" />
                            ) : (
                              <span className="text-center text-xs text-zinc-400 px-4">Aquí va el QR de Yape</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <ol className="space-y-3">
                            {[
                              <>Abre <b className="text-[#1a3a6b]">Yape o Plin</b> y escanea el QR, o usa el número.</>,
                              <>Envía <b className="text-[#0271bd]">S/ {total}</b>{pago.yapeTitular && <> a <b className="text-[#1a3a6b]">{pago.yapeTitular}</b></>}.</>,
                              <>Avísanos por WhatsApp para agradecerte.</>,
                            ].map((t, i) => (
                              <li key={i} className="flex gap-3 text-zinc-600">
                                <span className="w-7 h-7 rounded-full bg-[#73eafe]/30 text-[#1a3a6b] font-display font-extrabold text-sm flex items-center justify-center shrink-0">
                                  {i + 1}
                                </span>
                                <span className="pt-0.5">{t}</span>
                              </li>
                            ))}
                          </ol>

                          {pago.yapeNumero ? (
                            <button
                              type="button"
                              onClick={copiar}
                              className="mt-5 inline-flex items-center gap-3 rounded-xl border-2 border-dashed border-[#73eafe] bg-[#73eafe]/10 px-5 py-3 font-display text-xl font-extrabold text-[#1a3a6b] hover:bg-[#73eafe]/20 transition"
                            >
                              {pago.yapeNumero}
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0271bd]">
                                {copiado ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar</>}
                              </span>
                            </button>
                          ) : (
                            <p className="mt-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3">
                              Pronto publicaremos nuestro número de Yape / Plin.
                            </p>
                          )}

                          <a
                            href={mensajeWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:brightness-95 text-white font-bold px-7 py-3.5 shadow-lg transition"
                          >
                            <MessageCircle className="w-5 h-5" /> Ya doné, avisar por WhatsApp
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {error && <p className="mt-6 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3">{error}</p>}

              {/* Botones de navegación */}
              <div className="mt-10 flex items-center justify-between gap-3 border-t border-zinc-100 pt-6">
                {paso > 0 ? (
                  <button
                    type="button"
                    onClick={() => irA(paso - 1)}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold text-[#1a3a6b] hover:bg-[#f6f9fc] transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Atrás
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-[#0271bd]" /> Donación segura
                  </span>
                )}
                {paso < 2 && (
                  <button
                    type="button"
                    onClick={siguiente}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1a3a6b] to-[#0271bd] text-white font-bold px-8 py-3.5 shadow-[0_14px_30px_-12px_rgba(2,113,189,0.9)] hover:brightness-110 transition"
                  >
                    Continuar <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Resumen (a la derecha) ── */}
          <aside className="order-first lg:order-none lg:sticky lg:top-24 rounded-[2rem] overflow-hidden bg-[#1a3a6b] text-white shadow-[0_40px_80px_-40px_rgba(26,58,107,0.9)]">
            {/* Foto de la causa */}
            <div className="relative h-28 lg:h-40">
              <Image key={causa.foto} src={causa.foto} alt="" fill className="object-cover" sizes="360px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b] via-[#1a3a6b]/40 to-transparent" />
              <span className="absolute left-6 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase text-[#73eafe]">
                Tu donación
              </span>
            </div>

            <div className="p-6 pt-4">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#73eafe] text-[#1a3a6b] flex items-center justify-center shrink-0">
                  <causa.Icono className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-white/60 text-xs">Causa</p>
                  <p className="font-display font-bold leading-tight">{causa.nombre}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-white/15 pt-5 text-sm">
                <div className="flex justify-between text-white/75">
                  <span>Donante</span>
                  <span className="font-semibold text-white">{nombre || "—"}</span>
                </div>
                <div className="flex justify-between text-white/75">
                  <span>Método</span>
                  <span className="font-semibold text-white">{paso === 2 ? (metodo === "tarjeta" ? "Tarjeta" : "Yape / Plin") : "—"}</span>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between rounded-2xl bg-white/10 px-5 py-4">
                <span className="text-white/75">Total</span>
                <span className="font-display text-4xl font-extrabold">
                  <span className="text-lg text-[#73eafe] mr-1">S/</span>
                  {total || 0}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0271bd] to-[#2251a3] px-6 py-4 text-sm flex items-center gap-2">
              <Heart className="w-4 h-4 fill-[#73eafe] text-[#73eafe]" /> ¡Gracias por sumarte a Family Love!
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
