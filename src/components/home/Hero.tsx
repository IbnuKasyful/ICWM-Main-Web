import Image from "next/image";

import { PintasanJenjang } from "@/components/home/PintasanJenjang";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * PRD §9.1 blok 1 — satu pesan, satu CTA utama. BUKAN carousel: carousel di
 * situs lama menurunkan performa dan nyaris tak pernah diklik melewati slide
 * pertama.
 *
 * Susunan dua kolom: pesan + CTA di kiri, kisi empat potret di kanan. Potret
 * dibaca berurutan (kiri→kanan, atas→bawah) dari anak usia dini sampai dewasa
 * — itulah cara tercepat menyampaikan bahwa yayasan mendampingi satu anak
 * sepanjang jenjang, tanpa perlu satu kalimat penjelas pun.
 */

/**
 * Urutan potret = urutan usia. Jangan diacak: urutannya yang bercerita.
 *
 * `tinggi` menyetel proporsi figur terhadap kartunya. Sengaja tidak seragam:
 * kalau semua figur dibuat setinggi kartu, anak usia dini tampak sebesar orang
 * dewasa dan pesan "tumbuh dari kecil sampai dewasa" justru hilang.
 */
const tahapan = [
  {
    src: "/img/hero1.png",
    w: 189,
    h: 336,
    alt: "Santriwati taman asuh usia dini memeluk mushaf Al-Qur'an",
    tahap: "Usia dini",
    usia: "4–6 tahun",
    latar: "from-accent-50",
    tinggi: "h-[96%]",
  },
  {
    src: "/img/hero2.png",
    w: 205,
    h: 364,
    alt: "Santri sekolah dasar berpeci memeluk mushaf Al-Qur'an",
    tahap: "Sekolah dasar",
    usia: "6–12 tahun",
    latar: "from-mist-200",
    tinggi: "h-full",
  },
  {
    src: "/img/hero3.png",
    w: 373,
    h: 669,
    alt: "Santriwati jenjang menengah membawa mushaf Al-Qur'an",
    tahap: "Remaja",
    usia: "12–18 tahun",
    latar: "from-brand-100",
    tinggi: "h-full",
  },
  {
    src: "/img/hero4.png",
    w: 373,
    h: 669,
    alt: "Mahasantri dewasa membawa mushaf Al-Qur'an",
    tahap: "Dewasa",
    usia: "Lulusan SMA",
    latar: "from-accent-100",
    tinggi: "h-full",
  },
] as const;

export function Hero({
  jumlahUnit,
  jumlahSantri,
}: {
  jumlahUnit: number;
  jumlahSantri: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 md:pt-12 md:pb-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-brand-100/50 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -right-32 size-[28rem] rounded-full bg-accent-50/70 blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_32rem]">
          {/* ---------- Kolom kiri: pesan, CTA, bukti ---------- */}
          <div className="max-w-xl">
            <h1 className="font-display text-[clamp(3.2rem,6.5vw,5rem)] leading-[1.04] font-extrabold tracking-[-0.03em] text-balance text-ink">
              Pendidikan Qur&apos;ani
              <br />
              <span className="text-brand-600">dari usia dini</span>
              <br />
              sampai dewasa
            </h1>

            <p className="mt-6 text-base leading-relaxed text-pretty text-ink-muted">
              Sepuluh unit pendidikan — dari taman asuh usia dini sampai perguruan tinggi —
              beserta lembaga amil zakat resmi, dalam satu naungan. Temukan unit yang
              benar-benar cocok untuk anak Anda sebelum menghubungi siapa pun.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/program" varian="kedua" ukuran="lg">
                Cari unit yang cocok
                <Icon nama="panah" className="size-4" />
              </ButtonLink>
              <ButtonLink href="/tentang" varian="garis" ukuran="lg">
                Kenali yayasan
              </ButtonLink>
            </div>

            {/* Bukti sosial: tumpukan wajah + angka, pola dari referensi. */}
            <div className="mt-10 flex items-center gap-4 border-t border-ink/10 pt-6">
              <ul aria-hidden="true" className="flex shrink-0 -space-x-3">
                {tahapan.map((t) => (
                  <li
                    key={t.src}
                    className={cn(
                      "size-11 overflow-hidden rounded-full bg-gradient-to-b to-white ring-2 ring-white",
                      t.latar,
                    )}
                  >
                    <Image
                      src={t.src}
                      alt=""
                      width={t.w}
                      height={t.h}
                      className="size-full object-cover object-top"
                    />
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-snug text-ink-muted">
                <span className="font-display text-display-sm text-brand-700">
                  {jumlahSantri}
                </span>{" "}
                santri aktif di {jumlahUnit} unit &amp; lembaga
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
                Langsung ke jenjang
              </p>
              <PintasanJenjang />
            </div>
          </div>

          {/* ---------- Kolom kanan: kisi empat potret ---------- */}
          <KisiTahapan />
        </div>
      </div>
    </section>
  );
}

/**
 * Empat potret dalam kisi 2×2. Kolom kanan digeser turun sedikit pada layar
 * lebar supaya kisi tidak terbaca sebagai tabel kaku. Gambar berlatar
 * transparan, jadi tiap kartu memberi bidang warna lembut sebagai alasnya.
 */
function KisiTahapan() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] lg:mx-0 lg:max-w-none">
      <ol className="grid grid-cols-2 gap-3 sm:gap-4">
        {tahapan.map((t, i) => (
          <li key={t.src} className={cn(i % 2 === 1 && "lg:translate-y-8")}>
            <figure
              className={cn(
                // Padding atas menyisakan jalur bebas untuk keping keterangan:
                // tinggi figur dihitung terhadap ruang di bawahnya, jadi figur
                // tertinggi sekalipun tidak pernah menabrak keping itu.
                "relative flex aspect-[4/5] items-end overflow-hidden rounded-[1.75rem] bg-gradient-to-b to-white pt-10 ring-1 ring-ink/5 sm:pt-12",
                t.latar,
              )}
            >
              <Image
                src={t.src}
                alt={t.alt}
                width={t.w}
                height={t.h}
                priority={i < 2}
                fetchPriority={i === 0 ? "high" : undefined}
                sizes="(min-width: 1280px) 15rem, (min-width: 1024px) 13rem, (min-width: 640px) 12rem, 42vw"
                className={cn("w-full object-contain object-bottom select-none", t.tinggi)}
              />
              {/* Keterangan usia disembunyikan di layar sempit agar keping tetap
                  satu baris; nama tahapnya sudah cukup bercerita. */}
              <figcaption className="absolute inset-x-3 top-3 flex items-baseline gap-x-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[0.7rem] leading-tight font-semibold text-ink shadow-soft backdrop-blur-sm">
                {t.tahap}
                <span className="hidden font-normal text-ink-subtle sm:inline">{t.usia}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      {/* Keping mengambang — penanda bahwa keempat tahap ada di satu naungan. */}
      <p className="absolute -top-4 right-2 z-20 hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-card sm:inline-flex lg:-right-2">
        <Icon nama="quran" className="size-4 text-accent-700" />
        Tahfizh berjenjang, satu naungan
      </p>
    </div>
  );
}
