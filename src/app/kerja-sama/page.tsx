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
  judul: "Kemitraan TAUD & MIT Sahabat Al-Qur'an",
  deskripsi:
    "Untuk saat ini kemitraan Islamic Center Wadi Mubarak dibuka khusus untuk dua jenjang: TAUD Sahabat Al-Qur'an (tahfizh anak usia dini) dan MIT Sahabat Al-Qur'an (madrasah ibtidaiyah tahfizh).",
  path: "/kerja-sama",
  gambar: "/img/hero-kerja-sama.svg",
});

const bentukKerjaSama: { judul: string; isi: string; ikon: NamaIkon }[] = [
  {
    judul: "Pendirian TAUD Sahabat Al-Qur'an",
    isi: "Merintis unit tahfizh anak usia dini di daerah Anda memakai merek, kurikulum, dan pendampingan pembukaan cabang Sahabat Al-Qur'an.",
    ikon: "sekolah",
  },
  {
    judul: "Pendirian MIT Sahabat Al-Qur'an",
    isi: "Membuka madrasah ibtidaiyah terpadu Sahabat Al-Qur'an dengan kurikulum tahfizh dan standar madrasah Kementerian Agama.",
    ikon: "sekolah",
  },
  {
    judul: "Adopsi kurikulum & pelatihan guru",
    isi: "Penggunaan kurikulum tahfizh TAUD dan MIT beserta pelatihan serta tashih bacaan bagi guru lembaga mitra.",
    ikon: "quran",
  },
  {
    judul: "Pendampingan mutu & operasional",
    isi: "Supervisi berkala, penjaminan mutu, dan pendampingan tata kelola agar TAUD dan MIT mitra berjalan sesuai standar.",
    ikon: "perisai",
  },
];

const alurPengajuan = [
  "Kirim pengajuan lewat formulir di halaman ini atau surel kemitraan.",
  "Sekretariat menghubungi Anda dalam 2–3 hari kerja untuk penjadwalan pembicaraan awal.",
  "Penyusunan ruang lingkup, penanggung jawab, dan jangka waktu kemitraan.",
  "Penandatanganan nota kesepahaman dan penetapan narahubung kedua pihak.",
];

export default function HalamanKerjaSama() {
  const mitra = getMitra();

  return (
    <>
      <PageHeader
        jejak={[{ label: "Kemitraan", href: "/kerja-sama" }]}
        atas="Kemitraan"
        judul="Kemitraan yang kami buka untuk TAUD & MIT"
        keterangan="Untuk saat ini kemitraan Islamic Center Wadi Mubarak difokuskan pada dua jenjang: TAUD Sahabat Al-Qur'an (tahfizh anak usia dini) dan MIT Sahabat Al-Qur'an (madrasah ibtidaiyah tahfizh). Kemitraan di luar kedua jenjang ini untuk sementara belum kami buka."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          <JudulSeksi
            atas="Bentuk kemitraan"
            judul="Empat pintu"
            sorot="kemitraan TAUD & MIT"
            keterangan="Untuk kunjungan lembaga atau kerja sama di luar TAUD dan MIT, silakan hubungi sekretariat lebih dulu — kami arahkan sesuai ketersediaan."
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
                Surel kemitraan
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
            <h2 className="font-display text-display-sm text-ink">Ajukan kemitraan</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Sebutkan nama lembaga, jenjang yang dituju (TAUD atau MIT), dan rencana lokasinya.
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
