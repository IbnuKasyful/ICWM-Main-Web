import type { Metadata } from "next";

import { site } from "@/lib/site";
import type { Agenda, Post, ProgramDonasi, Unit } from "@/lib/schemas";

/** PRD §13, metadata per halaman lewat Metadata API, tanpa kecuali. */
export function buatMetadata({
  judul,
  deskripsi,
  path,
  gambar,
  jenis = "website",
  terbit,
  penulis,
  noIndex = false,
}: {
  judul: string;
  deskripsi: string;
  path: string;
  gambar?: string | undefined;
  jenis?: "website" | "article";
  terbit?: string | undefined;
  penulis?: string | undefined;
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  const gambarOg = gambar ? `${site.url}${gambar}` : `${site.url}/img/hero-utama.svg`;

  return {
    title: judul,
    description: deskripsi,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: judul,
      description: deskripsi,
      url,
      siteName: site.nama,
      locale: "id_ID",
      type: jenis,
      images: [{ url: gambarOg }],
      ...(terbit ? { publishedTime: terbit } : {}),
      ...(penulis ? { authors: [penulis] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: judul,
      description: deskripsi,
      images: [gambarOg],
    },
  };
}

/* -------------------------------------------------------------------------- */
/* JSON-LD (PRD §13)                                                           */
/* -------------------------------------------------------------------------- */

type Jsonld = Record<string, unknown>;

const alamatPos: Jsonld = {
  "@type": "PostalAddress",
  streetAddress: site.alamat.jalan,
  addressLocality: site.alamat.kota,
  addressRegion: site.alamat.provinsi,
  postalCode: site.alamat.kodePos,
  addressCountry: "ID",
};

export function jsonldOrganization(): Jsonld {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.nama,
    alternateName: site.namaPendek,
    url: site.url,
    description: site.deskripsi,
    logo: `${site.url}/img/hero-utama.svg`,
    foundingDate: String(site.tahunBerdiri),
    address: alamatPos,
    email: site.kontak.email,
    telephone: site.kontak.telepon,
    sameAs: site.sosial.map((s) => s.href),
  };
}

export function jsonldWebsite(): Jsonld {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: site.url,
    name: site.nama,
    inLanguage: "id-ID",
  };
}

export function jsonldEducationalOrganization(unit: Unit): Jsonld {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: unit.nama_lengkap,
    alternateName: unit.nama_pendek,
    description: unit.deskripsi_singkat,
    url: `${site.url}/program/${unit.slug}`,
    ...(unit.url_subdomain ? { sameAs: [unit.url_subdomain] } : {}),
    address: alamatPos,
    parentOrganization: { "@id": `${site.url}/#organization` },
    telephone: `+${unit.kontak_wa}`,
  };
}

export function jsonldNgo(): Jsonld {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.lazis.nama,
    parentOrganization: { "@id": `${site.url}/#organization` },
    url: `${site.url}/donasi`,
    description:
      "Lembaga amil zakat, infak, sedekah, dan wakaf Islamic Center Wadi Mubarak.",
    address: alamatPos,
    email: site.kontak.email,
    telephone: site.kontak.telepon,
  };
}

export function jsonldArticle(post: Post): Jsonld {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.judul,
    description: post.ringkasan,
    datePublished: post.tanggal,
    dateModified: post.tanggal,
    inLanguage: "id-ID",
    image: `${site.url}${post.gambar.src}`,
    author: { "@type": "Organization", name: post.penulis },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/informasi/${post.slug}`,
  };
}

const wilayahLokasi: Record<Agenda["lokasi"], { kota: string; provinsi: string }> = {
  bogor: { kota: "Bogor", provinsi: "Jawa Barat" },
  sleman: { kota: "Sleman", provinsi: "DI Yogyakarta" },
};

export function jsonldEvent(agenda: Agenda): Jsonld {
  const wilayah = wilayahLokasi[agenda.lokasi];
  // Kegiatan beberapa hari tanpa jam pasti ditulis sebagai tanggal saja,
  // supaya mesin pencari tidak menampilkan jam 00:00.
  const multiHari = agenda.selesai !== null && agenda.mulai.slice(0, 10) !== agenda.selesai.slice(0, 10);
  const waktu = (iso: string) => (multiHari ? iso.slice(0, 10) : iso);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: agenda.judul,
    description: agenda.ringkasan,
    startDate: waktu(agenda.mulai),
    ...(agenda.selesai ? { endDate: waktu(agenda.selesai) } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: agenda.tempat,
      address: {
        "@type": "PostalAddress",
        addressLocality: wilayah.kota,
        addressRegion: wilayah.provinsi,
        addressCountry: "ID",
      },
    },
    ...(agenda.poster ? { image: `${site.url}${agenda.poster.src}` } : {}),
    organizer: agenda.penyelenggara
      ? { "@type": "Organization", name: agenda.penyelenggara, url: site.url }
      : { "@id": `${site.url}/#organization` },
    url: `${site.url}/agenda/${agenda.slug}`,
    inLanguage: "id-ID",
  };
}

export function jsonldDonateAction(program: ProgramDonasi): Jsonld {
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: program.judul,
    description: program.ringkasan,
    recipient: { "@type": "NGO", name: site.lazis.nama },
    url: `${site.url}/donasi/${program.slug}`,
  };
}

export function jsonldBreadcrumb(jejak: { label: string; href: string }[]): Jsonld {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: jejak.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function jsonldFaq(daftar: readonly { pertanyaan: string; jawaban: string }[]): Jsonld {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: daftar.map((f) => ({
      "@type": "Question",
      name: f.pertanyaan,
      acceptedAnswer: { "@type": "Answer", text: f.jawaban },
    })),
  };
}
