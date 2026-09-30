// ─── PORTADA DE "QUIÉNES SOMOS" (fondo claro, texto + mosaico de fotos) ─────
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarHeart } from "lucide-react";

// Caritas del equipo que aparecen juntas (fotos de /images/quienes-somos/equipo)
const caras = ["tania", "darlyne", "maria", "jhan-toro", "mafer", "esau"];
const totalEquipo = 16;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f6f9fc]">
      {/* Fondo: puntitos + manchas de color suaves */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(#0271bd33 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" }}
      />
      <div className="pointer-events-none absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-[#73eafe]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-[#0271bd]/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        {/* ── Texto ── */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-zinc-100 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#0271bd]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#73eafe]" />
            Organización sin fines de lucro
          </span>

          <h1 className="mt-6 font-display font-extrabold leading-[0.98] tracking-tight text-[#1a3a6b]" style={{ fontSize: "clamp(3rem, 7vw, 5.6rem)" }}>
            ¿Quiénes
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0271bd] via-[#2a9be0] to-[#4fd6f0]">
              Somos?
            </span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl font-semibold text-[#1a3a6b]">Jóvenes unidos por un mundo mejor.</p>
          <p className="mt-3 text-zinc-600 text-base md:text-lg max-w-lg leading-relaxed">
            Promovemos el desarrollo integral de adolescentes y jóvenes mediante el voluntariado, la acción social y el
            liderazgo con enfoque humano.
          </p>

          {/* Caritas del equipo */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {caras.map((c) => (
                <span key={c} className="relative w-11 h-11 rounded-full overflow-hidden ring-[3px] ring-white shadow-md bg-zinc-200">
                  <Image src={`/images/quienes-somos/equipo/${c}.${c === "darlyne" ? "jpg" : "png"}`} alt="" fill className="object-cover object-[50%_8%] scale-[1.9] origin-top" sizes="88px" />
                </span>
              ))}
              <span className="w-11 h-11 rounded-full ring-[3px] ring-white bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] text-white text-xs font-extrabold flex items-center justify-center shadow-md">
                +{totalEquipo - caras.length}
              </span>
            </div>
            <p className="text-sm text-zinc-600 leading-tight">
              <b className="text-[#1a3a6b]">{totalEquipo} jóvenes líderes</b>
              <br />
              guían Family Love
            </p>
          </div>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              href="#equipo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1a3a6b] to-[#0271bd] text-white font-bold px-8 py-4 shadow-[0_15px_30px_-12px_rgba(2,113,189,0.8)] hover:brightness-110 transition"
            >
              Conoce al equipo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#historia"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#1a3a6b]/15 bg-white text-[#1a3a6b] font-bold px-8 py-4 hover:border-[#0271bd] hover:text-[#0271bd] transition-colors"
            >
              Nuestra historia
            </Link>
          </div>
        </div>

        {/* ── Mosaico de fotos ── */}
        <div className="relative h-[440px] sm:h-[500px]">
          {/* Adornos detrás de las fotos */}
          <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full border-[6px] border-[#73eafe]/70" />
          <div className="absolute -left-6 -top-6 w-28 h-28 rounded-3xl bg-[#0271bd]/10 rotate-12" />
          {/* Foto grande */}
          <div className="absolute left-0 top-0 w-[62%] h-[82%] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-30px_rgba(26,58,107,0.7)] ring-8 ring-white">
            <Image src="/images/proyectos/2025-primer-aniversario/foto-02.jpg" alt="Equipo de Family Love" fill priority className="object-cover" sizes="(max-width: 1024px) 60vw, 340px" />
          </div>
          {/* Foto arriba derecha */}
          <div className="absolute right-0 top-[6%] w-[42%] h-[40%] rounded-[1.75rem] overflow-hidden shadow-[0_25px_50px_-25px_rgba(26,58,107,0.7)] ring-8 ring-white">
            <Image src="/images/proyectos/2025-primer-aniversario/foto-03.jpg" alt="Voluntarios de Elo Clown" fill className="object-cover" sizes="(max-width: 1024px) 40vw, 230px" />
          </div>
          {/* Foto abajo derecha */}
          <div className="absolute right-[4%] bottom-0 w-[50%] h-[46%] rounded-[1.75rem] overflow-hidden shadow-[0_25px_50px_-25px_rgba(26,58,107,0.7)] ring-8 ring-white">
            <Image src="/images/proyectos/2024-navidad-ullusca/foto-02.jpg" alt="Campaña navideña en Ullusca" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 280px" />
          </div>

          {/* Etiqueta flotante */}
          <div className="absolute left-[6%] bottom-[4%] flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl">
            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] text-white flex items-center justify-center">
              <CalendarHeart className="w-5 h-5" />
            </span>
            <div className="leading-tight">
              <p className="text-xs text-zinc-500">Desde el</p>
              <p className="font-display font-extrabold text-[#1a3a6b]">10 de julio de 2024</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
