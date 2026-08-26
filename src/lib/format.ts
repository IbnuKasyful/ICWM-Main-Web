import type {
  Category,
  GaleriKategori,
  Gender,
  Jenjang,
  Lokasi,
  ModelBelajar,
  StatusPpdb,
} from "@/lib/schemas";

/* -------------------------------------------------------------------------- */
/* Label enum → teks yang dibaca pengunjung                                    */
/* -------------------------------------------------------------------------- */

export const labelJenjang: Record<Jenjang, string> = {
  paud: "PAUD / TK",
  sd: "SD / MI",
  smp: "SMP / MTs",
  sma: "SMA / MA",
  tinggi: "Perguruan tinggi",
  "non-formal": "Non-formal",
};

export const labelGender: Record<Gender, string> = {
  putra: "Putra",
  putri: "Putri",
  campur: "Putra & putri",
};

export const labelModel: Record<ModelBelajar, string> = {
  boarding: "Asrama",
  "non-boarding": "Pulang-pergi",
  hybrid: "Luring & daring",
};

export const labelLokasi: Record<Lokasi, string> = {
  bogor: "Bogor",
  sleman: "Sleman",
};

export const labelStatusPpdb: Record<StatusPpdb, string> = {
  buka: "Pendaftaran dibuka",
  segera: "Segera dibuka",
  tutup: "Pendaftaran ditutup",
};

export const labelGaleriKategori: Record<GaleriKategori, string> = {
  wisuda: "Wisuda",
  dauroh: "Dauroh & kajian",
  halaqah: "Halaqah",
  anak: "Anak usia dini",
  kampus: "Kehidupan kampus",
};

export const labelCategory: Record<Category, string> = {
  berita: "Berita",
  pengumuman: "Pengumuman",
  artikel: "Artikel",
  prestasi: "Prestasi",
  "kerja-sama": "Kerja sama",
  laporan: "Laporan",
  kegiatan: "Kegiatan",
};

export const labelJenisDonasi = {
  zakat: "Zakat",
  infak: "Infak",
  sedekah: "Sedekah",
  wakaf: "Wakaf",
} as const;

export const labelJenisMitra = {
  pendidikan: "Pendidikan",
  pemerintah: "Pemerintah",
  korporasi: "Korporasi",
  "lembaga-sosial": "Lembaga sosial",
} as const;

export const labelKelompokFaq = {
  pendaftaran: "Pendaftaran",
  biaya: "Biaya & beasiswa",
  "kehidupan-santri": "Kehidupan santri",
  donasi: "Donasi",
  umum: "Umum",
} as const;

/* -------------------------------------------------------------------------- */
/* Format angka & tanggal (id-ID)                                              */
/* -------------------------------------------------------------------------- */

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const formatAngka = new Intl.NumberFormat("id-ID");

export function rupiah(nilai: number): string {
  return formatRupiah.format(nilai);
}

/** Ringkas untuk kartu: Rp 1,8 M / Rp 240 jt. */
export function rupiahRingkas(nilai: number): string {
  if (nilai >= 1_000_000_000) {
    return `Rp ${formatAngka.format(Number((nilai / 1_000_000_000).toFixed(1)))} M`;
  }
  if (nilai >= 1_000_000) {
    return `Rp ${formatAngka.format(Math.round(nilai / 1_000_000))} jt`;
  }
  return rupiah(nilai);
}

export function angka(nilai: number): string {
  return formatAngka.format(nilai);
}

const formatTanggal = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const formatTanggalPendek = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const formatJam = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

const formatHari = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  timeZone: "Asia/Jakarta",
});

export function tanggal(iso: string): string {
  return formatTanggal.format(new Date(iso));
}

export function tanggalPendek(iso: string): string {
  return formatTanggalPendek.format(new Date(iso));
}

export function hari(iso: string): string {
  return formatHari.format(new Date(iso));
}

export function jam(iso: string): string {
  return `${formatJam.format(new Date(iso)).replace(".", ":")} WIB`;
}

/** "9 Agustus 2026 · 07:00 – 15:00 WIB" */
export function rentangWaktu(mulai: string, selesai: string | null): string {
  const awal = `${tanggal(mulai)} · ${formatJam.format(new Date(mulai)).replace(".", ":")}`;
  if (!selesai) return `${awal} WIB`;
  const sehari = mulai.slice(0, 10) === selesai.slice(0, 10);
  if (sehari) {
    return `${awal} – ${formatJam.format(new Date(selesai)).replace(".", ":")} WIB`;
  }
  return `${tanggal(mulai)} – ${tanggal(selesai)}`;
}

export function persen(terkumpul: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((terkumpul / target) * 100));
}

/**
 * Tautan WhatsApp dengan pesan awal yang sudah terisi, agar pengunjung tidak
 * perlu menjelaskan dirinya dari nol.
 */
export function tautanWhatsApp(nomor: string, pesan: string): string {
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
}

/**
 * PRD §9.3 — tautan keluar ke subdomain unit wajib membawa UTM bersumber
 * `induk`, supaya perpindahan lintas domain terbaca di GA4.
 */
export function tautanKeluar(url: string, unitSlug: string): string {
  const alamat = new URL(url);
  alamat.searchParams.set("utm_source", "induk");
  alamat.searchParams.set("utm_medium", "referral");
  alamat.searchParams.set("utm_campaign", `profil-unit-${unitSlug}`);
  return alamat.toString();
}
