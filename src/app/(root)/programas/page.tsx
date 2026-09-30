import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, HeartHandshake } from "lucide-react";

// ─── DATOS ────────────────────────────────────────────────────────────────────
const metodologia = [
  "Enfoque basado en valores",
  "Medición de impacto social",
  "Participación activa juvenil",
];

// Flecha dibujada a mano (decoración, como en TECHO).
// Animación: se "dibuja" sola, flota suavemente y se repite.
const FlechaDoodle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 150 110" fill="none" className={`fl-flecha ${className}`} aria-hidden="true">
    <style>{`
      .fl-flecha { animation: fl-flota 3s ease-in-out infinite; }
      .fl-flecha .trazo { stroke-dasharray: 1; stroke-dashoffset: 1; animation: fl-dibuja 4s ease-in-out infinite; }
      .fl-flecha .punta { stroke-dasharray: 1; stroke-dashoffset: 1; animation: fl-punta 4s ease-in-out infinite; }
      @keyframes fl-dibuja { 0% { stroke-dashoffset: 1; } 40%, 85% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -1; } }
      @keyframes fl-punta  { 0%, 35% { stroke-dashoffset: 1; } 50%, 85% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -1; } }
      @keyframes fl-flota  { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(8px) rotate(-2deg); } }
      @media (prefers-reduced-motion: reduce) {
        .fl-flecha, .fl-flecha .trazo, .fl-flecha .punta { animation: none; stroke-dashoffset: 0; }
      }
    `}</style>
    <path
      className="trazo"
      pathLength={1}
      d="M140 18c-18-14-44-6-40 14 3 16 26 12 22-4-4-18-34-16-42 2-8 17 12 26 15 10 3-17-26-22-40-4-12 15-20 34-24 58"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path className="punta" pathLength={1} d="M18 82l13 16 14-15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ProgramasPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* ── HERO: foto con curva + panel azul (inspirado en PROA) ─────────── */}
      <section className="relative bg-[#1a3a6b] overflow-hidden">
        <div className="relative md:h-[560px]">
          {/* Foto */}
          <div className="relative h-72 md:absolute md:inset-y-0 md:left-0 md:h-auto md:w-[68%]">
            <Image
              src="/images/programas/programa-01.jpg"
              alt="Adultas mayores de la comunidad acompañadas por Family Love"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 68vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-[#1a3a6b]/25 md:via-transparent" />
          </div>

          {/* Curva azul (escritorio): cubre la derecha con un borde ondulado */}
          <svg
            className="hidden md:block absolute inset-y-0 right-0 h-full w-[58%]"
            viewBox="0 0 600 560"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="fl-hero-prog" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1a3a6b" />
                <stop offset="60%" stopColor="#2251a3" />
                <stop offset="100%" stopColor="#0271bd" />
              </linearGradient>
            </defs>
            <path d="M250 0 C 120 140, 330 260, 170 400 C 90 470, 60 520, 40 560 L600 560 L600 0 Z" fill="url(#fl-hero-prog)" />
            <path d="M250 0 C 120 140, 330 260, 170 400 C 90 470, 60 520, 40 560" stroke="#73eafe" strokeOpacity="0.55" strokeWidth="3" fill="none" />
          </svg>

          {/* Curva azul (celular): borde ondulado arriba del texto */}
          <svg className="md:hidden block w-full h-10 -mt-10 relative" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 40 C 120 0, 260 40, 400 6 L400 40 Z" fill="#1a3a6b" />
          </svg>

          {/* Texto */}
          <div className="relative md:absolute md:inset-y-0 md:right-0 md:w-[42%] flex items-center px-6 pb-14 pt-4 md:py-0 md:pr-12 lg:pr-20">
            <div className="text-center md:text-right w-full">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#73eafe]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#73eafe]" />
                Programas sociales
              </span>
              <h1 className="mt-5 font-display font-extrabold text-white leading-[1.02]" style={{ fontSize: "clamp(2.8rem, 6vw, 4.8rem)" }}>
                Nuestros <br />
                <span className="text-[#73eafe]">Programas</span>
              </h1>
              <p className="mt-5 text-lg md:text-xl text-white/85 leading-relaxed md:ml-auto max-w-md mx-auto md:mr-0">
                En <span className="text-white font-semibold">Family Love</span>, transformamos la intención en acción a
                través de pilares diseñados para el crecimiento humano y social.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ELO CLOWN (inspirado en TECHO) ─────────────────────────────────── */}
      <section className="relative bg-[#f6f9fc] py-20 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          {/* Foto ancha */}
          <div className="relative h-60 md:h-[380px] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-30px_rgba(26,58,107,0.55)]">
            <Image
              src="/images/general/familia-voluntarios.webp"
              alt="Voluntarios de Elo Clown con narices de payaso"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 100vw, 1150px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/50 to-transparent" />
            <span className="absolute left-6 bottom-6 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold tracking-[0.18em] uppercase text-[#1a3a6b]">
              Programa 01
            </span>
          </div>

          {/* Flecha decorativa */}
          <FlechaDoodle className="hidden md:block w-28 text-[#73eafe] mx-auto -mt-8 relative z-10" />

          {/* Texto en dos columnas */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-10 md:mt-4 items-start">
            <div>
              <h2
                className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#1a3a6b] via-[#2251a3] to-[#0271bd]"
                style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
              >
                Elo <br /> Clown
              </h2>
              <p className="mt-6 font-display text-xl md:text-2xl font-bold text-[#1a3a6b] leading-snug">
                Llevamos alegría, empatía y bienestar emocional a hospitales y comunidades.
              </p>
            </div>

            <div className="md:pt-3">
              <p className="mt-6 text-zinc-600 text-lg leading-8">
                Desarrollamos intervenciones de{" "}
                <span className="font-semibold text-[#1a3a6b]">clown hospitalario y comunitario</span> que promueven la
                alegría, la empatía y el bienestar emocional en las personas, contribuyendo a humanizar distintos espacios
                sociales y fortaleciendo el compromiso solidario de los voluntarios.
              </p>
              <Link
                href="/voluntariado#formulario"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#0271bd] hover:bg-[#1a3a6b] text-white font-bold px-7 py-3.5 shadow-[0_12px_28px_-10px_rgba(2,113,189,0.7)] transition-colors"
              >
                Quiero participar
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <span className="inline-block text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Cómo trabajamos</span>
            <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-[#1a3a6b] mt-3 leading-tight">
              Nuestra metodología de impacto
            </h2>
            <p className="mt-5 text-zinc-600 leading-relaxed text-lg">
              No solo realizamos actividades; creamos experiencias transformadoras basadas en resultados sostenibles.
            </p>
            <ul className="mt-8 space-y-3">
              {metodologia.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-[#f6f9fc] border border-zinc-100 px-5 py-4 font-semibold text-[#1a3a6b] hover:border-[#73eafe] hover:bg-white hover:shadow-[0_12px_30px_-18px_rgba(26,58,107,0.5)] transition-all"
                >
                  <span className="w-9 h-9 rounded-full bg-[#73eafe]/25 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-[#0271bd] w-5 h-5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="relative h-72 rounded-[2rem] overflow-hidden shadow-[0_30px_50px_-25px_rgba(26,58,107,0.6)] translate-y-8">
              <Image src="/images/programas/programa-02.jpg" alt="Voluntarias de Family Love en campaña" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="relative h-72 rounded-[2rem] overflow-hidden shadow-[0_30px_50px_-25px_rgba(26,58,107,0.6)]">
              <Image src="/images/general/grupo-ullusca.webp" alt="Campaña en la comunidad de Ullusca" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 ring-4 ring-inset ring-[#73eafe]/40 rounded-[2rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── LLAMADO A LA ACCIÓN (inspirado en "El corazón de Proa") ────────── */}
      <section className="relative overflow-hidden bg-[#eaf6fd]">
        <style>{`
          .fl-pill { animation: fl-pill-flota 7s ease-in-out infinite; }
          .fl-pill-2 { animation-delay: -2.3s; }
          .fl-pill-3 { animation-delay: -4.6s; }
          @keyframes fl-pill-flota {
            0%, 100% { translate: 0 0; }
            50% { translate: 0 -12px; }
          }
          @media (prefers-reduced-motion: reduce) { .fl-pill { animation: none; } }
        `}</style>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-0 grid md:grid-cols-2 items-center gap-12 md:min-h-[560px]">

          {/* ── Texto ── */}
          <div className="relative z-10 md:py-20">
            <h2 className="inline-block font-display font-extrabold text-[#1a3a6b] leading-tight" style={{ fontSize: "clamp(2.1rem, 4vw, 3rem)" }}>
              ¿Listo para dejar <span className="text-[#0271bd]">tu huella?</span>
              <span className="block mt-3 h-1.5 w-full rounded-full bg-gradient-to-r from-[#0271bd] to-[#73eafe]" />
            </h2>

            <p className="mt-7 text-zinc-600 text-lg leading-relaxed max-w-md">
              Cada programa es una oportunidad para cambiar una vida, incluyendo la tuya. Únete a Family Love hoy.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <p className="font-display text-xl font-bold text-[#1a3a6b]">¿Quiénes pueden participar?</p>
                <p className="text-zinc-600">Jóvenes de 16 a 35 años, sin experiencia previa.</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-[#1a3a6b]">¿Cuánto tiempo necesito?</p>
                <p className="text-zinc-600">Desde 3 horas a la semana, y recibes tu certificado.</p>
              </div>
            </div>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/voluntariado#formulario"
                className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#0271bd] hover:bg-[#1a3a6b] text-white font-bold px-8 py-4 shadow-[0_15px_30px_-12px_rgba(2,113,189,0.7)] transition-colors"
              >
                Quiero ser voluntario
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
              <Link
                href="/proyecto"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#1a3a6b]/20 text-[#1a3a6b] font-bold px-8 py-4 hover:border-[#0271bd] hover:text-[#0271bd] transition-colors"
              >
                Ver proyectos
              </Link>
            </div>
          </div>

          {/* ── Collage de fotos en cápsulas ── */}
          <div className="relative h-[380px] sm:h-[460px] md:h-[560px]" aria-hidden="true">
            {/* Formas decorativas */}
            <div className="absolute left-[34%] top-[30%] w-[40%] h-[18%] rounded-full bg-[#73eafe]/70 -rotate-[40deg]" />
            <div className="absolute -right-8 md:-right-20 bottom-[-4%] w-[36%] h-[20%] rounded-full bg-[#0271bd] -rotate-[60deg]" />
            <div className="absolute right-[0%] top-[4%] w-[50%] h-[20%] rounded-full border-[5px] border-[#2251a3]/50 rotate-[-30deg]" />

            {/* Cápsula 1 (arriba izquierda) */}
            <div className="fl-pill absolute left-[2%] top-[8%] w-[58%] h-[26%]">
              <div className="w-full h-full rounded-full overflow-hidden -rotate-[30deg] shadow-[0_25px_45px_-20px_rgba(26,58,107,0.6)] ring-4 ring-white">
                <div className="absolute w-[120%] h-[250%] -left-[10%] -top-[75%] rotate-[30deg]">
                  <Image src="/images/proyectos/2025-primera-navidad-apata/foto-01.jpg" alt="" fill className="object-cover object-top" sizes="300px" />
                </div>
              </div>
            </div>

            {/* Cápsula 2 (derecha) */}
            <div className="fl-pill fl-pill-2 absolute right-[-2%] top-[36%] w-[56%] h-[27%]">
              <div className="w-full h-full rounded-full overflow-hidden -rotate-[45deg] shadow-[0_25px_45px_-20px_rgba(26,58,107,0.6)] ring-4 ring-white">
                <div className="absolute w-[120%] h-[250%] -left-[10%] -top-[75%] rotate-[45deg]">
                  <Image src="/images/general/voluntarios-h2.webp" alt="" fill className="object-cover object-right" sizes="300px" />
                </div>
              </div>
            </div>

            {/* Cápsula 3 (abajo) */}
            <div className="fl-pill fl-pill-3 absolute left-[6%] bottom-[4%] w-[54%] h-[25%]">
              <div className="w-full h-full rounded-full overflow-hidden -rotate-[35deg] shadow-[0_25px_45px_-20px_rgba(26,58,107,0.6)] ring-4 ring-white">
                <div className="absolute w-[120%] h-[250%] -left-[10%] -top-[75%] rotate-[35deg]">
                  <Image src="/images/programas/programa-02.jpg" alt="" fill className="object-cover" sizes="300px" />
                </div>
              </div>
            </div>

            {/* Corazón de la marca */}
            <div className="absolute left-[46%] top-[62%] w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#0271bd]">
              <HeartHandshake className="w-7 h-7" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}