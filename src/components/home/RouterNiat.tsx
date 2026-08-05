import Image from "next/image";
import Link from "next/link";

import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { routerNiat } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * PRD §9.1 blok 2 & §5.3 — lima pintu berdasarkan NIAT pengunjung.
 *
 * Kelimanya berjajar dalam satu baris sebagai bilah yang sama lebar dan
 * kelabu — keadaan menganggur yang sengaja dibuat "padam". Begitu satu bilah
 * disentuh kursor, bilah itu melebar dan fotonya menyala berwarna sementara
 * yang lain menyempit. Jadi hanya ada satu pintu yang hidup pada satu waktu,
 * dan pilihan itu terbaca dari jauh tanpa perlu membaca satu kata pun.
 *
 * Kriteria penerimaan: kelima pintu dapat diakses keyboard dan memiliki label
 * yang jelas. Setiap bilah adalah satu tautan tunggal, bukan div yang diberi
 * penangan klik, dan ia ikut terbuka saat tautannya menerima fokus
 * (`focus-within`) — pengguna papan tik melihat isi yang sama dengan pengguna
 * tetikus. Seluruh isi selalu ada di DOM, hanya penampakannya yang berubah,
 * sehingga pembaca layar tidak pernah bergantung pada hover.
 *
 * Di bawah lg susunan sebaris ini ditinggalkan: lima bilah selebar 1/5 layar
 * sempit tidak terbaca, dan pada layar sentuh tidak ada hover yang bisa
 * membukanya. Di sana kelimanya menumpuk sebagai kartu penuh yang langsung
 * berwarna dan lengkap isinya.
 */
export function RouterNiat() {
  return (
    <Section nada="sejuk">
      <div className="container-page">
        <JudulSeksi
          atas="Mulai dari sini"
          judul="Apa yang sedang"
          sorot="Anda cari"
          penutup="hari ini?"
          keterangan="Pilih satu pintu di bawah ini. Kami mengarahkan Anda langsung ke halaman yang tepat — tanpa perlu memahami struktur organisasi yayasan lebih dulu."
        />

        <ul className="mt-12 flex flex-col gap-3 lg:h-[27rem] lg:flex-row lg:gap-4">
          {routerNiat.map((pintu, i) => (
            <Bilah key={pintu.href} pintu={pintu} urutan={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

type Pintu = (typeof routerNiat)[number];

function Bilah({ pintu, urutan }: { pintu: Pintu; urutan: number }) {
  return (
    <li
      className={cn(
        "group relative isolate h-[13rem] overflow-hidden rounded-3xl bg-brand-950 ring-1 ring-ink/10 sm:h-[15rem]",
        // Yang dianimasikan hanya `flex-grow`: lebar bilah lain ikut menyesuaikan
        // sendiri karena semuanya berbagi ruang yang sama, jadi tidak ada satu
        // pun ukuran yang perlu dihitung.
        "transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none",
        "lg:h-auto lg:flex-[1_1_0%] lg:hover:flex-[3.4_1_0%] lg:focus-within:flex-[3.4_1_0%]",
      )}
    >
      <Link
        href={pintu.href}
        className="block h-full rounded-3xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        <Image
          src={pintu.gambar}
          alt=""
          aria-hidden="true"
          width={1200}
          height={900}
          priority={urutan < 2}
          /* Bilah menyempit saat menganggur dan melebar saat terbuka; ukuran
             terbesarlah yang harus tersedia agar foto tidak buram saat melebar. */
          sizes="(min-width: 1024px) 34rem, 92vw"
          className={cn(
            "size-full object-cover transition duration-500 ease-out motion-reduce:transition-none",
            "lg:grayscale lg:group-hover:grayscale-0 lg:group-focus-within:grayscale-0",
          )}
        />

        {/* Selubung padam: menahan warna foto tetap tenang saat menganggur, lalu
            menipis saat bilah terbuka. Di layar sempit ia hanya cukup gelap
            untuk menjaga keterbacaan teks di atasnya. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-brand-950/40 transition-colors duration-500 motion-reduce:transition-none",
            "lg:bg-brand-950/55 lg:group-hover:bg-brand-950/25 lg:group-focus-within:bg-brand-950/25",
          )}
        />
        {/* Gelap berangsur di bawah supaya label tetap terbaca di foto mana pun. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-brand-950/85 to-transparent"
        />

        <span className="absolute top-5 left-5 inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
          <Icon nama={pintu.ikon as NamaIkon} className="size-5 text-accent-200" tebal={1.8} />
        </span>

        {/* Label tegak — satu-satunya isi yang tampil saat bilah menyempit.
            Teksnya tidak dipendekkan, hanya diputar, jadi pintu tetap terbaca
            utuh meski bilahnya sesempit apa pun. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-5 left-5 hidden font-display text-base font-semibold whitespace-nowrap text-white",
            "[writing-mode:vertical-rl] rotate-180 transition-opacity duration-300 motion-reduce:transition-none",
            "lg:block lg:group-hover:opacity-0 lg:group-focus-within:opacity-0",
          )}
        >
          {pintu.label}
        </span>

        {/* Isi lengkap. Lebarnya dipatok pada lg supaya teks sudah tersusun pada
            lebar akhirnya sejak bilah masih sempit — kalau dibiarkan mengikuti
            lebar bilah, tiap huruf akan berlompatan sepanjang animasi. */}
        <div
          className={cn(
            "absolute bottom-0 left-0 w-full p-5 transition duration-500 ease-out motion-reduce:transition-none",
            "lg:w-[22rem] lg:translate-y-3 lg:opacity-0",
            "lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
            "lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100",
          )}
        >
          <h3 className="font-display text-lg font-semibold text-balance text-white">
            {pintu.label}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-white/75">
            {pintu.deskripsi}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-200">
            {pintu.aksi}
            <Icon nama="panahKanan" className="size-3.5" tebal={2.2} />
          </span>
        </div>
      </Link>
    </li>
  );
}
