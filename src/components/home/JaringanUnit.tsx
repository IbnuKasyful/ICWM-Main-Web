import { EmptyState } from "@/components/ui/EmptyState";
import { KepalaDaftar, Section } from "@/components/ui/Section";
import { UnitCardRingkas } from "@/components/ui/UnitCard";
import { labelJenjang } from "@/lib/format";
import type { Jenjang, Unit } from "@/lib/schemas";

const urutan: Jenjang[] = ["paud", "sd", "smp", "sma", "tinggi", "non-formal"];

/** PRD §9.1 blok 5 — grid ringkas seluruh unit dengan tautan ke /program. */
export function JaringanUnit({ units }: { units: readonly Unit[] }) {
  const kelompok = urutan
    .map((j) => ({ jenjang: j, isi: units.filter((u) => u.jenjang === j) }))
    .filter((k) => k.isi.length > 0);

  return (
    <Section nada="sejuk">
      <div className="container-page">
        <KepalaDaftar
          judul="Sepuluh unit,"
          sorot="satu jaringan"
          keterangan="Setiap unit berdiri sendiri dengan pengelola dan narahubungnya masing-masing, namun memakai standar pembinaan yang sama."
          tautan="/program"
          labelTautan="Bandingkan semua unit"
        />

        {units.length === 0 ? (
          <EmptyState
            className="mt-10"
            judul="Data unit belum tersedia"
            keterangan="Daftar unit sedang diperbarui. Silakan hubungi sekretariat yayasan untuk informasi terkini."
            aksi={{ label: "Hubungi kami", href: "/kontak" }}
          />
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {kelompok.map((k) => (
              <div key={k.jenjang}>
                <h3 className="text-xs font-semibold tracking-[0.14em] text-ink-subtle uppercase">
                  {labelJenjang[k.jenjang]}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {k.isi.map((u) => (
                    <UnitCardRingkas key={u.slug} unit={u} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
