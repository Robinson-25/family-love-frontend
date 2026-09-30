// ─── TESTIMONIOS ─────────────────────────────────────────────────────────────
import { Quote } from "lucide-react";
import { testimonios } from "./datos";

export default function Testimonios() {
  return (
    <section className="bg-[#f6f9fc] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Voces del equipo</span>
          <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-[#1a3a6b] mt-3">Lo que dicen nuestros voluntarios</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {testimonios.map((t, i) => {
            const destacado = i === 1; // la tarjeta del medio va en azul
            return (
              <figure
                key={t.nombre}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                  destacado
                    ? "bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] text-white shadow-[0_30px_60px_-30px_rgba(2,113,189,0.8)] md:-translate-y-4 md:hover:-translate-y-5"
                    : "bg-white text-zinc-700 border border-zinc-100 shadow-[0_10px_30px_-18px_rgba(26,58,107,0.35)] hover:shadow-[0_24px_48px_-24px_rgba(26,58,107,0.45)]"
                }`}
              >
                <span
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    destacado ? "bg-[#73eafe] text-[#1a3a6b]" : "bg-[#0271bd]/10 text-[#0271bd]"
                  }`}
                >
                  <Quote className="w-6 h-6" />
                </span>

                <blockquote className={`mt-6 flex-1 text-[15px] leading-7 ${destacado ? "text-white/90" : "text-zinc-600"}`}>
                  {t.texto}
                </blockquote>

                <figcaption className={`mt-8 pt-5 flex items-center gap-3 border-t ${destacado ? "border-white/20" : "border-zinc-100"}`}>
                  <span
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-display font-extrabold ${
                      destacado ? "bg-white text-[#1a3a6b]" : "bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] text-white"
                    }`}
                  >
                    {t.nombre.charAt(0)}
                  </span>
                  <span>
                    <span className={`block font-display font-bold ${destacado ? "text-white" : "text-[#1a3a6b]"}`}>{t.nombre}</span>
                    <span className={`block text-xs ${destacado ? "text-[#73eafe]" : "text-zinc-400"}`}>{t.cargo}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
