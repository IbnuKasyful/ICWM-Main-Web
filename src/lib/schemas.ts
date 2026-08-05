import { z } from "zod";

/**
 * Skema Zod — PRD §7 (model data) & §18 (setiap respons GraphQL divalidasi
 * sebelum dipakai komponen).
 *
 * Bentuk skema di sini adalah KONTRAK dengan WPGraphQL. Ketika Tahap 0 selesai
 * dan endpoint GraphQL nyata tersedia, hanya `src/lib/content.ts` yang berubah
 * (dari sumber data contoh menjadi `fetch`); skema ini tetap sama.
 */

/* -------------------------------------------------------------------------- */
/* Enum taksonomi (PRD §7.1 & §7.2)                                            */
/* -------------------------------------------------------------------------- */

export const jenjangSchema = z.enum([
  "paud",
  "sd",
  "smp",
  "sma",
  "tinggi",
  "non-formal",
]);

export const genderSchema = z.enum(["putra", "putri", "campur"]);

export const modelBelajarSchema = z.enum(["boarding", "non-boarding", "hybrid"]);

export const statusPpdbSchema = z.enum(["buka", "segera", "tutup"]);

/** Datar, terkunci 7 term (PRD §7.1). */
export const categorySchema = z.enum([
  "berita",
  "pengumuman",
  "artikel",
  "prestasi",
  "kerja-sama",
  "laporan",
  "kegiatan",
]);

export const lokasiSchema = z.enum(["bogor", "sleman"]);

export type Jenjang = z.infer<typeof jenjangSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type ModelBelajar = z.infer<typeof modelBelajarSchema>;
export type StatusPpdb = z.infer<typeof statusPpdbSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Lokasi = z.infer<typeof lokasiSchema>;

/* -------------------------------------------------------------------------- */
/* Primitif bersama                                                            */
/* -------------------------------------------------------------------------- */

export const imageSchema = z.object({
  src: z.string().min(1),
  /** PRD §14 — gambar dekoratif memakai string kosong secara sengaja. */
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export type ImageData = z.infer<typeof imageSchema>;

/* -------------------------------------------------------------------------- */
/* Taksonomi `unit` + term meta (PRD §7.2)                                     */
/* -------------------------------------------------------------------------- */

/**
 * Cabang sebuah unit. Satu unit (mis. TAUD SAQU) dapat memiliki banyak cabang
 * di kota berbeda dengan kurikulum yang sama; `lokasi_kampus` menandai kampus
 * induknya.
 */
export const cabangSchema = z.object({
  slug: z.string().min(1),
  nama: z.string().min(1),
  kota: z.string().min(1),
  alamat: z.string().min(1),
  kontak_wa: z.string(),
  status_ppdb: statusPpdbSchema,
});

export type Cabang = z.infer<typeof cabangSchema>;

export const unitSchema = z.object({
  slug: z.string().min(1),
  nama_lengkap: z.string().min(1),
  nama_pendek: z.string().min(1),
  deskripsi_singkat: z.string().min(1).max(200),
  /** Kosong berarti subdomain belum tayang (Fase 2). */
  url_subdomain: z.string().url().or(z.literal("")),
  logo: imageSchema.nullable(),
  warna_aksen: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  jenjang: jenjangSchema,
  gender: genderSchema,
  model_belajar: modelBelajarSchema,
  lokasi_kampus: lokasiSchema,
  /** Larik kosong berarti unit hanya berjalan di kampus induk. */
  cabang: z.array(cabangSchema),
  status_ppdb: statusPpdbSchema,
  periode_ppdb: z.string(),
  kisaran_biaya: z.string(),
  kontak_wa: z.string(),
  urutan_tampil: z.number().int(),
  aktif: z.boolean(),
});

export type Unit = z.infer<typeof unitSchema>;

/* -------------------------------------------------------------------------- */
/* CPT `unit_profil` (PRD §7.3, §9.3)                                          */
/* -------------------------------------------------------------------------- */

export const unitProfilSchema = z.object({
  slug: z.string().min(1),
  unit: z.string().min(1),
  hero: imageSchema,
  untuk_siapa: z.array(z.string().min(1)).min(1),
  keunggulan: z
    .array(z.object({ judul: z.string().min(1), isi: z.string().min(1) }))
    .min(3)
    .max(5),
  kurikulum: z.array(z.object({ judul: z.string(), isi: z.string() })).min(1),
  fasilitas: z.array(z.string().min(1)).min(1),
  galeri: z.array(imageSchema),
  alur_ppdb: z.array(z.string().min(1)).min(1),
});

export type UnitProfil = z.infer<typeof unitProfilSchema>;

/* -------------------------------------------------------------------------- */
/* Program Al-Qur'an untuk umum                                                */
/* -------------------------------------------------------------------------- */

/**
 * Graha Qur'an dan Wisata Qur'an. Sengaja terpisah dari `unitSchema`: keduanya
 * tidak punya jenjang, gender peserta, maupun status PPDB, sehingga memaksakan
 * bentuk unit hanya akan mengisi separuh field dengan nilai kosong — dan membuat
 * keduanya ikut muncul di penyaring /program.
 */
export const programQuranSchema = z.object({
  slug: z.string().min(1),
  nama: z.string().min(1),
  nama_pendek: z.string().min(1),
  ringkasan: z.string().min(1).max(240),
  penyelenggaraan: z.enum(["daring", "luring"]),
  durasi: z.string().min(1),
  peserta: z.string().min(1),
  biaya: z.string().min(1),
  warna_aksen: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  gambar: imageSchema,
  untuk_siapa: z.array(z.string().min(1)).min(1),
  sorotan: z
    .array(z.object({ judul: z.string().min(1), isi: z.string().min(1) }))
    .min(2)
    .max(5),
  materi: z.array(z.object({ judul: z.string().min(1), isi: z.string().min(1) })).min(1),
  alur_daftar: z.array(z.string().min(1)).min(1),
  kontak_wa: z.string().min(1),
  /** `null` berarti program belum punya kanal Instagram sendiri. */
  instagram: z.string().url().nullable(),
});

export type ProgramQuran = z.infer<typeof programQuranSchema>;

/* -------------------------------------------------------------------------- */
/* `post` (PRD §7.4)                                                           */
/* -------------------------------------------------------------------------- */

export const postSchema = z.object({
  slug: z.string().min(1),
  judul: z.string().min(1),
  /** Teks kartu, maks 200 karakter — wajib. */
  ringkasan: z.string().min(1).max(200),
  /** ISO 8601. */
  tanggal: z.string().min(1),
  category: categorySchema,
  /** Menentukan URL kanonik — wajib. */
  unit_utama: z.string().min(1),
  unit: z.array(z.string().min(1)).min(1),
  lokasi: lokasiSchema,
  topik: z.array(z.string()),
  gambar: imageSchema,
  penulis: z.string().min(1),
  /** Menentukan apakah tulisan naik ke situs induk. */
  tampilkan_di_induk: z.boolean(),
  /** HTML dari editor WordPress. */
  konten: z.string().min(1),
});

export type Post = z.infer<typeof postSchema>;

/* -------------------------------------------------------------------------- */
/* CPT lainnya (PRD §7.3)                                                      */
/* -------------------------------------------------------------------------- */

export const programDonasiSchema = z.object({
  slug: z.string().min(1),
  judul: z.string().min(1),
  ringkasan: z.string().min(1).max(200),
  jenis: z.enum(["zakat", "infak", "sedekah", "wakaf"]),
  gambar: imageSchema,
  /** Rupiah. `target` 0 berarti program berjalan tanpa target tertutup. */
  target: z.number().int().nonnegative(),
  terkumpul: z.number().int().nonnegative(),
  penerima_manfaat: z.string().min(1),
  batas_waktu: z.string().nullable(),
  konten: z.string().min(1),
  mendesak: z.boolean(),
});

export const laporanSchema = z.object({
  slug: z.string().min(1),
  judul: z.string().min(1),
  tahun: z.number().int(),
  jenis: z.enum(["keuangan", "program", "dampak"]),
  /** Ukuran berkas siap tampil, mis. "1,4 MB" (PRD §9.5). */
  ukuran: z.string().min(1),
  format: z.string().min(1),
  url: z.string().min(1),
  ringkasan: z.string(),
});

export const faqSchema = z.object({
  slug: z.string().min(1),
  pertanyaan: z.string().min(1),
  jawaban: z.string().min(1),
  kelompok: z.enum(["pendaftaran", "biaya", "kehidupan-santri", "donasi", "umum"]),
  urutan: z.number().int(),
});

export const testimoniSchema = z.object({
  slug: z.string().min(1),
  nama: z.string().min(1),
  peran: z.string().min(1),
  unit: z.string().min(1),
  kutipan: z.string().min(1),
  foto: imageSchema.nullable(),
});

export const agendaSchema = z.object({
  slug: z.string().min(1),
  judul: z.string().min(1),
  /** ISO 8601. */
  mulai: z.string().min(1),
  selesai: z.string().nullable(),
  tempat: z.string().min(1),
  lokasi: lokasiSchema,
  unit: z.array(z.string().min(1)).min(1),
  ringkasan: z.string().min(1).max(200),
  terbuka_umum: z.boolean(),
});

export const mitraSchema = z.object({
  slug: z.string().min(1),
  nama: z.string().min(1),
  jenis: z.enum(["pendidikan", "pemerintah", "korporasi", "lembaga-sosial"]),
  logo: imageSchema.nullable(),
  keterangan: z.string().min(1),
  sejak: z.number().int(),
});

export type ProgramDonasi = z.infer<typeof programDonasiSchema>;
export type Laporan = z.infer<typeof laporanSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type Testimoni = z.infer<typeof testimoniSchema>;
export type Agenda = z.infer<typeof agendaSchema>;
export type Mitra = z.infer<typeof mitraSchema>;

/* -------------------------------------------------------------------------- */
/* Blok konten halaman statis                                                  */
/* -------------------------------------------------------------------------- */

export const capaianSchema = z.object({
  label: z.string().min(1),
  nilai: z.number().int().nonnegative(),
  satuan: z.string(),
  keterangan: z.string(),
});

export const rekeningSchema = z.object({
  jenis: z.enum(["zakat", "infak", "sedekah", "wakaf"]),
  bank: z.string().min(1),
  nomor: z.string().min(1),
  atas_nama: z.string().min(1),
});

export type Capaian = z.infer<typeof capaianSchema>;
export type Rekening = z.infer<typeof rekeningSchema>;

/* -------------------------------------------------------------------------- */
/* Pembantu validasi                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Memvalidasi respons di batas API. Kegagalan sengaja dilempar: data yang tidak
 * sesuai kontrak tidak boleh diam-diam masuk ke komponen (PRD §6, §18).
 */
export function parseOrThrow<T>(schema: z.ZodType<T>, data: unknown, sumber: string): T {
  const hasil = schema.safeParse(data);
  if (!hasil.success) {
    throw new Error(
      `Validasi data gagal untuk "${sumber}": ${JSON.stringify(hasil.error.issues, null, 2)}`,
    );
  }
  return hasil.data;
}
