// ─── RESPUESTAS DEL ASISTENTE FAMILY LOVE ───────────────────────────────────
// El asistente responde según palabras clave. Para agregar un tema nuevo,
// copia un bloque, cambia las "claves" (palabras que escribe la persona),
// el "texto" de respuesta y los botones ("acciones").

export type Accion = { texto: string; href: string; externo?: boolean };
export type Respuesta = { texto: string; acciones?: Accion[] };
type Tema = { id: string; claves: string[]; respuesta: Respuesta };

export const WHATSAPP = "51991512267";
const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

// Botones que aparecen al inicio
export const opcionesIniciales = [
  { id: "voluntario", texto: "Quiero ser voluntario" },
  { id: "donar", texto: "Quiero donar" },
  { id: "proyectos", texto: "Ver proyectos" },
  { id: "quienes", texto: "¿Quiénes son?" },
  { id: "humano", texto: "Hablar con una persona" },
];

export const temas: Tema[] = [
  {
    id: "voluntario",
    claves: ["voluntari", "unirme", "unir", "inscrib", "participar", "requisit", "ayudar"],
    respuesta: {
      texto:
        "¡Qué bueno que quieras sumarte! 💙 Para ser voluntario necesitas tener entre 16 y 35 años, dedicar al menos 3 horas a la semana y muchas ganas de ayudar. No se requiere experiencia previa y recibes certificado.",
      acciones: [
        { texto: "Inscribirme ahora", href: "/voluntariado#formulario" },
        { texto: "Ver requisitos", href: "/voluntariado#requisitos" },
      ],
    },
  },
  {
    id: "donar",
    claves: ["don", "aport", "yape", "plin", "tarjeta", "dinero", "pagar", "apoyar"],
    respuesta: {
      texto:
        "¡Gracias por querer apoyar! 🙌 Puedes donar en 3 pasos: eliges la causa, el monto y pagas con tarjeta o Yape/Plin.",
      acciones: [{ texto: "Ir a donar", href: "/donar" }],
    },
  },
  {
    id: "proyectos",
    claves: ["proyect", "campa", "actividad", "evento", "navidad", "hacen", "trabajo"],
    respuesta: {
      texto:
        "Realizamos campañas navideñas, talleres de risoterapia, acompañamiento a adultos mayores y visitas a albergues en Junín. Aquí puedes ver todos nuestros proyectos por año 👇",
      acciones: [
        { texto: "Ver proyectos", href: "/proyecto" },
        { texto: "Ver programas", href: "/programas" },
      ],
    },
  },
  {
    id: "quienes",
    claves: ["quien", "quién", "family", "organiza", "mision", "misión", "vision", "visión", "historia", "equipo"],
    respuesta: {
      texto:
        "Family Love es una organización sin fines de lucro, fundada el 10 de julio de 2024, que impulsa el desarrollo integral de adolescentes y jóvenes mediante el voluntariado y la acción social.",
      acciones: [{ texto: "Conocer más", href: "/quienes-somos" }],
    },
  },
  {
    id: "noticias",
    claves: ["noticia", "novedad", "ultimo", "último"],
    respuesta: {
      texto: "Estas son nuestras últimas novedades 📰",
      acciones: [{ texto: "Ver noticias", href: "/noticias" }],
    },
  },
  {
    id: "clown",
    claves: ["clown", "payaso", "risoterapia", "elo"],
    respuesta: {
      texto:
        "Elo Clown es nuestro programa de clown hospitalario y comunitario: llevamos alegría, empatía y bienestar emocional a distintos espacios. 🤡💙",
      acciones: [{ texto: "Ver Elo Clown", href: "/programas" }],
    },
  },
  {
    id: "contacto",
    claves: ["contact", "correo", "email", "telefono", "teléfono", "celular", "donde", "dónde", "redes"],
    respuesta: {
      texto: "Puedes escribirnos a asociacionfamilylove@gmail.com o por WhatsApp al +51 991 512 267.",
      acciones: [
        { texto: "Escribir por WhatsApp", href: wa("Hola Family Love 👋 Quisiera más información."), externo: true },
        { texto: "Enviar correo", href: "mailto:asociacionfamilylove@gmail.com", externo: true },
      ],
    },
  },
  {
    id: "humano",
    claves: ["persona", "humano", "hablar", "asesor", "whatsapp"],
    respuesta: {
      texto: "¡Claro! Te conecto con nuestro equipo por WhatsApp, te responderemos lo antes posible. 😊",
      acciones: [{ texto: "Abrir WhatsApp", href: wa("Hola Family Love 👋 Quisiera hablar con alguien del equipo."), externo: true }],
    },
  },
  {
    id: "saludo",
    claves: ["hola", "buenas", "buenos", "hey", "saludos"],
    respuesta: { texto: "¡Hola! 😊 ¿En qué te puedo ayudar? Elige una opción o escríbeme tu pregunta." },
  },
  {
    id: "gracias",
    claves: ["gracias", "genial", "perfecto", "ok"],
    respuesta: { texto: "¡Con gusto! 💙 Si necesitas algo más, aquí estoy." },
  },
];

const sinTildes = (t: string) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Busca el tema que mejor coincide con lo que escribió la persona
export function responder(mensaje: string): Respuesta {
  const m = sinTildes(mensaje);
  let mejor: Tema | null = null;
  let puntos = 0;
  for (const t of temas) {
    const p = t.claves.filter((c) => m.includes(sinTildes(c))).length;
    if (p > puntos) {
      mejor = t;
      puntos = p;
    }
  }
  if (mejor) return mejor.respuesta;
  return {
    texto:
      "Mmm, no estoy seguro de haber entendido 🤔. Puedes elegir una de las opciones o hablar directamente con nuestro equipo.",
    acciones: [{ texto: "Hablar por WhatsApp", href: wa(`Hola Family Love 👋 Tengo una consulta: ${mensaje}`), externo: true }],
  };
}

export const respuestaPorId = (id: string) => temas.find((t) => t.id === id)?.respuesta ?? responder(id);
