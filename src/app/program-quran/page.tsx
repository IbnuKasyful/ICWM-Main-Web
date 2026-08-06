import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { getProgramQuran } from "@/lib/content";
import { tautanWhatsApp } from "@/lib/format";
import { buatMetadata } from "@/lib/seo";

/** PRD §8 — SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Program Al-Qur'an untuk umum",
  deskripsi:
    "Graha Qur'an dan Wisata Qur'an — dua program Al-Qur'an Islamic Center Wadi Mubarak yang terbuka untuk masyarakat umum, tanpa harus menjadi santri.",
  path: "/program-quran",
  gambar: "/img/galeri-dauroh-tadabur.jpg",
});

const labelPenyelenggaraan = {
  daring: "Daring",
  luring: "Di kampus Megamendung",
} as const;

export default function HalamanProgramQuran() {
  const program = getProgramQuran();

  return (
    <>
      <PageHeader
        jejak={[
          { label: "Pendidikan", href: "/program" },
          { label: "Program Al-Qur'an", href: "/program-quran" },
        ]}
        atas="Terbuka untuk umum"
        judul="Belajar Al-Qur'an di Wadi Mubarak tanpa harus mondok"
        keterangan="Tidak semua orang bisa menempuh jenjang bertahun-tahun di asrama. Dua program berikut dibuka untuk siapa saja — satu berjalan daring dari mana pun Anda berada, satu lagi berupa camp singkat di kampus Megamendung."
      />

      {/* Ringkasan dua program berdampingan, supaya pengunjung bisa memilih
          sebelum membaca rinciannya. */}
      <Section className="py-12 md:py-16">
        <div className="container-page">
          <ul className="grid gap-5 sm:mx-auto sm:max-w-3xl md:max-w-none md:grid-cols-2">
            {program.map((p) => (
              <li
                key={p.slug}
                className="flex flex-col rounded-[28px] bg-white p-2 shadow-card"
              >
                {/* Panel gambar bertumpuk teks — latar masih placeholder sampai
                    fotonya siap. */}
                <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[22px] bg-gradient-to-br from-mist-200 to-mist-400">
                  {/* Tombol suka dekoratif di pojok, mengikuti referensi. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-inset ring-white/40 backdrop-blur-sm"
                  >
                    <Icon nama="hati" className="size-4" tebal={2} />
                  </span>

                  {/* Kerudung gelap di bawah supaya teks putih tetap terbaca
                      begitu foto asli dipasang. */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent" />

                  <div className="relative p-4">
                    <h2 className="font-display text-display-sm text-white">{p.nama}</h2>
                    <p className="mt-0.5 text-sm text-white/70">
                      {labelPenyelenggaraan[p.penyelenggaraan]}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white/90">
                      <Icon nama="jam" className="size-4 text-white/70" />
                      {p.durasi}
                    </div>
                  </div>
                </div>

                <a
                  href={`#${p.slug}`}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
                >
                  Baca rinciannya
                  <Icon nama="panahBawah" className="size-3.5" tebal={2.2} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Rincian per program. Nada latar berselang-seling agar batas antar-program
          terbaca tanpa perlu garis pemisah. */}
      {program.map((p, i) => (
        <Section
          key={p.slug}
          id={p.slug}
          nada={i % 2 === 0 ? "sejuk" : "putih"}
          className="scroll-mt-24 py-14 md:py-20"
        >
          <div className="container-page" style={{ ["--program-accent" as string]: p.warna_aksen }}>
            <JudulSeksi
              atas={labelPenyelenggaraan[p.penyelenggaraan]}
              judul={p.nama}
              rata="kiri"
              keterangan={p.ringkasan}
            />

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {[
                { label: "Durasi", nilai: p.durasi, ikon: "jam" as const },
                { label: "Peserta", nilai: p.peserta, ikon: "orang" as const },
                { label: "Biaya", nilai: p.biaya, ikon: "uang" as const },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1 bg-white p-5">
                  <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                    <Icon nama={item.ikon} className="size-3.5 text-brand-500" />
                    {item.label}
                  </dt>
                  <dd className="text-sm font-semibold text-balance text-ink">{item.nilai}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">Untuk siapa</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {p.untuk_siapa.map((poin) => (
                    <li
                      key={poin}
                      className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink"
                    >
                      <span
                        className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: "var(--program-accent)" }}
                      >
                        <Icon nama="centang" className="size-3" tebal={2.6} />
                      </span>
                      {poin}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-10 font-display text-lg font-semibold text-ink">
                  {p.slug === "graha-quran" ? "Tingkat belajar" : "Materi kegiatan"}
                </h3>
                <dl className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
                  {p.materi.map((m) => (
                    <div key={m.judul} className="p-5">
                      <dt className="font-display text-base font-semibold text-ink">{m.judul}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{m.isi}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Yang membedakan program ini
                </h3>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {p.sorotan.map((s, n) => (
                    <li key={s.judul} className="rounded-2xl border border-line bg-white p-5">
                      <span
                        className="inline-flex size-8 items-center justify-center rounded-lg font-display text-xs font-bold text-white"
                        style={{ backgroundColor: "var(--program-accent)" }}
                      >
                        {String(n + 1).padStart(2, "0")}
                      </span>
                      <h4 className="mt-3 font-display text-base leading-snug font-semibold text-ink">
                        {s.judul}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">
                        {s.isi}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-line bg-white p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">Cara mendaftar</h3>
                  <ol className="mt-4 flex flex-col gap-3">
                    {p.alur_daftar.map((langkah, n) => (
                      <li key={langkah} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xs font-bold text-brand-700"
                        >
                          {n + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-ink">{langkah}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                    <ButtonLink
                      href={tautanWhatsApp(
                        p.kontak_wa,
                        `Assalamu'alaikum. Saya ingin bertanya mengenai program ${p.nama} di Wadi Mubarak.`,
                      )}
                      eksternal
                    >
                      <Icon nama="whatsapp" className="size-4" />
                      Tanya panitia {p.nama_pendek}
                    </ButtonLink>
                    {p.instagram ? (
                      <ButtonLink href={p.instagram} eksternal varian="garis">
                        Instagram program
                        <Icon nama="keluar" className="size-4" />
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Arahan lanjut bagi yang ternyata mencari pendidikan berjenjang. */}
      <Section nada="sejuk" className="py-14 md:py-20">
        <div className="container-page">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-card md:p-10">
            <h2 className="font-display text-display-md text-balance text-ink">
              Mencari pendidikan <span className="text-brand-600">berjenjang</span>, bukan program
              singkat?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-ink-muted">
              Kedua program di halaman ini tidak menerbitkan ijazah dan tidak menggantikan sekolah.
              Bila yang Anda cari adalah pendidikan formal dari tahfizh anak usia dini sampai
              perguruan tinggi, atau kaderisasi guru Al-Qur&apos;an, mulailah dari halaman unit.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/program">Lihat unit pendidikan</ButtonLink>
              <ButtonLink href="/faq" varian="garis">
                Pertanyaan umum
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
