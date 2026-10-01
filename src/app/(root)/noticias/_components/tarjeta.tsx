// ─── TIPOS, UTILIDADES Y TARJETAS DE NOTICIAS (estilo portal de noticias) ────
import Link from "next/link";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

export type Noticia = {
  id: number;
  titulo: string;
  resumen: string;
  contenido?: string;
  imagen: string;
  video?: string | null;
  fecha: string;
  createdAt?: string;
};

// "Hace 14 minutos", "Hace 3 días"… (si no hay fecha de creación, usa la fecha escrita)
export function haceCuanto(n: Noticia) {
  if (!n.createdAt) return n.fecha;
  const seg = Math.floor((Date.now() - new Date(n.createdAt).getTime()) / 1000);
  if (seg < 60) return "Hace un momento";
  const min = Math.floor(seg / 60);
  if (min < 60) return `Hace ${min} minuto${min === 1 ? "" : "s"}`;
  const h = Math.floor(min / 60);
  if (h < 24) return `Hace ${h} hora${h === 1 ? "" : "s"}`;
  const d = Math.floor(h / 24);
  if (d < 30) return `Hace ${d} día${d === 1 ? "" : "s"}`;
  return n.fecha;
}

// Etiqueta de sección (como "ACTUALIDAD" en Canal N)
export function Etiqueta({ claro = false }: { claro?: boolean }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] ${
        claro ? "bg-[#73eafe] text-[#1a3a6b]" : "bg-[#0271bd]/10 text-[#0271bd]"
      }`}
    >
      Family Love
    </span>
  );
}

// Tarjeta con la foto de fondo y el texto encima (portada)
export function TarjetaSobreFoto({ n, grande = false }: { n: Noticia; grande?: boolean }) {
  return (
    <Link
      href={`/noticias/${n.id}`}
      className={`group relative block overflow-hidden rounded-xl bg-[#1a3a6b] ${grande ? "h-[360px] md:h-full md:min-h-[460px]" : "h-[220px]"}`}
    >
      <Image
        src={n.imagen}
        alt={n.titulo}
        fill
        priority={grande}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={grande ? "(max-width: 768px) 100vw, 760px" : "(max-width: 768px) 100vw, 380px"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a55] via-[#0f2a55]/55 to-transparent" />
      {n.video && (
        <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/45 backdrop-blur text-white flex items-center justify-center">
          <PlayCircle className="w-6 h-6" />
        </span>
      )}
      <div className={`absolute inset-x-0 bottom-0 text-white ${grande ? "p-6 md:p-8" : "p-5"}`}>
        <Etiqueta claro />
        <h3
          className={`mt-3 font-display font-bold leading-snug group-hover:underline decoration-[#73eafe] underline-offset-4 ${
            grande ? "text-2xl md:text-[2rem] md:leading-tight" : "text-lg line-clamp-3"
          }`}
        >
          {n.titulo}
        </h3>
        {grande && <p className="mt-3 text-white/80 line-clamp-2 max-w-2xl">{n.resumen}</p>}
        <p className="mt-3 text-xs text-white/70">{haceCuanto(n)}</p>
      </div>
    </Link>
  );
}

// Fila de lista (foto a la izquierda, texto a la derecha) — estilo RPP
export function FilaNoticia({ n }: { n: Noticia }) {
  return (
    <Link href={`/noticias/${n.id}`} className="group grid grid-cols-[120px_1fr] sm:grid-cols-[260px_1fr] gap-4 sm:gap-6 py-6 border-b border-zinc-200 first:pt-0">
      <span className="relative h-24 sm:h-40 overflow-hidden rounded-lg">
        <Image src={n.imagen} alt={n.titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 120px, 260px" />
        {n.video && (
          <span className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center">
            <PlayCircle className="w-5 h-5" />
          </span>
        )}
      </span>
      <span>
        <span className="inline-block text-sm font-semibold text-[#1a3a6b] border-b-2 border-[#73eafe] pb-0.5">Family Love</span>
        <span className="mt-2 block font-display text-lg sm:text-xl font-bold text-zinc-900 leading-snug group-hover:text-[#0271bd] transition-colors line-clamp-3">
          {n.titulo}
        </span>
        <span className="hidden sm:block mt-2 text-zinc-600 line-clamp-2">{n.resumen}</span>
        <span className="mt-2 block text-sm text-zinc-500">
          por <b className="text-zinc-700">Family Love</b> · {haceCuanto(n)}
        </span>
      </span>
    </Link>
  );
}

// Lista numerada lateral (como "Más leídas")
export function ListaLateral({ titulo, noticias }: { titulo: string; noticias: Noticia[] }) {
  if (noticias.length === 0) return null;
  return (
    <div className="rounded-xl bg-[#eaf6fd] p-6">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-xl font-extrabold text-[#1a3a6b] whitespace-nowrap">{titulo}</h2>
        <span className="h-0.5 flex-1 bg-[#1a3a6b]" />
      </div>
      <ol className="mt-4 divide-y divide-[#1a3a6b]/15">
        {noticias.map((n, i) => (
          <li key={n.id}>
            <Link href={`/noticias/${n.id}`} className="group flex gap-4 py-4">
              <span className="font-display text-3xl font-extrabold text-[#0271bd]/40 leading-none w-6 shrink-0">{i + 1}</span>
              <span>
                <span className="block font-semibold text-[#1a3a6b] leading-snug group-hover:text-[#0271bd] transition-colors line-clamp-3">{n.titulo}</span>
                <span className="mt-1 block text-xs text-zinc-500">{haceCuanto(n)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Tarjeta simple de "Destacados" (foto arriba, título abajo) — estilo La República
export function TarjetaDestacado({ n }: { n: Noticia }) {
  return (
    <Link href={`/noticias/${n.id}`} className="group block">
      <span className="relative block h-48 overflow-hidden rounded-lg">
        <Image src={n.imagen} alt={n.titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 380px" />
      </span>
      <span className="mt-3 block font-display text-lg font-bold text-zinc-900 leading-snug group-hover:underline decoration-[#0271bd] underline-offset-4 line-clamp-3">
        {n.titulo}
      </span>
      <span className="mt-1 block text-xs text-zinc-500">{haceCuanto(n)}</span>
    </Link>
  );
}
