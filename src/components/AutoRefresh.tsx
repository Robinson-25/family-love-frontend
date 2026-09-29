"use client";

import { useRouter } from "next/navigation";
import { useCambios } from "@/lib/use-cambios";

// Para páginas del servidor (como Noticias): cuando el backend avisa
// que hubo un cambio, vuelve a pedir la página sin recargar el navegador.
export default function AutoRefresh({ temas }: { temas: ("proyectos" | "noticias")[] }) {
  const router = useRouter();
  useCambios(temas, () => router.refresh());
  return null;
}
