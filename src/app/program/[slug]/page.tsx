import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/site/PageHeader";
import { Badge, TitikStatus } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { DirektoriCabang } from "@/components/program/DirektoriCabang";
import { GaleriUnit } from "@/components/program/GaleriUnit";
import { PetaPersebaran } from "@/components/program/PetaPersebaran";
import { PostBaris } from "@/components/ui/PostCard";
import { JudulSeksi } from "@/components/ui/Section";
import { getPostsUnit, getUnit, getUnitProfil, getUnitsAktif } from "@/lib/content";
import {
  labelGender,
  labelJenjang,
  labelLokasi,
  labelModel,
  labelStatusPpdb,
  tautanKeluar,
  tautanWhatsApp,
} from "@/lib/format";
import { buatMetadata, jsonldEducationalOrganization } from "@/lib/seo";
import type { StatusPpdb } from "@/lib/schemas";
import { cn } from "@/lib/cn";

/** PRD §8, ISR 1 jam. */
export const revalidate = 3600;

export function generateStaticParams() {
  return getUnitsAktif().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) return buatMetadata({ judul: "Unit tidak ditemukan", deskripsi: "", path: "/program", noIndex: true });

  return buatMetadata({
    judul: unit.nama_lengkap,
    deskripsi: unit.deskripsi_singkat,
    path: `/program/${unit.slug}`,
    gambar: `/img/unit-${unit.slug}.svg`,
  });
}

function nadaStatus(status: StatusPpdb) {
  if (status === "buka") return { badge: "sukses", titik: "hidup" } as const;
  if (status === "segera") return { badge: "peringatan", titik: "tunggu" } as const;
  return { badge: "mati", titik: "mati" } as const;
}

export default async function HalamanProfilUnit({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getUnit(slug);
  const profil = getUnitProfil(slug);

  if (!unit || !unit.aktif || !profil) notFound();

  const berita = await getPostsUnit(unit.slug, 3);
  const nada = nadaStatus(unit.status_ppdb);
  const ppdbTutup = unit.status_ppdb === "tutup";
  const jumlahProvinsi = new Set(unit.cabang.map((c) => c.provinsi)).size;
  const adaPersebaran = unit.persebaran.length > 0;
  const adaCabang = unit.cabang.length > 0;
  const adaGaleri = profil.galeri.length > 0;

  /* Cabang, Persebaran, Galeri, dan Info PPDB sama-sama berlatar putih dan
     bisa tampil berurutan. Padding bawah section sebelumnya sudah memberi
     jarak, jadi section putih yang menyambung section putih lain tidak
     memakai padding atas; kalau tidak, celahnya berlipat dua. */
  const kelasSeksi = "py-12 md:py-16";
  const sambungPutih = (sebelumnyaPutih: boolean) =>
    cn(kelasSeksi, sebelumnyaPutih && "pt-0 md:pt-0");

  const pesanWa = `Assalamu'alaikum. Saya membaca profil ${unit.nama_lengkap} di situs Wadi Mubarak dan ingin bertanya mengenai pendaftaran.`;

  return (
    <div style={{ ["--unit-accent" as string]: unit.warna_aksen }}>
      <JsonLd data={jsonldEducationalOrganization(unit)} />

      <PageHeader
        jejak={[
          { label: "Pendidikan", href: "/program" },
          { label: unit.nama_pendek, href: `/program/${unit.slug}` },
        ]}
        atas={labelJenjang[unit.jenjang]}
        judul={unit.nama_lengkap}
        keterangan={unit.deskripsi_singkat}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge nada={nada.badge} ikon={<TitikStatus nada={nada.titik} />}>
            {labelStatusPpdb[unit.status_ppdb]}
          </Badge>
          <Badge nada="netral">{labelGender[unit.gender]}</Badge>
          <Badge nada="netral">{labelModel[unit.model_belajar]}</Badge>
          <Badge nada="netral">Kampus {labelLokasi[unit.lokasi_kampus]}</Badge>
          {unit.cabang.length > 0 ? (
            <Badge nada="netral">
              {unit.cabang.length} lokasi di {jumlahProvinsi} provinsi
            </Badge>
          ) : null}
        </div>
      </PageHeader>

      {/* Identitas unit */}
      <section className="py-12 md:py-16">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl bg-mist-100">
            <Image
              src={profil.hero.src}
              alt={profil.hero.alt}
              width={profil.hero.width}
              height={profil.hero.height}
              priority
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
            />
          </div>

          {/* Biaya sengaja tidak dicantumkan di situs. Komponennya berubah tiap
              tahun ajaran dan berbeda antar cabang, jadi angka yang tayang di
              sini akan lebih sering keliru daripada benar; yang berlaku selalu
              rincian dari panitia PPDB unit terkait. */}
          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              { label: "Jenjang", nilai: labelJenjang[unit.jenjang], ikon: "sekolah" as const },
              { label: "Model belajar", nilai: labelModel[unit.model_belajar], ikon: "yayasan" as const },
              { label: "Periode PPDB", nilai: unit.periode_ppdb, ikon: "kalender" as const },
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
        </div>
      </section>

      {/* Untuk siapa unit ini */}
      <section className="bg-mist-50 py-12 md:py-16">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <JudulSeksi
            atas="Untuk siapa"
            judul="Unit ini paling cocok"
            sorot="untuk siapa?"
            rata="kiri"
            keterangan="Bacalah bagian ini lebih dulu. Bila tidak satu pun poin di sebelah terasa menggambarkan keluarga Anda, kemungkinan besar ada unit lain yang lebih tepat."
          />
          <ul className="flex flex-col gap-3">
            {profil.untuk_siapa.map((poin) => (
              <li
                key={poin}
                className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink"
              >
                <span
                  className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: "var(--unit-accent)" }}
                >
                  <Icon nama="centang" className="size-3" tebal={2.6} />
                </span>
                {poin}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-12 md:py-16">
        <div className="container-page">
          <JudulSeksi
            atas="Keunggulan"
            judul="Yang membedakan"
            sorot={unit.nama_pendek}
            keterangan="Bukan daftar janji, melainkan hal-hal yang bisa Anda tanyakan dan periksa saat berkunjung."
          />
          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {profil.keunggulan.map((k, i) => (
              <li key={k.judul} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <span
                  className="inline-flex size-9 items-center justify-center rounded-lg font-display text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--unit-accent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-base leading-snug font-semibold text-ink">
                  {k.judul}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">{k.isi}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kurikulum & fasilitas */}
      <section className="bg-mist-50 py-12 md:py-16">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-display-md text-ink">
              Ringkasan <span className="text-brand-600">kurikulum</span>
            </h2>
            <dl className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
              {profil.kurikulum.map((k) => (
                <div key={k.judul} className="p-5">
                  <dt className="font-display text-base font-semibold text-ink">{k.judul}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{k.isi}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-display text-display-md text-ink">
              Fasilitas <span className="text-brand-600">kampus</span>
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {profil.fasilitas.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-4 text-sm text-ink"
                >
                  <Icon nama="centang" className="mt-0.5 size-4 shrink-0 text-brand-600" tebal={2.2} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cabang */}
      {adaCabang ? (
        <section className={kelasSeksi}>
          <div className="container-page">
            {/* Unit yang punya peta persebaran berarti sebagian besar cabangnya
                dijalankan lembaga mitra, daftar bernama di bawah ini hanya
                memuat cabang kelolaan yayasan, dan judulnya harus mengatakan
                itu apa adanya. */}
            <JudulSeksi
              atas={adaPersebaran ? "Cabang kelolaan yayasan" : "Jaringan"}
              judul={
                adaPersebaran
                  ? `${unit.nama_pendek} dikelola langsung di`
                  : `${unit.nama_pendek} hadir di`
              }
              sorot={`${unit.cabang.length} lokasi`}
              rata="kiri"
              keterangan={
                adaPersebaran
                  ? `Cabang berikut dikelola langsung oleh yayasan, tersebar di ${jumlahProvinsi} provinsi. Hubungi admin cabang terdekat untuk jadwal kunjungan dan trial class. Cabang ${unit.nama_pendek} lain dijalankan lembaga mitra, sebarannya ada di peta bawah.`
                  : `Tersebar di ${jumlahProvinsi} provinsi dengan kurikulum, target hafalan, dan penilaian yang sama. Hubungi panitia lokasi terdekat untuk jadwal kunjungan.`
              }
            />
            <DirektoriCabang cabang={unit.cabang} namaUnit={unit.nama_pendek} />
          </div>
        </section>
      ) : null}

      {/* Persebaran cabang mitra, hanya jumlah per provinsi, tanpa direktori */}
      {adaPersebaran ? (
        <section className={sambungPutih(adaCabang)}>
          <div className="container-page">
            <JudulSeksi
              atas="Persebaran"
              judul={`${unit.nama_pendek} di`}
              sorot="seluruh Indonesia"
              rata="kiri"
              keterangan={`Di luar cabang kelolaan yayasan di atas, kurikulum ${unit.nama_pendek} dijalankan lembaga mitra di banyak daerah. Peta ini memuat keduanya.`}
            />
            <PetaPersebaran persebaran={unit.persebaran} namaUnit={unit.nama_pendek} />
          </div>
        </section>
      ) : null}

      {/* Galeri */}
      {adaGaleri ? (
        <section className={sambungPutih(adaCabang || adaPersebaran)}>
          <div className="container-page">
            <h2 className="font-display text-display-md text-ink">
              Suasana <span className="text-brand-600">sehari-hari</span>
            </h2>
            <GaleriUnit galeri={profil.galeri} />
          </div>
        </section>
      ) : null}

      {/* Info PPDB + CTA keluar */}
      <section className={sambungPutih(adaCabang || adaPersebaran || adaGaleri)}>
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7 md:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <span className="inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-accent-700 uppercase">
                Penerimaan santri baru
              </span>
              <h2 className="mt-4 font-display text-display-md text-balance text-ink">
                Alur pendaftaran di {unit.nama_pendek}
              </h2>

              <ol className="mt-8 flex flex-col gap-4">
                {profil.alur_ppdb.map((langkah, i) => (
                  <li key={langkah} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xs font-bold text-brand-700"
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-ink">{langkah}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-5 rounded-2xl bg-mist-50 p-5 sm:p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                    Status
                  </span>
                  <Badge nada={nada.badge} ikon={<TitikStatus nada={nada.titik} />}>
                    {labelStatusPpdb[unit.status_ppdb]}
                  </Badge>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-t border-line-strong pt-3">
                  <span className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                    Periode
                  </span>
                  <span className="text-right text-sm font-semibold text-ink">
                    {unit.periode_ppdb}
                  </span>
                </div>
              </div>

              {/* PRD §9.3, CTA keluar hanya bila url_subdomain terisi; bila kosong,
                  tampilkan tombol WhatsApp unit. Bila PPDB tutup, CTA menyesuaikan. */}
              <div className="mt-1 flex flex-col gap-3 border-t border-line-strong pt-5">
                {ppdbTutup ? (
                  <>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      Pendaftaran untuk unit ini sedang ditutup. Tinggalkan pesan agar panitia
                      mengabari Anda saat gelombang berikutnya dibuka.
                    </p>
                    <ButtonLink
                      href={tautanWhatsApp(
                        unit.kontak_wa,
                        `Assalamu'alaikum. Saya ingin dikabari saat pendaftaran ${unit.nama_lengkap} dibuka kembali.`,
                      )}
                      eksternal
                      varian="garis"
                      ukuran="lg"
                    >
                      <Icon nama="whatsapp" className="size-4" />
                      Minta dikabari
                    </ButtonLink>
                  </>
                ) : unit.url_subdomain ? (
                  <>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      Sudah merasa cocok? Lanjutkan ke situs resmi unit untuk melihat rincian
                      lengkap dan formulir pendaftaran.
                    </p>
                    <ButtonLink
                      href={tautanKeluar(unit.url_subdomain, unit.slug)}
                      eksternal
                      ukuran="lg"
                    >
                      Buka situs {unit.nama_pendek}
                      <Icon nama="keluar" className="size-4" />
                    </ButtonLink>
                    <ButtonLink
                      href={tautanWhatsApp(unit.kontak_wa, pesanWa)}
                      eksternal
                      varian="garis"
                      ukuran="md"
                    >
                      <Icon nama="whatsapp" className="size-4" />
                      Tanya panitia dulu
                    </ButtonLink>
                  </>
                ) : (
                  <>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      Situs khusus unit ini belum tayang. Panitia PPDB melayani pertanyaan langsung
                      lewat WhatsApp.
                    </p>
                    <ButtonLink
                      href={tautanWhatsApp(unit.kontak_wa, pesanWa)}
                      eksternal
                      ukuran="lg"
                    >
                      <Icon nama="whatsapp" className="size-4" />
                      Hubungi panitia PPDB
                    </ButtonLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita terkait unit ini */}
      <section className="bg-mist-50 py-12 md:py-16">
        <div className="container-page">
          <h2 className="font-display text-display-md text-ink">
            Kabar dari <span className="text-brand-600">{unit.nama_pendek}</span>
          </h2>

          {berita.length === 0 ? (
            <EmptyState
              className="mt-8"
              ikon="dokumen"
              judul="Belum ada kabar yang tayang di situs induk"
              keterangan="Unit ini belum memiliki tulisan yang dikurasi ke situs induk. Kabar terbaru seluruh yayasan tetap dapat Anda ikuti di halaman informasi."
              aksi={{ label: "Lihat semua informasi", href: "/informasi" }}
            />
          ) : (
            <ul className="mt-6 rounded-2xl border border-line bg-white px-5 md:px-6">
              {berita.map((p) => (
                <PostBaris key={p.slug} post={p} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
