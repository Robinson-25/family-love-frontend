import Link from "next/link";
import { MapPin } from "lucide-react";
import { redes, todosLosLinks } from "../datos";

// Pie CLARO: Noticias, Quiénes Somos, Proyectos, Programas y Voluntariado
const FooterSecciones = () => {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-sm pb-6 text-zinc-900 dark:text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 lg:gap-16 xl:gap-24 py-12 px-6">
        {/* DIRECCIÓN */}
        <div className="text-center">
          <p className="font-semibold tracking-widest uppercase mb-4">Nuestra Dirección</p>
          <div className="flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-4 h-4 text-[#0271bd]" strokeWidth={1.5} />
            <span>Family Love</span>
          </div>
        </div>

        {/* REDES SOCIALES */}
        <div className="text-center">
          <p className="font-semibold tracking-widest uppercase mb-4">Síguenos</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {redes.map((r) => (
              <a
                key={r.nombre}
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={r.nombre}
                title={r.nombre}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 hover:bg-[#0271bd] hover:text-white hover:ring-transparent hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {r.icono}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* LINKS RÁPIDOS */}
        <div className="text-center">
          <p className="font-semibold tracking-widest uppercase mb-4">Links Rápidos</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-[340px] md:max-w-[600px] mx-auto">
            {todosLosLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-zinc-700 dark:text-zinc-300 hover:text-[#0271bd] dark:hover:text-[#73eafe] transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
    </footer>
  );
};

export default FooterSecciones;
