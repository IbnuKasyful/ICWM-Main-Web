import type { Metadata, Viewport } from "next";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";

import { PitaPratinjau } from "@/components/site/PitaPratinjau";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { getUnitsAktif } from "@/lib/content";
import { jsonldOrganization, jsonldWebsite } from "@/lib/seo";
import { modePratinjau, navFooter, navKepatuhan, site } from "@/lib/site";

import "./globals.css";

/* PRD §12 — font dimuat lewat next/font, tanpa permintaan ke pihak ketiga. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

/* Huruf judul — sumbu lebar (`wdth`) dipakai untuk ragam mampat yang
   sejalan dengan lockup panjang yayasan; lihat panduan identitas §07. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
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
  /* Selama mode pratinjau aktif, situs tidak boleh masuk indeks mesin pencari
     karena isinya masih data contoh — lihat `modePratinjau` di lib/site.ts. */
  robots: modePratinjau
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  /* Biru inti lambang — sewarna kaki halaman (brand-700). */
  themeColor: "#243c70",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const units = getUnitsAktif();

  return (
    /* PRD §14 — bahasa dokumen wajib id. */
    <html lang={site.bahasa} className={`${jakarta.variable} ${archivo.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd data={jsonldOrganization()} />
        <JsonLd data={jsonldWebsite()} />

        {modePratinjau ? <PitaPratinjau /> : null}

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
