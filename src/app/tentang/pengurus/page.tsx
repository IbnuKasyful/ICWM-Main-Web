import Image from "next/image";

import { PageHeader } from "@/components/site/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { getPengurus } from "@/lib/content";
import { labelDewan } from "@/lib/format";
import { buatMetadata } from "@/lib/seo";
import type { Pengurus } from "@/lib/schemas";

/** PRD §8 — ISR 1 jam. */
export const revalidate = 3600;

export const metadata = buatMetadata({
  judul: "Struktur pengurus",
  deskripsi:
    "Dewan pembina, dewan pengawas, pengurus yayasan, dan pelaksana harian Islamic Center Wadi Mubarak.",
  path: "/tentang/pengurus",
});

const urutanDewan: Pengurus["dewan"][] = ["pembina", "pengawas", "pengurus", "pelaksana"];

const keteranganDewan: Record<Pengurus["dewan"], string> = {
  pembina: "Menetapkan arah dan kebijakan umum yayasan serta mengangkat pengurus dan pengawas.",
  pengawas: "Mengawasi kepatuhan tata kelola, penggunaan dana, dan pelaporan yayasan.",
  pengurus: "Menjalankan yayasan sehari-hari dan bertanggung jawab kepada dewan pembina.",
  pelaksana: "Memimpin bidang operasional: pendidikan, kesantrian, dan lembaga amil zakat.",
};

export default function HalamanPengurus() {
  const pengurus = getPengurus();

  const kelompok = urutanDewan
    .map((d) => ({ dewan: d, isi: pengurus.filter((p) => p.dewan === d) }))
    .filter((k) => k.isi.length > 0);

  return (
    <>
      <PageHeader
        jejak={[
          { label: "Tentang", href: "/tentang" },
          { label: "Pengurus", href: "/tentang/pengurus" },
        ]}
        atas="Struktur organisasi"
        judul="Siapa yang bertanggung jawab"
        keterangan="Empat lapis tata kelola: pembina menetapkan arah, pengawas memeriksa, pengurus menjalankan, dan pelaksana harian memimpin bidang masing-masing."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          {pengurus.length === 0 ? (
            <EmptyState
              ikon="orang"
              judul="Data pengurus sedang diperbarui"
              keterangan="Susunan pengurus sedang dalam masa peralihan periode. Halaman ini akan diisi kembali setelah surat keputusan pengangkatan terbit."
              aksi={{ label: "Hubungi sekretariat", href: "/kontak" }}
            />
          ) : (
            <div className="flex flex-col gap-16">
              {kelompok.map((k) => (
                <div key={k.dewan}>
                  <div className="flex flex-col gap-2 border-b border-line pb-5">
                    <h2 className="font-display text-display-sm text-ink">{labelDewan[k.dewan]}</h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {keteranganDewan[k.dewan]}
                    </p>
                  </div>

                  <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {k.isi.map((p) => (
                      <li
                        key={p.slug}
                        className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-brand-200"
                      >
                        <div className="aspect-square bg-sand-100">
                          {p.foto ? (
                            <Image
                              src={p.foto.src}
                              alt={p.foto.alt}
                              width={p.foto.width}
                              height={p.foto.height}
                              sizes="(min-width: 1024px) 280px, 45vw"
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center text-ink-subtle">
                              <Icon nama="orang" className="size-10" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-display text-base leading-snug font-semibold text-balance text-ink">
                            {p.nama}
                          </h3>
                          <p className="mt-1 text-xs font-semibold text-brand-700">{p.jabatan}</p>
                          {p.bio ? (
                            <p className="mt-3 text-xs leading-relaxed text-pretty text-ink-muted">
                              {p.bio}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
