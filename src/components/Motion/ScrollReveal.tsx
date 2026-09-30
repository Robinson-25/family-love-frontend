"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Hace que cada sección de la página aparezca suavemente al bajar.
// No hay que tocar las páginas: se aplica sola a todas las <section>
// dentro de <main> (menos la primera, la portada, que se ve de inmediato).
// También funciona con elementos marcados con data-reveal.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("fl-reveal-on");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("fl-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const preparar = () => {
      const candidatos = document.querySelectorAll<HTMLElement>(
        "main section:not(:first-of-type), [data-reveal]"
      );
      candidatos.forEach((el) => {
        if (el.dataset.flReveal) return;
        el.dataset.flReveal = "1";
        el.classList.add("fl-reveal");
        observer.observe(el);
      });
    };

    preparar();
    // Para contenido que llega después (proyectos y noticias desde el backend)
    const mo = new MutationObserver(() => preparar());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
