import { PageHeader } from "@/components/site/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { getLaporan, getTahunLaporan } from "@/lib/content";
import { labelJenisLaporan } from "@/lib/format";
import { buatMetadata } from "@/lib/seo";

/** PRD §8 — ISR 1 jam. */
export const revalidate = 3600;

export const metadata = buatMetadata({
  judul: "Transparansi & laporan",
  deskripsi:
    "Laporan keuangan tahunan, laporan penyaluran ZIS dan wakaf, serta laporan dampak program Islamic Center Wadi Mubarak — dapat diunduh siapa pun.",
  path: "/transparansi",
});

const nadaJenis = {
  keuangan: "brand",
  program: "aksen",
  dampak: "netral",
} as const;

export default function HalamanTransparansi() {
  const laporan = getLaporan();
  const tahun = getTahunLaporan();

  return (
    <>
      <PageHeader
        jejak={[{ label: "Transparansi", href: "/transparansi" }]}
        atas="Transparansi"
        judul="Laporan yang bisa Anda unduh dan periksa"
        keterangan="Tanpa formulir, tanpa pendaftaran. Kami menerbitkan laporan keuangan tahunan, laporan penyaluran dana umat setiap semester, dan laporan dampak program."
        aksi={<ButtonLink href="/donasi">Kembali ke halaman donasi</ButtonLink>}
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          {laporan.length === 0 ? (
            /* PRD §9.5 — keadaan kosong wajib berisi pernyataan jujur, bukan
               halaman kosong atau menu yang dihapus. */
            <EmptyState
              ikon="dokumen"
              judul="Laporan belum kami terbitkan"
              keterangan="Kami memilih menampilkan halaman ini apa adanya daripada menyembunyikannya. Laporan keuangan tahun berjalan sedang dalam proses telaah akuntan publik dan dijadwalkan terbit paling lambat 30 April. Laporan penyaluran semester akan menyusul pada 31 Januari dan 31 Juli."
              aksi={{ label: "Minta pemberitahuan terbit", href: "/kontak" }}
            />
          ) : (
            <>
              <div className="flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:flex-row sm:items-center">
                <Icon nama="info" className="size-5 shrink-0 text-brand-700" />
                <p className="text-sm leading-relaxed text-brand-900">
                  Laporan keuangan ditelaah akuntan publik independen. Bila Anda menemukan
                  ketidaksesuaian, sampaikan kepada dewan pengawas lewat halaman kontak — setiap
                  masukan kami tanggapi tertulis.
                </p>
              </div>

              <div className="mt-12 flex flex-col gap-14">
                {tahun.map((t) => {
                  const isi = laporan.filter((l) => l.tahun === t);
                  return (
                    <div key={t}>
                      <div className="flex items-baseline gap-4 border-b border-line pb-4">
                        <h2 className="font-display text-display-md text-ink">{t}</h2>
                        <span className="text-sm text-ink-subtle">
                          {isi.length} dokumen
                        </span>
                      </div>

                      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
                        {isi.map((l) => (
                          <li key={l.slug}>
                            <a
                              href={l.url}
                              download
                              className="flex flex-col gap-4 p-5 transition-colors hover:bg-mist-50 sm:flex-row sm:items-center md:p-6"
                            >
                              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 ring-inset">
                                <Icon nama="dokumen" />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center gap-2">
                                  <Badge nada={nadaJenis[l.jenis]}>
                                    {labelJenisLaporan[l.jenis]}
                                  </Badge>
                                </span>
                                <span className="mt-2 block font-display text-base leading-snug font-semibold text-ink">
                                  {l.judul}
                                </span>
                                {l.ringkasan ? (
                                  <span className="mt-1 block text-sm text-ink-muted">
                                    {l.ringkasan}
                                  </span>
                                ) : null}
                              </span>

                              <span className="flex shrink-0 items-center gap-4">
                                <span className="text-xs text-ink-subtle">
                                  {l.format} · {l.ukuran}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-brand-800">
                                  <Icon nama="unduh" className="size-3.5" />
                                  Unduh
                                </span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <p className="mt-10 text-xs leading-relaxed text-ink-subtle">
                Berkas contoh pada tahap pengembangan ini belum berisi dokumen sungguhan. Tautan
                unduh akan mengarah ke berkas asli begitu dokumen diunggah melalui CMS.
              </p>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
