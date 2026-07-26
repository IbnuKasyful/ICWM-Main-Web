import { AjakanDonasi } from "@/components/home/AjakanDonasi";
import { Hero } from "@/components/home/Hero";
import { JaringanUnit } from "@/components/home/JaringanUnit";
import { Kutipan } from "@/components/home/Kutipan";
import { RouterNiat } from "@/components/home/RouterNiat";
import { SekilasYayasan } from "@/components/home/SekilasYayasan";
import { AgendaCard } from "@/components/ui/AgendaCard";
import { PostCard } from "@/components/ui/PostCard";
import { JudulSeksi, KepalaDaftar, Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import {
  getAgendaMendatang,
  getCapaian,
  getPetaNamaUnit,
  getPostsInduk,
  getProgramDonasi,
  getUnitsAktif,
} from "@/lib/content";
import { angka } from "@/lib/format";

/** PRD §8 — beranda memakai ISR 5 menit. */
export const revalidate = 300;

export default function Beranda() {
  const units = getUnitsAktif();
  const capaian = getCapaian();
  const namaUnit = getPetaNamaUnit();

  // PRD §9.1 — TEPAT 6 kartu, tanpa elemen pagination apa pun di beranda.
  const tulisan = getPostsInduk().slice(0, 6);
  const agenda = getAgendaMendatang(3);
  const programSorot = getProgramDonasi().find((p) => p.mendesak) ?? getProgramDonasi()[0];

  const santri = capaian.find((c) => c.label === "Santri aktif");

  return (
    <>
      <Hero
        jumlahUnit={units.length}
        jumlahSantri={santri ? `${angka(santri.nilai)}+` : `${units.length} unit`}
      />

      <Kutipan
        teks="Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya."
        sumber="HR. Bukhari"
      />

      <RouterNiat />

      {/* PRD §9.1 blok 3 — angka capaian */}
      <Section className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Angka capaian"
            judul="Yang sudah kami kerjakan"
            sorot="sejauh ini"
            keterangan="Diperbarui setiap awal tahun ajaran. Rincian dan metodologi penghitungannya tersedia pada halaman dampak."
          />
          <StatBlock data={capaian} className="mt-10" />
        </div>
      </Section>

      <SekilasYayasan />

      <JaringanUnit units={units} />

      <AjakanDonasi sorot={programSorot} />

      {/* PRD §9.1 blok 7 — tepat 6 kartu, lalu tautan "lihat semua" */}
      <Section nada="pasir" className="py-16 md:py-20">
        <div className="container-page">
          <KepalaDaftar
            judul="Kabar terbaru dari"
            sorot="kampus kami"
            keterangan="Berita, pengumuman, dan catatan pengajar dari seluruh unit."
            tautan="/informasi"
            labelTautan="Lihat semua"
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tulisan.map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                namaUnit={namaUnit.get(post.unit_utama)}
                prioritas={i < 3}
              />
            ))}
          </ul>
        </div>
      </Section>

      {/* PRD §9.1 blok 8 — blok TIDAK dirender sama sekali bila agenda kosong */}
      {agenda.length > 0 ? (
        <Section className="py-16 md:py-20">
          <div className="container-page">
            <KepalaDaftar
              judul="Agenda"
              sorot="mendatang"
              keterangan="Kegiatan yang terbuka untuk wali santri dan masyarakat umum."
              tautan="/agenda"
              labelTautan="Semua agenda"
            />
            <ul className="mt-10 grid gap-4 lg:grid-cols-3">
              {agenda.map((a) => (
                <AgendaCard
                  key={a.slug}
                  agenda={a}
                  namaUnit={a.unit[0] ? namaUnit.get(a.unit[0]) : undefined}
                />
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
    </>
  );
}
