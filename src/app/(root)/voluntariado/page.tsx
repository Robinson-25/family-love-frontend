// ─── PÁGINA DE VOLUNTARIADO ──────────────────────────────────────────────────
// Cada sección está en su propio archivo dentro de _components:
//   datos.ts        → textos, requisitos, testimonios y fotos
//   hero.tsx        → portada con foto
//   razones.tsx     → ¿Por qué ser voluntario?
//   requisitos.tsx  → Requisitos para unirte
//   testimonios.tsx → Lo que dicen nuestros voluntarios
//   formulario.tsx  → Formulario de inscripción (envía al backend)
import Hero from "./_components/hero";
import Razones from "./_components/razones";
import Requisitos from "./_components/requisitos";
import Testimonios from "./_components/testimonios";
import Formulario from "./_components/formulario";

export default function VoluntariadoPage() {
  return (
    <main className="bg-white text-gray-800">
      <Hero />
      <Razones />
      <Requisitos />
      <Testimonios />
      <Formulario />
    </main>
  );
}
