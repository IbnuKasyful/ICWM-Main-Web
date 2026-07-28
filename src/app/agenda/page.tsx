import { PageHeader } from "@/components/site/PageHeader";
import { AgendaCard } from "@/components/ui/AgendaCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { getAgendaLampau, getAgendaMendatang, getPetaNamaUnit } from "@/lib/content";
import { buatMetadata } from "@/lib/seo";

/** PRD §8 — ISR 15 menit. */
export const revalidate = 900;

export const metadata = buatMetadata({
  judul: "Agenda kegiatan",
  deskripsi:
    "Jadwal kegiatan Islamic Center Wadi Mubarak: tasmi' akbar, open house PPDB, kajian pekanan, dan kegiatan unit lainnya.",
  path: "/agenda",
});

export default function HalamanAgenda() {
  const mendatang = getAgendaMendatang();
  const lampau = getAgendaLampau().slice(0, 6);
  const namaUnit = getPetaNamaUnit();

  return (
    <>
      <PageHeader
        jejak={[{ label: "Agenda", href: "/agenda" }]}
        atas="Agenda"
        judul="Kegiatan yang akan datang"
        keterangan="Kegiatan bertanda “terbuka untuk umum” dapat dihadiri siapa pun tanpa undangan. Untuk kegiatan internal, hubungi humas unit terkait lebih dulu."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          {mendatang.length === 0 ? (
            <EmptyState
              ikon="kalender"
              judul="Belum ada agenda terjadwal"
              keterangan="Tidak ada kegiatan yang terjadwal untuk saat ini. Kegiatan baru biasanya diumumkan dua sampai empat pekan sebelum pelaksanaan — pantau halaman informasi atau kanal media sosial kami."
              aksi={{ label: "Lihat kabar terbaru", href: "/informasi" }}
            />
          ) : (
            <ul className="grid gap-4 lg:grid-cols-2">
              {mendatang.map((a) => (
                <AgendaCard
                  key={a.slug}
                  agenda={a}
                  namaUnit={a.unit[0] ? namaUnit.get(a.unit[0]) : undefined}
                />
              ))}
            </ul>
          )}
        </div>
      </Section>

      {lampau.length > 0 ? (
        <Section nada="sejuk" className="py-14 md:py-20">
          <div className="container-page">
            <h2 className="font-display text-display-md text-ink">
              Kegiatan <span className="text-brand-600">yang sudah berlalu</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-ink-muted">
              Dokumentasi sebagian kegiatan ini tersedia di halaman galeri.
            </p>
            <ul className="mt-8 grid gap-4 lg:grid-cols-2">
              {lampau.map((a) => (
                <AgendaCard
                  key={a.slug}
                  agenda={a}
                  namaUnit={a.unit[0] ? namaUnit.get(a.unit[0]) : undefined}
                  className="opacity-70"
                />
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
    </>
  );
}
