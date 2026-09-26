// ============================================================
// Family Love — Organiza la carpeta public por secciones
//
// Uso (dentro de la carpeta family-love-frontend):
//     node organizar-public.js
//
// Qué hace:
//   1. Mueve cada imagen/video de public/images/hero-images y
//      public/images/videos a una carpeta según su sección.
//   2. Actualiza las rutas dentro del código (src/).
//   3. Crea "actualizar-rutas-bd.sql" para corregir las rutas
//      guardadas en la base de datos (proyectos y noticias).
//
// Es seguro ejecutarlo más de una vez: lo que ya se movió, se salta.
// ============================================================
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const SRC = path.join(ROOT, "src");

// [ruta antigua, ruta nueva]
const MAPA = [
  [
    "/images/hero-images/logo-family-love.png",
    "/logo/logo-family-love.png"
  ],
  [
    "/images/hero-images/2 foto family-9.webp",
    "/images/general/familia-voluntarios.webp"
  ],
  [
    "/images/hero-images/family love ullusca footo-67.webp",
    "/images/general/grupo-ullusca.webp"
  ],
  [
    "/images/hero-images/h2.webp",
    "/images/general/voluntarios-h2.webp"
  ],
  [
    "/images/hero-images/inicio01.jpg",
    "/images/inicio/inicio-01.jpg"
  ],
  [
    "/images/hero-images/inicio02.jpg",
    "/images/inicio/inicio-02.jpg"
  ],
  [
    "/images/hero-images/Programa01.jpg",
    "/images/programas/programa-01.jpg"
  ],
  [
    "/images/hero-images/programa02.jpg",
    "/images/programas/programa-02.jpg"
  ],
  [
    "/images/hero-images/Abigail.png",
    "/images/quienes-somos/equipo/abigail.png"
  ],
  [
    "/images/hero-images/Brayhan.png",
    "/images/quienes-somos/equipo/brayhan.png"
  ],
  [
    "/images/hero-images/Cristhel.png",
    "/images/quienes-somos/equipo/cristhel.png"
  ],
  [
    "/images/hero-images/Darlyne.jpg",
    "/images/quienes-somos/equipo/darlyne.jpg"
  ],
  [
    "/images/hero-images/Evans.png",
    "/images/quienes-somos/equipo/evans.png"
  ],
  [
    "/images/hero-images/Ibeth.png",
    "/images/quienes-somos/equipo/ibeth.png"
  ],
  [
    "/images/hero-images/Jhan Toro.png",
    "/images/quienes-somos/equipo/jhan-toro.png"
  ],
  [
    "/images/hero-images/Marely.png",
    "/images/quienes-somos/equipo/marely.png"
  ],
  [
    "/images/hero-images/Maria.png",
    "/images/quienes-somos/equipo/maria.png"
  ],
  [
    "/images/hero-images/Nayruth.png",
    "/images/quienes-somos/equipo/nayruth.png"
  ],
  [
    "/images/hero-images/Sheyla.png",
    "/images/quienes-somos/equipo/sheyla.png"
  ],
  [
    "/images/hero-images/esau.png",
    "/images/quienes-somos/equipo/esau.png"
  ],
  [
    "/images/hero-images/mafer.png",
    "/images/quienes-somos/equipo/mafer.png"
  ],
  [
    "/images/hero-images/robinson.png",
    "/images/quienes-somos/equipo/robinson.png"
  ],
  [
    "/images/hero-images/tania.png",
    "/images/quienes-somos/equipo/tania.png"
  ],
  [
    "/images/hero-images/xiomara.png",
    "/images/quienes-somos/equipo/xiomara.png"
  ],
  [
    "/images/hero-images/imagen2.jpg",
    "/images/proyectos/2024-regalando-sonrisas-huancayo/foto-01.jpg"
  ],
  [
    "/images/hero-images/ullusca navidad-2024-1.jpg",
    "/images/proyectos/2024-navidad-ullusca/foto-01.jpg"
  ],
  [
    "/images/hero-images/ullusca navidad-2024-2.jpg",
    "/images/proyectos/2024-navidad-ullusca/foto-02.jpg"
  ],
  [
    "/images/hero-images/ullusca navidad-2024-3.jpg",
    "/images/proyectos/2024-navidad-ullusca/foto-03.jpg"
  ],
  [
    "/images/hero-images/ullusca navidad-2024-4.jpg",
    "/images/proyectos/2024-navidad-ullusca/foto-04.jpg"
  ],
  [
    "/images/hero-images/renovacion.jpeg",
    "/images/proyectos/2024-renovando-estilo-y-sonrisa/foto-01.jpeg"
  ],
  [
    "/images/hero-images/renovacion.webp",
    "/images/proyectos/2024-renovando-estilo-y-sonrisa/foto-02.webp"
  ],
  [
    "/images/hero-images/renovacion1.webp",
    "/images/proyectos/2024-renovando-estilo-y-sonrisa/foto-03.webp"
  ],
  [
    "/images/hero-images/ONP-1.jpg",
    "/images/proyectos/2024-risoterapia-onp/foto-01.jpg"
  ],
  [
    "/images/hero-images/ONP-2.jpg",
    "/images/proyectos/2024-risoterapia-onp/foto-02.jpg"
  ],
  [
    "/images/hero-images/ONP-3.jpg",
    "/images/proyectos/2024-risoterapia-onp/foto-03.jpg"
  ],
  [
    "/images/hero-images/ONP-4.jpg",
    "/images/proyectos/2024-risoterapia-onp/foto-04.jpg"
  ],
  [
    "/images/hero-images/ONP-5.jpg",
    "/images/proyectos/2024-risoterapia-onp/foto-05.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa01.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-01.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa02.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-02.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa03.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-03.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa04.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-04.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa05.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-05.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa06.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-06.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa07.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-07.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa08.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-08.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa09.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-09.jpg"
  ],
  [
    "/images/hero-images/Repartiendosonrisa10.jpg",
    "/images/proyectos/2025-repartiendo-sonrisas-car/foto-10.jpg"
  ],
  [
    "/images/hero-images/voces q inspiran.jpg",
    "/images/proyectos/2025-voces-que-inspiran/foto-01.jpg"
  ],
  [
    "/images/hero-images/cam.jpg",
    "/images/proyectos/2025-museo-de-recuerdos-cam/foto-01.jpg"
  ],
  [
    "/images/hero-images/cam1.jpg",
    "/images/proyectos/2025-museo-de-recuerdos-cam/foto-02.jpg"
  ],
  [
    "/images/hero-images/cam2.jpg",
    "/images/proyectos/2025-museo-de-recuerdos-cam/foto-03.jpg"
  ],
  [
    "/images/hero-images/cam3.jpg",
    "/images/proyectos/2025-museo-de-recuerdos-cam/foto-04.jpg"
  ],
  [
    "/images/hero-images/taller.webp",
    "/images/proyectos/2025-risoterapia-zapallang/foto-01.webp"
  ],
  [
    "/images/hero-images/aniversario.jpg",
    "/images/proyectos/2025-primer-aniversario/foto-01.jpg"
  ],
  [
    "/images/hero-images/aniversario1.jpg",
    "/images/proyectos/2025-primer-aniversario/foto-02.jpg"
  ],
  [
    "/images/hero-images/aniversario2.jpg",
    "/images/proyectos/2025-primer-aniversario/foto-03.jpg"
  ],
  [
    "/images/hero-images/aniversario3.jpg",
    "/images/proyectos/2025-primer-aniversario/foto-04.jpg"
  ],
  [
    "/images/hero-images/solidaridad-jauja.jpg",
    "/images/proyectos/2025-manos-que-acompanan-jauja/foto-01.jpg"
  ],
  [
    "/images/hero-images/solidaridad-jauja1.jpg",
    "/images/proyectos/2025-manos-que-acompanan-jauja/foto-02.jpg"
  ],
  [
    "/images/hero-images/solidaridad-jauja2.jpg",
    "/images/proyectos/2025-manos-que-acompanan-jauja/foto-03.jpg"
  ],
  [
    "/images/hero-images/solidaridad-jauja3.jpg",
    "/images/proyectos/2025-manos-que-acompanan-jauja/foto-04.jpg"
  ],
  [
    "/images/hero-images/solidaridad-jauja4.jpg",
    "/images/proyectos/2025-manos-que-acompanan-jauja/foto-05.jpg"
  ],
  [
    "/images/hero-images/solidaridad-jauja5.jpg",
    "/images/proyectos/2025-manos-que-acompanan-jauja/foto-06.jpg"
  ],
  [
    "/images/hero-images/1er-navidad-2025.jpg",
    "/images/proyectos/2025-primera-navidad-apata/foto-01.jpg"
  ],
  [
    "/images/hero-images/1er-navidad-2025-1.jpg",
    "/images/proyectos/2025-primera-navidad-apata/foto-02.jpg"
  ],
  [
    "/images/hero-images/1er-navidad-2025-2.jpg",
    "/images/proyectos/2025-primera-navidad-apata/foto-03.jpg"
  ],
  [
    "/images/hero-images/1er-navidad-2025-3.jpg",
    "/images/proyectos/2025-primera-navidad-apata/foto-04.jpg"
  ],
  [
    "/images/hero-images/1er-navidad-2025-4.jpg",
    "/images/proyectos/2025-primera-navidad-apata/foto-05.jpg"
  ],
  [
    "/images/hero-images/1er-navidad-2025-5.jpg",
    "/images/proyectos/2025-primera-navidad-apata/foto-06.jpg"
  ],
  [
    "/images/hero-images/2-navidad-2025.jpg",
    "/images/proyectos/2025-segunda-navidad-huancayo/foto-01.jpg"
  ],
  [
    "/images/hero-images/2-navidad-2025-2.jpg",
    "/images/proyectos/2025-segunda-navidad-huancayo/foto-02.jpg"
  ],
  [
    "/images/hero-images/2-navidad-2025-3.jpg",
    "/images/proyectos/2025-segunda-navidad-huancayo/foto-03.jpg"
  ],
  [
    "/images/hero-images/2-navidad-2025-4.jpg",
    "/images/proyectos/2025-segunda-navidad-huancayo/foto-04.jpg"
  ],
  [
    "/images/hero-images/2-navidad-2025-5.jpg",
    "/images/proyectos/2025-segunda-navidad-huancayo/foto-05.jpg"
  ],
  [
    "/images/hero-images/2-navidad-2025-6.jpg",
    "/images/proyectos/2025-segunda-navidad-huancayo/foto-06.jpg"
  ],
  [
    "/images/hero-images/2-navidad-2025-7.jpg",
    "/images/proyectos/2025-segunda-navidad-huancayo/foto-07.jpg"
  ],
  [
    "/images/videos/video-ullusca navidad-2024-1.mp4",
    "/videos/proyectos/2024-navidad-ullusca/video-01.mp4"
  ],
  [
    "/images/videos/Repartiendosonrisa01.mp4",
    "/videos/proyectos/2025-repartiendo-sonrisas-car/video-01.mp4"
  ],
  [
    "/images/videos/1er-navidad-2025 video-2.mp4",
    "/videos/proyectos/2025-primera-navidad-apata/video-01.mp4"
  ],
  [
    "/images/videos/1er-navidad-2025 video-1.mp4",
    "/videos/proyectos/2025-segunda-navidad-huancayo/video-01.mp4"
  ],
  [
    "/images/hero-images/9.jpg",
    "/images/sin-usar/9.jpg"
  ],
  [
    "/images/hero-images/U1.webp",
    "/images/sin-usar/u1.webp"
  ],
  [
    "/images/hero-images/U2.webp",
    "/images/sin-usar/u2.webp"
  ],
  [
    "/images/hero-images/U3.webp",
    "/images/sin-usar/u3.webp"
  ],
  [
    "/images/hero-images/U7.webp",
    "/images/sin-usar/u7.webp"
  ],
  [
    "/images/hero-images/plaza-jauja-noche.jpg",
    "/images/sin-usar/plaza-jauja-noche.jpg"
  ]
];

if (!fs.existsSync(PUBLIC) || !fs.existsSync(SRC)) {
  console.error("❌ Ejecuta este comando dentro de la carpeta family-love-frontend (debe tener public/ y src/).");
  process.exit(1);
}

// 1) Mover archivos
let movidos = 0, yaEstaban = 0, faltan = [];
for (const [viejo, nuevo] of MAPA) {
  const origen = path.join(PUBLIC, viejo);
  const destino = path.join(PUBLIC, nuevo);
  if (fs.existsSync(destino)) { yaEstaban++; continue; }
  if (!fs.existsSync(origen)) { faltan.push(viejo); continue; }
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.renameSync(origen, destino);
  movidos++;
}

// Carpetas de secciones que por ahora no tienen imágenes locales
// (.gitkeep sirve para que Git suba la carpeta aunque esté vacía)
for (const dir of ["images/noticias", "images/voluntariado"]) {
  const d = path.join(PUBLIC, dir);
  fs.mkdirSync(d, { recursive: true });
  const keep = path.join(d, ".gitkeep");
  if (!fs.existsSync(keep)) fs.writeFileSync(keep, "");
}

// Borra carpetas antiguas si quedaron vacías
for (const dir of ["images/hero-images", "images/videos"]) {
  const d = path.join(PUBLIC, dir);
  if (fs.existsSync(d) && fs.readdirSync(d).length === 0) fs.rmdirSync(d);
}

// 2) Actualizar rutas en el código
const ordenado = [...MAPA].sort((a, b) => b[0].length - a[0].length);
let archivosCambiados = 0;
function recorrer(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) recorrer(p);
    else if (/\.(tsx?|jsx?|css|json)$/.test(e.name)) {
      const antes = fs.readFileSync(p, "utf8");
      let despues = antes;
      for (const [viejo, nuevo] of ordenado) despues = despues.split(viejo).join(nuevo);
      if (despues !== antes) { fs.writeFileSync(p, despues, "utf8"); archivosCambiados++; }
    }
  }
}
recorrer(SRC);

// 3) SQL para la base de datos
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/'/g, "''");
let sql = "-- Actualiza las rutas de imágenes y videos guardadas en la base de datos.\n" +
          "-- Ejecútalo UNA vez en tu base de datos (phpMyAdmin / Adminer de Clever Cloud).\n" +
          "SET NAMES utf8mb4;\n\n";
for (const [viejo, nuevo] of ordenado) {
  const v = esc(viejo), n = esc(nuevo);
  sql += `UPDATE proyecto SET imagen = REPLACE(imagen, '${v}', '${n}'), fotos = REPLACE(fotos, '${v}', '${n}'), video = REPLACE(video, '${v}', '${n}');\n`;
  sql += `UPDATE noticia SET imagen = REPLACE(imagen, '${v}', '${n}'), video = REPLACE(video, '${v}', '${n}');\n`;
}
fs.writeFileSync(path.join(ROOT, "actualizar-rutas-bd.sql"), sql, "utf8");

console.log("");
console.log("✅ Listo");
console.log("   Archivos movidos:           " + movidos);
console.log("   Ya estaban en su lugar:     " + yaEstaban);
console.log("   Archivos de código editados: " + archivosCambiados);
console.log("   SQL creado:                 actualizar-rutas-bd.sql");
if (faltan.length) {
  console.log("\n⚠️  No se encontraron " + faltan.length + " archivos (quizá no copiaste toda la carpeta public):");
  faltan.forEach((f) => console.log("   - public" + f));
}
console.log("\nSiguiente paso: ejecuta actualizar-rutas-bd.sql en tu base de datos y reinicia con: npm run dev\n");
