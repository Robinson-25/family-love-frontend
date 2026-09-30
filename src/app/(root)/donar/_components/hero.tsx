// ─── PORTADA DE DONACIONES (foto + texto a la izquierda, estilo PROA) ────────
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1a3a6b]">
      <div className="relative min-h-[420px] md:min-h-[460px] flex items-center">
        <Image
          src="/images/proyectos/2024-navidad-ullusca/foto-01.jpg"
          alt="Campaña navideña de Family Love en Ullusca"
          fill
          priority
          className="object-cover object-center fl-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a6b]/95 via-[#1a3a6b]/75 to-[#1a3a6b]/20" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#73eafe]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#73eafe]" />
              Donaciones
            </span>
            <h1 className="mt-5 font-display font-extrabold leading-[1.05]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}>
              <span className="block text-2xl md:text-3xl font-semibold text-white/85">Realiza</span>
              tu <span className="text-[#73eafe]">donación</span>
              <span className="block text-2xl md:text-3xl font-semibold text-white/85 mt-1">a la causa que más te mueva</span>
            </h1>
            <p className="mt-5 text-white/80 text-lg max-w-md">
              Cada aporte, por pequeño que sea, se convierte en alegría, acompañamiento y esperanza para quienes más lo necesitan.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/75">
              <ShieldCheck className="w-4 h-4 text-[#73eafe]" /> Donación segura y en pocos pasos
            </p>
          </div>
        </div>
      </div>

      <svg className="absolute bottom-0 left-0 w-full h-10 md:h-14" viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 56 L1440 6 L1440 56 Z" fill="#f6f9fc" />
        <path d="M0 56 L1440 6" stroke="#73eafe" strokeWidth="4" />
      </svg>
    </section>
  );
}
