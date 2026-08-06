import { DaftarRekening } from "@/components/donasi/DaftarRekening";
import { ProgramDonasiCard } from "@/components/donasi/ProgramDonasiCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { getProgramDonasi, getRekening } from "@/lib/content";
import { buatMetadata, jsonldNgo } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8 — ISR 15 menit. */
export const revalidate = 900;

export const metadata = buatMetadata({
  judul: "Donasi lewat LAZIS Wadi Mubarak",
  deskripsi:
    "Salurkan zakat, infak, sedekah, dan wakaf lewat LAZIS Wadi Mubarak — lembaga amil berizin Kementerian Agama RI. Setiap program memiliki target, progres, dan penerima manfaat yang diverifikasi.",
  path: "/donasi",
  gambar: "/img/hero-donasi.svg",
});

const jenisDana = [
  {
    nama: "Zakat",
    isi: "Kewajiban 2,5% atas harta yang telah mencapai nisab dan haul. Kami salurkan hanya kepada delapan asnaf yang berhak.",
    ikon: "perisai" as const,
  },
  {
    nama: "Infak",
    isi: "Pemberian bebas nominal dan bebas waktu, dipakai untuk menutup biaya operasional program pendidikan dan sosial.",
    ikon: "donasi" as const,
  },
  {
    nama: "Sedekah",
    isi: "Pemberian sukarela, termasuk sedekah dapur santri dan santunan mendesak bagi keluarga santri.",
    ikon: "orang" as const,
  },
  {
    nama: "Wakaf",
    isi: "Menahan pokok harta dan mengalirkan manfaatnya — dipakai untuk pembangunan asrama, kelas, dan aset produktif.",
    ikon: "yayasan" as const,
  },
];

const alurSetelahDonasi = [
  "Anda mentransfer ke rekening resmi sesuai jenis dana.",
  "Kirim bukti transfer lewat WhatsApp konfirmasi agar dana tercatat atas nama Anda.",
  "Amil memverifikasi dan mencatat donasi dalam pembukuan LAZIS dalam 1×24 jam kerja.",
  "Dana disalurkan sesuai peruntukan program, diverifikasi penerima manfaatnya.",
  "Anda menerima konfirmasi penyaluran atas donasi yang tercatat atas nama Anda.",
];

export default async function HalamanDonasi() {
  const program = await getProgramDonasi();
  const rekening = getRekening();

  return (
    <>
      <JsonLd data={jsonldNgo()} />

      <div className="relative overflow-hidden border-b border-white/10 bg-brand-950 text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="container-page relative py-8 md:py-14">
          <Breadcrumb jejak={[{ label: "Donasi", href: "/donasi" }]} terang />

          <h1 className="mt-5 max-w-3xl font-display text-display-md text-balance text-white md:text-display-lg">
            Titipkan zakat Anda pada lembaga amil yang{" "}
            <span className="text-accent-300">berizin resmi</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-white/70">
            Kami lembaga amil resmi berizin Kementerian Agama RI. Setiap program di halaman ini
            menampilkan target, jumlah terkumpul, dan penerima manfaatnya yang diverifikasi tim amil.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="#rekening" varian="terang">
              Lihat rekening resmi
            </ButtonLink>
            <ButtonLink
              href="#program"
              className="border border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              Lihat program donasi
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Penjelasan jenis dana */}
      <Section className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Jenis dana"
            judul="Empat pintu"
            sorot="menitipkan harta"
            keterangan="Pastikan Anda memilih jenis yang tepat: zakat memiliki ketentuan penerima yang mengikat, sedangkan infak, sedekah, dan wakaf lebih lapang peruntukannya."
          />
          {/* Kartu memakai bahasa rupa yang sama dengan bilah "Mulai dari sini"
              di beranda: bidang gelap, ikon melayang di pojok atas, dan
              penjelasan yang menempel di dasar kartu. Bedanya, empat jenis dana
              ini bukan tautan — tidak ada halaman tujuan untuk masing-masing —
              jadi isinya tidak disembunyikan di balik hover, melainkan selalu
              terbaca utuh. */}
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {jenisDana.map((j) => (
              <li
                key={j.nama}
                className="group relative isolate flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl bg-brand-950 p-6 ring-1 ring-ink/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-card"
              >
                {/* Ornamen geometri islami menggantikan foto yang dipakai di
                    beranda. Mask gradien meredupkannya ke arah kiri bawah,
                    tempat ikon dan teks berada. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom_left,black,transparent_65%)]"
                >
                  <span className="ornamen-islami absolute -inset-8 text-accent-200 opacity-[0.12] transition duration-500 ease-out group-hover:scale-[1.06] group-hover:opacity-20" />
                </span>
                {/* Gelap berangsur di bawah, sama seperti di beranda, supaya
                    teks tetap terbaca saat ornamen ikut menyala. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-brand-950/85 to-transparent"
                />

                <span className="relative inline-flex size-11 shrink-0 items-center justify-center self-start rounded-2xl bg-white/10 ring-1 ring-white/20 ring-inset backdrop-blur-sm transition duration-300 ease-out group-hover:bg-white/15 group-hover:ring-white/30">
                  <Icon nama={j.ikon} className="size-5 text-accent-200" tebal={1.8} />
                </span>

                <div className="relative mt-10 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-balance text-white">
                    {j.nama}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-pretty text-white/75">
                    {j.isi}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Daftar program */}
      <Section id="program" nada="sejuk" className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Program"
            judul="Yang sedang"
            sorot="kami danai"
            keterangan="Anda dapat menentukan program tujuan saat mengirim konfirmasi transfer. Bila tidak disebutkan, dana masuk ke pos infak umum."
          />

          {program.length === 0 ? (
            <EmptyState
              className="mt-10"
              judul="Belum ada program yang dibuka"
              keterangan="Saat ini tidak ada penghimpunan yang sedang berjalan. Infak umum tetap dapat disalurkan lewat rekening resmi di bawah."
              aksi={{ label: "Lihat rekening resmi", href: "#rekening" }}
            />
          ) : (
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {program.map((p) => (
                <ProgramDonasiCard key={p.slug} program={p} />
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* Rekening resmi */}
      <Section id="rekening" className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Rekening resmi"
            judul="Hanya empat rekening ini"
            sorot="yang resmi"
            keterangan="Kami tidak pernah meminta transfer ke rekening pribadi. Bila Anda menerima permintaan atas nama perorangan, mohon laporkan kepada kami."
          />
          <div className="mt-12">
            <DaftarRekening rekening={rekening} />
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-accent-200 bg-accent-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Icon nama="info" className="mt-0.5 size-5 shrink-0 text-accent-700" />
              <p className="text-sm leading-relaxed text-accent-900">
                Setelah transfer, kirim bukti ke WhatsApp konfirmasi agar donasi tercatat atas nama
                Anda dan konfirmasi penyalurannya bisa kami kirimkan.
              </p>
            </div>
            <ButtonLink
              href={`https://wa.me/${site.kontak.whatsapp}?text=${encodeURIComponent(
                "Assalamu'alaikum. Saya ingin mengonfirmasi donasi ke LAZIS Wadi Mubarak.",
              )}`}
              eksternal
              ukuran="sm"
              className="shrink-0"
            >
              <Icon nama="whatsapp" className="size-4" />
              Konfirmasi donasi
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Alur setelah berdonasi */}
      <Section nada="sejuk" className="py-14 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <JudulSeksi
            atas="Setelah berdonasi"
            judul="Apa yang terjadi"
            sorot="dengan uang Anda"
            rata="kiri"
            keterangan="Lima langkah ini berlaku untuk semua jenis dana, dari nominal terkecil sampai terbesar."
          />
          <ol className="flex flex-col gap-4">
            {alurSetelahDonasi.map((langkah, i) => (
              <li
                key={langkah}
                className="flex items-start gap-4 rounded-xl border border-line bg-white p-5"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-xs font-bold text-white"
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink">{langkah}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

    </>
  );
}
