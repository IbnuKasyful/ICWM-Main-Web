import { z } from "zod";

import { programDonasiMentah, rekeningMentah } from "@/data/donasi";
import { postsMentah } from "@/data/posts";
import { unitProfilMentah, unitsMentah } from "@/data/units";
import {
  agendaMentah,
  capaianMentah,
  faqMentah,
  galeriMentah,
  laporanMentah,
  legalitasMentah,
  mitraMentah,
  pengurusMentah,
  testimoniMentah,
} from "@/data/yayasan";
import {
  agendaSchema,
  capaianSchema,
  faqSchema,
  imageSchema,
  laporanSchema,
  legalitasSchema,
  mitraSchema,
  parseOrThrow,
  pengurusSchema,
  postSchema,
  programDonasiSchema,
  rekeningSchema,
  testimoniSchema,
  unitProfilSchema,
  unitSchema,
  type Agenda,
  type Category,
  type Faq,
  type Lokasi,
  type Post,
  type Unit,
} from "@/lib/schemas";

/**
 * Batas API (PRD §18): satu-satunya tempat data mentah masuk ke aplikasi, dan
 * satu-satunya tempat validasi Zod dijalankan.
 *
 * Saat Tahap 0 selesai, isi fungsi-fungsi di bawah diganti dengan kueri
 * WPGraphQL. Tanda tangan fungsi dan skema tidak berubah, sehingga tak satu pun
 * komponen perlu disentuh.
 */

function daftar<T>(schema: z.ZodType<T>, data: unknown[], sumber: string): readonly T[] {
  return Object.freeze(data.map((item, i) => parseOrThrow(schema, item, `${sumber}[${i}]`)));
}

/* -------------------------------------------------------------------------- */
/* Unit                                                                        */
/* -------------------------------------------------------------------------- */

const units = daftar(unitSchema, unitsMentah, "unit");
const unitProfil = daftar(unitProfilSchema, unitProfilMentah, "unit_profil");

export function getUnits(): readonly Unit[] {
  return units;
}

/** PRD §9.2 — pencari program hanya menampilkan unit `aktif = true`. */
export function getUnitsAktif(): readonly Unit[] {
  return units
    .filter((u) => u.aktif)
    .slice()
    .sort((a, b) => a.urutan_tampil - b.urutan_tampil);
}

export function getUnit(slug: string): Unit | undefined {
  return units.find((u) => u.slug === slug);
}

export function getUnitProfil(slug: string) {
  return unitProfil.find((p) => p.slug === slug);
}

/** Peta slug → nama pendek, untuk melabeli kartu dan penyaring. */
export function getPetaNamaUnit(): ReadonlyMap<string, string> {
  return new Map(units.map((u) => [u.slug, u.nama_pendek]));
}

/* -------------------------------------------------------------------------- */
/* Post                                                                        */
/* -------------------------------------------------------------------------- */

const posts = daftar(postSchema, postsMentah, "post");

function terbaruDahulu(a: Post, b: Post): number {
  return b.tanggal.localeCompare(a.tanggal);
}

/**
 * PRD §9.1 & §9.6 — situs induk HANYA menampilkan tulisan yang dikurasi naik.
 * Semua jalur baca publik wajib melewati fungsi ini.
 */
export function getPostsInduk(): readonly Post[] {
  return posts
    .filter((p) => p.tampilkan_di_induk)
    .slice()
    .sort(terbaruDahulu);
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && p.tampilkan_di_induk);
}

/** Slug untuk `generateStaticParams` — hanya yang tayang di induk. */
export function getSlugPostInduk(): string[] {
  return getPostsInduk().map((p) => p.slug);
}

export type FilterInformasi = {
  category?: Category | undefined;
  unit?: string | undefined;
  lokasi?: Lokasi | undefined;
  tahun?: number | undefined;
};

export function saringPosts(filter: FilterInformasi): readonly Post[] {
  return getPostsInduk().filter((p) => {
    if (filter.category && p.category !== filter.category) return false;
    if (filter.unit && !p.unit.includes(filter.unit)) return false;
    if (filter.lokasi && p.lokasi !== filter.lokasi) return false;
    if (filter.tahun && Number(p.tanggal.slice(0, 4)) !== filter.tahun) return false;
    return true;
  });
}

/** Tahun yang benar-benar punya tulisan — untuk mengisi penyaring. */
export function getTahunPost(): number[] {
  const tahun = new Set(getPostsInduk().map((p) => Number(p.tanggal.slice(0, 4))));
  return [...tahun].sort((a, b) => b - a);
}

/** PRD §9.3 — 3 berita terkait pada halaman profil unit. */
export function getPostsUnit(unitSlug: string, batas: number): readonly Post[] {
  return getPostsInduk()
    .filter((p) => p.unit.includes(unitSlug))
    .slice(0, batas);
}

/* -------------------------------------------------------------------------- */
/* Yayasan                                                                     */
/* -------------------------------------------------------------------------- */

const pengurus = daftar(pengurusSchema, pengurusMentah, "pengurus");
const capaian = daftar(capaianSchema, capaianMentah, "capaian");
const legalitas = daftar(legalitasSchema, legalitasMentah, "legalitas");
const laporan = daftar(laporanSchema, laporanMentah, "laporan");
const mitra = daftar(mitraSchema, mitraMentah, "mitra");
const testimoni = daftar(testimoniSchema, testimoniMentah, "testimoni");
const agenda = daftar(agendaSchema, agendaMentah, "agenda");
const faq = daftar(faqSchema, faqMentah, "faq");
const galeri = daftar(imageSchema, galeriMentah, "galeri");

export function getPengurus() {
  return pengurus.slice().sort((a, b) => a.urutan - b.urutan);
}

export function getCapaian() {
  return capaian;
}

export function getLegalitas() {
  return legalitas;
}

/** PRD §9.5 — dikelompokkan per tahun, terbaru dahulu. */
export function getLaporan() {
  return laporan.slice().sort((a, b) => b.tahun - a.tahun || a.judul.localeCompare(b.judul));
}

export function getTahunLaporan(): number[] {
  return [...new Set(laporan.map((l) => l.tahun))].sort((a, b) => b - a);
}

export function getMitra() {
  return mitra;
}

export function getTestimoni() {
  return testimoni;
}

export function getFaq(): readonly Faq[] {
  return faq.slice().sort((a, b) => a.urutan - b.urutan);
}

export function getGaleri() {
  return galeri;
}

/**
 * PRD §9.1 — blok agenda di beranda disembunyikan bila kosong, jadi fungsi ini
 * memang boleh mengembalikan array kosong.
 */
export function getAgendaMendatang(batas?: number): readonly Agenda[] {
  const sekarang = Date.now();
  const mendatang = agenda
    .filter((a) => new Date(a.selesai ?? a.mulai).getTime() >= sekarang)
    .slice()
    .sort((a, b) => a.mulai.localeCompare(b.mulai));
  return typeof batas === "number" ? mendatang.slice(0, batas) : mendatang;
}

export function getAgendaLampau(): readonly Agenda[] {
  const sekarang = Date.now();
  return agenda
    .filter((a) => new Date(a.selesai ?? a.mulai).getTime() < sekarang)
    .slice()
    .sort((a, b) => b.mulai.localeCompare(a.mulai));
}

/* -------------------------------------------------------------------------- */
/* Donasi                                                                      */
/* -------------------------------------------------------------------------- */

const programDonasi = daftar(programDonasiSchema, programDonasiMentah, "program_donasi");
const rekening = daftar(rekeningSchema, rekeningMentah, "rekening");

export function getProgramDonasi() {
  return programDonasi
    .slice()
    .sort((a, b) => Number(b.mendesak) - Number(a.mendesak) || a.judul.localeCompare(b.judul));
}

export function getProgramDonasiSlug(slug: string) {
  return programDonasi.find((p) => p.slug === slug);
}

export function getRekening() {
  return rekening;
}

/* -------------------------------------------------------------------------- */
/* Pencarian (PRD §8 — /cari)                                                  */
/* -------------------------------------------------------------------------- */

export type HasilCari = {
  judul: string;
  ringkasan: string;
  href: string;
  jenis: "Tulisan" | "Unit" | "Program donasi" | "Agenda" | "Pertanyaan umum";
};

export function cari(kueri: string): HasilCari[] {
  const q = kueri.trim().toLowerCase();
  if (q.length < 2) return [];

  const cocok = (...bagian: string[]) => bagian.some((b) => b.toLowerCase().includes(q));
  const hasil: HasilCari[] = [];

  for (const u of getUnitsAktif()) {
    if (cocok(u.nama_lengkap, u.nama_pendek, u.deskripsi_singkat)) {
      hasil.push({
        judul: u.nama_lengkap,
        ringkasan: u.deskripsi_singkat,
        href: `/program/${u.slug}`,
        jenis: "Unit",
      });
    }
  }

  for (const p of getPostsInduk()) {
    if (cocok(p.judul, p.ringkasan, p.topik.join(" "))) {
      hasil.push({
        judul: p.judul,
        ringkasan: p.ringkasan,
        href: `/informasi/${p.slug}`,
        jenis: "Tulisan",
      });
    }
  }

  for (const d of getProgramDonasi()) {
    if (cocok(d.judul, d.ringkasan)) {
      hasil.push({
        judul: d.judul,
        ringkasan: d.ringkasan,
        href: `/donasi/${d.slug}`,
        jenis: "Program donasi",
      });
    }
  }

  for (const a of getAgendaMendatang()) {
    if (cocok(a.judul, a.ringkasan, a.tempat)) {
      hasil.push({
        judul: a.judul,
        ringkasan: a.ringkasan,
        href: "/agenda",
        jenis: "Agenda",
      });
    }
  }

  for (const f of getFaq()) {
    if (cocok(f.pertanyaan, f.jawaban)) {
      hasil.push({
        judul: f.pertanyaan,
        ringkasan: f.jawaban.slice(0, 160),
        href: "/faq",
        jenis: "Pertanyaan umum",
      });
    }
  }

  return hasil;
}
