import Link from "next/link";

import { DaftarRekening } from "@/components/donasi/DaftarRekening";
import { ProgramDonasiCard } from "@/components/donasi/ProgramDonasiCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { getLaporan, getProgramDonasi, getRekening } from "@/lib/content";
import { tanggalPendek } from "@/lib/format";
import { buatMetadata, jsonldNgo } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8 — ISR 15 menit. */
export const revalidate = 900;

export const metadata = buatMetadata({
  judul: "Donasi lewat LAZIS Wadi Mubarak",
  deskripsi:
    "Salurkan zakat, infak, sedekah, dan wakaf lewat LAZIS Wadi Mubarak — lembaga amil berizin Kementerian Agama RI. Setiap program memiliki target, progres, dan laporan penyaluran.",
  path: "/donasi",
  gambar: "/img/hero-donasi.svg",
});

const jenisDana = [
  {
    nama: "Zakat",
    isi: "Kewajiban 2,5% atas harta yang telah mencapai nisab dan haul. Kami salurkan hanya kepada delapan asnaf yang berhak.",
    ikon: "perisai" as const,
  },
  {
    nama: "Infak",
    isi: "Pemberian bebas nominal dan bebas waktu, dipakai untuk menutup biaya operasional program pendidikan dan sosial.",
    ikon: "donasi" as const,
  },
  {
    nama: "Sedekah",
    isi: "Pemberian sukarela, termasuk sedekah dapur santri dan santunan mendesak bagi keluarga santri.",
    ikon: "orang" as const,
  },
  {
    nama: "Wakaf",
    isi: "Menahan pokok harta dan mengalirkan manfaatnya — dipakai untuk pembangunan asrama, kelas, dan aset produktif.",
    ikon: "yayasan" as const,
  },
];

const alurSetelahDonasi = [
  "Anda mentransfer ke rekening resmi sesuai jenis dana.",
  "Kirim bukti transfer lewat WhatsApp konfirmasi agar dana tercatat atas nama Anda.",
  "Amil memverifikasi dan mencatat donasi dalam pembukuan LAZIS dalam 1×24 jam kerja.",
  "Dana disalurkan sesuai peruntukan program, diverifikasi penerima manfaatnya.",
  "Laporan penyaluran diterbitkan setiap semester dan dapat diunduh siapa pun.",
];

export default function HalamanDonasi() {
  const program = getProgramDonasi();
  const rekening = getRekening();
  const laporanPenyaluran = getLaporan().filter((l) => l.jenis === "program");

  return (
    <>
      <JsonLd data={jsonldNgo()} />

      {/* PRD §9.4 — nomor registrasi LAZIS wajib tampil tanpa menggulir di 390px.
          Karena itu blok legalitas diletakkan paling atas, sebelum apa pun. */}
      <div className="relative overflow-hidden border-b border-white/10 bg-brand-950 text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="container-page relative py-8 md:py-14">
          <Breadcrumb jejak={[{ label: "Donasi", href: "/donasi" }]} terang />

          <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-xl border border-accent-300/30 bg-accent-400/10 px-4 py-3">
            <Icon nama="perisai" className="size-4 text-accent-300" />
            <p className="text-sm font-semibold text-accent-100">
              {site.lazis.nama} — {site.lazis.nomorIzin}
            </p>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-display-md text-balance text-white md:text-display-lg">
            Titipkan zakat Anda pada lembaga yang{" "}
            <span className="text-accent-300">melaporkan penggunaannya</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-white/70">
            Kami lembaga amil resmi berizin Kementerian Agama RI. Setiap program di halaman ini
            menampilkan target, jumlah terkumpul, dan penerima manfaatnya — dan setiap semester kami
            terbitkan laporan penyalurannya.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="#rekening" varian="terang">
              Lihat rekening resmi
            </ButtonLink>
            <ButtonLink
              href="/transparansi"
              className="border border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              Periksa laporan penyaluran
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Penjelasan jenis dana */}
      <Section className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Jenis dana"
            judul="Empat pintu"
            sorot="menitipkan harta"
            keterangan="Pastikan Anda memilih jenis yang tepat: zakat memiliki ketentuan penerima yang mengikat, sedangkan infak, sedekah, dan wakaf lebih lapang peruntukannya."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {jenisDana.map((j) => (
              <li key={j.nama} className="rounded-2xl border border-line bg-white p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100 ring-inset">
                  <Icon nama={j.ikon} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{j.nama}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">{j.isi}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Daftar program */}
      <Section nada="pasir" className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Program"
            judul="Yang sedang"
            sorot="kami danai"
            keterangan="Anda dapat menentukan program tujuan saat mengirim konfirmasi transfer. Bila tidak disebutkan, dana masuk ke pos infak umum."
          />

          {program.length === 0 ? (
            <EmptyState
              className="mt-10"
              judul="Belum ada program yang dibuka"
              keterangan="Saat ini tidak ada penghimpunan yang sedang berjalan. Infak umum tetap dapat disalurkan lewat rekening resmi di bawah."
              aksi={{ label: "Lihat rekening resmi", href: "#rekening" }}
            />
          ) : (
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {program.map((p) => (
                <ProgramDonasiCard key={p.slug} program={p} />
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* Rekening resmi */}
      <Section id="rekening" className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Rekening resmi"
            judul="Hanya empat rekening ini"
            sorot="yang resmi"
            keterangan="Kami tidak pernah meminta transfer ke rekening pribadi. Bila Anda menerima permintaan atas nama perorangan, mohon laporkan kepada kami."
          />
          <div className="mt-12">
            <DaftarRekening rekening={rekening} />
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-accent-200 bg-accent-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Icon nama="info" className="mt-0.5 size-5 shrink-0 text-accent-700" />
              <p className="text-sm leading-relaxed text-accent-900">
                Setelah transfer, kirim bukti ke WhatsApp konfirmasi agar donasi tercatat atas nama
                Anda dan laporan penyalurannya bisa kami kirimkan.
              </p>
            </div>
            <ButtonLink
              href={`https://wa.me/${site.kontak.whatsapp}?text=${encodeURIComponent(
                "Assalamu'alaikum. Saya ingin mengonfirmasi donasi ke LAZIS Wadi Mubarak.",
              )}`}
              eksternal
              ukuran="sm"
              className="shrink-0"
            >
              <Icon nama="whatsapp" className="size-4" />
              Konfirmasi donasi
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Alur setelah berdonasi */}
      <Section nada="pasir" className="py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <JudulSeksi
            atas="Setelah berdonasi"
            judul="Apa yang terjadi"
            sorot="dengan uang Anda"
            rata="kiri"
            keterangan="Lima langkah ini berlaku untuk semua jenis dana, dari nominal terkecil sampai terbesar."
          />
          <ol className="flex flex-col gap-4">
            {alurSetelahDonasi.map((langkah, i) => (
              <li
                key={langkah}
                className="flex items-start gap-4 rounded-xl border border-line bg-white p-5"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-xs font-bold text-white"
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink">{langkah}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Tautan ke laporan penyaluran — PRD §9.4 kriteria terakhir */}
      <Section className="py-14 md:py-20">
        <div className="container-page">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft md:p-10">
            <h2 className="font-display text-display-md text-ink">
              Laporan <span className="text-brand-600">penyaluran</span>
            </h2>

            {laporanPenyaluran.length === 0 ? (
              <EmptyState
                className="mt-6"
                ikon="dokumen"
                judul="Laporan penyaluran belum kami terbitkan"
                keterangan="Kami belum dapat menampilkan laporan penyaluran periode ini. Laporan semester berjalan dijadwalkan terbit paling lambat 31 Januari, dan akan langsung muncul di halaman transparansi begitu tersedia."
                aksi={{ label: "Hubungi LAZIS", href: "/kontak" }}
              />
            ) : (
              <>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  Seluruh dokumen di bawah dapat diunduh siapa pun tanpa perlu mendaftar.
                </p>
                <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                  {laporanPenyaluran.map((l) => (
                    <li key={l.slug}>
                      <Link
                        href="/transparansi"
                        className="flex items-center gap-4 p-5 transition-colors hover:bg-sand-50"
                      >
                        <Icon nama="dokumen" className="size-5 shrink-0 text-brand-600" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-ink">{l.judul}</span>
                          <span className="mt-0.5 block text-xs text-ink-subtle">
                            {l.format} · {l.ukuran} · terbit {l.tahun}
                          </span>
                        </span>
                        <Icon nama="panahKanan" className="size-4 shrink-0 text-ink-subtle" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-ink-subtle">
                  Diperbarui terakhir {tanggalPendek(`${getLaporan()[0]?.tahun ?? new Date().getFullYear()}-12-31`)}.
                </p>
              </>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
