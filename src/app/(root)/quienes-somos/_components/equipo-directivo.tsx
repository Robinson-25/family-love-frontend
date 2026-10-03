"use client";
// ─── SECCIÓN "NUESTRO EQUIPO DIRECTIVO" (Quiénes Somos) ─────────────────────
// Aquí está la tarjeta que gira (FlipCard) y la sección completa.
// Las personas se agregan, editan y ordenan desde el panel de administración
// (Equipo Directivo); esta sección solo las muestra.
import Image from "next/image";
import { useState } from "react";
import type { Persona } from "./equipo-datos";

// ─── COMPONENTE FLIP CARD ──────────────────────────────────────────────────────
function FlipCard({ persona }: { persona: Persona }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
      title="Clic para ver biografía"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRENTE ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl flex flex-col items-center overflow-hidden"
        >
          {/* Foto mitad de cuerpo — ocupa ~65% de la tarjeta */}
          <div className="w-full flex-1 relative overflow-hidden" style={{ minHeight: 0 }}>
            <Image
              src={persona.imagen}
              alt={persona.nombre}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            />
            {/* overlay sutil abajo */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f2a5a]/80 to-transparent" />
          </div>

          {/* Nombre y cargo */}
          <div className="w-full px-5 py-4 text-center bg-[#0f2a5a]/60 backdrop-blur-sm">
            <h3 className="text-white font-bold text-base leading-tight mb-1">{persona.nombre}</h3>
            <p className="text-[#73eafe] text-xs font-semibold leading-snug uppercase">{persona.cargo}</p>
            <p className="text-white/40 text-xs mt-2">👆 Clic para ver bio</p>
          </div>
        </div>

        {/* ── REVERSO (BIOGRAFÍA) ── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-gradient-to-br from-[#73eafe]/20 to-[#1a3a6b] border border-[#73eafe]/30 rounded-3xl flex flex-col items-center justify-between p-6 overflow-y-auto"
        >
          {/* Avatar pequeño arriba */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#73eafe]/60 shadow-lg flex-shrink-0 relative">
            <Image
              src={persona.imagen}
              alt={persona.nombre}
              fill
              className="object-cover object-top"
              sizes="80px"
            />
          </div>

          <div className="text-center flex-1 flex flex-col justify-center mt-3">
            <h3 className="text-white font-bold text-lg leading-tight mb-1">{persona.nombre}</h3>
            <p className="text-[#73eafe] text-xs font-bold tracking-wide mb-4 uppercase">{persona.cargo}</p>
            <p className="text-white/85 text-sm leading-relaxed">{persona.bio}</p>
          </div>

          <p className="text-white/40 text-xs mt-2">👆 Clic para volver</p>
        </div>
      </div>
    </div>
  );
}

// ─── SECCIÓN COMPLETA ─────────────────────────────────────────────────────────
export default function EquipoDirectivo({ equipo }: { equipo: Persona[] }) {
  return (
    <section id="equipo" className="bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-[#73eafe] font-semibold text-sm tracking-widest uppercase">
          Las personas detrás
        </span>
        <h2 className="text-4xl font-extrabold text-white mt-2 mb-4">
          Nuestro Equipo Directivo
        </h2>
        <p className="text-white/60 text-sm mb-12">Haz clic en cualquier foto para conocer su historia</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {equipo.map((persona, i) => (
            <FlipCard key={persona.id ?? i} persona={persona} />
          ))}
        </div>

        {/* Frase final */}
        <div className="mt-14 border-t border-white/20 pt-10">
          <p className="text-2xl font-light text-white/90 italic max-w-xl mx-auto leading-relaxed">
            El liderazgo nace del servicio y del compromiso con los demás
          </p>
        </div>
      </div>
    </section>
  );
}
