// ─── ENCABEZADO DE NOTICIAS (barra de color + título, estilo RPP) ────────────
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

function fechaDeHoy() {
  const t = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Lima",
  });
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export default function Encabezado() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <nav className="flex items-center gap-1 text-zinc-500" aria-label="Ruta">
          <Link href="/" aria-label="Inicio" className="hover:text-[#0271bd]">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-bold uppercase tracking-wide text-[#0271bd]">Noticias</span>
        </nav>
        <span className="text-zinc-500">{fechaDeHoy()}</span>
      </div>

      <div className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-[#1a3a6b] via-[#0271bd] to-[#73eafe]" />
      <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a3a6b]">Noticias</h1>
      <p className="mt-2 text-zinc-600">Entérate de las últimas novedades de Family Love.</p>
    </div>
  );
}
