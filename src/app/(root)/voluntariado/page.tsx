"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

const razones = [
  {
    icono: "💛",
    titulo: "Transforma vidas",
    descripcion:
      "Cada acción que realices tendrá un impacto real en personas que más lo necesitan. Tu tiempo vale más de lo que imaginas.",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icono: "🌱",
    titulo: "Crece personalmente",
    descripcion:
      "Desarrolla habilidades blandas, liderazgo y empatía mientras trabajas junto a jóvenes apasionados por el servicio.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icono: "🤝",
    titulo: "Construye comunidad",
    descripcion:
      "Forma parte de una red de jóvenes comprometidos con el bienestar social, la salud y el desarrollo humano.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icono: "📜",
    titulo: "Certificación oficial",
    descripcion:
      "Recibe un certificado de voluntariado que acredita tu participación y enriquece tu perfil profesional.",
    color: "from-purple-400 to-pink-500",
  },
];

const requisitos = [
  { numero: "01", texto: "Tener entre 16 y 35 años de edad." },
  { numero: "02", texto: "Compromiso mínimo de 3 horas semanales." },
  { numero: "03", texto: "Actitud positiva, responsabilidad y trabajo en equipo." },
  { numero: "04", texto: "Portar el polo institucional de la organización" },
  { numero: "05", texto: "No se requiere experiencia previa — solo muchas ganas de ayudar." },
];

const testimonios = [
  {
    nombre: "MARIA HUALLPA-VOLUNTARIA",
    cargo: "Voluntaria 2025",
    texto:
      "Ser parte de Family Love ha sido una experiencia que marcó mi corazón. Poder llevar alegría, amor y momentos de risa a diferentes personas es algo que no tiene precio. Ver sonrisas sinceras y corazones agradecidos me hizo comprender el verdadero valor de dar. Estoy muy agradecida por cada momento vivido y por formar parte de esta hermosa misión.",
    inicial: "M",
    color: "bg-rose-500",
  },
  {
    nombre: "ANDREE-VOLUNTARIO",
    cargo: "Voluntario 2025",
    texto:
      "Haber formado parte de family love es una de las mejores experiencias que he tenido el placer de vivir, no solo por haber conseguido traer sonrisas a las personas, también ver el impacto y la dicha q podemos dar es algo que alivia el alma, siempre estaré agradecido de haber podido formar parte de esta bella iniciativa",
    inicial: "A",
    color: "bg-blue-500",
  },
  {
    nombre: "FLOR DE MARIA - VOLUNTARIA",
    cargo: "Voluntaria 2025",
    texto:
      "Para mí, Family Love es como un hogar donde el apoyo constante, la comprensión y el cariño verdadero se unen para crear un lugar seguro al que perteneces. Es el vínculo que une a las personas, ayudándoles a crecer, a superar obstáculos y a celebrar cada momento juntos.",
    inicial: "F",
    color: "bg-emerald-500",
  },
];

function Formulario() {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-extrabold text-[#1a3a6b] mb-3">
          ¡Gracias por unirte!
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Recibimos tu solicitud. Pronto nos pondremos en contacto contigo para darte la bienvenida a Family Love.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Edad *
          </label>
          <input
            type="number"
            name="edad"
            value={form.edad}
            onChange={handleChange}
            placeholder="Tu edad"
            min="16"
            max="35"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Correo electrónico *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+51 999 999 999"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          ¿Por qué quieres ser voluntario?
        </label>
        <textarea
          name="motivacion"
          value={form.motivacion}
          onChange={handleChange}
          placeholder="Cuéntanos un poco sobre ti y tu motivación..."
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition resize-none"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={cargando}
        className="w-full bg-gradient-to-r from-[#1a3a6b] to-[#2251a3] text-white font-bold py-4 rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all duration-300 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {cargando ? "Enviando..." : "Quiero ser voluntario 💛"}
      </button>
      <p className="text-xs text-gray-400 text-center">
        * Campos obligatorios. Nos comunicaremos contigo por WhatsApp o correo.
      </p>
    </div>
  );
}

export default function VoluntariadoPage() {
  return (
    <main className="bg-white text-gray-800 font-sans">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#73eafe] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 -left-10 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Únete al cambio
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Sé Voluntario
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Tu tiempo y compromiso pueden transformar vidas. Forma parte de Family Love y juntos hagamos un mundo mejor.
          </p>
          <a
            href="#formulario"
            className="inline-block mt-8 bg-white text-[#1a3a6b] font-bold px-8 py-3 rounded-full hover:bg-[#73eafe] transition hover:scale-105"
          >
            Inscríbete ahora →
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Razones */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Razones para unirte</span>
          <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-[#1a3a6b] mt-3">¿Por qué ser voluntario?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {razones.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-zinc-200/80 shadow-[0_2px_12px_-4px_rgba(26,58,107,0.12)] hover:shadow-[0_20px_40px_-18px_rgba(26,58,107,0.35)] hover:-translate-y-1.5 hover:border-[#73eafe]/70 transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${r.color} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                {r.icono}
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3a6b] mb-2 leading-snug">{r.titulo}</h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">{r.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requisitos */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Lo que necesitas</span>
            <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-[#1a3a6b] mt-3">Requisitos para unirte</h2>
          </div>

          <div className="space-y-4">
            {requisitos.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-[0_2px_12px_-4px_rgba(26,58,107,0.12)] hover:shadow-[0_16px_32px_-16px_rgba(26,58,107,0.35)] hover:-translate-y-0.5 hover:border-[#73eafe]/70 transition-all duration-300"
              >
                <span className="font-display text-3xl font-extrabold bg-gradient-to-br from-[#2251a3] to-[#73eafe] bg-clip-text text-transparent leading-none flex-shrink-0 w-12">
                  {r.numero}
                </span>
                <p className="text-zinc-800 font-medium text-base leading-relaxed">{r.texto}</p>
                <span className="ml-auto w-8 h-8 rounded-full bg-[#73eafe]/20 text-[#0271bd] text-base font-bold flex items-center justify-center flex-shrink-0">✓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Voces del equipo</span>
          <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-[#1a3a6b] mt-3">Lo que dicen nuestros voluntarios</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-zinc-200/80 shadow-[0_2px_12px_-4px_rgba(26,58,107,0.12)] hover:shadow-[0_20px_40px_-18px_rgba(26,58,107,0.35)] hover:-translate-y-1.5 hover:border-[#73eafe]/70 transition-all duration-300"
            >
              <div>
                <div className="text-5xl text-[#2251a3] opacity-20 font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-zinc-700 text-[15px] leading-relaxed italic mb-6">
                  {t.texto}
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {t.inicial}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.nombre}</p>
                  <p className="text-gray-400 text-xs">{t.cargo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formulario */}
      <section id="formulario" className="bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#73eafe] font-semibold text-sm tracking-widest uppercase">¡Es tu momento!</span>
            <h2 className="text-4xl font-extrabold text-white mt-2">Formulario de inscripción</h2>
            <p className="text-white/70 mt-3 text-sm">
              Completa el formulario y nos pondremos en contacto contigo muy pronto.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <Formulario />
          </div>
        </div>
      </section>

    </main>
  );
}