import type { NextConfig } from "next";

/**
 * Header keamanan — PRD §15.
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
  // Ada lockfile lain di direktori induk; kunci akar penelusuran ke proyek ini.
  outputFileTracingRoot: process.cwd(),
  images: {
    // PRD §6 — next/image dengan remotePatterns ke domain WP.
    remotePatterns: [
      { protocol: "https", hostname: "cms.wadimubarak.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
