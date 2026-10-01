// ─── LISTA DE NOTICIAS (/noticias) — estilo portal de noticias ──────────────
// Archivos en _components:
//   encabezado.tsx → ruta, fecha de hoy y título
//   tarjeta.tsx    → tarjetas (sobre foto, fila, lista lateral, destacados)
import { Newspaper } from "lucide-react";
import { apiGet } from "@/lib/api";
import AutoRefresh from "@/components/AutoRefresh";
import Encabezado from "./_components/encabezado";
import { TarjetaSobreFoto, FilaNoticia, ListaLateral, type Noticia } from "./_components/tarjeta";

export const dynamic = "force-dynamic";

async function getNoticias(): Promise<Noticia[]> {
  const data = await apiGet<{ noticias: Noticia[] }>("/noticias");
  return data?.noticias ?? [];
}

export default async function NoticiasPage() {
  const noticias = await getNoticias();
  const [principal, ...demas] = noticias;
  const laterales = demas.slice(0, 2); // dos noticias a la derecha de la principal
  const resto = demas.slice(2); // el resto va en la lista

  return (
    <main className="bg-white text-gray-800">
      <AutoRefresh temas={["noticias"]} />
      <Encabezado />

      <div className="max-w-6xl mx-auto px-6 pt-8 pb-16">
        {noticias.length === 0 ? (
          <div className="text-center py-20">
            <span className="mx-auto w-16 h-16 rounded-2xl bg-[#0271bd]/10 text-[#0271bd] flex items-center justify-center">
              <Newspaper className="w-8 h-8" />
            </span>
            <p className="mt-5 font-display text-xl font-bold text-[#1a3a6b]">Todavía no hay noticias publicadas</p>
            <p className="mt-1 text-zinc-500">Muy pronto compartiremos nuestras novedades.</p>
          </div>
        ) : (
          <>
            {/* ── Portada: 1 grande + 2 a la derecha ── */}
            <section className={`grid gap-3 ${laterales.length ? "md:grid-cols-[2fr_1fr]" : ""}`}>
              <TarjetaSobreFoto n={principal} grande />
              {laterales.length > 0 && (
                <div className="grid gap-3">
                  {laterales.map((n) => (
                    <TarjetaSobreFoto key={n.id} n={n} />
                  ))}
                </div>
              )}
            </section>

            {/* ── Últimas noticias + lateral ── */}
            {resto.length > 0 && (
              <section className="mt-14 grid lg:grid-cols-[1fr_320px] gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="font-display text-2xl font-extrabold text-[#1a3a6b] whitespace-nowrap">Últimas noticias</h2>
                    <span className="h-px flex-1 bg-zinc-200" />
                  </div>
                  {resto.map((n) => (
                    <FilaNoticia key={n.id} n={n} />
                  ))}
                </div>
                <aside className="lg:sticky lg:top-24 self-start">
                  <ListaLateral titulo="Lo más reciente" noticias={noticias.slice(0, 5)} />
                </aside>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
