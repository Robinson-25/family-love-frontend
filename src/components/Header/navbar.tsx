"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/noticias", label: "Noticias" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/proyecto", label: "Proyectos" },
  { href: "/programas", label: "Programas" },
  { href: "/voluntariado", label: "Voluntariado" },
];

export default function Navbar() {
  const [showMenuPopup, setShowMenuPopup] = React.useState(false);
  const cerrar = () => setShowMenuPopup(false);
  const pathname = usePathname();
  const activo = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* BOTON HAMBURGUESA - solo movil */}
      <div className="flex lg:hidden">
        <button
          className="cursor-pointer p-1"
          onClick={() => setShowMenuPopup(true)}
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* POPUP MENU MOVIL */}
      <div
        className={`fixed top-0 left-0 right-0 w-full bg-white dark:bg-zinc-950 z-[90] transition-all duration-500 ${
          showMenuPopup ? "h-screen opacity-100" : "h-0 opacity-0 pointer-events-none"
        } flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col items-center gap-6">
          <Image
            priority
            src="/logo/logo-family-love.png"
            className="w-24"
            width={300}
            height={150}
            alt="Logo Family Love"
          />
        
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="font-display font-bold text-gray-900 dark:text-white text-xl"
              onClick={cerrar}
            >
              {e.label}
            </Link>
          ))}
        </div>
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={cerrar}
          aria-label="Cerrar menú"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* MENU DESKTOP */}
      <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {enlaces.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className={`group relative text-[15px] font-semibold px-4 py-2 rounded-full transition-colors duration-200 ${
              activo(e.href)
                ? "text-[#1a3a6b] dark:text-[#73eafe]"
                : "text-zinc-600 dark:text-zinc-300 hover:text-[#0271bd] dark:hover:text-[#73eafe]"
            }`}
          >
            {e.label}
            {/* Línea inferior: fija en la página actual, aparece al pasar el mouse en las demás */}
            <span
              className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#0271bd] to-[#73eafe] origin-left transition-transform duration-300 ${
                activo(e.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        ))}
      </nav>
    </>
  );
}
