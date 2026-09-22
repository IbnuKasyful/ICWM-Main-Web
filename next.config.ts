import type { NextConfig } from "next";

/**
 * Header keamanan, PRD §15.
 * CSP dibiarkan longgar untuk gambar/skrip GA4; perketat saat domain WP final.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Sasaran penempatan produksi adalah cPanel (Node.js App / Passenger), yang
     menjalankan berkas hasil `output: "standalone"`. Cloudflare Workers dipakai
     hanya untuk pratinjau ke pihak yayasan dan dibangun lewat OpenNext, yang
     mengurus pembungkusannya sendiri, karena itu mode ini dinyalakan lewat
     variabel, bukan dipasang permanen. Lihat docs/deploy-cpanel.md. */
  ...(process.env["BUILD_TARGET"] === "cpanel" ? { output: "standalone" as const } : {}),
  // Ada lockfile lain di direktori induk; kunci akar penelusuran ke proyek ini.
  outputFileTracingRoot: process.cwd(),
  images: {
    // PRD §6, next/image dengan remotePatterns ke domain WP.
    remotePatterns: [
      { protocol: "https", hostname: "cms.wadimubarak.com" },
      // Gambar unggulan berita: WordPress yayasan menyimpannya di domain utama.
      { protocol: "https", hostname: "wadimubarak.com", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      /* Pratinjau di *.workers.dev tidak boleh dirayapi mesin pencari. robots.txt
         sudah menolak lewat `modePratinjau`, tapi itu bergantung pada variabel
         lingkungan saat build; header ini mengikat larangannya ke host, jadi
         tetap berlaku walau variabel itu terlupa. Domain produksi tidak kena. */
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.*)\\.workers\\.dev" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
