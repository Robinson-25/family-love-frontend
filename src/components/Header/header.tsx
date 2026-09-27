import React from "react";
import Image from "next/image";
import Link from "next/link";
import ToggleTheme from "../ToggleTheme/toggle-theme";
import Navbar from "./navbar";

const Header = async () => {
  return (
    <header className="sticky z-[70] top-0 bg-[rgba(250,250,250,1)] dark:bg-[rgba(0,0,0,0.85)] text-black dark:text-white right-0 left-0 w-full px-3 sm:px-6 py-2 flex justify-between items-center">
      {/* Izquierda: menú (solo en celular) + logo */}
      <div className="flex items-center gap-3">
        <Navbar />
        <Link href="/" className="w-12 md:w-14">
          <Image
            priority
            src="/logo/logo-family-love.png"
            className="w-full"
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