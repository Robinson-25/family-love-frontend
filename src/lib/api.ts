import axios from "axios";

// Dirección del backend (Express). Se configura en .env.local
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1").replace(
  /\/$/,
  ""
);

export const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

// Cliente axios para el navegador.
// Los errores 4xx NO lanzan excepción: llegan como response.data.error,
// así el código de los formularios puede mostrar el mensaje del backend.
export const api = axios.create({
  baseURL: API_URL,
  validateStatus: (status) => status < 500,
});

// Para páginas del servidor (Server Components).
export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`[api] GET ${path} falló:`, error);
    return null;
  }
}
