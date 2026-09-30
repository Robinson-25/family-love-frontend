"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ToggleTheme from "../ToggleTheme/toggle-theme";
import Navbar from "./navbar";

const Header = () => {
  // Al bajar, la cabecera se vuelve "de vidrio" con una sombra suave.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky z-[70] top-0 right-0 left-0 w-full px-4 sm:px-8 flex justify-between items-center transition-all duration-300 text-zinc-900 dark:text-white ${
        scrolled
          ? "py-1.5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(26,58,107,0.25)] border-b border-zinc-200/60 dark:border-zinc-800/60"
          : "py-2.5 bg-[rgba(250,250,250,1)] dark:bg-zinc-950 border-b border-transparent"
      }`}
    >
      {/* Izquierda: menú (solo en celular) + logo */}
      <div className="flex items-center gap-3">
        <Navbar />
        <Link href="/" className="w-12 md:w-14 shrink-0" aria-label="Ir al inicio">
          <Image
            priority
            src="/logo/logo-family-love.png"
            className="w-full h-auto"
            width={150}
            height={150}
            alt="Logo Family Love"
          />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ToggleTheme />
      </div>
    </header>
  );
};
export default Header;
