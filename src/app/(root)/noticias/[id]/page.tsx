// ─── DETALLE DE UNA NOTICIA (/noticias/[id]) — estilo portal de noticias ─────
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Clock, Home, PlayCircle } from "lucide-react";
import { apiGet } from "@/lib/api";
import AutoRefresh from "@/components/AutoRefresh";
import Compartir, { BotonCompartir, Escuchar } from "../_components/compartir";
import { ListaLateral, TarjetaDestacado, type Noticia } from "../_components/tarjeta";

export const dynamic = "force-dynamic";

async function getNoticia(id: string) {
  const data = await apiGet<{ noticia: Noticia }>(`/noticias/${encodeURIComponent(id)}`);
  return data?.noticia ?? null;
}

async function getTodas() {
  const data = await apiGet<{ noticias: Noticia[] }>("/noticias");
  return data?.noticias ?? [];
}

const minutosLectura = (texto = "") => Math.max(1, Math.round(texto.trim().split(/\s+/).length / 200));

export default async function NoticiaDetallePage({ params }: { params: { id: string } }) {
  const noticia = await getNoticia(params.id);
  if (!noticia) notFound();
  const otras = (await getTodas()).filter((n) => n.id !== noticia.id);

  return (
    <main className="bg-[#f6f9fc] text-gray-800">
      <AutoRefresh temas={["noticias"]} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-[0_10px_40px_-25px_rgba(26,58,107,0.4)] overflow-hidden">
          {/* ── Franja de sección (estilo Canal N) ── */}
          <div className="bg-[#eaf6fd] border-b border-[#73eafe]/40 px-5 sm:px-8 py-5">
            <p className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1a3a6b]">Noticias</p>
          </div>

          <div className="px-5 sm:px-8 pt-6 pb-10">
            {/* Ruta + fecha + compartir */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav className="flex items-center gap-1 text-sm" aria-label="Ruta">
                <Link href="/" aria-label="Inicio" className="text-[#1a3a6b] hover:text-[#0271bd]">
                  <Home className="w-4 h-4" />
                </Link>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
                <Link href="/noticias" className="font-bold uppercase tracking-wide text-[#0271bd] hover:underline">Noticias</Link>
              </nav>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-700">
                  <CalendarDays className="w-4 h-4" /> {noticia.fecha}
                </span>
                <Compartir titulo={noticia.titulo} />
              </div>
            </div>

            <div className="mt-8 grid lg:grid-cols-[1fr_300px] gap-10">
              {/* ── Artículo ── */}
              <article className="min-w-0">
                <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#0271bd]">Family Love</p>
                <h1 className="mt-2 font-display font-extrabold tracking-tight text-zinc-900 leading-[1.12]" style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)" }}>
                  {noticia.titulo}
                </h1>
                {noticia.resumen && <p className="mt-4 text-lg md:text-xl text-zinc-600 leading-relaxed">{noticia.resumen}</p>}

                {/* Foto completa con fondo difuminado */}
                <figure className="mt-7">
                  <div className="relative h-72 md:h-[440px] overflow-hidden rounded-lg bg-[#1a3a6b]">
                    <Image src={noticia.imagen} alt="" fill className="object-cover scale-110 blur-2xl opacity-60" sizes="800px" aria-hidden="true" />
                    <Image src={noticia.imagen} alt={noticia.titulo} fill priority className="object-contain" sizes="(max-width: 1024px) 100vw, 800px" />
                  </div>
                  <figcaption className="mt-2 text-sm text-zinc-500">Foto: Family Love</figcaption>
                </figure>

                {/* Autor + acciones */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-zinc-100 py-5">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-[#73eafe]/40 text-[#1a3a6b] font-display font-extrabold flex items-center justify-center">FL</span>
                    <div className="leading-tight">
                      <p className="text-sm text-zinc-500">Por</p>
                      <p className="font-bold text-[#0271bd]">Family Love</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500 mr-2">
                      <Clock className="w-4 h-4" /> {minutosLectura(noticia.contenido)} min
                    </span>
                    <Escuchar texto={`${noticia.titulo}. ${noticia.contenido ?? ""}`} />
                    <BotonCompartir titulo={noticia.titulo} />
                  </div>
                </div>

                {/* Cuerpo */}
                <div className="mt-7 text-zinc-800 text-[18px] md:text-[19px] leading-[1.85] whitespace-pre-line">{noticia.contenido}</div>

                {noticia.video && (
                  <div className="mt-10 rounded-xl bg-[#f6f9fc] border border-zinc-100 p-6">
                    <p className="font-display font-bold text-[#1a3a6b] flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-[#0271bd]" /> Video del evento
                    </p>
                    <div className="mt-4 flex justify-center">
                      <video src={noticia.video} controls playsInline className="rounded-xl w-full max-w-[300px] shadow-xl" style={{ aspectRatio: "9/16" }} />
                    </div>
                  </div>
                )}
              </article>

              {/* ── Lateral (estilo "Más leídas") ── */}
              <aside className="lg:sticky lg:top-24 self-start">
                <ListaLateral titulo="Más noticias" noticias={otras.slice(0, 5)} />
              </aside>
            </div>
          </div>
        </div>

        {/* ── Destacados (estilo La República) ── */}
        {otras.length > 0 && (
          <section className="mt-12">
            <h2 className="inline-block font-display text-2xl font-extrabold text-zinc-900 border-b-4 border-[#0271bd] pb-1">Destacados</h2>
            <div className="h-px bg-zinc-200 -mt-px" />
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otras.slice(0, 3).map((n) => (
                <TarjetaDestacado key={n.id} n={n} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
