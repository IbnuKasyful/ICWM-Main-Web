import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/site/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import { getCapaian, getTestimoni } from "@/lib/content";
import { buatMetadata } from "@/lib/seo";

/** PRD §8 — SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Tentang Islamic Center Wadi Mubarak",
  deskripsi:
    "Sejarah, visi, misi, dan arah gerak Islamic Center Wadi Mubarak — yayasan yang berdiri sejak 2008 di Megamendung dan kini menaungi sebelas unit pendidikan, jaringan sekolah Sahabat Al-Qur'an di 27 provinsi, serta lembaga amil zakat.",
  path: "/tentang",
  gambar: "/img/hero-tentang.svg",
});

/**
 * Hanya tonggak yang tercatat di kanal resmi yayasan. Tahun berdirinya unit
 * menengah, MBS, dan STIU belum dimuat di sini karena tanggalnya belum ada
 * rujukan resmi — mohon dilengkapi sekretariat sebelum mode pratinjau dimatikan.
 */
const perjalanan = [
  {
    tahun: "2008",
    isi: "Islamic Center Wadi Mubarak berdiri pada 3 Februari 2008 di Megamendung, Bogor, didirikan oleh Roid Kadir, Awang Djohan, dan KH. Dr. Didik Hariyanto.",
  },
  {
    tahun: "2021",
    isi: "LAZIS Wadi Mubarak memperoleh izin resmi dari Kementerian Agama RI.",
  },
  {
    tahun: "2025",
    isi: "Ma'had Tahfizh Intensif Imtiaz Putri membuka tahun ajaran pertamanya bagi lulusan SMA sederajat.",
  },
  {
    tahun: "Juni 2026",
    isi: "Wisuda Akbar Huffazhul Qur'an ke-5 meluluskan 181 wisudawan dari seluruh unit yayasan.",
  },
  {
    tahun: "Agustus 2026",
    isi: "I'dad Mu'allimat membuka pendaftaran angkatan pertama: kaderisasi guru TAUD selama dua tahun dengan pembiayaan yayasan.",
  },
];

export default function HalamanTentang() {
  const capaian = getCapaian();
  const testimoni = getTestimoni();

  return (
    <>
      <PageHeader
        jejak={[{ label: "Tentang", href: "/tentang" }]}
        atas="Profil yayasan"
        judul="Delapan belas tahun menemani santri dan keluarganya"
        keterangan="Berdiri di Megamendung pada 3 Februari 2008, hari ini Islamic Center Wadi Mubarak menaungi sebelas unit pendidikan — dari tahfizh anak usia dini sampai perguruan tinggi — empat jalur kaderisasi guru Al-Qur'an, jaringan 197 sekolah Sahabat Al-Qur'an di 27 provinsi, dan sebuah lembaga amil zakat berizin resmi."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl bg-mist-100 pointer-events-none">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/IWsHfr73kYg?autoplay=1&mute=1&loop=1&playlist=IWsHfr73kYg&controls=0&rel=0"
              title="Video Profil Yayasan Islamic Center Wadi Mubarak"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <StatBlock data={capaian} className="mt-10" />
        </div>
      </Section>

      {/* Visi & misi */}
      <Section nada="sejuk" className="py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <JudulSeksi
            atas="Arah gerak"
            judul="Ke mana yayasan ini"
            sorot="hendak menuju"
            rata="kiri"
          />
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-brand-700">Visi</h3>
              <p className="mt-3 text-base leading-relaxed text-pretty text-ink">
                Meraih kebangkitan umat Islam dan mengembalikan kejayaannya melalui Al-Qur&apos;an
                dan As-Sunnah sebagai pedoman dan motivasi hidup.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-brand-700">Misi</h3>
              <ol className="mt-4 flex flex-col gap-3">
                {[
                  "Mempersiapkan kader imam, dai, dan guru yang menegakkan Al-Qur'an dan As-Sunnah.",
                  "Menyediakan lembaga pendidikan dan dakwah yang dapat dijangkau seluruh lapisan masyarakat.",
                  "Mendirikan unit usaha yang menopang berjalannya program pendidikan dan dakwah yayasan.",
                ].map((m, i) => (
                  <li key={m} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xs font-bold text-brand-700"
                    >
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      {/* Perjalanan */}
      <Section className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi atas="Perjalanan" judul="Dari Megamendung," sorot="sejak 2008" />
          <ol className="relative mt-12 ml-3 border-l border-line-strong pl-8">
            {perjalanan.map((p) => (
              <li key={p.tahun} className="relative pb-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[2.3rem] size-3 rounded-full border-2 border-white bg-brand-600"
                />
                <p className="font-display text-lg font-bold text-brand-700">{p.tahun}</p>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-pretty text-ink-muted">
                  {p.isi}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Testimoni */}
      {testimoni.length > 0 ? (
        <Section nada="sejuk" className="py-14 md:py-20">
          <div className="container-page">
            <JudulSeksi
              atas="Kata mereka"
              judul="Suara wali santri,"
              sorot="alumni, dan jamaah"
            />
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {testimoni.map((t) => (
                <li key={t.slug} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                  <Icon nama="quran" className="size-6 text-accent-700" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-pretty text-ink italic">
                    &ldquo;{t.kutipan}&rdquo;
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    {t.foto ? (
                      <Image
                        src={t.foto.src}
                        alt=""
                        width={t.foto.width}
                        height={t.foto.height}
                        sizes="40px"
                        className="size-10 rounded-full object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.nama}</p>
                      <p className="text-xs text-ink-subtle">{t.peran}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Tautan lanjut */}
      <Section className="py-14 md:py-20">
        <div className="container-page">
          <ul className="grid gap-4 md:grid-cols-3">
            {[
              { judul: "Donasi", isi: "Zakat, infak, sedekah, dan wakaf lewat LAZIS berizin resmi.", href: "/donasi" },
              { judul: "Unit pendidikan", isi: "Sebelas unit dari tahfizh anak usia dini sampai perguruan tinggi.", href: "/program" },
              { judul: "Program Al-Qur'an untuk umum", isi: "Graha Qur'an daring dan short camp Wisata Qur'an.", href: "/program-quran" },
            ].map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
                >
                  <h3 className="font-display text-lg font-semibold text-ink">{t.judul}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-muted">{t.isi}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Buka halaman
                    <Icon nama="panahKanan" className="size-3.5 transition-transform group-hover:translate-x-0.5" tebal={2.2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
