"use client";

import { useEffect, useRef } from "react";
import { API_URL } from "./api";

type Tema = "proyectos" | "noticias";

// Escucha los avisos del backend (/api/v1/eventos) y ejecuta `alCambiar`
// cuando se crea, edita o borra algo de los temas indicados.
// También vuelve a cargar cuando la persona regresa a la pestaña.
export function useCambios(temas: Tema[], alCambiar: () => void) {
  const callback = useRef(alCambiar);
  callback.current = alCambiar;
  const clave = temas.join(",");

  useEffect(() => {
    const lista = clave.split(",");
    let ultimo = 0;
    // Evita recargar varias veces seguidas si llegan muchos avisos juntos.
    const disparar = () => {
      const ahora = Date.now();
      if (ahora - ultimo < 800) return;
      ultimo = ahora;
      callback.current();
    };

    const fuente = new EventSource(`${API_URL}/eventos`);
    fuente.addEventListener("cambio", (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data);
        if (lista.includes(data.tema)) disparar();
      } catch {
        /* aviso con formato desconocido: se ignora */
      }
    });

    const alVolver = () => {
      if (document.visibilityState === "visible") disparar();
    };
    document.addEventListener("visibilitychange", alVolver);

    return () => {
      fuente.close();
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, [clave]);
}
