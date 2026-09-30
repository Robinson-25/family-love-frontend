// ─── PÁGINA DE DONACIONES (/donar) ───────────────────────────────────────────
// Archivos en _components:
//   datos.ts     → causas, montos y DATOS DE PAGO (Yape, QR, link de tarjeta)
//   hero.tsx     → portada con foto
//   donacion.tsx → los 3 pasos: causa · monto · pagar
import type { Metadata } from "next";
import Hero from "./_components/hero";
import Donacion from "./_components/donacion";

export const metadata: Metadata = {
  title: "Donar | Family Love",
  description: "Apoya a Family Love con tu donación por Yape, Plin o tarjeta.",
};

export default function DonarPage() {
  return (
    <main className="bg-[#f6f9fc] text-gray-800">
      <Hero />
      <Donacion />
    </main>
  );
}
