import Image from "next/image";

import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import { getCapaian, getProgramDonasi } from "@/lib/content";
import { angka } from "@/lib/format";
import { buatMetadata } from "@/lib/seo";

/** PRD §8 — ISR 1 jam. */
export const revalidate = 3600;

export const metadata = buatMetadata({
  judul: "Dampak program",
  deskripsi:
    "Angka capaian Islamic Center Wadi Mubarak beserta cara kami menghitungnya: santri aktif, alumni, hafizh, penerima beasiswa, dan jangkauan program masyarakat.",
  path: "/dampak",
  gambar: "/img/hero-dampak.svg",
});

const cerita = [
  {
    judul: "180 santri bersekolah tanpa membebani keluarganya",
    isi: "Penerima beasiswa LAZIS bersekolah dengan hak dan kewajiban yang sama persis dengan santri lain — tidak ada kelas terpisah, tidak ada penanda apa pun pada seragam mereka.",
    angka: "180",
    label: "penerima beasiswa aktif",
  },
  {
    judul: "512 hafizh yang hafalannya masih terjaga",
    isi: "Kami menghitung hafizh berdasarkan yang lulus ujian tasmi' 30 juz, bukan yang pernah menyetorkannya. Program muraja'ah alumni menjaga agar angka ini bermakna.",
    angka: "512",
    label: "hafizh 30 juz",
  },
  {
    judul: "Kelas Al-Qur'an gratis untuk warga sekitar",
    isi: "Setiap angkatan menerima 120 peserta dewasa dan lansia dari sekitar kampus, dibiayai penuh oleh dana infak. Tidak ada biaya pendaftaran maupun iuran bulanan.",
    angka: "120",
    label: "peserta per angkatan",
  },
];

const metodologi = [
  {
    judul: "Santri aktif",
    isi: "Dihitung pada awal semester ganjil dari data induk seluruh unit, tidak termasuk santri yang mengundurkan diri sebelum pekan keempat.",
  },
  {
    judul: "Alumni",
    isi: "Akumulasi lulusan sejak 1998 yang menerima ijazah atau sertifikat kelulusan program, tanpa penghitungan ganda antar-jenjang.",
  },
  {
    judul: "Hafizh 30 juz",
    isi: "Hanya santri yang lulus ujian tasmi' penuh di hadapan tim penguji. Setoran parsial tidak dihitung.",
  },
  {
    judul: "Pengajar & pengasuh",
    isi: "Guru, musyrif, dan tenaga kependidikan tetap maupun kontrak yang aktif pada tahun ajaran berjalan.",
  },
];

export default async function HalamanDampak() {
  const capaian = getCapaian();
  const program = await getProgramDonasi();
  const totalTerkumpul = program.reduce((jml, p) => jml + p.terkumpul, 0);
  const totalPenerima = program.length;

  return (
    <>
      <PageHeader
        jejak={[{ label: "Dampak", href: "/dampak" }]}
        atas="Dampak"
        judul="Angka yang bisa dipertanggungjawabkan"
        keterangan="Setiap angka di halaman ini punya definisi dan cara hitungnya sendiri. Kami cantumkan metodologinya supaya angka ini bisa Anda uji, bukan sekadar dipercaya."
        nada="gelap"
        aksi={
          <ButtonLink
            href="/transparansi"
            className="border border-white/25 bg-transparent text-white hover:bg-white/10"
          >
            Unduh laporan lengkap
          </ButtonLink>
        }
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          <StatBlock data={capaian} />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
              <p className="font-display text-display-sm text-accent-800">
                Rp {angka(Math.round(totalTerkumpul / 1_000_000))} jt
              </p>
              <p className="mt-1 text-sm font-semibold text-accent-900">
                dana umat terhimpun pada program berjalan
              </p>
              <p className="mt-2 text-xs leading-relaxed text-accent-800/80">
                Akumulasi seluruh program yang sedang dibuka, per rekapitulasi terakhir.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
              <p className="font-display text-display-sm text-brand-800">{totalPenerima} program</p>
              <p className="mt-1 text-sm font-semibold text-brand-900">
                berjalan dengan target dan laporan tersendiri
              </p>
              <p className="mt-2 text-xs leading-relaxed text-brand-800/80">
                Masing-masing memiliki penerima manfaat yang diverifikasi tim amil.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section nada="sejuk" className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Di balik angka"
            judul="Tiga hal yang paling"
            sorot="berubah"
            keterangan="Angka tidak menceritakan apa pun tanpa konteks. Berikut yang sebenarnya terjadi di baliknya."
          />
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {cerita.map((c) => (
              <li key={c.judul} className="flex flex-col rounded-2xl border border-line bg-white p-7">
                <p className="font-display text-display-md text-brand-600">{c.angka}</p>
                <p className="mt-1 text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                  {c.label}
                </p>
                <h3 className="mt-5 font-display text-lg leading-snug font-semibold text-balance text-ink">
                  {c.judul}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-ink-muted">
                  {c.isi}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-3xl bg-mist-100">
              <Image
                src="/img/hero-dampak.svg"
                alt="Santri penerima beasiswa mengikuti kelas bersama santri lain tanpa pembeda"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          <div>
            <JudulSeksi
              atas="Metodologi"
              judul="Bagaimana kami"
              sorot="menghitungnya"
              rata="kiri"
              keterangan="Definisi ini kami pakai konsisten setiap tahun agar angka antar-periode bisa dibandingkan."
            />
            <dl className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
              {metodologi.map((m) => (
                <div key={m.judul} className="p-5">
                  <dt className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                    <Icon nama="centang" className="size-4 text-brand-600" tebal={2.2} />
                    {m.judul}
                  </dt>
                  <dd className="mt-1.5 pl-6 text-sm leading-relaxed text-ink-muted">{m.isi}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
