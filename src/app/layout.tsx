import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { getUnitsAktif } from "@/lib/content";
import { jsonldOrganization, jsonldWebsite } from "@/lib/seo";
import { navFooter, navKepatuhan, site } from "@/lib/site";

import "./globals.css";

/* PRD §12 — font dimuat lewat next/font, tanpa permintaan ke pihak ketiga. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nama} — ${site.tagline}`,
    template: `%s · ${site.namaPendek}`,
  },
  description: site.deskripsi,
  applicationName: site.nama,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.nama,
    locale: "id_ID",
    url: site.url,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1f6349",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const units = getUnitsAktif();

  return (
    /* PRD §14 — bahasa dokumen wajib id. */
    <html lang={site.bahasa} className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd data={jsonldOrganization()} />
        <JsonLd data={jsonldWebsite()} />

        {/* PRD §14 — tautan "lewati ke konten". */}
        <a
          href="#konten"
          className="sr-only rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
        >
          Lewati ke konten utama
        </a>

        <SiteHeader units={units} />

        <main id="konten" className="flex-1">
          {children}
        </main>

        <SiteFooter
          nama={site.nama}
          namaPendek={site.namaPendek}
          deskripsi={site.deskripsi}
          alamat={site.alamat}
          kontak={site.kontak}
          lazis={site.lazis}
          sosial={site.sosial}
          grup={navFooter}
          kepatuhan={navKepatuhan}
          units={units}
          watermark="WADI MUBARAK"
        />
      </body>
    </html>
  );
}
