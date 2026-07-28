import { FormKontak } from "@/components/kontak/FormKontak";
import { PageHeader } from "@/components/site/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { getMitra } from "@/lib/content";
import { labelJenisMitra } from "@/lib/format";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8 — SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Kerja sama & kemitraan",
  deskripsi:
    "Bentuk kerja sama yang terbuka bersama Islamic Center Wadi Mubarak: kemitraan pendidikan, program sosial, kunjungan lembaga, dan tanggung jawab sosial perusahaan.",
  path: "/kerja-sama",
  gambar: "/img/hero-kerja-sama.svg",
});

const bentukKerjaSama: { judul: string; isi: string; ikon: NamaIkon }[] = [
  {
    judul: "Kemitraan pendidikan",
    isi: "Pertukaran kurikulum tahfizh, pelatihan pengampu halaqah, dan penyelenggaraan program bersama untuk lembaga pendidikan lain.",
    ikon: "sekolah",
  },
  {
    judul: "Program sosial bersama",
    isi: "Beasiswa bersama untuk santri yatim dan dhuafa, program pemberdayaan warga sekitar kampus, dan penyaluran bantuan.",
    ikon: "donasi",
  },
  {
    judul: "Kunjungan & studi banding",
    isi: "Kunjungan lembaga untuk mempelajari tata kelola pesantren, kurikulum tahfizh, atau pengelolaan lembaga amil zakat.",
    ikon: "orang",
  },
  {
    judul: "Tanggung jawab sosial perusahaan",
    isi: "Penyaluran dana CSR untuk pembangunan sarana, pengadaan mushaf, atau pembiayaan operasional program masyarakat.",
    ikon: "kerjasama",
  },
];

const alurPengajuan = [
  "Kirim pengajuan lewat formulir di halaman ini atau surel kerja sama.",
  "Sekretariat menghubungi Anda dalam 2–3 hari kerja untuk penjadwalan pembicaraan awal.",
  "Penyusunan ruang lingkup, penanggung jawab, dan jangka waktu kerja sama.",
  "Penandatanganan nota kesepahaman dan penetapan narahubung kedua pihak.",
];

export default function HalamanKerjaSama() {
  const mitra = getMitra();

  return (
    <>
      <PageHeader
        jejak={[{ label: "Kerja sama", href: "/kerja-sama" }]}
        atas="Kemitraan"
        judul="Kerja sama yang kami buka"
        keterangan="Kami bekerja sama dengan lembaga pendidikan, pemerintah, lembaga sosial, dan perusahaan — selama tujuannya jelas dan dapat dipertanggungjawabkan kepada kedua pihak."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          <JudulSeksi
            atas="Bentuk kerja sama"
            judul="Empat pintu"
            sorot="kemitraan"
            keterangan="Bila kebutuhan Anda tidak masuk salah satu kategori ini, tetap sampaikan — kami menilai setiap pengajuan berdasarkan manfaatnya."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {bentukKerjaSama.map((b) => (
              <li key={b.judul} className="rounded-2xl border border-line bg-white p-6 md:p-8">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 ring-inset">
                  <Icon nama={b.ikon} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{b.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">{b.isi}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Mitra */}
      <Section nada="sejuk" className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi atas="Mitra" judul="Lembaga yang" sorot="bekerja bersama kami" />
          {mitra.length === 0 ? (
            <EmptyState
              className="mt-10"
              ikon="kerjasama"
              judul="Daftar mitra sedang diperbarui"
              keterangan="Kami sedang memperbarui daftar mitra beserta izin penggunaan identitas masing-masing lembaga. Silakan hubungi sekretariat untuk keterangan lebih lanjut."
              aksi={{ label: "Hubungi sekretariat", href: "/kontak" }}
            />
          ) : (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mitra.map((m) => (
                <li key={m.slug} className="rounded-2xl border border-line bg-white p-6">
                  <Badge nada="netral">{labelJenisMitra[m.jenis]}</Badge>
                  <h3 className="mt-3 font-display text-base leading-snug font-semibold text-balance text-ink">
                    {m.nama}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{m.keterangan}</p>
                  <p className="mt-4 border-t border-line pt-3 text-xs text-ink-subtle">
                    Bermitra sejak {m.sejak}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* Alur + formulir */}
      <Section className="py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <JudulSeksi
              atas="Alur pengajuan"
              judul="Empat langkah"
              sorot="sampai kesepakatan"
              rata="kiri"
            />
            <ol className="mt-8 flex flex-col gap-4">
              {alurPengajuan.map((langkah, i) => (
                <li key={langkah} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-xs font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink">{langkah}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl border border-line bg-mist-50 p-6">
              <p className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                Surel kerja sama
              </p>
              <a
                href={`mailto:${site.kontak.emailKerjaSama}`}
                className="mt-1 block text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
              >
                {site.kontak.emailKerjaSama}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Untuk kunjungan lembaga, mohon ajukan paling lambat dua pekan sebelum tanggal yang
                direncanakan.
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl border border-line bg-white p-6 shadow-soft md:p-8">
            <h2 className="font-display text-display-sm text-ink">Ajukan kerja sama</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Sebutkan nama lembaga, bentuk kerja sama yang diinginkan, dan jangka waktunya.
            </p>
            <div className="mt-7">
              <FormKontak keperluanAwal="kerja-sama" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
