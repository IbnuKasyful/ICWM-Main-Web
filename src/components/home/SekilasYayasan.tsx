import { BentoBerjalan } from "@/components/home/BentoBerjalan";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

const penanda = [
  { ikon: "perisai", teks: "Berdiri sejak 3 Februari 2008 di Megamendung, Bogor" },
  { ikon: "sekolah", teks: "Sebelas unit dari tahfizh anak usia dini hingga perguruan tinggi" },
  { ikon: "centang", teks: "LAZIS SaQu menghimpun zakat, infak, sedekah, dan wakaf" },
] as const;

/** PRD §9.1 blok 4, dua paragraf ringkas + tautan ke /tentang. */
export function SekilasYayasan() {
  return (
    <Section>
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
              Sekilas yayasan
            </span>
            <h2 className="mt-4 font-display text-display-md text-balance text-ink md:text-display-lg">
              Satu naungan untuk sebelas unit,{" "}
              <span className="text-brand-600">satu standar pembinaan</span>
            </h2>

            <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-pretty text-ink-muted">
              <p>
                Islamic Center Wadi Mubarak berdiri pada 3 Februari 2008 di Megamendung, Bogor. Hari
                ini yayasan menaungi sebelas unit pendidikan dari tahfizh anak usia dini hingga
                perguruan tinggi, empat jalur kaderisasi guru Al-Qur&apos;an, dan sebuah lembaga amil
                zakat, infak, sedekah, serta wakaf.
              </p>
              <p>
                Kurikulum yang sama juga berjalan di luar kampus induk: 162 TAUD dan 35 MIT/SD
                Sahabat Al-Qur&apos;an tersebar di 27 provinsi, dari Aceh sampai Maluku Utara.
              </p>
              <p>
                Yang tidak berubah sejak awal adalah cara kami bekerja: kelompok belajar dibatasi
                supaya setiap santri disimak namanya, dan pembinaan berjalan dengan standar yang
                sama di setiap unit, dari tahfizh anak usia dini hingga perguruan tinggi.
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
              <ButtonLink href="/program" varian="garis">
                Lihat unit pendidikan
              </ButtonLink>
            </div>
          </div>

          {/* Dinding foto berjalan, ditaruh di kanan agar teks tetap yang
              pertama dibaca, baik pada satu kolom maupun dua kolom. */}
          <div className="relative">
            <BentoBerjalan />
            {/* Disembunyikan di layar sempit: di sana keping ini menutupi
                hampir seluruh lebar dinding foto. */}
            <div className="absolute -bottom-4 -left-2 hidden max-w-[15rem] rounded-2xl border border-line bg-white p-5 shadow-lift md:block lg:-left-8">
              <p className="font-display text-display-sm text-brand-700">18 tahun</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                mendampingi santri dan keluarganya sejak 2008.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
