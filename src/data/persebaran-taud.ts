/**
 * Persebaran jaringan TAUD SAQU untuk peta di halaman unit.
 *
 * Dua sumber, dan sengaja dipisah supaya jelas mana yang dari mana:
 *
 *   - Jumlah cabang dihitung langsung dari `cabangTaudSaqu`, yaitu data
 *     `DATA TAUD SELINDO NEW.xlsx`, 162 cabang di 27 provinsi. Dihitung, bukan
 *     ditulis ulang, supaya angkanya tidak pernah melenceng dari daftarnya.
 *   - Jumlah murid per provinsi dari peta persebaran pada presentasi resmi
 *     yayasan "PRESENTASI ICWM 2024". Provinsi yang tidak disebut di sana
 *     bernilai `null`, bukan nol.
 *
 * Dua catatan yang perlu diingat saat memperbarui:
 *
 *   - Presentasi itu menggabungkan Jawa Tengah dengan DI Yogyakarta, jadi
 *     keduanya menjadi satu wilayah di peta. Kalimantan Utara juga bergabung
 *     dengan Kalimantan Timur karena peta dasarnya (Natural Earth 50m) belum
 *     memisahkan keduanya.
 *   - Angka murid per provinsi berjumlah jauh di atas total 6.085 murid yang
 *     disebut slide ringkasan presentasi yang sama. Karena itu situs hanya
 *     menayangkan angka per provinsi dan tidak pernah menjumlahkannya.
 *
 * Cabang kelolaan yayasan (`cabang-taud-icwm.ts`) ikut terhitung di sini:
 * peta ini menggambarkan seluruh jaringan, sedangkan yang tampil bernama dan
 * beralamat hanya cabang kelolaan yayasan.
 */

import { cabangTaudSaqu } from "@/data/cabang-saqu";
import type { Persebaran } from "@/lib/schemas";

type WilayahInput = {
  nama: string;
  pulau: string;
  /** Nama provinsi seperti tertulis pada data cabang. */
  provinsi: string[];
  /** Nama fitur Natural Earth yang menggambar wilayah ini (`peta-provinsi.ts`). */
  bentuk: string[];
  /** Murid menurut presentasi 2024; `null` bila provinsinya tidak disebut. */
  murid: number | null;
};

const wilayah: WilayahInput[] = [
  { nama: "Aceh", pulau: "Sumatera", provinsi: ["Aceh"], bentuk: ["Aceh"], murid: 488 },
  { nama: "Sumatera Utara", pulau: "Sumatera", provinsi: ["Sumatera Utara"], bentuk: ["Sumatera Utara"], murid: 488 },
  { nama: "Sumatera Barat", pulau: "Sumatera", provinsi: ["Sumatera Barat"], bentuk: ["Sumatera Barat"], murid: 380 },
  { nama: "Riau", pulau: "Sumatera", provinsi: ["Riau"], bentuk: ["Riau"], murid: 258 },
  { nama: "Sumatera Selatan", pulau: "Sumatera", provinsi: ["Sumatera Selatan"], bentuk: ["Sumatera Selatan"], murid: 313 },
  { nama: "Bengkulu", pulau: "Sumatera", provinsi: ["Bengkulu"], bentuk: ["Bengkulu"], murid: 21 },
  { nama: "Lampung", pulau: "Sumatera", provinsi: ["Lampung"], bentuk: ["Lampung"], murid: 619 },
  {
    nama: "Kepulauan Bangka Belitung",
    pulau: "Sumatera",
    provinsi: ["Kepulauan Bangka Belitung"],
    bentuk: ["Bangka-Belitung"],
    murid: 163,
  },

  { nama: "Banten", pulau: "Jawa", provinsi: ["Banten"], bentuk: ["Banten"], murid: 318 },
  { nama: "DKI Jakarta", pulau: "Jawa", provinsi: ["DKI Jakarta"], bentuk: ["Jakarta Raya"], murid: 567 },
  { nama: "Jawa Barat", pulau: "Jawa", provinsi: ["Jawa Barat"], bentuk: ["Jawa Barat"], murid: 2201 },
  {
    nama: "Jawa Tengah & DI Yogyakarta",
    pulau: "Jawa",
    provinsi: ["Jawa Tengah", "DI Yogyakarta"],
    bentuk: ["Jawa Tengah", "Yogyakarta"],
    murid: 1004,
  },
  { nama: "Jawa Timur", pulau: "Jawa", provinsi: ["Jawa Timur"], bentuk: ["Jawa Timur"], murid: 1030 },

  { nama: "Bali", pulau: "Bali", provinsi: ["Bali"], bentuk: ["Bali"], murid: null },

  {
    nama: "Nusa Tenggara Barat",
    pulau: "Nusa Tenggara",
    provinsi: ["Nusa Tenggara Barat"],
    bentuk: ["Nusa Tenggara Barat"],
    murid: 307,
  },
  {
    nama: "Nusa Tenggara Timur",
    pulau: "Nusa Tenggara",
    provinsi: ["Nusa Tenggara Timur"],
    bentuk: ["Nusa Tenggara Timur"],
    murid: 54,
  },

  { nama: "Kalimantan Barat", pulau: "Kalimantan", provinsi: ["Kalimantan Barat"], bentuk: ["Kalimantan Barat"], murid: 274 },
  { nama: "Kalimantan Tengah", pulau: "Kalimantan", provinsi: ["Kalimantan Tengah"], bentuk: ["Kalimantan Tengah"], murid: 72 },
  { nama: "Kalimantan Selatan", pulau: "Kalimantan", provinsi: ["Kalimantan Selatan"], bentuk: ["Kalimantan Selatan"], murid: 666 },
  {
    nama: "Kalimantan Timur & Utara",
    pulau: "Kalimantan",
    provinsi: ["Kalimantan Timur", "Kalimantan Utara"],
    bentuk: ["Kalimantan Timur"],
    murid: 631,
  },

  { nama: "Sulawesi Utara", pulau: "Sulawesi", provinsi: ["Sulawesi Utara"], bentuk: ["Sulawesi Utara"], murid: 142 },
  { nama: "Sulawesi Barat", pulau: "Sulawesi", provinsi: ["Sulawesi Barat"], bentuk: ["Sulawesi Barat"], murid: 247 },
  { nama: "Sulawesi Selatan", pulau: "Sulawesi", provinsi: ["Sulawesi Selatan"], bentuk: ["Sulawesi Selatan"], murid: 371 },
  { nama: "Sulawesi Tenggara", pulau: "Sulawesi", provinsi: ["Sulawesi Tenggara"], bentuk: ["Sulawesi Tenggara"], murid: 38 },

  { nama: "Maluku Utara", pulau: "Maluku", provinsi: ["Maluku Utara"], bentuk: ["Maluku Utara"], murid: 276 },
];

function hitungCabang(provinsi: string[]): number {
  return cabangTaudSaqu.filter((c) => provinsi.includes(c.provinsi)).length;
}

export const persebaranTaud: Persebaran[] = wilayah.map((w) => ({
  nama: w.nama,
  pulau: w.pulau,
  bentuk: w.bentuk,
  cabang: hitungCabang(w.provinsi),
  murid: w.murid,
}));

/**
 * Penjaga agar data tidak diam-diam melenceng: setiap provinsi pada daftar
 * cabang harus punya wilayah di peta, kalau tidak cabangnya hilang dari peta
 * tanpa ada yang tahu. Dilanggar hanya bila ada provinsi baru, tambahkan
 * wilayahnya di atas, jangan hapus pemeriksaan ini.
 */
const provinsiTerpetakan = new Set(wilayah.flatMap((w) => w.provinsi));
const belumDipetakan = [...new Set(cabangTaudSaqu.map((c) => c.provinsi))].filter(
  (p) => !provinsiTerpetakan.has(p),
);
if (belumDipetakan.length > 0) {
  throw new Error(`Provinsi belum punya wilayah di peta persebaran: ${belumDipetakan.join(", ")}`);
}
