import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { getLegalitas } from "@/lib/content";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8 — SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Legalitas yayasan",
  deskripsi:
    "Akta pendirian, SK Kemenkumham, NPWP, izin operasional LAZIS dan satuan pendidikan, serta akreditasi Islamic Center Wadi Mubarak.",
  path: "/tentang/legalitas",
});

export default function HalamanLegalitas() {
  const legalitas = getLegalitas();

  return (
    <>
      <PageHeader
        jejak={[
          { label: "Tentang", href: "/tentang" },
          { label: "Legalitas", href: "/tentang/legalitas" },
        ]}
        atas="Legalitas"
        judul="Dokumen resmi yayasan"
        keterangan="Kami mencantumkan nomor dokumen secara terbuka agar siapa pun dapat memverifikasinya langsung ke instansi penerbit. Salinan fisik dapat diminta lewat sekretariat."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          {legalitas.length === 0 ? (
            <EmptyState
              ikon="dokumen"
              judul="Dokumen legalitas sedang dilengkapi"
              keterangan="Halaman ini sengaja tidak kami hapus. Data legalitas sedang diverifikasi ulang bersama notaris dan akan ditayangkan kembali segera setelah selesai."
              aksi={{ label: "Minta salinan lewat sekretariat", href: "/kontak" }}
            />
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {legalitas.map((l) => (
                <li
                  key={l.nomor}
                  className="flex gap-4 rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand-200"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 ring-inset">
                    <Icon nama="dokumen" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-base leading-snug font-semibold text-ink">
                      {l.nama_dokumen}
                    </h2>
                    <p className="mt-2 font-mono text-sm break-words text-brand-800">{l.nomor}</p>
                    <p className="mt-2 text-xs text-ink-subtle">
                      {l.penerbit} · {l.tahun}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Section nada="pasir" className="py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <JudulSeksi
            atas="Identitas hukum"
            judul="Data yang sering"
            sorot="diminta mitra"
            rata="kiri"
            keterangan="Untuk keperluan kerja sama, proposal, atau audit pihak ketiga."
          />
          <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {[
              { k: "Nama badan hukum", v: `Yayasan ${site.nama}` },
              { k: "Bentuk", v: "Yayasan (nirlaba)" },
              {
                k: "Alamat terdaftar",
                v: `${site.alamat.jalan}, ${site.alamat.kota}, ${site.alamat.provinsi} ${site.alamat.kodePos}`,
              },
              { k: "Surel resmi", v: site.kontak.email },
              { k: "Telepon", v: site.kontak.telepon },
            ].map((baris) => (
              <div key={baris.k} className="flex flex-col gap-1 p-5 sm:flex-row sm:gap-6">
                <dt className="w-44 shrink-0 text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                  {baris.k}
                </dt>
                <dd className="text-sm text-ink">{baris.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-7 shadow-soft md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <h2 className="font-display text-display-sm text-ink">
                Butuh salinan dokumen untuk keperluan resmi?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Sekretariat yayasan melayani permintaan salinan berstempel untuk kebutuhan kerja
                sama, audit, atau pelaporan. Mohon sertakan keperluan dan lembaga Anda.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="/kontak">Ajukan permintaan</ButtonLink>
              <ButtonLink href="/transparansi" varian="garis">
                Lihat laporan
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
