import Image from "next/image";
import Link from "next/link";

import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Kartu foto gelap, satu bahasa rupa yang dipakai bersama oleh bilah "Mulai
 * dari sini" di beranda (PRD §9.1 blok 2) dan kartu jenis dana di halaman
 * donasi.
 *
 * Rupanya satu, tanpa ragam: foto memenuhi kartu dan menganggur dalam kelabu,
 * ikon melayang di pojok kiri atas, label tegak menemani selama kartu masih
 * sempit, lalu judul dan penjelasannya naik dari dasar kartu begitu disentuh
 * kursor atau menerima fokus.
 *
 * `href` hanya menentukan pembungkusnya, ada berarti seluruh kartu menjadi
 * satu tautan, tidak ada berarti kartu hanya bidang biasa. Selebihnya persis
 * sama, termasuk urutan lapisan dan setiap kelasnya, supaya kedua tempat itu
 * tidak pernah berangsur berbeda.
 *
 * Ukuran kartu dan susunannya di dalam baris ditentukan pemakainya lewat
 * `className`. Ia selalu menghasilkan `<li>`, jadi tempatkan di dalam `<ul>`.
 */
export function KartuFoto({
  gambar,
  ikon,
  judul,
  keterangan,
  href,
  aksi,
  sizes,
  prioritas = false,
  className,
}: {
  gambar?: string | null;
  ikon: NamaIkon;
  judul: string;
  keterangan: string;
  /** Ada → seluruh kartu menjadi satu tautan. Tidak mengubah rupanya. */
  href?: string;
  /** Ajakan di bawah penjelasan; dilewati bila kartu tidak menuju ke mana-mana. */
  aksi?: string;
  /** Lebar tampil kartu pada tiap breakpoint, diteruskan ke `next/image`. */
  sizes: string;
  prioritas?: boolean;
  className?: string;
}) {
  const isi = (
    <>
      {gambar ? (
        <Image
          src={gambar}
          alt=""
          aria-hidden="true"
          fill
          priority={prioritas}
          sizes={sizes}
          className={cn(
            "object-cover transition duration-500 ease-out motion-reduce:transition-none",
            "lg:grayscale lg:group-hover:grayscale-0 lg:group-focus-within:grayscale-0",
          )}
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-800 to-brand-950">
          <span className="ornamen-islami absolute inset-0 text-brand-400 opacity-10" />
          <span className="absolute -top-32 left-1/2 -translate-x-1/2 size-[22rem] rounded-full border border-brand-400/20" />
        </div>
      )}

      {/* Selubung padam: menahan warna foto tetap tenang saat menganggur, lalu
          menipis saat kartu terbuka. Di layar sempit ia hanya cukup gelap
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
        <Icon nama={ikon} className="size-5 text-accent-200" tebal={1.8} />
      </span>

      {/* Label tegak, satu-satunya isi yang tampil saat kartu menyempit.
          Teksnya tidak dipendekkan, hanya diputar, jadi kartu tetap terbaca
          utuh meski sesempit apa pun. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-5 left-5 hidden font-display text-base font-semibold whitespace-nowrap text-white",
          "[writing-mode:vertical-rl] rotate-180 transition-opacity duration-300 motion-reduce:transition-none",
          "lg:block lg:group-hover:opacity-0 lg:group-focus-within:opacity-0",
        )}
      >
        {judul}
      </span>

      {/* Lebarnya dipatok pada lg supaya teks sudah tersusun pada lebar
          akhirnya sejak kartu masih sempit, kalau dibiarkan mengikuti lebar
          kartu, tiap huruf akan berlompatan sepanjang animasi. */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-full p-5 transition duration-500 ease-out motion-reduce:transition-none",
          "lg:w-[22rem] lg:translate-y-3 lg:opacity-0",
          "lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
          "lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100",
        )}
      >
        <h3 className="font-display text-lg font-semibold text-balance text-white">{judul}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-pretty text-white/75">{keterangan}</p>
        {aksi ? (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-200">
            {aksi}
            <Icon nama="panahKanan" className="size-3.5" tebal={2.2} />
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <li
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl bg-brand-950 ring-1 ring-ink/10",
        className,
      )}
    >
      {href === undefined ? (
        <div className="block h-full rounded-3xl">{isi}</div>
      ) : (
        <Link
          href={href}
          className="block h-full rounded-3xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-600"
        >
          {isi}
        </Link>
      )}
    </li>
  );
}
