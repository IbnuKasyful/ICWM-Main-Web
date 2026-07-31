/**
 * Membangkitkan gambar contoh (SVG) untuk fase front-end.
 *
 * Gambar nyata akan datang dari WordPress lewat `next/image` + `remotePatterns`
 * (PRD §6). Sampai Tahap 0 selesai, berkas di `public/img/` ini menjadi
 * penggantinya supaya build tidak bergantung pada jaringan dan setiap gambar
 * tetap punya width/height eksplisit (PRD §12).
 *
 * Jalankan: node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "img");
mkdirSync(outDir, { recursive: true });

/** Palet mengikuti token di globals.css. */
const palettes = {
  hijau: ["#0f3126", "#1f6349", "#4e9c77"],
  hijauTua: ["#081c16", "#143f30", "#2e7d5b"],
  emas: ["#5c3b1b", "#a9701a", "#e0a93f"],
  pasir: ["#6d451c", "#d0b78f", "#f6f0e6"],
  teduh: ["#143f30", "#2e7d5b", "#e2d0b5"],
  fajar: ["#5c3b1b", "#ce8f22", "#f9edd0"],
};

/** Bintang delapan (motif geometri islami) sebagai pola berulang. */
function pattern(id, stroke, opacity) {
  return `
  <pattern id="${id}" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
    <g fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1.5">
      <path d="M60 6 L79 27 L108 27 L108 56 L129 75 L108 94 L108 123 L79 123 L60 144 L41 123 L12 123 L12 94 L-9 75 L12 56 L12 27 L41 27 Z" transform="translate(0,-15) scale(0.82) translate(13,13)"/>
      <rect x="30" y="30" width="60" height="60" transform="rotate(45 60 60)"/>
      <rect x="30" y="30" width="60" height="60"/>
      <circle cx="60" cy="60" r="10"/>
      <circle cx="0" cy="0" r="6"/>
      <circle cx="120" cy="0" r="6"/>
      <circle cx="0" cy="120" r="6"/>
      <circle cx="120" cy="120" r="6"/>
    </g>
  </pattern>`;
}

function svg({ w, h, palette, seed = 0, label = "" }) {
  const [gelap, sedang, terang] = palettes[palette] ?? palettes.hijau;
  const a = 20 + ((seed * 37) % 60);
  const b = 30 + ((seed * 53) % 50);
  const teks = label
    ? `<text x="${w / 2}" y="${h - 44}" text-anchor="middle"
        font-family="Georgia, serif" font-size="${Math.round(w / 34)}"
        fill="${terang}" fill-opacity="0.55" letter-spacing="2">${label}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${gelap}"/>
      <stop offset="55%" stop-color="${sedang}"/>
      <stop offset="100%" stop-color="${gelap}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${a}%" cy="${b}%" r="70%">
      <stop offset="0%" stop-color="${terang}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${terang}" stop-opacity="0"/>
    </radialGradient>
    ${pattern("p", terang, 0.22)}
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#p)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <g fill="none" stroke="${terang}" stroke-opacity="0.5" stroke-width="2">
    <path d="M${w * 0.5} ${h * 0.32}
             a ${w * 0.13} ${w * 0.13} 0 1 1 ${w * 0.001} 0 Z"/>
  </g>
  <rect width="${w}" height="${h}" fill="url(#fade)"/>
  ${teks}
</svg>`;
}

/** Daftar berkas yang dipakai `src/data/*`. */
const berkas = [
  { nama: "hero-utama", w: 1600, h: 1200, palette: "hijauTua", label: "Wadi Mubarak" },
  { nama: "hero-donasi", w: 1600, h: 900, palette: "emas", label: "LAZIS Wadi Mubarak" },
  { nama: "hero-tentang", w: 1600, h: 900, palette: "teduh", label: "Yayasan" },
  { nama: "hero-dampak", w: 1600, h: 900, palette: "fajar", label: "Dampak" },
  { nama: "hero-kerja-sama", w: 1600, h: 900, palette: "hijau", label: "Kerja Sama" },
  { nama: "sekilas", w: 1200, h: 1000, palette: "teduh", label: "" },
  { nama: "kampus-bogor", w: 1200, h: 900, palette: "hijau", label: "Kampus Bogor" },
  { nama: "kampus-sleman", w: 1200, h: 900, palette: "pasir", label: "Kampus Sleman" },
];

/** Unit — hero profil + logo. */
const units = [
  "taud-saqu",
  "sdit-wadi-mubarak",
  "smp-tahfizh-putra",
  "smp-tahfizh-putri",
  "sma-tahfizh-putra",
  "sma-tahfizh-putri",
  "mbs-wadi-mubarak",
  "stiu-wadi-mubarak",
  "pkm-wadi-mubarak",
];

units.forEach((slug, i) => {
  berkas.push({
    nama: `unit-${slug}`,
    w: 1600,
    h: 1000,
    palette: Object.keys(palettes)[i % 6],
    seed: i + 3,
    label: "",
  });
});

/** Tulisan — 12 gambar kartu. */
for (let i = 1; i <= 12; i += 1) {
  berkas.push({
    nama: `post-${i}`,
    w: 1200,
    h: 800,
    palette: Object.keys(palettes)[i % 6],
    seed: i * 7,
    label: "",
  });
}

/** Program donasi. */
for (let i = 1; i <= 5; i += 1) {
  berkas.push({
    nama: `donasi-${i}`,
    w: 1200,
    h: 800,
    palette: i % 2 === 0 ? "emas" : "fajar",
    seed: i * 11,
    label: "",
  });
}

/** Galeri. */
for (let i = 1; i <= 12; i += 1) {
  berkas.push({
    nama: `galeri-${i}`,
    w: 1200,
    h: i % 3 === 0 ? 1500 : 900,
    palette: Object.keys(palettes)[(i + 2) % 6],
    seed: i * 13,
    label: "",
  });
}

/** Potret pengurus & testimoni. */
for (let i = 1; i <= 10; i += 1) {
  berkas.push({
    nama: `orang-${i}`,
    w: 800,
    h: 800,
    palette: i % 2 === 0 ? "teduh" : "pasir",
    seed: i * 17,
    label: "",
  });
}

for (const b of berkas) {
  writeFileSync(join(outDir, `${b.nama}.svg`), svg(b), "utf8");
}

console.log(`${berkas.length} gambar contoh ditulis ke public/img/`);
