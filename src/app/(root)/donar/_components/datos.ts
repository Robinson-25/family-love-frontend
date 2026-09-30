// ─── DATOS DE LA PÁGINA DE DONACIONES ────────────────────────────────────────
// ⚠️ IMPORTANTE: completa los datos de pago de la sección "PAGO" más abajo.
import {
  GraduationCap,
  HeartPulse,
  Users,
  Leaf,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// ── Causas que el donante puede elegir ──────────────────────────────────────
export type Causa = {
  id: string;
  nombre: string;
  Icono: LucideIcon;
  descripcion: string;
  foto: string;
};

export const causas: Causa[] = [
  {
    id: "donde-mas-se-necesite",
    nombre: "Donde más se necesite",
    Icono: Sparkles,
    descripcion: "Family Love decide dónde tu aporte ayuda más.",
    foto: "/images/general/familia-voluntarios.webp",
  },
  {
    id: "academico",
    nombre: "Desarrollo Académico",
    Icono: GraduationCap,
    descripcion: "Talleres, ponencias y charlas para niños y jóvenes.",
    foto: "/images/proyectos/2025-primer-aniversario/foto-02.jpg",
  },
  {
    id: "salud",
    nombre: "Salud y Bienestar",
    Icono: HeartPulse,
    descripcion: "Bienestar físico y emocional en las comunidades.",
    foto: "/images/proyectos/2024-risoterapia-onp/foto-01.jpg",
  },
  {
    id: "comunitaria",
    nombre: "Acción Comunitaria",
    Icono: Users,
    descripcion: "Campañas solidarias y acompañamiento.",
    foto: "/images/proyectos/2025-segunda-navidad-huancayo/foto-01.jpg",
  },
  {
    id: "elo-clown",
    nombre: "Elo Clown",
    Icono: Smile,
    descripcion: "Clown hospitalario y comunitario.",
    foto: "/images/proyectos/2025-primer-aniversario/foto-03.jpg",
  },
  {
    id: "ambiental",
    nombre: "Bienestar Ambiental",
    Icono: Leaf,
    descripcion: "Conciencia y cuidado del medio ambiente.",
    foto: "/images/programas/programa-01.jpg",
  },
];

// ── Montos sugeridos (en soles) ─────────────────────────────────────────────
export const montos = [10, 20, 50, 100, 200];

// ── PAGO ────────────────────────────────────────────────────────────────────
// Completa estos datos con la información REAL de Family Love.
// Si un dato queda vacío (""), la página muestra un aviso en lugar de ese método.
export const pago = {
  // Yape / Plin
  yapeNumero: "", // ej: "987 654 321"
  yapeTitular: "", // ej: "Asociación Family Love"
  yapeQr: "", // ej: "/images/donar/qr-yape.png"  (guarda la imagen del QR en public/images/donar/)

  // Tarjeta: nombre de la pasarela que se muestra en la página
  pasarela: "Izipay", // "Izipay", "Culqi" o "Mercado Pago"

  // WhatsApp para que el donante avise que ya donó
  whatsapp: "51991512267",
};
