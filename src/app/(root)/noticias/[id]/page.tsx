import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import AutoRefresh from "@/components/AutoRefresh";

export const dynamic = "force-dynamic";

async function getNoticia(id: string) {
  const data = await apiGet<{ noticia: any }>(`/noticias/${encodeURIComponent(id)}`);
  return data?.noticia ?? null;
}

export default async function NoticiaDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const noticia = await getNoticia(params.id);
  if (!noticia) notFound();

  return (
    <main className="bg-white text-gray-800 font-sans">
      <AutoRefresh temas={["noticias"]} />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/noticias"
          className="inline-flex items-center gap-2 text-[#2251a3] font-semibold text-sm mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Noticias
        </Link>

        <span className="text-xs text-gray-400 font-semibold">📅 {noticia.fecha}</span>
        <h1 className="text-3xl md:text-3xl md:text-[2.6rem] font-extrabold text-[#1a3a6b] mt-3 mb-6 leading-tight">
          {noticia.titulo}
        </h1>

        <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden mb-8">
          <Image src={noticia.imagen} alt={noticia.titulo} fill className="object-cover" />
        </div>

        {noticia.video && (
          <div className="flex justify-center mb-8">
            <video
              src={noticia.video}
              controls
              className="rounded-2xl w-full max-w-[280px] shadow-xl"
              style={{ aspectRatio: "9/16" }}
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
          {noticia.contenido}
        </div>
      </section>
    </main>
  );
}
