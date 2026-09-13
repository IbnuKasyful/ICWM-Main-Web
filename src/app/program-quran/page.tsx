import Image from "next/image";

import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
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

/**
 * Latar ornamen untuk kartu berlatar terang di halaman ini, supaya bidang
 * putihnya tidak terasa kosong. Teksel `ornamen-islami` diredupkan dari pojok
 * kiri atas — padat di sudut kanan bawah yang memang lapang, hilang di sekitar
 * judul agar tidak mengganggu keterbacaan.
 *
 * Pemanggil wajib punya `relative isolate` (atau posisi lain) dan sudut
 * membulat: ornamen ditaruh di `-z-10` agar berada di bawah teks tanpa perlu
 * menandai setiap anak dengan `relative`.
 */
function OrnamenKartu({ className = "opacity-[0.09]" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] [mask-image:linear-gradient(to_top_left,black,transparent_62%)]"
    >
      <span
        className={cn(
          "ornamen-islami absolute -inset-6 text-brand-600 transition-opacity duration-300",
          className,
        )}
      />
    </span>
  );
}

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

            {/* Biaya tidak ditampilkan di situs; yang berlaku adalah rincian
                dari panitia program. Lihat catatan yang sama di halaman
                profil unit. */}
            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {[
                { label: "Durasi", nilai: p.durasi, ikon: "jam" as const },
                { label: "Peserta", nilai: p.peserta, ikon: "orang" as const },
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

            {/* Sorotan dalam kisi bento: sel pertama berisi judul seksi dan
                ajakan, sisanya kartu. Satu kartu digelapkan agar mata punya
                titik masuk, bukan enam kotak yang sama rata. */}
            <div className="mt-12 grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-8">
              <div className="flex flex-col items-start justify-center px-1 py-2 sm:py-4">
                <h3 className="font-display text-display-md text-balance text-ink">
                  Yang membedakan program ini
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-muted">
                  Sebelum mendaftar, ada baiknya Anda tahu bagaimana {p.nama_pendek} dijalankan.
                  Berikut {p.sorotan.length} hal yang paling menentukannya.
                </p>
                <a
                  href={`#${p.slug}-daftar`}
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--program-accent)" }}
                >
                  Cara mendaftar
                  <Icon nama="panahBawah" className="size-3.5" tebal={2.2} />
                </a>
              </div>

              {p.sorotan.map((s, n) => {
                /* Kartu pertama sudah gelap sejak awal sebagai contoh tampilan
                   tersorot; sisanya menggelap saat disorot kursor. Begitu salah
                   satu kartu lain disorot, kartu pertama menyerah dan ikut
                   memutih — `:has(~ article:hover)` menandai keadaan itu, jadi
                   hanya ada satu kartu gelap pada satu waktu. Nada gelapnya
                   biru tua merek, bukan hitam netral. */
                const gelap = n === 0;
                return (
                  <article
                    key={s.judul}
                    className={cn(
                      "group relative isolate flex flex-col rounded-[22px] border p-6 transition duration-300",
                      gelap
                        ? "border-transparent bg-brand-950 text-white shadow-[0_22px_45px_-20px_rgba(0,12,40,0.7)] has-[~_article:hover]:border-line has-[~_article:hover]:bg-white has-[~_article:hover]:shadow-card lg:-my-3 lg:py-9"
                        : "border-line bg-white shadow-card hover:-translate-y-0.5 hover:border-brand-950 hover:bg-brand-950 hover:shadow-[0_20px_42px_-18px_rgba(0,12,40,0.6)]",
                    )}
                  >
                    {/* Ornamen ikut surut begitu kartu menggelap — nada gelap
                        sudah cukup mengisi bidangnya sendiri. */}
                    <OrnamenKartu
                      className={
                        gelap
                          ? "opacity-0 group-has-[~_article:hover]:opacity-[0.09]"
                          : "opacity-[0.09] group-hover:opacity-0"
                      }
                    />

                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-inset transition duration-300",
                          gelap
                            ? "text-white ring-white/30 group-has-[~_article:hover]:text-[var(--program-accent)] group-has-[~_article:hover]:ring-line"
                            : "text-[var(--program-accent)] ring-line group-hover:text-white group-hover:ring-white/30",
                        )}
                      >
                        <Icon nama={s.ikon} className="size-4" />
                      </span>
                      <h4
                        className={cn(
                          "font-display text-base leading-snug font-semibold text-balance transition-colors duration-300",
                          gelap
                            ? "text-white group-has-[~_article:hover]:text-ink"
                            : "text-ink group-hover:text-white",
                        )}
                      >
                        {s.judul}
                      </h4>
                    </div>
                    <p
                      className={cn(
                        "mt-4 text-sm leading-relaxed text-pretty transition-colors duration-300",
                        gelap
                          ? "text-white/75 group-has-[~_article:hover]:text-ink-muted"
                          : "text-ink-muted group-hover:text-white/75",
                      )}
                    >
                      {s.isi}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">Untuk siapa</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {p.untuk_siapa.map((poin) => (
                    <li
                      key={poin}
                      className="group relative isolate flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink transition duration-300 hover:-translate-y-0.5 hover:border-brand-950 hover:bg-brand-950 hover:shadow-[0_20px_42px_-18px_rgba(0,12,40,0.6)]"
                    >
                      {/* Petaknya kecil, jadi ornamennya dibuat lebih tipis
                          daripada di kartu besar. */}
                      <OrnamenKartu className="opacity-[0.06] transition-opacity duration-300 group-hover:opacity-0" />
                      <span
                        className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: "var(--program-accent)" }}
                      >
                        <Icon nama="centang" className="size-3" tebal={2.6} />
                      </span>
                      <span className="transition-colors duration-300 group-hover:text-white">
                        {poin}
                      </span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-10 font-display text-lg font-semibold text-ink">
                  {p.slug === "graha-quran" ? "Tingkat belajar" : "Materi kegiatan"}
                </h3>
                <dl className="mt-4 flex flex-col gap-3">
                  {p.materi.map((m) => (
                    <div
                      key={m.judul}
                      className="group relative isolate flex items-start justify-between gap-4 rounded-xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-950 hover:bg-brand-950 hover:shadow-[0_20px_42px_-18px_rgba(0,12,40,0.6)]"
                    >
                      <OrnamenKartu className="opacity-[0.06] transition-opacity duration-300 group-hover:opacity-0" />
                      <div>
                        <dt className="font-display text-base font-semibold text-ink transition-colors duration-300 group-hover:text-white">
                          {m.judul}
                        </dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-white/75">
                          {m.isi}
                        </dd>
                      </div>
                      <Icon
                        nama={m.ikon}
                        className="size-5 shrink-0 text-ink-subtle transition-colors duration-300 group-hover:text-white"
                        tebal={1.5}
                      />
                    </div>
                  ))}
                </dl>
              </div>


              <div>
                <div
                  id={`${p.slug}-daftar`}
                  className="relative isolate scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-24"
                >
                  <OrnamenKartu />
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
          {/* Gaya mengikuti gambar utama profil unit: satu bidang foto lebar
              bersudut membulat, teks ditumpuk di atasnya. */}
          <div className="relative isolate overflow-hidden rounded-3xl bg-mist-100 shadow-card">
            <Image
              src="/img/galeri-wisuda-taud-mit.jpg"
              alt="Wisuda santri TAUD & MIT SAQU Wadi Mubarak"
              width={1600}
              height={1000}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="absolute inset-0 -z-10 size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/40"
            />
            <div className="p-7 md:p-12 lg:max-w-2xl lg:py-16">
              <h2 className="font-display text-display-md text-balance text-white">
                Mencari pendidikan <span className="text-brand-200">berjenjang</span>, bukan program
                singkat?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-white/80">
                Kedua program di halaman ini tidak menerbitkan ijazah dan tidak menggantikan
                sekolah. Bila yang Anda cari adalah pendidikan formal dari tahfizh anak usia dini
                sampai perguruan tinggi, atau kaderisasi guru Al-Qur&apos;an, mulailah dari halaman
                unit.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/program" varian="terang">
                  Lihat unit pendidikan
                </ButtonLink>
                <ButtonLink
                  href="/faq"
                  varian="garis"
                  className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/20"
                >
                  Pertanyaan umum
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
