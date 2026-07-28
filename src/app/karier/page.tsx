import { PageHeader } from "@/components/site/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { labelLokasi } from "@/lib/format";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Lokasi } from "@/lib/schemas";

/** PRD §8 — ISR 1 jam. */
export const revalidate = 3600;

export const metadata = buatMetadata({
  judul: "Karier",
  deskripsi:
    "Lowongan pengajar, musyrif, dan tenaga kependidikan di Islamic Center Wadi Mubarak, kampus Bogor dan Sleman.",
  path: "/karier",
});

/**
 * Lowongan masih ditulis di berkas ini karena CPT khusus lowongan tidak ada
 * dalam daftar Fase 1 (PRD §7.3) — menambahkannya butuh revisi dokumen lebih
 * dulu. Ketika CPT tersedia, ganti sumbernya tanpa mengubah tampilan.
 */
const lowongan: {
  judul: string;
  unit: string;
  lokasi: Lokasi;
  jenis: string;
  syarat: string[];
}[] = [
  {
    judul: "Pengampu Tahfizh Putra",
    unit: "SMP & SMA Tahfizh Putra",
    lokasi: "bogor",
    jenis: "Penuh waktu · menetap di asrama",
    syarat: [
      "Hafalan minimal 30 juz dengan bacaan mutqin",
      "Bersedia tinggal di lingkungan asrama",
      "Pengalaman mengampu halaqah minimal 1 tahun",
    ],
  },
  {
    judul: "Guru Kelas SDIT",
    unit: "SDIT Wadi Mubarak",
    lokasi: "bogor",
    jenis: "Penuh waktu",
    syarat: [
      "S1 Pendidikan atau bidang terkait",
      "Hafalan minimal 3 juz",
      "Terbiasa dengan pembelajaran berbasis proyek",
    ],
  },
  {
    judul: "Musyrifah Asrama Putri",
    unit: "SMP & SMA Tahfizh Putri",
    lokasi: "bogor",
    jenis: "Penuh waktu · menetap di asrama",
    syarat: [
      "Perempuan, usia maksimal 35 tahun",
      "Hafalan minimal 10 juz",
      "Mampu mendampingi remaja dengan sabar dan terstruktur",
    ],
  },
  {
    judul: "Guru Pendamping TAUD",
    unit: "TAUD SAQU Sleman",
    lokasi: "sleman",
    jenis: "Penuh waktu",
    syarat: [
      "Latar belakang PAUD atau psikologi anak",
      "Berdomisili di sekitar Sleman",
      "Menyukai pendampingan anak usia dini",
    ],
  },
];

const alasan = [
  {
    judul: "Kelas kecil, dampak besar",
    isi: "Rasio pengampu dan santri dibatasi supaya Anda benar-benar sempat mengenal setiap anak yang Anda ampu.",
  },
  {
    judul: "Pengembangan berkelanjutan",
    isi: "Pelatihan metode tahfizh, kelas bahasa Arab, dan beasiswa lanjut studi bagi tenaga pendidik tetap.",
  },
  {
    judul: "Tempat tinggal & kebutuhan harian",
    isi: "Untuk posisi menetap, yayasan menyediakan tempat tinggal, makan, dan layanan kesehatan.",
  },
];

export default function HalamanKarier() {
  return (
    <>
      <PageHeader
        jejak={[{ label: "Karier", href: "/karier" }]}
        atas="Karier"
        judul="Bergabung sebagai pendidik"
        keterangan="Kami mencari orang yang bertahan lama, bukan sekadar mengisi jam mengajar. Bila Anda merasa cocok dengan cara kami bekerja, silakan kirim lamaran."
        aksi={
          <ButtonLink href={`mailto:${site.kontak.email}?subject=Lamaran%20Kerja`}>
            <Icon nama="surel" className="size-4" />
            Kirim lamaran
          </ButtonLink>
        }
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          <h2 className="font-display text-display-md text-ink">
            Lowongan <span className="text-brand-600">yang dibuka</span>
          </h2>

          {lowongan.length === 0 ? (
            <EmptyState
              className="mt-8"
              ikon="orang"
              judul="Tidak ada lowongan yang sedang dibuka"
              keterangan="Saat ini seluruh formasi telah terisi. Anda tetap dapat mengirim lamaran terbuka — berkas Anda kami simpan dan hubungi kembali saat formasi yang sesuai dibuka."
              aksi={{ label: "Kirim lamaran terbuka", href: "/kontak" }}
            />
          ) : (
            <ul className="mt-8 grid gap-4 lg:grid-cols-2">
              {lowongan.map((l) => (
                <li key={l.judul} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge nada="brand">{labelLokasi[l.lokasi]}</Badge>
                    <Badge nada="netral">{l.jenis}</Badge>
                  </div>
                  <h3 className="mt-4 font-display text-lg leading-snug font-semibold text-ink">
                    {l.judul}
                  </h3>
                  <p className="mt-1 text-sm text-ink-subtle">{l.unit}</p>

                  <ul className="mt-4 flex flex-1 flex-col gap-2">
                    {l.syarat.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-ink-muted">
                        <Icon nama="centang" className="mt-0.5 size-3.5 shrink-0 text-brand-600" tebal={2.4} />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={`mailto:${site.kontak.email}?subject=${encodeURIComponent(`Lamaran — ${l.judul}`)}`}
                    varian="garis"
                    ukuran="sm"
                    className="mt-6 self-start"
                  >
                    Lamar posisi ini
                  </ButtonLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Section nada="sejuk" className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi atas="Mengapa di sini" judul="Yang kami" sorot="tawarkan" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {alasan.map((a) => (
              <li key={a.judul} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-base font-semibold text-ink">{a.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">{a.isi}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-accent-200 bg-accent-50 p-6">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-accent-900">
              <Icon nama="perisai" className="mt-0.5 size-4 shrink-0" />
              Seluruh calon tenaga pendidik menjalani pemeriksaan latar belakang dan menandatangani
              komitmen perlindungan anak sebelum mulai bertugas.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
