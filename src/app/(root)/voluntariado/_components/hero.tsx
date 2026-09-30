// ─── PORTADA (foto grande con texto a la izquierda, estilo PROA) ────────────
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1a3a6b]">
      <div className="relative min-h-[560px] md:min-h-[600px] flex items-center">
        {/* Foto */}
        <Image
          src="/images/proyectos/2024-navidad-ullusca/foto-02.jpg"
          alt="Voluntarios de Family Love en la campaña navideña de Ullusca"
          fill
          priority
          className="object-cover object-center fl-kenburns"
          sizes="100vw"
        />
        {/* Degradado para que el texto se lea */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a6b]/95 via-[#1a3a6b]/70 to-[#1a3a6b]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/60 via-transparent to-transparent" />

        {/* Texto */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#73eafe]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73eafe]" />
              Únete al cambio
            </span>

            <h1 className="mt-6 font-display font-extrabold leading-[1.02]" style={{ fontSize: "clamp(2.8rem, 6.5vw, 5rem)" }}>
              <span className="block text-2xl md:text-3xl font-semibold text-white/85 mb-2">Encuentra tu lugar</span>
              Sé <span className="text-[#73eafe]">voluntario</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed">
              Tu tiempo y compromiso pueden transformar vidas. Forma parte de Family Love y juntos hagamos un mundo mejor.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href="#formulario"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#73eafe] text-[#1a3a6b] font-extrabold px-8 py-4 shadow-[0_15px_30px_-10px_rgba(115,234,254,0.6)] hover:bg-white transition-colors"
              >
                Inscríbete ahora
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#requisitos"
                className="inline-flex items-center justify-center rounded-full border border-white/35 text-white font-bold px-8 py-4 hover:bg-white/10 transition-colors"
              >
                Ver requisitos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Borde inferior inclinado (estilo TECHO) */}
      <svg className="absolute bottom-0 left-0 w-full h-12 md:h-16" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 64 L1440 8 L1440 64 Z" fill="white" />
        <path d="M0 64 L1440 8" stroke="#73eafe" strokeWidth="4" />
      </svg>
    </section>
  );
}
