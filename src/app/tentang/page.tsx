import Link from "next/link";

import { PageHeader } from "@/components/site/PageHeader";
import { CarouselTestimoni } from "@/components/tentang/CarouselTestimoni";
import {
  LinimasaPerjalanan,
  type EntriPerjalanan,
} from "@/components/tentang/LinimasaPerjalanan";
import { Icon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import { getCapaian, getTestimoni } from "@/lib/content";
import type { ImageData } from "@/lib/schemas";
import { buatMetadata } from "@/lib/seo";

/** PRD §8, SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Tentang Islamic Center Wadi Mubarak",
  deskripsi:
    "Sejarah, visi, misi, dan arah gerak Islamic Center Wadi Mubarak, yayasan yang berdiri sejak 2008 di Megamendung dan kini menaungi sebelas unit pendidikan, jaringan sekolah Sahabat Al-Qur'an di 27 provinsi, serta lembaga amil zakat.",
  path: "/tentang",
  gambar: "/img/hero-tentang.svg",
});

/**
 * Foto ilustratif linimasa. Yayasan belum punya arsip foto bertahun, jadi yang
 * dipakai di sini dokumentasi kegiatan yang tersedia di galeri. `alt` selalu
 * menerangkan isi fotonya apa adanya, tidak pernah mengaku sebagai rekaman
 * peristiwa pada tahun di kartunya. Ganti berkasnya begitu arsip resmi ada.
 */
function ilustrasi(nama: string, alt: string, width: number, height: number): ImageData {
  return { src: `/img/${nama}.jpg`, alt, width, height };
}

/**
 * Linimasa "Perjalanan Wadi Mubarak Megamendung 2008-2026", disusun sekretariat
 * yayasan (September 2026). Satu tahun bisa memuat beberapa peristiwa; tanggal,
 * bila ada, ditulis di awal kalimat peristiwanya.
 *
 * `judul` adalah ringkasan satu baris yang diturunkan langsung dari butir
 * peristiwa di bawahnya, bukan keterangan baru. Dipakai sebagai kepala kartu.
 */
const perjalanan: EntriPerjalanan[] = [
  {
    tahun: "2008",
    judul: "Islamic Center Wadi Mubarak berdiri",
    peristiwa: [
      "3 Februari: Islamic Center Wadi Mubarak (ICWM) didirikan di Megamendung, Bogor, oleh H. Roid Kadir, H. Awang Djohan, dan KH. Dr. Didik Hariyanto, Lc., M.P.I.",
      "Program Lembaga Kaderisasi Imam dan Dai (eLKID) mulai diselenggarakan sebagai program tahfizh dan kaderisasi, menjadi salah satu langkah awal pengembangan pendidikan di Wadi Mubarak.",
    ],
    foto: ilustrasi(
      "galeri-pkm-kajian-masjid",
      "Kajian bersama santri Program Kaderisasi Muhaffizh di masjid pondok cabang",
      2000,
      1125,
    ),
  },
  {
    tahun: "2013",
    judul: "Gagasan TAUD SaQu lahir",
    peristiwa: [
      "Istilah TAUD SaQu (Tahfizh Anak Usia Dini Sahabat Qur'an) mulai dipopulerkan sebagai konsep pendidikan tahfizh bagi anak usia dini.",
    ],
    foto: ilustrasi(
      "galeri-taud-foto-kelas",
      "Satu kelas TAUD SAQU berfoto bersama di ruang kelas berhias karya anak",
      1600,
      1200,
    ),
  },
  {
    tahun: "2014",
    judul: "TAUD SaQu resmi berdiri",
    peristiwa: [
      "TAUD SaQu resmi dirilis dan didirikan di bawah Yayasan Sahabat Qur'an. Program ini kemudian dikembangkan melalui sistem cabang dan pembinaan guru.",
      "Yayasan Lembah Qur'an mulai dirintis dan kemudian berkembang menjadi YASAQU, sebagai yayasan yang menaungi TAUD SaQu.",
    ],
    foto: ilustrasi(
      "galeri-pg-taud-kelas-teori",
      "Peserta PG TAUD SAQU mengikuti kelas teori ke-TAUD-an di aula kampus",
      1280,
      960,
    ),
  },
  {
    tahun: "2015",
    judul: "Kerja sama dengan Universitas Ummul Qura', Makkah",
    peristiwa: [
      "Menjalin kerja sama dengan Universitas Ummul Qura', Makkah, dalam rangka pengembangan kualitas hafalan santri.",
    ],
    foto: ilustrasi(
      "galeri-cendera-mata-masyayikh",
      "Penyerahan cendera mata kepada masyayikh tamu di kampus",
      1200,
      675,
    ),
  },
  {
    tahun: "2016",
    judul: "Gedung Pendidikan Guru TAUD diresmikan",
    peristiwa: [
      "2 Maret: Gedung Terpadu Program Internasional Pendidikan Guru TAUD di Wadi Mubarak Megamendung diresmikan. Fasilitas tersebut mencakup ruang kelas, perpustakaan, aula, dan asrama.",
      "Dauroh Wahyain mulai diselenggarakan dan kemudian dilaksanakan secara rutin setiap tahun hingga kini.",
      "Proses pengurusan izin pendirian pendidikan tinggi STIU Wadi Mubarak dimulai sebagai bagian dari pengembangan program tahfizh nonformal menuju pendidikan formal jenjang S-1.",
    ],
    foto: ilustrasi(
      "galeri-pg-taud-kelas-materi",
      "Kelas materi PG TAUD SAQU dengan tayangan proyektor di ruang belajar kampus",
      1280,
      720,
    ),
  },
  {
    tahun: "2017",
    judul: "Izin pendirian STIU Wadi Mubarak terbit",
    peristiwa: [
      "11 Juli: Kementerian Agama menerbitkan izin pendirian Sekolah Tinggi Ilmu Ushuluddin (STIU) Wadi Mubarak Bogor, Program Studi Ilmu Al-Qur'an dan Tafsir, melalui SK Nomor 3692 Tahun 2017.",
      "Ma'had Sulthan al-Islamy didirikan di Sentul, Bogor.",
      "Menjalin kerja sama dengan Yayasan Maqarie Qur'aniyah, Madinah Al-Munawwarah, dalam rangka peningkatan kualitas dan sanad hafalan.",
    ],
    foto: ilustrasi(
      "galeri-stiu-asesmen-aipt",
      "Foto bersama tim asesor dan pengelola STIU Wadi Mubarak pada asesmen lapangan akreditasi institusi",
      1280,
      720,
    ),
  },
  {
    tahun: "2018",
    judul: "95 cabang di dalam dan luar negeri",
    peristiwa: [
      "TAUD SaQu telah berkembang menjadi 95 cabang di Indonesia dan luar negeri, menunjukkan semakin luasnya pengembangan model pendidikan TAUD SaQu Wadi Mubarak.",
      "Ma'had Al-Quds Al-Islamy didirikan di Sumenep, Madura.",
    ],
    foto: ilustrasi(
      "galeri-pg-taud-foto-bersama-lapangan",
      "Foto bersama peserta PG TAUD SAQU di lapangan kampus berlatar pegunungan",
      1280,
      720,
    ),
  },
  {
    tahun: "2021",
    judul: "Ma'had Tahfizh Imtiaz Putri berdiri",
    peristiwa: ["Ma'had Tahfizh Imtiaz Putri didirikan di Megamendung, Bogor."],
    foto: ilustrasi(
      "galeri-imtiaz-halaqah-beranda",
      "Peserta Imtiaz Putri muroja'ah bersama di beranda asrama beralas karpet",
      2000,
      1125,
    ),
  },
  {
    tahun: "2022",
    judul: "Wisuda Akbar pertama, 363 peserta",
    peristiwa: [
      "7 Agustus: Wisuda Akbar pertama di Grand Smesco Hills, Puncak, Bogor. Sebanyak 363 peserta diwisuda, yang terdiri atas lulusan STIU, SMP/SMA/PKM, TAUD SaQu, dan MIT SaQu.",
      "Mahabbah Boarding School didirikan di Megamendung, Bogor.",
    ],
    foto: ilustrasi(
      "galeri-imtiaz-wisuda-akbar",
      "Wisudawati Imtiaz Putri pada Wisuda Akbar Huffazhul Qur'an Islamic Center Wadi Mubarak",
      2000,
      1184,
    ),
  },
  {
    tahun: "2023",
    judul: "Cabang internasional pertama di Hokkaido",
    peristiwa: [
      "TAUD SaQu & MIT SaQu mencapai 154 cabang di Indonesia.",
      "TAUD SaQu kemudian membuka cabang internasional pertama yang dikelola langsung oleh YASAQU di Hokkaido, Jepang, sehingga jumlah keseluruhan cabang mencapai 155.",
      "Ma'had Thoyyibah didirikan di Lembang, Bandung.",
    ],
    foto: ilustrasi(
      "galeri-mit-kelas",
      "Siswa MIT SAQU membaca mushaf di meja masing-masing saat jam pelajaran",
      1024,
      576,
    ),
  },
  {
    tahun: "2024",
    judul: "Kerja sama Makkah dan Jeddah, kampus baru dibangun",
    peristiwa: [
      "25 Februari: Kerja sama STIU-WM dengan Ma'had Mufassir Makkah Mukarromah.",
      "2 November: Peletakan batu pertama Islamic Center Wadi Mubarak Banjarbaru, Kalimantan Selatan.",
      "25 November: Kerja sama dengan Yayasan Khairukum Jeddah dalam rangka pengembangan pendidikan Al-Qur'an.",
      "Memulai pembangunan gedung MTs/MA Wadi Mubarak dan Mahabbah Boarding School.",
    ],
    foto: ilustrasi(
      "galeri-mtsma-kerja-sama-maahid",
      "Penandatanganan nota kesepahaman Islamic Center Wadi Mubarak dengan Ma'ahid, Riyadh",
      1024,
      576,
    ),
  },
  {
    tahun: "2025",
    judul: "MTs/MA Wadi Mubarak berdiri",
    peristiwa: [
      "19 Februari: Menerima kunjungan Ketua Umum PP Muhammadiyah dalam kegiatan yang menyoroti program hafalan Al-Qur'an anak-anak Wadi Mubarak.",
      "MTs/MA Wadi Mubarak didirikan di Megamendung, Bogor.",
    ],
    foto: ilustrasi(
      "galeri-mit-sambutan-podium",
      "Sambutan di podium Wisuda TAUD dan MIT SAQU se-Indonesia dengan latar spanduk acara",
      1024,
      576,
    ),
  },
  {
    tahun: "2026",
    judul: "196 cabang dan ekosistem pendidikan yang lengkap",
    peristiwa: [
      "TAUD SaQu & MIT SaQu kini mencapai 196 cabang di Indonesia.",
      "Islamic Center Wadi Mubarak memasuki tahun ke-18 sejak dirintis pada 2008, dengan ekosistem pendidikan yang mencakup STIU, program tahfizh SMP/SMA, PKM, TAUD SaQu, MIT SaQu, PG TAUD, Mahabbah Boarding School, serta jaringan pendidikan Al-Qur'an di Indonesia dan luar negeri.",
    ],
    foto: ilustrasi(
      "galeri-wisuda-taud-mit",
      "Foto bersama wisuda TAUD dan MIT SaQu",
      1200,
      675,
    ),
  },
];

export default function HalamanTentang() {
  const capaian = getCapaian();
  const testimoni = getTestimoni();

  return (
    <>
      <PageHeader
        jejak={[{ label: "Tentang", href: "/tentang" }]}
        atas="Profil yayasan"
        judul="Delapan belas tahun menemani santri dan keluarganya"
        keterangan="Berdiri di Megamendung pada 3 Februari 2008, hari ini Islamic Center Wadi Mubarak menaungi sebelas unit pendidikan, dari tahfizh anak usia dini sampai perguruan tinggi, empat jalur kaderisasi guru Al-Qur'an, jaringan 197 sekolah Sahabat Al-Qur'an di 27 provinsi, dan sebuah lembaga amil zakat, infak, sedekah, serta wakaf."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl bg-mist-100 pointer-events-none">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/IWsHfr73kYg?autoplay=1&mute=1&loop=1&playlist=IWsHfr73kYg&controls=0&rel=0"
              title="Video Profil Yayasan Islamic Center Wadi Mubarak"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <StatBlock data={capaian} className="mt-10" />
        </div>
      </Section>

      {/* Visi & misi */}
      <Section nada="sejuk" className="py-14 md:py-20">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <JudulSeksi
            atas="Arah gerak"
            judul="Ke mana yayasan ini"
            sorot="hendak menuju"
            rata="kiri"
          />
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-brand-700">Visi</h3>
              <p className="mt-3 text-base leading-relaxed text-pretty text-ink">
                Meraih kebangkitan umat Islam dan mengembalikan kejayaannya melalui Al-Qur&apos;an
                dan As-Sunnah sebagai pedoman dan motivasi hidup.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-brand-700">Misi</h3>
              <ol className="mt-4 flex flex-col gap-3">
                {[
                  "Mempersiapkan kader imam, dai, dan guru yang menegakkan Al-Qur'an dan As-Sunnah.",
                  "Menyediakan lembaga pendidikan dan dakwah yang dapat dijangkau seluruh lapisan masyarakat.",
                  "Mendirikan unit usaha yang menopang berjalannya program pendidikan dan dakwah yayasan.",
                ].map((m, i) => (
                  <li key={m} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xs font-bold text-brand-700"
                    >
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      {/* Perjalanan */}
      <Section className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi atas="Perjalanan" judul="Wadi Mubarak Megamendung" sorot="2008–2026" />
          <LinimasaPerjalanan entri={perjalanan} />
        </div>
      </Section>

      {/* Testimoni */}
      {testimoni.length > 0 ? (
        <Section nada="sejuk" className="py-14 md:py-20">
          <div className="container-page">
            <JudulSeksi
              atas="Kata mereka"
              judul="Suara wali santri,"
              sorot="alumni, dan jamaah"
            />
            <CarouselTestimoni testimoni={testimoni} />
          </div>
        </Section>
      ) : null}

      {/* Tautan lanjut */}
      <Section className="py-14 md:py-20">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { judul: "Donasi", isi: "Zakat, infak, sedekah, dan wakaf lewat LAZIS SaQu Wadi Mubarak.", href: "/donasi" },
              { judul: "Unit pendidikan", isi: "Sebelas unit dari tahfizh anak usia dini sampai perguruan tinggi.", href: "/program" },
              { judul: "Program Al-Qur'an untuk umum", isi: "Graha Qur'an daring dan short camp Wisata Qur'an.", href: "/program-quran" },
            ].map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
                >
                  <h3 className="font-display text-lg font-semibold text-ink">{t.judul}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-muted">{t.isi}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Buka halaman
                    <Icon nama="panahKanan" className="size-3.5 transition-transform group-hover:translate-x-0.5" tebal={2.2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
