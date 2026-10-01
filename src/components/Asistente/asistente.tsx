"use client";
// ─── ASISTENTE FAMILY LOVE ──────────────────────────────────────────────────
// - Con IA: pregunta al backend (POST /asistente), que conoce toda la página.
// - Sin IA configurada o sin internet: usa las respuestas automáticas de respuestas.ts.
// - Voz: botón de micrófono para hablar y respuestas leídas en voz alta.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, SendHorizontal, Mic, Square, Volume2, VolumeX } from "lucide-react";
import { API_URL } from "@/lib/api";
import { opcionesIniciales, respuestaPorId, responder, type Accion } from "./respuestas";
import { escuchar, hablar, callar, puedeEscuchar, puedeHablar } from "./voz";

type Mensaje = { de: "bot" | "yo"; texto: string; acciones?: Accion[] };

// Separa los enlaces [texto](ruta) que manda la IA y los convierte en botones
function separarEnlaces(texto: string): { texto: string; acciones: Accion[] } {
  const acciones: Accion[] = [];
  const limpio = texto
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t: string, href: string) => {
      acciones.push({ texto: t, href, externo: /^https?:|^mailto:/.test(href) });
      return "";
    })
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
  return { texto: limpio, acciones };
}

// Carita del asistente (robot con audífonos, colores de la marca)
function Avatar({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="2" y="17" width="7" height="15" rx="3.5" fill="#0271bd" />
      <rect x="39" y="17" width="7" height="15" rx="3.5" fill="#0271bd" />
      <circle cx="24" cy="25" r="17" fill="#ffffff" />
      <circle cx="24" cy="25" r="17" fill="none" stroke="#73eafe" strokeWidth="2" />
      <rect x="11" y="18" width="26" height="17" rx="8.5" fill="#1a3a6b" />
      <path d="M17 26 q2.5 3 5 0" stroke="#73eafe" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M26 26 q2.5 3 5 0" stroke="#73eafe" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="6" r="3" fill="#73eafe" />
      <path d="M24 9 v3" stroke="#73eafe" strokeWidth="2" />
      <path d="M33 10 a3 3 0 0 1 5 0 l-2.5 3 z" fill="#e63946" />
    </svg>
  );
}

const saludo: Mensaje = {
  de: "bot",
  texto:
    "¡Hola! Soy el asistente de Family Love 💙 Pregúntame lo que quieras sobre nuestros proyectos, voluntariado, donaciones o el equipo. También puedes hablarme con el micrófono 🎤",
};

export default function Asistente() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([saludo]);
  const [texto, setTexto] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const [mostrarOpciones, setMostrarOpciones] = useState(true);
  const [escuchando, setEscuchando] = useState(false);
  const [vozActiva, setVozActiva] = useState(false); // leer respuestas en voz alta
  const [hablandoBot, setHablandoBot] = useState(false);
  const [aviso, setAviso] = useState("");
  const [conVoz, setConVoz] = useState({ escuchar: false, hablar: false });
  const finRef = useRef<HTMLDivElement>(null);
  const detenerRef = useRef<(() => void) | null>(null);
  const mensajesRef = useRef(mensajes);
  mensajesRef.current = mensajes;

  useEffect(() => {
    setConVoz({ escuchar: puedeEscuchar(), hablar: puedeHablar() });
    // algunas computadoras cargan las voces un poco después
    if (puedeHablar()) window.speechSynthesis.getVoices();
    return () => callar();
  }, []);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, escribiendo, abierto, texto]);

  useEffect(() => {
    if (!abierto) {
      callar();
      detenerRef.current?.();
    }
  }, [abierto]);

  const decir = (t: string, forzar = false) => {
    if (!conVoz.hablar || (!vozActiva && !forzar)) return;
    setHablandoBot(true);
    hablar(t, () => setHablandoBot(false));
  };

  // Pide la respuesta a la IA; si no está disponible, usa las automáticas
  const obtenerRespuesta = async (pregunta: string, id?: string): Promise<Mensaje> => {
    if (id) {
      const r = respuestaPorId(id);
      return { de: "bot", texto: r.texto, acciones: r.acciones };
    }
    try {
      const historial = [...mensajesRef.current.slice(1), { de: "yo" as const, texto: pregunta }]
        .slice(-10)
        .map((m) => ({ rol: m.de === "yo" ? "usuario" : "asistente", texto: m.texto.slice(0, 1000) }));
      const res = await fetch(`${API_URL}/asistente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensajes: historial }),
      });
      const data = await res.json();
      if (res.ok && data.modo === "ia" && data.texto) {
        const { texto: t, acciones } = separarEnlaces(data.texto);
        return { de: "bot", texto: t, acciones };
      }
      if (res.status === 429 && data.error) return { de: "bot", texto: data.error };
    } catch {
      /* sin conexión: usamos las respuestas automáticas */
    }
    const r = responder(pregunta);
    return { de: "bot", texto: r.texto, acciones: r.acciones };
  };

  const contestar = async (pregunta: string, id?: string, porVoz = false) => {
    callar();
    setAviso("");
    setMostrarOpciones(false);
    setMensajes((m) => [...m, { de: "yo", texto: pregunta }]);
    setEscribiendo(true);
    const inicio = Date.now();
    const respuesta = await obtenerRespuesta(pregunta, id);
    const espera = Math.max(0, 600 - (Date.now() - inicio)); // pequeña pausa natural
    setTimeout(() => {
      setEscribiendo(false);
      setMensajes((m) => [...m, respuesta]);
      setMostrarOpciones(true);
      decir(respuesta.texto, porVoz); // si preguntó con voz, responde con voz
    }, espera);
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const t = texto.trim();
    if (!t || escribiendo) return;
    setTexto("");
    contestar(t);
  };

  const microfono = () => {
    if (escuchando) {
      detenerRef.current?.();
      return;
    }
    callar();
    setHablandoBot(false);
    setAviso("");
    setEscuchando(true);
    setTexto("");
    detenerRef.current = escuchar({
      alParcial: (t) => setTexto(t),
      alError: (msg) => setAviso(msg),
      alTerminar: (t) => {
        setEscuchando(false);
        detenerRef.current = null;
        if (t) {
          setTexto("");
          contestar(t, undefined, true);
        }
      },
    });
  };

  const alternarVoz = () => {
    if (vozActiva) {
      callar();
      setHablandoBot(false);
    }
    setVozActiva((v) => !v);
  };

  return (
    <div className="fixed right-4 sm:right-6 bottom-24 z-[60] flex flex-col items-end">
      {/* ── Ventana de chat ── */}
      <div
        className={`mb-3 w-[calc(100vw-2rem)] sm:w-[380px] flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-20px_rgba(26,58,107,0.55)] border border-zinc-100 origin-bottom-right transition-all duration-300 ${
          abierto ? "h-[min(580px,calc(100vh-180px))] opacity-100 scale-100" : "h-0 opacity-0 scale-90 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Asistente Family Love"
      >
        {/* Cabecera */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#1a3a6b] to-[#0271bd] text-white">
          <span className={`relative w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 ${hablandoBot ? "ring-4 ring-[#73eafe]/60 animate-pulse" : ""}`}>
            <Avatar size={38} />
          </span>
          <div className="leading-tight">
            <p className="font-display font-bold">Asistente Family Love</p>
            <p className="text-xs text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
              {hablandoBot ? "Hablando…" : escuchando ? "Escuchándote…" : "En línea"}
            </p>
          </div>
          {conVoz.hablar && (
            <button
              onClick={alternarVoz}
              aria-label={vozActiva ? "Desactivar voz" : "Activar voz"}
              title={vozActiva ? "Voz activada: leo mis respuestas" : "Activar voz: leo mis respuestas en voz alta"}
              className={`ml-auto w-9 h-9 rounded-full flex items-center justify-center transition-colors ${vozActiva ? "bg-[#73eafe] text-[#1a3a6b]" : "hover:bg-white/15"}`}
            >
              {vozActiva ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          )}
          <button onClick={() => setAbierto(false)} aria-label="Cerrar" className={`${conVoz.hablar ? "" : "ml-auto"} w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gradient-to-b from-[#f2fbfe] to-white">
          {mensajes.map((m, i) =>
            m.de === "bot" ? (
              <div key={i} className="flex gap-2 items-end">
                <span className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center shrink-0">
                  <Avatar size={26} />
                </span>
                <div className="max-w-[82%]">
                  <div className="group relative rounded-2xl rounded-bl-md bg-white border border-[#73eafe]/40 px-4 py-2.5 text-sm text-zinc-700 leading-relaxed shadow-sm whitespace-pre-line">
                    {m.texto}
                    {conVoz.hablar && (
                      <button
                        type="button"
                        onClick={() => {
                          setHablandoBot(true);
                          hablar(m.texto, () => setHablandoBot(false));
                        }}
                        aria-label="Escuchar este mensaje"
                        className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-white border border-[#73eafe]/60 text-[#0271bd] shadow flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {m.acciones && m.acciones.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.acciones.map((a) =>
                        a.externo ? (
                          <a key={a.texto + a.href} href={a.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0271bd] hover:bg-[#1a3a6b] text-white text-xs font-bold px-4 py-2 transition-colors">
                            {a.texto} ↗
                          </a>
                        ) : (
                          <Link key={a.texto + a.href} href={a.href} onClick={() => setAbierto(false)} className="rounded-full bg-[#0271bd] hover:bg-[#1a3a6b] text-white text-xs font-bold px-4 py-2 transition-colors">
                            {a.texto} →
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[#1a3a6b] text-white px-4 py-2.5 text-sm leading-relaxed">{m.texto}</p>
              </div>
            )
          )}

          {escribiendo && (
            <div className="flex gap-2 items-end">
              <span className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center shrink-0">
                <Avatar size={26} />
              </span>
              <span className="rounded-2xl rounded-bl-md bg-white border border-[#73eafe]/40 px-4 py-3 flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-2 h-2 rounded-full bg-[#0271bd]/60 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </span>
            </div>
          )}

          {mostrarOpciones && !escribiendo && (
            <div className="pl-10 flex flex-wrap gap-2">
              {opcionesIniciales.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => contestar(o.texto, o.id)}
                  className="rounded-full border border-[#0271bd]/30 bg-white text-[#1a3a6b] text-xs font-bold px-3.5 py-2 hover:border-[#0271bd] hover:bg-[#0271bd]/5 transition-colors"
                >
                  {o.texto}
                </button>
              ))}
            </div>
          )}
          <div ref={finRef} />
        </div>

        {/* Caja de texto + micrófono */}
        <form onSubmit={enviar} className="border-t border-zinc-100 p-3">
          {aviso && <p className="mb-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs px-3 py-2">{aviso}</p>}
          <div
            className={`flex items-center gap-1.5 rounded-full border bg-white pl-4 pr-1.5 py-1.5 transition-shadow ${
              escuchando ? "border-red-300 ring-4 ring-red-100" : "border-[#73eafe] focus-within:ring-4 focus-within:ring-[#73eafe]/25"
            }`}
          >
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder={escuchando ? "Te escucho… habla ahora" : "Escribe o habla tu pregunta…"}
              maxLength={1000}
              readOnly={escuchando}
              className="flex-1 min-w-0 bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
            />
            {conVoz.escuchar && (
              <button
                type="button"
                onClick={microfono}
                aria-label={escuchando ? "Dejar de escuchar" : "Hablar con el micrófono"}
                className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  escuchando ? "bg-red-500 text-white" : "bg-[#eaf6fd] text-[#0271bd] hover:bg-[#d5eefb]"
                }`}
              >
                {escuchando && <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-60" />}
                {escuchando ? <Square className="relative w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}
            <button
              type="submit"
              disabled={escribiendo || escuchando}
              aria-label="Enviar"
              className="w-9 h-9 rounded-full bg-[#0271bd] hover:bg-[#1a3a6b] text-white flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-zinc-400">
            Asistente virtual · puede equivocarse · <b className="text-[#0271bd]">Family Love</b>
          </p>
        </form>
      </div>

      {/* ── Botón flotante ── */}
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente"}
        className="group flex items-center gap-2 rounded-full bg-white pl-1.5 pr-1.5 sm:pr-5 py-1.5 shadow-[0_15px_35px_-12px_rgba(26,58,107,0.5)] ring-1 ring-[#73eafe]/50 hover:-translate-y-0.5 transition-transform"
      >
        <span className="w-12 h-12 rounded-full bg-[#eaf6fd] flex items-center justify-center">
          {abierto ? <X className="w-6 h-6 text-[#1a3a6b]" /> : <Avatar size={42} />}
        </span>
        <span className="hidden sm:block font-display font-bold text-[#1a3a6b] whitespace-nowrap">Asistente Family Love</span>
      </button>
    </div>
  );
}
