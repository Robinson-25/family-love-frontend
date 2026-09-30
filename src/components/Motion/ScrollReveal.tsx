"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Hace que cada sección de la página aparezca suavemente al bajar.
// No hay que tocar las páginas: se aplica sola a todas las <section>
// dentro de <main> (menos la primera, la portada, que se ve de inmediato).
// También funciona con elementos marcados con data-reveal.
//
// Seguridad: nunca deja una sección escondida.
//  - Lo que ya está en pantalla se muestra al instante.
//  - Si algo falla, a los 1.5 s se muestra todo igual.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("fl-reveal-on");

    const mostrar = (el: Element) => el.classList.add("fl-visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            mostrar(e.target);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const preparar = () => {
      const candidatos = document.querySelectorAll<HTMLElement>(
        "main section:not(:first-of-type), [data-reveal]"
      );
      candidatos.forEach((el) => {
        if (el.classList.contains("fl-visible")) return; // ya se ve

        // Si ya está en pantalla, se muestra de inmediato (sin esperar)
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("fl-reveal");
          mostrar(el);
          return;
        }

        el.classList.add("fl-reveal");
        observer.observe(el);
      });
    };

    preparar();

    // Para contenido que llega después (proyectos y noticias desde el backend)
    const mo = new MutationObserver(() => preparar());
    mo.observe(document.body, { childList: true, subtree: true });

    // Red de seguridad: pase lo que pase, a los 1.5 s todo es visible
    const seguro = window.setTimeout(() => {
      document.querySelectorAll(".fl-reveal:not(.fl-visible)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.5) mostrar(el);
      });
    }, 1500);

    return () => {
      observer.disconnect();
      mo.disconnect();
      window.clearTimeout(seguro);
      // Al salir de la página, que nada quede escondido
      document.querySelectorAll(".fl-reveal:not(.fl-visible)").forEach(mostrar);
    };
  }, [pathname]);

  return null;
}