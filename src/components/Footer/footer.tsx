"use client";

import { usePathname } from "next/navigation";
import FooterInicio from "./Inicio/footer-inicio";
import FooterSecciones from "./Secciones/footer-secciones";

// Elige qué pie de página mostrar:
//  - Inicio ("/")      → pie azul   (Inicio/footer-inicio.tsx)
//  - Demás secciones   → pie claro  (Secciones/footer-secciones.tsx)
const Footer = () => {
  const pathname = usePathname();
  return pathname === "/" ? <FooterInicio /> : <FooterSecciones />;
};

export default Footer;
