import { z } from "zod";

import { programDonasiMentah, rekeningMentah } from "@/data/donasi";
import { postsMentah } from "@/data/posts";
import { programQuranMentah } from "@/data/program-quran";
import { unitProfilMentah, unitsMentah } from "@/data/units";
import {
  agendaMentah,
  capaianMentah,
  faqMentah,
  galeriMentah,
  mitraMentah,
  testimoniMentah,
} from "@/data/yayasan";
import {
  agendaSchema,
  capaianSchema,
  faqSchema,
  galeriItemSchema,
  mitraSchema,
  parseOrThrow,
  postSchema,
  programDonasiSchema,
  programQuranSchema,
  rekeningSchema,
  testimoniSchema,
  unitProfilSchema,
  unitSchema,
  type Agenda,
  type Category,
  type Faq,
  type ImageData,
  type Post,
  type ProgramDonasi,
  type ProgramQuran,
  type Unit,
} from "@/lib/schemas";
import { ambilPostsWp, beritaWpAktif } from "@/lib/wp-berita";
import { ambilProgramDonasiWp, wpAktif } from "@/lib/wp";

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

/** PRD §9.2, pencari program hanya menampilkan unit `aktif = true`. */
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

/**
 * Peta slug → hero `unit_profil`, sebagai gambar kartu di pencari program.
 * Objek biasa, bukan `Map`, sebab nilainya menyeberang ke komponen klien.
 * Unit tanpa profil sekadar tidak punya kunci di sini.
 */
export function getPetaHeroUnit(): Record<string, ImageData> {
  return Object.fromEntries(unitProfil.map((p) => [p.unit, p.hero]));
}

/* -------------------------------------------------------------------------- */
/* Program Al-Qur'an untuk umum                                                */
/* -------------------------------------------------------------------------- */

const programQuran = daftar(programQuranSchema, programQuranMentah, "program_quran");

export function getProgramQuran(): readonly ProgramQuran[] {
  return programQuran;
}

/* -------------------------------------------------------------------------- */
/* Post                                                                        */
/* -------------------------------------------------------------------------- */

const postsStatis = daftar(postSchema, postsMentah, "post");

function terbaruDahulu(a: Post, b: Post): number {
  return b.tanggal.localeCompare(a.tanggal);
}

/**
 * Tulisan dari WordPress, divalidasi dengan skema yang sama seperti data
 * statis. Tulisan yang tidak lolos validasi dibuang satu per satu, bukan
 * menggagalkan seluruh halaman: satu tulisan cacat di CMS tidak boleh
 * menjatuhkan /informasi.
 */
function validasiLunak(mentah: unknown[]): Post[] {
  const hasil: Post[] = [];
  for (const item of mentah) {
    const uji = postSchema.safeParse(item);
    if (uji.success) hasil.push(uji.data);
    else {
      const slug = (item as { slug?: unknown })?.slug;
      console.error(`[content] tulisan WordPress dilewati (${String(slug)}): ${uji.error.message}`);
    }
  }
  return hasil;
}

/**
 * Satu pengambilan per permintaan render, dipakai ulang oleh seluruh fungsi
 * `getPost*` di bawah. `fetch` di dalamnya sudah di-cache Next.js selama satu
 * jam dan disegarkan lewat tag, jadi ini hanya mencegah beberapa fungsi pada
 * satu halaman memanggil WordPress berkali-kali.
 */
async function muatPosts(): Promise<readonly Post[]> {
  if (!beritaWpAktif()) return postsStatis;

  const mentah = await ambilPostsWp();
  if (!mentah) return postsStatis;

  const dariWp = validasiLunak(mentah);
  return dariWp.length > 0 ? Object.freeze(dariWp) : postsStatis;
}

/**
 * PRD §9.1 & §9.6, situs induk HANYA menampilkan tulisan yang dikurasi naik.
 * Semua jalur baca publik wajib melewati fungsi ini.
 */
export async function getPostsInduk(): Promise<readonly Post[]> {
  const semua = await muatPosts();
  return semua
    .filter((p) => p.tampilkan_di_induk)
    .slice()
    .sort(terbaruDahulu);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const semua = await muatPosts();
  return semua.find((p) => p.slug === slug && p.tampilkan_di_induk);
}

/** Slug untuk `generateStaticParams`, hanya yang tayang di induk. */
export async function getSlugPostInduk(): Promise<string[]> {
  return (await getPostsInduk()).map((p) => p.slug);
}

export type FilterInformasi = {
  category?: Category | undefined;
  unit?: string | undefined;
  tahun?: number | undefined;
};

export async function saringPosts(filter: FilterInformasi): Promise<readonly Post[]> {
  return (await getPostsInduk()).filter((p) => {
    if (filter.category && p.category !== filter.category) return false;
    if (filter.unit && !p.unit.includes(filter.unit)) return false;
    if (filter.tahun && Number(p.tanggal.slice(0, 4)) !== filter.tahun) return false;
    return true;
  });
}

/** Tahun yang benar-benar punya tulisan, untuk mengisi penyaring. */
export async function getTahunPost(): Promise<number[]> {
  const tahun = new Set((await getPostsInduk()).map((p) => Number(p.tanggal.slice(0, 4))));
  return [...tahun].sort((a, b) => b - a);
}

/** PRD §9.3, 3 berita terkait pada halaman profil unit. */
export async function getPostsUnit(unitSlug: string, batas: number): Promise<readonly Post[]> {
  return (await getPostsInduk())
    .filter((p) => p.unit.includes(unitSlug))
    .slice(0, batas);
}

/* -------------------------------------------------------------------------- */
/* Yayasan                                                                     */
/* -------------------------------------------------------------------------- */

const capaian = daftar(capaianSchema, capaianMentah, "capaian");
const mitra = daftar(mitraSchema, mitraMentah, "mitra");
const testimoni = daftar(testimoniSchema, testimoniMentah, "testimoni");
const agenda = daftar(agendaSchema, agendaMentah, "agenda");
const faq = daftar(faqSchema, faqMentah, "faq");
const galeri = daftar(galeriItemSchema, galeriMentah, "galeri");

export function getCapaian() {
  return capaian;
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
 * PRD §9.1, blok agenda di beranda disembunyikan bila kosong, jadi fungsi ini
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

export function getAgenda(slug: string): Agenda | undefined {
  return agenda.find((a) => a.slug === slug);
}

export function getSemuaAgenda(): readonly Agenda[] {
  return agenda;
}

/** Selesai = waktu selesai (atau mulai, bila tanpa selesai) sudah lewat. */
export function agendaSudahLewat(a: Agenda): boolean {
  return new Date(a.selesai ?? a.mulai).getTime() < Date.now();
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

/**
 * Angka rekapitulasi yang ikut build, dipakai selama `WPGRAPHQL_ENDPOINT`
 * belum diisi (mis. pratinjau di Cloudflare) dan sebagai jaring bila WordPress
 * sedang tidak dapat dihubungi.
 */
const programDonasiStatis = daftar(programDonasiSchema, programDonasiMentah, "program_donasi");
const rekening = daftar(rekeningSchema, rekeningMentah, "rekening");

/**
 * Sumber tunggal program donasi: WordPress bila tersambung, data statis bila
 * tidak. Validasi Zod dijalankan pada kedua jalur dengan skema yang sama.
 *
 * Hasil `fetch`-nya di-cache Next.js, jadi memanggil fungsi ini beberapa kali
 * dalam satu render tidak menambah kueri ke WordPress.
 */
async function muatProgramDonasi(): Promise<readonly ProgramDonasi[]> {
  if (!wpAktif()) return programDonasiStatis;

  const mentah = await ambilProgramDonasiWp();
  if (!mentah) return programDonasiStatis;

  // Kebun kosong bukan alasan mengosongkan halaman: kalau CMS baru dipasang dan
  // belum ada satu pun program terbit, angka lama masih lebih berguna.
  if (mentah.length === 0) return programDonasiStatis;

  try {
    return daftar(programDonasiSchema, mentah, "program_donasi(wp)");
  } catch (galat) {
    // Satu program cacat di CMS tidak boleh menjatuhkan halaman donasi. Pesannya
    // menyebut indeks dan field yang salah supaya admin bisa diberi tahu.
    console.error(`[donasi] data CMS ditolak skema, memakai data statis: ${String(galat)}`);
    return programDonasiStatis;
  }
}

export async function getProgramDonasi(): Promise<readonly ProgramDonasi[]> {
  const program = await muatProgramDonasi();
  return program
    .slice()
    .sort((a, b) => Number(b.mendesak) - Number(a.mendesak) || a.judul.localeCompare(b.judul));
}

export async function getProgramDonasiSlug(slug: string): Promise<ProgramDonasi | undefined> {
  return (await muatProgramDonasi()).find((p) => p.slug === slug);
}

export function getRekening() {
  return rekening;
}
