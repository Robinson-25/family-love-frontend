"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  bgImage: string;
  mounted: boolean;
  urlSegment: string;
}

// Fotos de la portada (se cambian cada 5 segundos con un fundido suave)
const heroImages = [
  "/images/general/familia-voluntarios.webp",
  "/images/general/grupo-ullusca.webp",
  "/images/inicio/inicio-01.jpg",
];

const Slide = ({ mounted, subtitle }: Props) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const aparecer = (delay: string) =>
    `transition-all duration-1000 ease-out ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#1a3a6b]">
      {/* Fotos apiladas: solo la actual es visible (fundido + zoom lento) */}
      {heroImages.map((src, i) => (
        <div
          key={src + i}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === currentImg ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <div
            key={i === currentImg ? `on-${currentImg}` : `off-${i}`}
            className={`absolute inset-0 bg-cover bg-center ${i === currentImg ? "fl-kenburns" : ""}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        </div>
      ))}

      {/* Degradado de la marca para que el texto se lea bien */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/70 via-[#1a3a6b]/35 to-[#1a3a6b]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,25,50,0.45)_100%)]" />

      {/* Texto */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center px-6 text-white">
        <span
          className={`${aparecer("")} inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#73eafe]" />
          Organización sin fines de lucro
        </span>

        <h1
          className={`${aparecer("delay-150")} mt-6 font-display font-extrabold drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]`}
          style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)" }}
        >
          Family <span className="text-[#73eafe]">Love</span>
        </h1>

        <p className={`${aparecer("delay-300")} mt-4 text-base md:text-xl text-white/85 max-w-xl leading-relaxed`}>
          {subtitle}
        </p>

        {/* Indicadores de foto */}
        <div className={`${aparecer("delay-500")} flex gap-2 mt-10`}>
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentImg ? "w-8 bg-[#73eafe]" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Invitación a bajar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/80 fl-bounce-soft" aria-hidden="true">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Slide;
