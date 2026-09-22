/**
 * Cabang TAUD SAQU yang dikelola langsung oleh Islamic Center Wadi Mubarak.
 *
 * Berbeda dari jaringan TAUD SAQU pada umumnya, kedelapan cabang ini berada di
 * bawah manajemen yayasan sendiri, bukan lembaga mitra. Hanya cabang inilah
 * yang ditayangkan lengkap dengan nama, alamat, dan narahubungnya; cabang
 * mitra cukup tampil sebagai persebaran (lihat `src/data/persebaran-taud.ts`).
 *
 * Sumber: laman cabang khusus TAUD SaQu Wadi Mubarak (September 2026).
 */

import type { Cabang } from "@/lib/schemas";

export const cabangTaudIcwm: Cabang[] = [
  {
    slug: "taud-icwm-wadi-mubarak-puncak",
    nama: "TAUD SaQu Wadi Mubarak (Pusat)",
    provinsi: "Jawa Barat",
    pulau: "Jawa",
    kota: "Kabupaten Bogor",
    alamat: "Jl. Raya Puncak, Kp. Goleah RT 01/RW 01, Kuta, Megamendung, Kab. Bogor, Jawa Barat 16750",
    kontak_wa: "6285165074542",
    status_ppdb: "buka",
  },
  {
    slug: "taud-icwm-mahabbah-cimandala",
    nama: "Mahabbah Quranic Preschool – Cimandala",
    provinsi: "Jawa Barat",
    pulau: "Jawa",
    kota: "Kabupaten Bogor",
    alamat: "Cimandala, Sukaraja, Kab. Bogor, Jawa Barat 16710",
    kontak_wa: "6282130871184",
    status_ppdb: "buka",
  },
  {
    /* Narahubungnya masih nomor admin pusat sampai cabang punya nomor sendiri. */
    slug: "taud-icwm-gunung-sindur",
    nama: "TAUD SaQu WM Gunung Sindur",
    provinsi: "Jawa Barat",
    pulau: "Jawa",
    kota: "Kabupaten Bogor",
    alamat: "Jl. Ciater Wareng, Rawakalong, Kec. Gunung Sindur, Kab. Bogor, Jawa Barat 16340",
    kontak_wa: "6285165074542",
    status_ppdb: "buka",
  },
  {
    slug: "taud-icwm-pondok-kopi",
    nama: "TAUD SaQu WM Pondok Kopi",
    provinsi: "DKI Jakarta",
    pulau: "Jawa",
    kota: "Jakarta Timur",
    alamat: "Jl. Arabika III RT 10/RW 05, Pondok Kopi, Duren Sawit, Jakarta Timur 13460",
    kontak_wa: "6285218570995",
    status_ppdb: "buka",
  },
  {
    slug: "taud-icwm-darul-iman-sumedang",
    nama: "TAUD SaQu WM Darul Iman",
    provinsi: "Jawa Barat",
    pulau: "Jawa",
    kota: "Kabupaten Sumedang",
    alamat: "Marga Jaya, Tanjungsari, Kab. Sumedang, Jawa Barat 45362",
    kontak_wa: "6285624381753",
    status_ppdb: "buka",
  },
  {
    slug: "taud-icwm-sleman-1",
    nama: "TAUD SaQu WM Abdurrahman Al Eid (Sleman 1)",
    provinsi: "DI Yogyakarta",
    pulau: "Jawa",
    kota: "Kabupaten Sleman",
    alamat: "Jl. Gito Gati, Penen, Donoharjo, Ngaglik, Kab. Sleman, DIY 55581",
    kontak_wa: "6281323813030",
    status_ppdb: "buka",
  },
  {
    slug: "taud-icwm-sleman-2",
    nama: "TAUD SaQu WM Sleman 2",
    provinsi: "DI Yogyakarta",
    pulau: "Jawa",
    kota: "Kabupaten Sleman",
    alamat: "Jl. Pesanggrahan, Malangrejo, Wedomartani, Ngemplak, Kab. Sleman, DIY 55584",
    kontak_wa: "628132928308",
    status_ppdb: "buka",
  },
  {
    slug: "taud-icwm-sumenep",
    nama: "TAUD SaQu WM Sumenep",
    provinsi: "Jawa Timur",
    pulau: "Jawa",
    kota: "Kota Sumenep",
    alamat: "Jl. Dr. Setia Budi, Lingkungan Dhalem, Pajagalan, Kota Sumenep, Jawa Timur 69416",
    kontak_wa: "62895403837464",
    status_ppdb: "buka",
  },
];
