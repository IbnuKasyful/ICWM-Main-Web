import type { MetadataRoute } from "next";

import {
  daftarKelompokFaq,
  kelompokFaqBawaan,
  tautanKelompokFaq,
} from "@/components/faq/PanelFaq";
import { getPostsInduk, getProgramDonasi, getUnitsAktif } from "@/lib/content";
import { site } from "@/lib/site";

/** PRD §13 — sitemap dibangkitkan otomatis dari sumber konten. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sekarang = new Date();

  const statis: { path: string; prioritas: number; frekuensi: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", prioritas: 1, frekuensi: "daily" },
    { path: "/program", prioritas: 0.9, frekuensi: "weekly" },
    { path: "/program-quran", prioritas: 0.8, frekuensi: "monthly" },
    { path: "/donasi", prioritas: 0.9, frekuensi: "weekly" },
    { path: "/tentang", prioritas: 0.8, frekuensi: "monthly" },
    { path: "/informasi", prioritas: 0.8, frekuensi: "daily" },
    { path: "/agenda", prioritas: 0.7, frekuensi: "weekly" },
    { path: "/galeri", prioritas: 0.5, frekuensi: "monthly" },
    { path: "/faq", prioritas: 0.7, frekuensi: "monthly" },
    { path: "/kontak", prioritas: 0.7, frekuensi: "yearly" },
    { path: "/kerja-sama", prioritas: 0.6, frekuensi: "monthly" },
    { path: "/karier", prioritas: 0.5, frekuensi: "weekly" },
    { path: "/kebijakan-privasi", prioritas: 0.3, frekuensi: "yearly" },
    { path: "/syarat-ketentuan", prioritas: 0.3, frekuensi: "yearly" },
    { path: "/perlindungan-anak", prioritas: 0.4, frekuensi: "yearly" },
  ];

  const halamanStatis: MetadataRoute.Sitemap = statis.map((s) => ({
    url: `${site.url}${s.path}`,
    lastModified: sekarang,
    changeFrequency: s.frekuensi,
    priority: s.prioritas,
  }));

  const halamanUnit: MetadataRoute.Sitemap = getUnitsAktif().map((u) => ({
    url: `${site.url}/program/${u.slug}`,
    lastModified: sekarang,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const halamanTulisan: MetadataRoute.Sitemap = (await getPostsInduk()).map((p) => ({
    url: `${site.url}/informasi/${p.slug}`,
    lastModified: new Date(p.tanggal),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const halamanDonasi: MetadataRoute.Sitemap = (await getProgramDonasi()).map((d) => ({
    url: `${site.url}/donasi/${d.slug}`,
    lastModified: sekarang,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Kelompok bawaan sudah terwakili oleh `/faq` di daftar statis di atas.
  const halamanFaq: MetadataRoute.Sitemap = daftarKelompokFaq()
    .filter((k) => k.kelompok !== kelompokFaqBawaan)
    .map((k) => ({
      url: `${site.url}${tautanKelompokFaq(k.kelompok)}`,
      lastModified: sekarang,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...halamanStatis, ...halamanUnit, ...halamanTulisan, ...halamanDonasi, ...halamanFaq];
}
