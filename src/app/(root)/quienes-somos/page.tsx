import { GraduationCap, HeartPulse, Users, Leaf } from "lucide-react";
import EquipoDirectivo from "./_components/equipo-directivo";
import Hero from "./_components/hero";
import { equipoRespaldo, type Persona } from "./_components/equipo-datos";
import AutoRefresh from "@/components/AutoRefresh";
import { apiGet } from "@/lib/api";

// ─── DATOS ────────────────────────────────────────────────────────────────────
const mision =
  "Somos una organización sin fines de lucro que busca el desarrollo integral en los jóvenes mediante el voluntariado a la población.";

const vision =
  "Ser una organización sin fines de lucro reconocida a nivel nacional por su impacto positivo en el desarrollo integral de la juventud y en la labor social en la población.";

const historia = [
  "Family Love nació el 10 de julio de 2024 con el propósito de contribuir al desarrollo integral de adolescentes y jóvenes mediante el voluntariado, la acción social y el liderazgo con enfoque humano, promoviendo una cultura de empatía, solidaridad y compromiso con las comunidades más vulnerables del Perú.",
  "Como parte de su proceso de fortalecimiento institucional, el 2 de abril de 2025 la organización presentó su logo oficial, consolidando su identidad institucional y proyectando una imagen alineada con su misión, visión y valores.",
  "Durante el año 2024, Family Love desarrolló sus primeras actividades de impacto social, entre ellas el Taller de Risoterapia dirigido a adultos mayores de la ONP y del CAM ESSALUD – Concepción. Asimismo, realizó su primera campaña navideña solidaria en la comunidad campesina de Ullusca, provincia de Jauja, y una campaña de ayuda solidaria en las calles de Huancayo, brindando acompañamiento humano y apoyo mediante la entrega de juguetes, ropa y víveres a personas en situación de vulnerabilidad.",
  "En 2025, la organización amplió su labor social mediante actividades de acompañamiento en el CAR Virgen de Lourdes de Jauja, nuevos talleres de risoterapia en el Centro de Salud de Sapallanga y el CAM ESSALUD – Concepción, campañas solidarias en favor del albergue Santo Monte de Jehová y de adultos mayores en situación de abandono en las calles de Jauja. Asimismo, participó como organización colaboradora en el evento \"Celebrando la Fuerza Femenina\", reafirmando su compromiso con el servicio y el trabajo articulado con otras instituciones.",
  "Como parte de las últimas actividades del año 2025, Family Love realizó su segunda campaña navideña solidaria en la comunidad de San José de Apata, provincia de Jauja, y una campaña de apoyo dirigida a adultos mayores en las calles de Huancayo, reafirmando su compromiso con las poblaciones en situación de vulnerabilidad.",
  "A lo largo de su crecimiento, Family Love ha contado con el respaldo de aliados estratégicos y auspiciadores que han contribuido al desarrollo de sus programas y proyectos sociales, fortaleciendo su impacto en las comunidades beneficiarias.",
  "Actualmente, Family Love continúa consolidándose como una organización juvenil con visión de crecimiento, estructura organizacional y un firme compromiso con el desarrollo social y humano del Perú, bajo el liderazgo de su fundadora y directora general, Tania Sarai Trinidad Meza.",
];

const objetivos = [
  {
    Icono: GraduationCap,
    titulo: "Desarrollo Académico",
    descripcion:
      "Impulsar el desarrollo intelectual de niños, adolescentes y jóvenes a través de ponencias, talleres y charlas, destacando la importancia de la lectura y la investigación.",
  },
  {
    Icono: HeartPulse,
    titulo: "Salud, Bienestar Integral",
    descripcion:
      "Promovemos la salud física y mental de nuestros voluntarios y de las comunidades mediante diversas actividades que contribuyen al bienestar integral y al desarrollo personal.",
  },
  {
    Icono: Users,
    titulo: "Acción Comunitaria",
    descripcion:
      "Fomentar la participación en voluntariados comunitarios y en diversas iniciativas sociales, con el fin de fortalecer el desarrollo de habilidades blandas esenciales para la vida personal y profesional de los jóvenes",
  },
  {
    Icono: Leaf,
    titulo: "Bienestar Ambiental",
    descripcion:
      "Desarrollar conciencia ambiental y generar un impacto positivo en el medio ambiente",
  },
];

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default async function QuienesSomosPage() {
  // El equipo directivo se administra desde el panel. Si el backend no
  // responde, se muestra la lista de respaldo para que la página no quede vacía.
  const datos = await apiGet<{ equipo: Persona[] }>("/equipo");
  const equipo = datos?.equipo?.length ? datos.equipo : equipoRespaldo;

  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* Si alguien cambia el equipo en el panel, esta página se actualiza sola */}
      <AutoRefresh temas={["equipo"]} />

      {/* ── PORTADA (está en _components/hero.tsx) ── */}
      <Hero equipo={equipo} />

      {/* ── MISIÓN Y VISIÓN ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">

          <div className="relative bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] rounded-3xl p-8 text-white overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3 tracking-tight">Misión</h2>
              <p className="text-white/85 leading-relaxed text-base">{mision}</p>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#73eafe]/20 to-[#2251a3]/10 border border-[#2251a3]/20 rounded-3xl p-8 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#73eafe]/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3 text-[#1a3a6b] tracking-tight">Visión</h2>
              <p className="text-gray-600 leading-relaxed text-base">{vision}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── HISTORIA (texto simple, sin tarjetas ni línea de tiempo) ────────── */}
      <section id="historia" className="bg-white py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Nuestra historia</span>
            <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-[#1a3a6b] mt-3">El camino de Family Love</h2>
          </div>

          <div className="space-y-6">
            {historia.map((parrafo, i) => (
              <p
                key={i}
                className="text-zinc-700 text-base md:text-[17px] leading-8"
              >
                {parrafo}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── EJES INSTITUCIONALES (círculos unidos por una línea) ───────────── */}
      <section className="bg-gradient-to-b from-[#eaf9ff] to-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#0271bd] font-bold text-xs tracking-[0.22em] uppercase">Lo que hacemos</span>
            <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-[#1a3a6b] mt-3">Ejes institucionales</h2>
          </div>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            {/* Línea que une los círculos (solo en pantallas grandes) */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#0271bd] via-[#73eafe] to-[#0271bd] opacity-40" />

            {objetivos.map(({ Icono, titulo, descripcion }, i) => (
              <div key={i} className="relative text-center group">
                <div className="relative mx-auto w-24 h-24 rounded-full bg-white shadow-[0_12px_30px_-10px_rgba(2,113,189,0.45)] ring-8 ring-[#eaf9ff] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a3a6b] to-[#0271bd] text-white flex items-center justify-center">
                    <Icono className="w-8 h-8" strokeWidth={1.8} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#73eafe] text-[#1a3a6b] text-xs font-extrabold flex items-center justify-center">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#1a3a6b] mt-6 mb-3">{titulo}</h3>
                <p className="text-zinc-600 text-[15px] leading-relaxed max-w-xs mx-auto">{descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPO DIRECTIVO (está en _components/equipo-directivo.tsx) ── */}
      <EquipoDirectivo equipo={equipo} />

    </main>
  );
}