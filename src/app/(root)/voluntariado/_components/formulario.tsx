"use client";
// ─── FORMULARIO DE INSCRIPCIÓN ───────────────────────────────────────────────
// Envía los datos al backend: POST {API_URL}/voluntarios (igual que antes).
import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { API_URL } from "@/lib/api";
import { pasos } from "./datos";

const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50/60 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#0271bd] focus:bg-white focus:ring-4 focus:ring-[#73eafe]/30 transition";

function Campos() {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    email: "",
    telefono: "",
    motivacion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.edad || !form.email || !form.telefono) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setError("");
    setCargando(true);

    try {
      const res = await fetch(`${API_URL}/voluntarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setEnviado(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Hubo un error al enviar. Intenta nuevamente.");
      }
    } catch {
      setError("Hubo un error de conexión. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  if (enviado) {
    return (
      <div className="text-center py-16 px-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-[#73eafe]/25 text-[#0271bd] flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-[#1a3a6b]">¡Gracias por unirte!</h3>
        <p className="mt-3 text-zinc-500 max-w-sm mx-auto">
          Recibimos tu solicitud. Pronto nos pondremos en contacto contigo para darte la bienvenida a Family Love.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Nombre completo *</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Edad *</label>
          <input type="number" name="edad" value={form.edad} onChange={handleChange} placeholder="Tu edad" min="16" max="35" className={inputCls} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Correo electrónico *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">Teléfono / WhatsApp *</label>
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+51 999 999 999" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1a3a6b] mb-1.5">¿Por qué quieres ser voluntario?</label>
        <textarea
          name="motivacion"
          value={form.motivacion}
          onChange={handleChange}
          placeholder="Cuéntanos un poco sobre ti y tu motivación..."
          rows={4}
          className={`${inputCls} resize-none`}
        />
      </div>

      {error && <p className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={cargando}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a3a6b] to-[#0271bd] text-white font-bold py-4 rounded-xl shadow-[0_15px_30px_-12px_rgba(2,113,189,0.7)] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {cargando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
        {cargando ? "Enviando..." : "Quiero ser voluntario"}
      </button>
      <p className="text-xs text-zinc-400 text-center">* Campos obligatorios. Nos comunicaremos contigo por WhatsApp o correo.</p>
    </div>
  );
}

export default function Formulario() {
  return (
    <section id="formulario" className="relative bg-white py-20 md:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgba(26,58,107,0.55)] border border-zinc-100">
          {/* Lado izquierdo: foto + pasos */}
          <div className="relative text-white p-8 md:p-12 flex flex-col justify-between min-h-[420px]">
            <Image src="/images/general/familia-voluntarios.webp" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/95 via-[#1a3a6b]/85 to-[#0271bd]/80" />

            <div className="relative">
              <span className="text-[#73eafe] font-bold text-xs tracking-[0.22em] uppercase">¡Es tu momento!</span>
              <h2 className="mt-3 font-display font-extrabold text-3xl md:text-4xl leading-tight">Formulario de inscripción</h2>
              <p className="mt-3 text-white/80">Completa el formulario y nos pondremos en contacto contigo muy pronto.</p>
            </div>

            <ol className="relative mt-10 space-y-5">
              {pasos.map((p, i) => (
                <li key={p.titulo} className="flex gap-4">
                  <span className="w-9 h-9 rounded-full bg-[#73eafe] text-[#1a3a6b] font-display font-extrabold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-bold">{p.titulo}</span>
                    <span className="block text-sm text-white/75">{p.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Lado derecho: formulario */}
          <div className="bg-white p-8 md:p-12">
            <Campos />
          </div>
        </div>
      </div>
    </section>
  );
}
