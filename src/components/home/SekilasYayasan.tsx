import { BentoBerjalan } from "@/components/home/BentoBerjalan";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

const penanda = [
  { ikon: "perisai", teks: "Berbadan hukum sejak 1998, terdaftar di Kemenkumham" },
  { ikon: "dokumen", teks: "Laporan keuangan tahunan ditelaah akuntan publik" },
  { ikon: "centang", teks: "LAZIS berizin Kementerian Agama RI" },
] as const;

/** PRD §9.1 blok 4 — dua paragraf ringkas + tautan ke /tentang. */
export function SekilasYayasan() {
  return (
    <Section>
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
              Sekilas yayasan
            </span>
            <h2 className="mt-4 font-display text-display-md text-balance text-ink md:text-display-lg">
              Satu naungan untuk sembilan unit,{" "}
              <span className="text-brand-600">satu standar pembinaan</span>
            </h2>

            <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-pretty text-ink-muted">
              <p>
                Islamic Center Wadi Mubarak berdiri pada 1998 dari satu halaqah kecil di Megamendung,
                Bogor. Hari ini yayasan menaungi sembilan unit pendidikan dari taman asuh usia dini
                hingga perguruan tinggi, dua kampus, dan sebuah lembaga amil zakat yang berizin resmi.
              </p>
              <p>
                Yang tidak berubah sejak awal adalah cara kami bekerja: kelompok belajar dibatasi
                supaya setiap santri disimak namanya, dan setiap rupiah yang dititipkan kepada kami
                dilaporkan secara terbuka. Bila Anda ingin memeriksanya sendiri, seluruh laporan
                keuangan dan dokumen program kami terbuka untuk diunduh.
              </p>
            </div>

            <ul className="mt-7 flex flex-col gap-3">
              {penanda.map((p) => (
                <li key={p.teks} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon nama={p.ikon} className="size-3.5" tebal={2.2} />
                  </span>
                  {p.teks}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/tentang">Profil lengkap yayasan</ButtonLink>
              <ButtonLink href="/transparansi" varian="garis">
                Lihat laporan
              </ButtonLink>
            </div>
          </div>

          {/* Dinding foto berjalan — ditaruh di kanan agar teks tetap yang
              pertama dibaca, baik pada satu kolom maupun dua kolom. */}
          <div className="relative">
            <BentoBerjalan />
            {/* Disembunyikan di layar sempit: di sana keping ini menutupi
                hampir seluruh lebar dinding foto. */}
            <div className="absolute -bottom-4 -left-2 hidden max-w-[15rem] rounded-2xl border border-line bg-white p-5 shadow-lift md:block lg:-left-8">
              <p className="font-display text-display-sm text-brand-700">28 tahun</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                mendampingi santri dan keluarganya di Bogor dan Yogyakarta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
