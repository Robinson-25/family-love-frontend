// ─── ¿POR QUÉ SER VOLUNTARIO? (foto + título + línea, estilo Cruz Roja) ─────
import Image from "next/image";
import { razones } from "./datos";

export default function Razones() {
  return (
    <section className="relative bg-white pb-20 md:pb-28">
      {/* Título en un recuadro que "monta" sobre la portada */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-16 flex justify-center">
          <div className="bg-white border-2 border-[#0271bd] rounded-2xl px-8 md:px-12 py-5 md:py-6 shadow-[0_20px_40px_-20px_rgba(26,58,107,0.45)] text-center">
            <span className="block text-[#0271bd] font-bold text-[11px] tracking-[0.22em] uppercase">Razones para unirte</span>
            <h2 className="mt-1 font-display font-extrabold text-[#1a3a6b] text-2xl md:text-4xl">¿Por qué ser voluntario?</h2>
          </div>
        </div>
      </div>

      {/* Cuadrícula de razones */}
      <div className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-x-12 gap-y-14">
        {razones.map(({ titulo, descripcion, foto }) => (
          <article key={titulo} className="group flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-full sm:w-52 h-52 sm:h-44 shrink-0 rounded-3xl overflow-hidden shadow-[0_20px_40px_-22px_rgba(26,58,107,0.6)]">
              <Image
                src={foto}
                alt={titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 210px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/50 to-transparent" />
            </div>

            <div className="pt-1">
              <h3 className="font-display text-xl md:text-2xl font-bold text-[#1a3a6b]">{titulo}</h3>
              <span className="block mt-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#0271bd] to-[#73eafe] transition-all duration-500 group-hover:w-24" />
              <p className="mt-4 text-zinc-600 text-[15px] leading-7">{descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}