import { AjakanDonasi } from "@/components/home/AjakanDonasi";
import { Hero } from "@/components/home/Hero";
import { JaringanUnit } from "@/components/home/JaringanUnit";
import { Kutipan } from "@/components/home/Kutipan";
import { RouterNiat } from "@/components/home/RouterNiat";
import { SekilasYayasan } from "@/components/home/SekilasYayasan";
import { AgendaCard } from "@/components/ui/AgendaCard";
import { PostCardKabar } from "@/components/ui/PostCard";
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

export default async function Beranda() {
  const units = getUnitsAktif();
  const capaian = getCapaian();
  const namaUnit = getPetaNamaUnit();

  // PRD §9.1 — TEPAT 6 kartu, tanpa elemen pagination apa pun di beranda.
  // Keenamnya seragam dan mengisi kisi dua kolom.
  const tulisan = getPostsInduk().slice(0, 6);
  const agenda = getAgendaMendatang(3);
  const program = await getProgramDonasi();
  const programSorot = program.find((p) => p.mendesak) ?? program[0];

  const santri = capaian.find((c) => c.label === "Santri aktif");

  return (
    <>
      <Hero
        jumlahUnit={units.length}
        jumlahSantri={santri ? `${angka(santri.nilai)}+` : `${units.length} unit`}
      />

      <Kutipan
        teks="لَوْ طَهُرَتْ قُلُوبُنَا مَا شَبِعَتْ مِنْ كَلاَمِ اللَّهِ"
        sumber="&quot;Seandainya hati kita suci bersih, niscaya kita tidak akan pernah kenyang (bosan) dari membaca kalam Allah (Al-Qur'an).&quot;"
        arab
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
      <Section nada="sejuk" className="py-16 md:py-20">
        <div className="container-page">
          <KepalaDaftar
            judul="Kabar terbaru dari"
            sorot="kampus kami"
            keterangan="Berita, pengumuman, dan catatan pengajar dari seluruh unit."
            tautan="/informasi"
            labelTautan="Lihat semua"
          />

          {/* Keenam kartu seragam dalam kisi dua kolom. */}
          <ul className="mt-12 grid gap-5 lg:grid-cols-2">
            {tulisan.map((post, i) => (
              <PostCardKabar key={post.slug} post={post} prioritas={i < 2} />
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
