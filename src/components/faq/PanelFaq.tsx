import Link from "next/link";

import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { getFaq } from "@/lib/content";
import { labelKelompokFaq } from "@/lib/format";
import type { Faq } from "@/lib/schemas";

type Kelompok = Faq["kelompok"];

/** Kelompok yang tampil saat pengunjung membuka `/faq` tanpa memilih apa pun. */
export const kelompokFaqBawaan: Kelompok = "pendaftaran";

/** Urutan tampil: dari yang paling sering ditanya menuju yang paling umum. */
export const urutanKelompokFaq: readonly Kelompok[] = [
  kelompokFaqBawaan,
  "biaya",
  "kehidupan-santri",
  "donasi",
  "umum",
];

const ikonKelompok: Record<Kelompok, NamaIkon> = {
  pendaftaran: "dokumen",
  biaya: "uang",
  "kehidupan-santri": "orang",
  donasi: "donasi",
  umum: "info",
};

/**
 * Kelompok bawaan tinggal di `/faq`, bukan `/faq/pendaftaran`, supaya tidak ada
 * dua URL dengan isi yang sama persis.
 */
export function tautanKelompokFaq(kelompok: Kelompok): string {
  return kelompok === kelompokFaqBawaan ? "/faq" : `/faq/${kelompok}`;
}

/** Kelompok yang benar-benar punya isi, menurut urutan tampil. */
export function daftarKelompokFaq() {
  const faq = getFaq();
  return urutanKelompokFaq
    .map((kelompok) => ({ kelompok, isi: faq.filter((f) => f.kelompok === kelompok) }))
    .filter((k) => k.isi.length > 0);
}

/**
 * Isi halaman FAQ: pemilih kelompok di kiri, pertanyaan kelompok terpilih di
 * kanan.
 *
 * Pemilihnya tautan halaman, bukan tombol berperilaku: tiap kelompok punya URL
 * sendiri yang dapat dibagikan dan dirayapi, dan tidak ada satu baris pun
 * JavaScript yang perlu dikirim ke peramban untuk menyaringnya (PRD §8 & §12).
 */
export function PanelFaq({ aktif }: { aktif: Kelompok }) {
  const kelompok = daftarKelompokFaq();
  const terpilih = kelompok.find((k) => k.kelompok === aktif);

  return (
    <Section className="relative py-12 md:py-16">
      {/* Kilau latar. Kliping ditaruh di pembungkus ini, bukan di `Section`:
          `overflow-hidden` pada leluhur mematikan `position: sticky` di
          dalamnya, dan pemilih kelompok di bawah bergantung padanya. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute -top-40 -left-32 size-96 rounded-full bg-accent-100/40 blur-3xl" />
      </span>

      <div className="container-page relative grid gap-8 lg:grid-cols-[18.5rem_minmax(0,1fr)] lg:gap-12">
        {/* Kolom kiri: pemilih kelompok + ajakan menghubungi.
            Ia menempel saat halaman digulir; bila isinya lebih tinggi daripada
            layar — kelompok banyak, atau layar pendek — kolomnya sendiri yang
            digulir, supaya bagian bawahnya tetap dapat dijangkau. Marjin dan
            padding negatif menyisakan ruang agar bayangan kartu tidak
            terpotong oleh kliping gulir itu. */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:-mx-2 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:px-2 lg:pb-2 lg:[scrollbar-color:var(--color-line-strong)_transparent] lg:[scrollbar-width:thin]">
          <p className="text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
            Jelajahi per kelompok
          </p>

          <nav aria-label="Kelompok pertanyaan" className="flex flex-col gap-2.5">
            {kelompok.map((k) => {
              const ini = k.kelompok === aktif;
              return (
                <Link
                  key={k.kelompok}
                  href={tautanKelompokFaq(k.kelompok)}
                  // Berpindah kelompok itu menyaring daftar, bukan pindah
                  // bacaan: memulangkan gulir ke puncak halaman justru membuang
                  // posisi pembaca dan menyembunyikan hasil saringannya.
                  scroll={false}
                  aria-current={ini ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3.5 rounded-md border p-3.5",
                    "transition-[box-shadow,border-color,background-color,transform] duration-200",
                    ini
                      ? "border-brand-200 bg-gradient-to-br from-brand-50 to-accent-50 shadow-card"
                      : "border-line bg-white shadow-soft hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex size-10 shrink-0 items-center justify-center rounded-sm ring-1 transition-colors ring-inset",
                      ini
                        ? "bg-brand-600 text-white ring-brand-600"
                        : "bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700 ring-brand-100 group-hover:from-brand-100 group-hover:to-accent-100",
                    )}
                  >
                    <Icon nama={ikonKelompok[k.kelompok]} className="size-5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-semibold transition-colors",
                        ini ? "text-brand-800" : "text-ink group-hover:text-brand-800",
                      )}
                    >
                      {labelKelompokFaq[k.kelompok]}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-xs",
                        ini ? "text-brand-600" : "text-ink-subtle",
                      )}
                    >
                      {k.isi.length} pertanyaan
                    </span>
                  </span>

                  <Icon
                    nama="panahKanan"
                    className={cn(
                      "size-4 shrink-0 transition-[transform,color] duration-200",
                      ini
                        ? "text-brand-600"
                        : "text-line-strong group-hover:translate-x-0.5 group-hover:text-brand-600",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Ajakan menghubungi — satu-satunya bidang gelap di kolom ini, jadi
              ia jadi titik berhenti mata setelah daftar kelompok habis. */}
          <div className="relative mt-1 shrink-0 overflow-hidden rounded-md bg-brand-900 p-6 text-white shadow-lift">
            <span
              aria-hidden="true"
              className="ornamen-islami pointer-events-none absolute inset-0 text-white/[0.07]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-12 size-44 rounded-full bg-accent-500/25 blur-2xl"
            />

            <div className="relative">
              <span
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-sm bg-white/10 text-accent-200 ring-1 ring-white/15 ring-inset"
              >
                <Icon nama="surel" className="size-5" />
              </span>
              <p className="mt-4 font-display text-lg leading-snug font-semibold text-balance">
                Masih ada pertanyaan?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-white/70">
                Belum menemukan jawaban yang Anda cari? Panitia PPDB dan sekretariat yayasan siap
                membantu pada jam kerja.
              </p>
              <ButtonLink href="/kontak" varian="terang" ukuran="sm" className="mt-5 w-full">
                Hubungi kami
                <Icon nama="panah" className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Kolom kanan: pertanyaan pada kelompok terpilih saja. */}
        <div>
          {!terpilih ? (
            <EmptyState
              ikon="info"
              judul="Daftar pertanyaan sedang disusun"
              keterangan="Kami sedang merapikan daftar pertanyaan agar jawabannya sesuai kebijakan tahun ajaran berjalan. Sementara itu, silakan hubungi panitia PPDB langsung."
              aksi={{ label: "Hubungi kami", href: "/kontak" }}
            />
          ) : (
            <>
              <div className="animate-kartu-masuk flex items-center gap-3">
                <h2 className="font-display text-display-sm text-ink">
                  {labelKelompokFaq[terpilih.kelompok]}
                </h2>
                <span className="rounded-full bg-mist-100 px-2.5 py-0.5 text-xs font-semibold text-ink-subtle tabular-nums">
                  {terpilih.isi.length}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>

              {/* `key` per kelompok: tanpa itu React memakai ulang simpul yang
                  sama saat berpindah halaman dan animasi masuknya tidak pernah
                  dijalankan ulang. */}
              <Accordion key={terpilih.kelompok} className="mt-5">
                {terpilih.isi.map((f, i) => (
                  <AccordionItem
                    key={f.slug}
                    pertanyaan={f.pertanyaan}
                    terbukaAwal={i === 0}
                    indeks={i + 1}
                  >
                    {f.jawaban}
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
