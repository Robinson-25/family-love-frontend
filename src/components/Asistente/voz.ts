// ─── VOZ DEL ASISTENTE: escuchar (micrófono) y hablar ───────────────────────
// Usa las funciones de voz del propio navegador (gratis, sin instalar nada).
// Escuchar funciona en Chrome, Edge y Safari; hablar funciona en casi todos.

type Reconocimiento = any;

export function puedeEscuchar() {
  if (typeof window === "undefined") return false;
  return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}

export function puedeHablar() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// Empieza a escuchar. Va mostrando lo que entiende (parcial) y al final devuelve el texto.
export function escuchar(opciones: {
  alParcial: (texto: string) => void;
  alTerminar: (texto: string) => void;
  alError: (mensaje: string) => void;
}): () => void {
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const rec: Reconocimiento = new SR();
  rec.lang = "es-PE";
  rec.interimResults = true;
  rec.continuous = false;
  let final = "";

  rec.onresult = (e: any) => {
    let parcial = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) final += t;
      else parcial += t;
    }
    opciones.alParcial((final + parcial).trim());
  };
  rec.onerror = (e: any) => {
    const msg =
      e.error === "not-allowed" || e.error === "service-not-allowed"
        ? "Necesito permiso para usar el micrófono. Actívalo en el candado de la barra de direcciones."
        : e.error === "no-speech"
        ? "No te escuché bien. Intenta de nuevo, por favor."
        : "No pude usar el micrófono. Intenta de nuevo.";
    opciones.alError(msg);
  };
  rec.onend = () => opciones.alTerminar(final.trim());
  rec.start();
  return () => rec.stop();
}

// Quita enlaces, emojis y símbolos para que la voz suene natural
function limpiarParaVoz(texto: string) {
  return texto
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(new RegExp("[\\u{1F300}-\\u{1FAFF}\\u{2600}-\\u{27BF}]", "gu"), "")
    .replace(/[*_#>`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Elige la mejor voz en español disponible (de Perú/Latinoamérica si existe)
function vozEnEspanol() {
  const voces = window.speechSynthesis.getVoices();
  return (
    voces.find((v) => v.lang === "es-PE") ||
    voces.find((v) => v.lang === "es-US" || v.lang === "es-419" || v.lang === "es-MX") ||
    voces.find((v) => v.lang.startsWith("es"))
  );
}

export function hablar(texto: string, alTerminar?: () => void) {
  if (!puedeHablar()) return;
  const s = window.speechSynthesis;
  s.cancel();
  const u = new SpeechSynthesisUtterance(limpiarParaVoz(texto));
  u.lang = "es-PE";
  const v = vozEnEspanol();
  if (v) u.voice = v;
  u.rate = 1.02;
  u.onend = () => alTerminar?.();
  s.speak(u);
}

export function callar() {
  if (puedeHablar()) window.speechSynthesis.cancel();
}
