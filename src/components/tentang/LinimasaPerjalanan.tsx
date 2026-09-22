import Image from "next/image";

import { cn } from "@/lib/cn";
import type { ImageData } from "@/lib/schemas";

export type EntriPerjalanan = {
  tahun: string;
  /** Ringkasan satu baris, dipakai sebagai judul kartu. */
  judul: string;
  peristiwa: readonly string[];
  /**
   * Foto ilustratif, bukan dokumentasi tahun tersebut. Yayasan belum punya
   * arsip foto bertahun, jadi `alt` sengaja menerangkan isi fotonya apa adanya
   * dan tidak pernah mengaku sebagai rekaman peristiwa di kartunya. Menghapus
   * kunci ini membuat barisnya tampil sebagai kartu teks selebar penuh.
   */
  foto?: ImageData;
};

/**
 * Linimasa perjalanan yayasan: satu garis tengah, titik menyala di tiap tahun,
 * dan kartu yang berselang-seling kiri-kanan bersama fotonya.
 *
 * Berselang-selingnya hanya hidup sejak `lg`. Di bawah itu semuanya jatuh ke
 * satu kolom dengan garis di tepi kiri, karena dua kolom selebar setengah layar
 * ponsel membuat butir peristiwa terpecah jadi dua-tiga kata per baris.
 */
export function LinimasaPerjalanan({ entri }: { entri: readonly EntriPerjalanan[] }) {
  return (
    /* Garisnya ditaruh di pembungkus, bukan di dalam <ol>. Anak langsung <ol>
       hanya boleh <li>, dan menyelipkan <span> di sana membuat markupnya tidak
       sah sekaligus mengacaukan pembacaan daftar oleh teknologi bantu. */
    <div className="relative mt-12 lg:mt-16">
      {/* Garis tengah. Sengaja warna padat, bukan gradien: linimasa ini lebih
          dari 4.800 px, dan gradien yang meredup di kedua ujung membuat entri
          pertama dan terakhir kehilangan garisnya sama sekali. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-2 w-0.5 -translate-x-1/2 rounded-full bg-brand-200 lg:left-1/2"
      />

      <ol>
        {entri.map((e, i) => {
          // Indeks genap: teks di kiri, foto di kanan. Ganjil: kebalikannya.
          const fotoDiKiri = i % 2 === 1;

          return (
            <li key={e.tahun} className="relative pb-12 pl-10 last:pb-0 lg:pb-16 lg:pl-0">
              {/* Titik menyala. Halo biru ditaruh di lapisan terpisah di belakang
                  titiknya supaya blur-nya tidak ikut mengaburkan bidang padat. */}
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-2 z-10 -translate-x-1/2 lg:left-1/2"
              >
                <span className="absolute inset-0 -z-10 rounded-full bg-brand-500/50 blur-md" />
                <span className="block size-4 rounded-full bg-brand-600 ring-4 ring-brand-500/15" />
              </span>

              {/* Kedua kolom dibatasi lebarnya lalu didorong merapat ke garis,
                  bukan dibiarkan selebar setengah halaman. Tanpa batas itu
                  fotonya membengkak sampai dua kali tinggi teksnya dan irama
                  kiri-kanannya hilang ditelan ruang kosong di tengah. */}
              <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-14">
                <div
                  className={cn(
                    "lg:w-full lg:max-w-[26rem]",
                    fotoDiKiri ? "lg:order-2" : "lg:ml-auto",
                  )}
                >
                  <p className="font-display text-sm font-bold tracking-[0.12em] text-brand-600 uppercase">
                    {e.tahun}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-balance text-ink">
                    {e.judul}
                  </h3>
                  <ul className="mt-3 flex list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-pretty text-ink-muted marker:text-brand-400">
                    {e.peristiwa.map((isi) => (
                      <li key={isi}>{isi}</li>
                    ))}
                  </ul>
                </div>

                {e.foto ? (
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl bg-mist-100 lg:w-full lg:max-w-[26rem]",
                      fotoDiKiri && "lg:order-1 lg:ml-auto",
                    )}
                  >
                    <Image
                      src={e.foto.src}
                      alt={e.foto.alt}
                      width={e.foto.width}
                      height={e.foto.height}
                      sizes="(min-width: 1024px) 416px, calc(100vw - 3rem)"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
