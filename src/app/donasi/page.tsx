import { DaftarRekening } from "@/components/donasi/DaftarRekening";
import { ProgramDonasiCard } from "@/components/donasi/ProgramDonasiCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon, IconChip } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { KartuFoto } from "@/components/ui/KartuFoto";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { getProgramDonasi, getRekening } from "@/lib/content";
import { buatMetadata, jsonldNgo } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8, ISR 15 menit. */
export const revalidate = 900;

export const metadata = buatMetadata({
  judul: "Donasi lewat LAZIS Wadi Mubarak",
  deskripsi:
    "Salurkan zakat, infak, sedekah, dan wakaf lewat LAZIS SaQu Wadi Mubarak. Setiap program di halaman ini menyebut peruntukan, satuan biaya, dan penerima manfaatnya.",
  path: "/donasi",
  gambar: "/img/donasi-jumat-berkah.jpg",
});

/** `gambar` diambil dari dokumentasi program donasi di `src/data/donasi.ts`,
 * hanya yang berupa foto, bukan poster, karena kartunya memangkas gambar
 * (`object-cover`) dan tulisan poster akan terpotong. Donasi baru punya tiga
 * foto dokumentasi, jadi Zakat memakai foto kartu "Berdonasi" di bilah "Mulai
 * dari sini" beranda. Sengaja memakai foto, bukan ilustrasi ornamen: kartunya
 * sekartu dengan bilah beranda. */
const jenisDana = [
  {
    nama: "Zakat",
    isi: "Kewajiban 2,5% atas harta yang telah mencapai nisab dan haul. Kami salurkan hanya kepada delapan asnaf yang berhak.",
    ikon: "perisai" as const,
    gambar: "/img/niat-berdonasi.jpg",
  },
  {
    nama: "Infak",
    isi: "Pemberian bebas nominal dan bebas waktu, dipakai untuk menutup biaya operasional program pendidikan dan sosial.",
    ikon: "donasi" as const,
    gambar: "/img/donasi-puasa-arafah.jpg",
  },
  {
    nama: "Sedekah",
    isi: "Pemberian sukarela, termasuk sedekah dapur santri dan santunan mendesak bagi keluarga santri.",
    ikon: "orang" as const,
    gambar: "/img/donasi-hewan-qurban.jpg",
  },
  {
    nama: "Wakaf",
    isi: "Menahan pokok harta dan mengalirkan manfaatnya, dipakai untuk pembangunan asrama, kelas, dan aset produktif.",
    ikon: "yayasan" as const,
    gambar: "/img/donasi-pembangunan.jpg",
  },
];

/** `waktu` tampil pada bilah tegak di sisi kiri kartu, jadi tulisannya harus
 * pendek, bilah itu setinggi kartu dikurangi 2,5rem, bukan lebih. */
const alurSetelahDonasi = [
  {
    judul: "Transfer",
    waktu: "Menit ini",
    ikon: "uang" as const,
    isi: "Anda mentransfer ke salah satu rekening lembaga, dengan jenis dana ditulis pada berita transfer.",
  },
  {
    judul: "Konfirmasi",
    waktu: "Hari itu juga",
    ikon: "whatsapp" as const,
    isi: "Kirim bukti transfer lewat WhatsApp konfirmasi agar dana tercatat atas nama Anda.",
  },
  {
    judul: "Verifikasi amil",
    waktu: "1×24 jam",
    ikon: "centang" as const,
    isi: "Amil memverifikasi dan mencatat donasi dalam pembukuan LAZIS dalam 1×24 jam kerja.",
  },
  {
    judul: "Penyaluran",
    waktu: "Terjadwal",
    ikon: "donasi" as const,
    isi: "Dana disalurkan sesuai peruntukan program, diverifikasi penerima manfaatnya.",
  },
  {
    judul: "Kabar penyaluran",
    waktu: "Menyusul",
    ikon: "dokumen" as const,
    isi: "Anda menerima konfirmasi penyaluran atas donasi yang tercatat atas nama Anda.",
  },
];

/** Ditulis utuh, bukan dirakit dari `i`, supaya Tailwind ikut memindainya.
 * Langkah ganjil menempel kolom kiri, langkah genap kolom kanan. */
const kolomLangkah = ["lg:col-start-1", "lg:col-start-7"];

/** Barisnya dipatok satu langkah per baris. Tanpa ini grid menjejalkan dua
 * kartu setengah lebar ke baris yang sama, dan zigzagnya berubah jadi dua
 * kolom sejajar. */
const barisLangkah = [
  "lg:row-start-1",
  "lg:row-start-2",
  "lg:row-start-3",
  "lg:row-start-4",
  "lg:row-start-5",
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
            Titipkan zakat Anda pada tim amil yang{" "}
            <span className="text-accent-300">Anda kenal jejaknya</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-white/70">
            {site.lazis.nama} menghimpun dan menyalurkan zakat, infak, sedekah, dan wakaf untuk
            santri penghafal Al-Qur&apos;an. Setiap program di halaman ini menyebut peruntukan,
            satuan biaya, dan penerima manfaatnya.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="#rekening" varian="terang">
              Lihat rekening lembaga
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
          {/* Bilah yang sama persis dengan "Mulai dari sini" di beranda, hanya
              tanpa tautan, keempat jenis dana ini tidak punya halaman tujuan
              masing-masing. Susunan barisnya ikut disamakan: blok teksnya
              dipatok selebar 22rem, jadi ia butuh bilah yang melebar, bukan
              petak grid yang sempit. */}
          <ul className="mt-12 flex flex-col gap-3 lg:h-[27rem] lg:flex-row lg:gap-4">
            {jenisDana.map((j) => (
              <KartuFoto
                key={j.nama}
                gambar={j.gambar}
                ikon={j.ikon}
                judul={j.nama}
                keterangan={j.isi}
                sizes="(min-width: 1024px) 34rem, 92vw"
                className={cn(
                  "h-[13rem] sm:h-[15rem]",
                  "transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none",
                  "lg:h-auto lg:flex-[1_1_0%] lg:hover:flex-[3.4_1_0%] lg:focus-within:flex-[3.4_1_0%]",
                )}
              />
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
              keterangan="Saat ini tidak ada penghimpunan yang sedang berjalan. Infak umum tetap dapat disalurkan lewat rekening lembaga di bawah."
              aksi={{ label: "Lihat rekening lembaga", href: "#rekening" }}
            />
          ) : (
            <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {program.map((p) => (
                <ProgramDonasiCard key={p.slug} program={p} />
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* Rekening lembaga */}
      <Section id="rekening" className="py-14 md:py-20">
        <div className="container-page">
          <JudulSeksi
            atas="Rekening lembaga"
            judul="Hanya dua rekening ini"
            sorot="yang sah"
            keterangan="Keduanya menerima zakat, infak, sedekah, dan wakaf, tulis peruntukannya pada berita transfer. Kami tidak pernah meminta transfer ke rekening pribadi. Bila Anda menerima permintaan atas nama perorangan, mohon laporkan kepada kami."
          />
          <div className="mt-12">
            <DaftarRekening rekening={rekening} />
          </div>

          {/* Nada gelapnya dipinjam dari kartu "Yang membedakan program ini" di
              /program-quran saat disorot: biru tua merek, bukan hitam netral,
              dengan bayangan rendah yang mengangkatnya sedikit dari halaman.
              Di sini nada itu menetap, kartunya memang satu-satunya langkah
              yang tersisa setelah transfer, jadi ia pantas menonjol sendiri. */}
          <div className="mt-8 flex flex-col gap-4 rounded-[22px] bg-brand-950 p-6 shadow-[0_22px_45px_-20px_rgba(0,12,40,0.7)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-white ring-1 ring-white/30 ring-inset">
                <Icon nama="info" className="size-4" />
              </span>
              <p className="text-sm leading-relaxed text-pretty text-white/75">
                Setelah transfer, kirim bukti ke WhatsApp konfirmasi agar donasi tercatat atas nama
                Anda dan konfirmasi penyalurannya bisa kami kirimkan.
              </p>
            </div>
            <ButtonLink
              href={`https://wa.me/${site.lazis.whatsapp}?text=${encodeURIComponent(
                "Assalamu'alaikum. Saya ingin mengonfirmasi donasi ke LAZIS SaQu Wadi Mubarak.",
              )}`}
              eksternal
              varian="terang"
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
        <div className="container-page">
          <JudulSeksi
            atas="Setelah berdonasi"
            judul="Apa yang terjadi"
            sorot="dengan uang Anda"
            keterangan="Lima langkah ini berlaku untuk semua jenis dana, dari nominal terkecil sampai terbesar."
          />

          {/* Zigzag: langkah berselang-seling kiri–kanan mengapit sumbu tengah
              halaman, senapas dengan judul seksi yang rata tengah. Nada
              terang–gelap ikut sisi, kiri terang, kanan gelap, jadi urutannya
              sudah terbaca dari bentuknya sebelum nomornya dibaca. Kartunya
              selebar 6 dari 12 kolom, dan bilah waktunya ikut dicerminkan agar
              selalu menghadap tepi luar. Garis putus-putus di sela kartu
              menyambungkan langkah ke langkah: tegak lurus saat kartu
              bertumpuk, menyiku menyeberangi sumbu saat berselang-seling. */}
          <ol className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {alurSetelahDonasi.map((langkah, i) => {
              const gelap = i % 2 === 1;
              return (
                <li
                  key={langkah.judul}
                  className={cn(
                    "relative flex items-stretch lg:col-span-6",
                    kolomLangkah[i % 2],
                    barisLangkah[i],
                    gelap ? "lg:flex-row-reverse" : "",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 my-5 -mr-6 flex w-11 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-semibold tracking-[0.1em] text-white uppercase",
                      gelap ? "bg-brand-800 lg:mr-0 lg:-ml-6" : "bg-brand-700",
                    )}
                  >
                    <span className="rotate-180 [writing-mode:vertical-rl]">{langkah.waktu}</span>
                  </span>

                  <div
                    className={cn(
                      "flex-1 rounded-[22px] p-6 pl-10",
                      gelap
                        ? "bg-brand-950 shadow-[0_22px_45px_-20px_rgba(0,12,40,0.7)] lg:pr-10 lg:pl-6"
                        : "border border-line bg-white shadow-soft",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <IconChip nama={langkah.ikon} nada={gelap ? "terang" : "brand"} />
                      <h3
                        className={cn(
                          "font-display text-display-sm",
                          gelap ? "text-white" : "text-ink",
                        )}
                      >
                        <span className={gelap ? "text-accent-300" : "text-brand-600"}>
                          {i + 1}
                        </span>{" "}
                        {langkah.judul}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        "mt-4 text-sm leading-relaxed text-pretty",
                        gelap ? "text-white/70" : "text-ink-muted",
                      )}
                    >
                      {langkah.isi}
                    </p>
                  </div>

                  {/* Siku menyeberang sumbu: sisi tegaknya berhenti 0,5rem dari
                      tepi kartu berikutnya, yang lebarnya satu sela grid. */}
                  {i < alurSetelahDonasi.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-full left-5 h-8 border-l-2 border-dashed border-line-strong lg:h-10 lg:w-32 lg:border-t-2",
                        gelap
                          ? "lg:-left-8 lg:rounded-tl-2xl"
                          : "lg:-right-8 lg:left-auto lg:rounded-tr-2xl lg:border-r-2 lg:border-l-0",
                      )}
                    >
                      <Icon
                        nama="panahBawah"
                        className={cn(
                          "absolute -bottom-1.5 -left-2 size-4 text-line-strong",
                          gelap ? "" : "lg:-right-2 lg:left-auto",
                        )}
                      />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

    </>
  );
}
