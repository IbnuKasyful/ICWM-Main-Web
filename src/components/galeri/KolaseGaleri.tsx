import Image from "next/image";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/cn";
import type { GaleriItem } from "@/lib/schemas";

/**
 * Kepala halaman /galeri: kolase foto yang melengkung di atas judul.
 *
 * Bedanya dengan `PageHeader` yang dipakai halaman dalam lain — di sini gambar
 * yang bicara lebih dulu, karena isi halaman ini memang gambar. Judulnya duduk
 * di bawah kolase, di dalam bagian yang sudah luntur ke putih, sehingga tidak
 * perlu tirai gelap atau kotak putih di belakang teks.
 *
 * Foto di sini DEKORATIF (`alt=""`): semuanya muncul kembali di korsel bawah
 * lengkap dengan keterangannya, jadi mengumumkan dua kali hanya membuat
 * pembaca layar membacakan daftar yang sama berturut-turut.
 *
 * Semua ukuran memakai `clamp()` alih-alih titik henti Tailwind. Kolase ini
 * harus mengecil mulus mengikuti lebar layar — kalau tingginya meloncat per
 * titik henti, lengkung susunannya patah di tengah-tengah rentang.
 */

const lebarKolom = {
  ramping: "w-[clamp(4.25rem,9vw,7.5rem)]",
  sedang: "w-[clamp(5rem,10.5vw,9rem)]",
  lebar: "w-[clamp(6rem,12vw,10.5rem)]",
} as const;

const tinggiKeping = {
  pendek: "h-[clamp(3rem,6.5vw,5rem)]",
  sedang: "h-[clamp(4.5rem,9vw,7rem)]",
  jangkung: "h-[clamp(7.5rem,15vw,12rem)]",
} as const;

/** Turunnya pangkal kolom terhadap garis atas kolase. */
const turun = {
  nol: "",
  kecil: "mt-[clamp(0.5rem,1.75vw,1.5rem)]",
  sedang: "mt-[clamp(1rem,4vw,3rem)]",
  besar: "mt-[clamp(1.75rem,6vw,4.5rem)]",
} as const;

type Kolom = {
  lebar: string;
  turun: string;
  keping: readonly (keyof typeof tinggiKeping)[];
  /** Kolom terluar dilepas lebih dulu saat layar menyempit, sepasang demi
      sepasang, supaya lengkungnya tetap simetris di tiap lebar. Lima kolom
      terdalam bertahan sampai layar ponsel: di sana keduanya memang melebihi
      lebar layar, tapi bagian yang keluar justru jatuh di tepi yang sudah
      dilunturkan mask — persis kesan kolase yang tak berujung. */
  tampil: string;
};

/**
 * Sembilan kolom, tujuh belas keping. Tinggi dan pangkalnya sengaja tidak
 * beraturan: susunan yang rapi terbaca sebagai tabel foto, bukan kolase. Yang
 * dijaga hanya siluetnya — kolom tengah paling jangkung dan berpangkal paling
 * atas, kolom tepi lebih pendek dan turun, sehingga seluruhnya membentuk
 * lengkung yang membuka ke bawah tepat di tempat judul berdiri.
 */
const kolom: readonly Kolom[] = [
  { lebar: lebarKolom.ramping, turun: turun.besar, keping: ["pendek", "sedang"], tampil: "hidden xl:flex" },
  { lebar: lebarKolom.sedang, turun: turun.kecil, keping: ["pendek", "sedang", "pendek"], tampil: "hidden md:flex" },
  { lebar: lebarKolom.ramping, turun: turun.sedang, keping: ["sedang", "pendek"], tampil: "flex" },
  { lebar: lebarKolom.lebar, turun: turun.nol, keping: ["jangkung"], tampil: "flex" },
  { lebar: lebarKolom.sedang, turun: turun.sedang, keping: ["sedang", "sedang"], tampil: "flex" },
  { lebar: lebarKolom.lebar, turun: turun.kecil, keping: ["jangkung"], tampil: "flex" },
  { lebar: lebarKolom.ramping, turun: turun.sedang, keping: ["pendek", "sedang"], tampil: "flex" },
  { lebar: lebarKolom.sedang, turun: turun.kecil, keping: ["sedang", "pendek", "pendek"], tampil: "hidden md:flex" },
  { lebar: lebarKolom.ramping, turun: turun.besar, keping: ["sedang"], tampil: "hidden xl:flex" },
];

const tengah = (kolom.length - 1) / 2;

export function KolaseGaleri({ galeri }: { galeri: readonly GaleriItem[] }) {
  // Foto diambil berputar, jadi menambah atau mengurangi isi galeri tidak
  // pernah menyisakan keping kosong maupun merusak susunan kolom di atas.
  let n = 0;

  return (
    <section className="relative overflow-hidden border-b border-line-strong bg-mist-50 pb-12 md:pb-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-accent-200/30 blur-3xl"
      />

      <div className="container-page relative z-10 pt-8">
        <Breadcrumb jejak={[{ label: "Galeri", href: "/galeri" }]} />
      </div>

      <div
        aria-hidden="true"
        className="kolase-luntur pointer-events-none mt-6 flex items-start justify-center gap-[clamp(0.4rem,1.2vw,0.9rem)] px-2"
      >
        {kolom.map((k, i) => (
          <div
            key={i}
            className={cn(
              "shrink-0 flex-col gap-[clamp(0.4rem,1.2vw,0.9rem)]",
              k.lebar,
              k.turun,
              k.tampil,
              i % 2 === 0 ? "animate-kolase-apung-lambat" : "animate-kolase-apung-cepat",
            )}
          >
            {k.keping.map((tinggi, j) => {
              const foto = galeri[n++ % galeri.length];
              if (!foto) return null;
              return (
                <figure
                  key={j}
                  style={{
                    // Kolase tersusun dari tengah ke tepi, mengikuti arah baca
                    // halaman ini: judul di tengah lebih dulu punya bingkai.
                    animationDelay: `${Math.round(Math.abs(i - tengah) * 70 + j * 45)}ms`,
                  }}
                  className={cn(
                    "animate-kolase-masuk overflow-hidden rounded-[1.25rem] bg-mist-100 shadow-soft ring-1 ring-ink/5",
                    tinggiKeping[tinggi],
                  )}
                >
                  <Image
                    src={foto.src}
                    alt=""
                    width={foto.width}
                    height={foto.height}
                    /* Seluruh kolase berada di atas lipatan, jadi tak satu pun
                       kepingnya boleh ditunda — keping yang menunggu tergulir
                       menyisakan kotak kosong di kepala halaman. Yang berbeda
                       hanya kolom tengah: itu saja yang ikut diprasandang,
                       supaya belasan foto tidak berebut antrean unduh. */
                    loading="eager"
                    priority={i >= 3 && i <= 5}
                    sizes="(min-width: 1280px) 11rem, 14vw"
                    className="size-full object-cover"
                  />
                </figure>
              );
            })}
          </div>
        ))}
      </div>

      <div className="container-page relative z-10 -mt-[clamp(1.5rem,6vw,5rem)] text-center">
        <span className="inline-flex items-center rounded-full border border-accent-200 bg-white px-3 py-1 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
          Galeri
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-display-md text-balance text-ink md:text-display-lg">
          Suasana kampus dan kegiatan santri{" "}
          <span className="text-brand-600">dari tahun ke tahun</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pretty text-ink-muted">
          Dokumentasi dipilih dengan memperhatikan perlindungan anak: kami tidak menampilkan
          wajah santri secara menonjol tanpa izin tertulis wali santri.
        </p>
      </div>
    </section>
  );
}
