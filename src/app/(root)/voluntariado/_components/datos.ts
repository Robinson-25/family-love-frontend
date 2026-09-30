// ─── DATOS DE LA PÁGINA DE VOLUNTARIADO ──────────────────────────────────────
// Aquí se cambian los textos y fotos sin tocar el diseño.

export type Razon = {
  titulo: string;
  descripcion: string;
  foto: string;
};

export const razones: Razon[] = [
  {
    titulo: "Transforma vidas",
    descripcion:
      "Cada acción que realices tendrá un impacto real en personas que más lo necesitan. Tu tiempo vale más de lo que imaginas.",
    foto: "/images/proyectos/2024-regalando-sonrisas-huancayo/foto-01.jpg",
  },
  {
    titulo: "Crece personalmente",
    descripcion:
      "Desarrolla habilidades blandas, liderazgo y empatía mientras trabajas junto a jóvenes apasionados por el servicio.",
    foto: "/images/proyectos/2025-museo-de-recuerdos-cam/foto-01.jpg",
  },
  {
    titulo: "Construye comunidad",
    descripcion:
      "Forma parte de una red de jóvenes comprometidos con el bienestar social, la salud y el desarrollo humano.",
    foto: "/images/proyectos/2025-repartiendo-sonrisas-car/foto-01.jpg",
  },
  {
    titulo: "Certificación oficial",
    descripcion:
      "Recibe un certificado de voluntariado que acredita tu participación y enriquece tu perfil profesional.",
    foto: "/images/proyectos/2025-primer-aniversario/foto-02.jpg",
  },
];

export const requisitos = [
  "Tener entre 16 y 35 años de edad.",
  "Compromiso mínimo de 3 horas semanales.",
  "Actitud positiva, responsabilidad y trabajo en equipo.",
  "Portar el polo institucional de la organización.",
  "No se requiere experiencia previa — solo muchas ganas de ayudar.",
];

export const testimonios = [
  {
    nombre: "María Huallpa",
    cargo: "Voluntaria 2025",
    texto:
      "Ser parte de Family Love ha sido una experiencia que marcó mi corazón. Poder llevar alegría, amor y momentos de risa a diferentes personas es algo que no tiene precio. Ver sonrisas sinceras y corazones agradecidos me hizo comprender el verdadero valor de dar. Estoy muy agradecida por cada momento vivido y por formar parte de esta hermosa misión.",
  },
  {
    nombre: "Andree",
    cargo: "Voluntario 2025",
    texto:
      "Haber formado parte de Family Love es una de las mejores experiencias que he tenido el placer de vivir, no solo por haber conseguido traer sonrisas a las personas, también ver el impacto y la dicha que podemos dar es algo que alivia el alma. Siempre estaré agradecido de haber podido formar parte de esta bella iniciativa.",
  },
  {
    nombre: "Flor de María",
    cargo: "Voluntaria 2025",
    texto:
      "Para mí, Family Love es como un hogar donde el apoyo constante, la comprensión y el cariño verdadero se unen para crear un lugar seguro al que perteneces. Es el vínculo que une a las personas, ayudándoles a crecer, a superar obstáculos y a celebrar cada momento juntos.",
  },
];

// Pasos que se muestran junto al formulario
export const pasos = [
  { titulo: "Completa el formulario", texto: "Solo te toma un par de minutos." },
  { titulo: "Te contactamos", texto: "Te escribimos por WhatsApp o correo." },
  { titulo: "¡Bienvenido a Family Love!", texto: "Te sumas a tu primera actividad." },
];