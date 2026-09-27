"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const enlaces = [
  { href: "/noticias", label: "Noticias" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/proyecto", label: "Proyectos" },
  { href: "/programas", label: "Programas" },
  { href: "/voluntariado", label: "Voluntariado" },
];

export default function Navbar() {
  const [showMenuPopup, setShowMenuPopup] = React.useState(false);
  const cerrar = () => setShowMenuPopup(false);

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
          <Link
            href="/"
            className="font-bold text-gray-900 dark:text-white text-xl"
            onClick={cerrar}
          >
            Inicio
          </Link>
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="font-bold text-gray-900 dark:text-white text-xl"
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
      <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        {enlaces.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="text-base font-bold text-gray-900 dark:text-white px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200"
          >
            {e.label}
          </Link>
        ))}
      </div>
    </>
  );
}