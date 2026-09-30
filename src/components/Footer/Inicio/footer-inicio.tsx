import Link from "next/link";
import Image from "next/image";
import { redes, columnas } from "../datos";

// Pie AZUL: solo se muestra en la página principal (Inicio)
const FooterInicio = () => {
  const anio = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#0271bd] text-white">
      {/* Brillo celeste suave de fondo */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#73eafe]/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-8">
        {/* Parte superior: enlaces + contacto */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {columnas.map((col, i) => (
            <nav key={i} className="flex flex-col gap-4">
              {col.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="w-fit text-[15px] font-medium text-white/90 hover:text-[#73eafe] transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}

          {/* Contacto */}
          <div className="col-span-2 lg:col-start-4">
            <p className="font-display text-2xl font-extrabold">Contáctanos</p>
            <a
              href="mailto:asociacionfamilylove@gmail.com"
              className="mt-3 block w-fit text-white/90 hover:text-[#73eafe] transition-colors break-all"
            >
              asociacionfamilylove@gmail.com
            </a>
            <a
              href="https://wa.me/51991512267"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block w-fit text-white/90 hover:text-[#73eafe] transition-colors"
            >
              +51 991 512 267
            </a>
          </div>
        </div>

        {/* Fila del logo + redes */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" aria-label="Ir al inicio" className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-black/10">
              <Image src="/logo/logo-family-love.png" alt="Logo Family Love" width={120} height={120} className="w-11 h-auto" />
            </span>
            <span className="font-display text-3xl font-extrabold tracking-tight">
              Family <span className="text-[#73eafe]">Love</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {redes.map((r) => (
              <a
                key={r.nombre}
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={r.nombre}
                title={r.nombre}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-[#73eafe] hover:text-[#1a3a6b] hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {r.icono}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Línea y barra inferior */}
        <hr className="mt-10 border-t border-white/25" />
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-white/80">
          <span>Organización sin fines de lucro</span>
          <span>Fundado en 2023</span>
          <span>© {anio} Family Love</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterInicio;
