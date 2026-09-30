// ─── REQUISITOS (foto + panel azul con lista, estilo TECHO "Sé voluntario/a") ─
import Image from "next/image";
import { Check } from "lucide-react";
import { requisitos } from "./datos";

// Flecha curva dibujada a mano que se anima sola
const Flecha = () => (
  <svg viewBox="0 0 120 110" fill="none" className="fl-flecha-vol w-24 md:w-28 text-white" aria-hidden="true">
    <style>{`
      .fl-flecha-vol { animation: fl-v-flota 3s ease-in-out infinite; }
      .fl-flecha-vol .t { stroke-dasharray: 1; stroke-dashoffset: 1; animation: fl-v-dibuja 4s ease-in-out infinite; }
      .fl-flecha-vol .p { stroke-dasharray: 1; stroke-dashoffset: 1; animation: fl-v-punta 4s ease-in-out infinite; }
      @keyframes fl-v-dibuja { 0% { stroke-dashoffset: 1; } 40%, 85% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -1; } }
      @keyframes fl-v-punta  { 0%, 35% { stroke-dashoffset: 1; } 50%, 85% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -1; } }
      @keyframes fl-v-flota  { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      @media (prefers-reduced-motion: reduce) {
        .fl-flecha-vol, .fl-flecha-vol .t, .fl-flecha-vol .p { animation: none; stroke-dashoffset: 0; }
      }
    `}</style>
    <path className="t" pathLength={1} d="M90 6 C 118 40, 104 92, 40 96" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path className="p" pathLength={1} d="M54 82 L 38 96 L 56 106" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Requisitos() {
  return (
    <section id="requisitos" className="relative bg-white scroll-mt-20">
      <div className="grid md:grid-cols-[0.9fr_1.1fr]">
        {/* Foto */}
        <div className="relative min-h-[320px] md:min-h-[620px]">
          <Image
            src="/images/proyectos/2025-manos-que-acompanan-jauja/foto-02.jpg"
            alt="Voluntarias de Family Love en Jauja"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/40 to-transparent" />
        </div>

        {/* Panel azul */}
        <div
          className="relative bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#0271bd] text-white px-6 sm:px-12 lg:px-16 py-16 md:py-20 overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 94%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#73eafe]/15 blur-3xl" />

          <span className="relative text-[#73eafe] font-bold text-xs tracking-[0.22em] uppercase">Lo que necesitas</span>
          <h2 className="relative mt-3 font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Requisitos para unirte
          </h2>

          <ul className="relative mt-8 space-y-4 max-w-xl">
            {requisitos.map((r, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-0.5 w-7 h-7 rounded-full bg-[#73eafe] text-[#1a3a6b] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>
                <span className="text-white/90 text-base md:text-lg leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>

          <p className="relative mt-8 font-bold text-lg md:text-xl max-w-xl leading-snug">
            Súmate a los jóvenes que ya están transformando la realidad de muchas familias.
          </p>

          <div className="relative mt-8 flex items-end gap-4">
            <a
              href="#formulario"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#1a3a6b] font-extrabold uppercase tracking-wide text-sm px-9 py-4 shadow-xl hover:bg-[#73eafe] transition-colors"
            >
              Ser voluntario
            </a>
            <Flecha />
          </div>
        </div>
      </div>
    </section>
  );
}
