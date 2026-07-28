import { FormKontak } from "@/components/kontak/FormKontak";
import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { getUnitsAktif } from "@/lib/content";
import { labelLokasi, tautanWhatsApp } from "@/lib/format";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8 — SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Kontak",
  deskripsi:
    "Alamat, telepon, surel, dan narahubung WhatsApp setiap unit Islamic Center Wadi Mubarak di Bogor dan Sleman.",
  path: "/kontak",
});

const kanal: { ikon: NamaIkon; label: string; nilai: string; href: string; catatan: string }[] = [
  {
    ikon: "telepon",
    label: "Telepon sekretariat",
    nilai: site.kontak.telepon,
    href: `tel:${site.kontak.telepon.replace(/\s/g, "")}`,
    catatan: site.kontak.jamLayanan,
  },
  {
    ikon: "surel",
    label: "Surel umum",
    nilai: site.kontak.email,
    href: `mailto:${site.kontak.email}`,
    catatan: "Dibalas dalam 1–2 hari kerja",
  },
  {
    ikon: "whatsapp",
    label: "WhatsApp sekretariat",
    nilai: `+${site.kontak.whatsapp}`,
    href: tautanWhatsApp(site.kontak.whatsapp, "Assalamu'alaikum, saya ingin bertanya."),
    catatan: "Untuk pertanyaan singkat",
  },
];

const kanalKhusus = [
  { label: "Media & pers", email: site.kontak.emailMedia },
  { label: "Kerja sama lembaga", email: site.kontak.emailKerjaSama },
];

export default function HalamanKontak() {
  const units = getUnitsAktif();

  return (
    <>
      <PageHeader
        jejak={[{ label: "Kontak", href: "/kontak" }]}
        atas="Hubungi kami"
        judul="Ada yang ingin ditanyakan?"
        keterangan="Untuk pertanyaan tentang unit tertentu — terutama PPDB — menghubungi narahubung unit langsung biasanya jauh lebih cepat daripada lewat sekretariat."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="font-display text-display-sm text-ink">Kirim pesan</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Pesan masuk ke sekretariat yayasan dan diteruskan ke bagian yang sesuai.
            </p>
            <div className="relative mt-8">
              <FormKontak />
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-display text-base font-semibold text-ink">Kanal resmi</h2>
              <ul className="mt-4 flex flex-col gap-4">
                {kanal.map((k) => (
                  <li key={k.label}>
                    <a
                      href={k.href}
                      {...(k.ikon === "whatsapp"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-start gap-3"
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon nama={k.ikon} className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-ink-subtle">{k.label}</span>
                        <span className="block text-sm font-semibold break-words text-ink group-hover:text-brand-700">
                          {k.nilai}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-subtle">{k.catatan}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                {kanalKhusus.map((k) => (
                  <li key={k.email} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-ink-subtle">{k.label}</span>
                    <a
                      href={`mailto:${k.email}`}
                      className="font-medium text-brand-700 underline-offset-4 hover:underline"
                    >
                      {k.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-display text-base font-semibold text-ink">Alamat kampus</h2>
              <address className="mt-4 flex flex-col gap-4 text-sm not-italic">
                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                    Kampus Bogor (pusat)
                  </p>
                  <p className="mt-1 leading-relaxed text-ink">
                    {site.alamat.jalan}, {site.alamat.kota}, {site.alamat.provinsi}{" "}
                    {site.alamat.kodePos}
                  </p>
                </div>
                <div className="border-t border-line pt-4">
                  <p className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                    Kampus Sleman
                  </p>
                  <p className="mt-1 leading-relaxed text-ink">
                    Jl. Kaliurang KM 12, Ngaglik, Kabupaten Sleman, DI Yogyakarta 55581
                  </p>
                </div>
              </address>
            </div>
          </aside>
        </div>
      </Section>

      {/* Narahubung per unit */}
      <Section nada="sejuk" className="py-14 md:py-20">
        <div className="container-page">
          <h2 className="font-display text-display-md text-ink">
            Narahubung <span className="text-brand-600">setiap unit</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Untuk pertanyaan PPDB, biaya, atau kehidupan santri, hubungi panitia unit terkait
            langsung — merekalah yang memegang data paling mutakhir.
          </p>

          <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {units.map((u) => (
              <li
                key={u.slug}
                className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{u.nama_pendek}</p>
                  <p className="text-xs text-ink-subtle">{labelLokasi[u.lokasi_kampus]}</p>
                </div>
                <ButtonLink
                  href={tautanWhatsApp(
                    u.kontak_wa,
                    `Assalamu'alaikum. Saya ingin bertanya mengenai ${u.nama_lengkap}.`,
                  )}
                  eksternal
                  varian="garis"
                  ukuran="sm"
                  className="shrink-0"
                >
                  <Icon nama="whatsapp" className="size-3.5" />
                  WhatsApp
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
