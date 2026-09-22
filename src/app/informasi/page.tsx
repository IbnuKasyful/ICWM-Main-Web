import { FilterBar, type NilaiFilter } from "@/components/informasi/FilterBar";
import { Pagination } from "@/components/informasi/Pagination";
import { PageHeader } from "@/components/site/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { PostCardKabar } from "@/components/ui/PostCard";
import {
  getTahunPost,
  getUnitsAktif,
  saringPosts,
  type FilterInformasi,
} from "@/lib/content";
import { categorySchema } from "@/lib/schemas";
import { buatMetadata } from "@/lib/seo";

/** PRD §8, ISR 5 menit. */
export const revalidate = 300;

const PER_HALAMAN = 6;

export const metadata = buatMetadata({
  judul: "Berita, pengumuman, dan artikel",
  deskripsi:
    "Arsip berita, pengumuman, prestasi, dan catatan pengajar dari seluruh unit Islamic Center Wadi Mubarak. Dapat disaring per kategori, unit, dan tahun.",
  path: "/informasi",
});

type Params = Promise<Record<string, string | string[] | undefined>>;

function satu(nilai: string | string[] | undefined): string | undefined {
  return Array.isArray(nilai) ? nilai[0] : nilai;
}

export default async function HalamanInformasi({ searchParams }: { searchParams: Params }) {
  const sp = await searchParams;

  const mentah: NilaiFilter = {
    category: satu(sp["category"]),
    unit: satu(sp["unit"]),
    tahun: satu(sp["tahun"]),
  };

  const units = getUnitsAktif();
  const tahunTersedia = await getTahunPost();

  // Nilai dari URL tidak dipercaya begitu saja: divalidasi dulu terhadap skema.
  const kategoriValid = categorySchema.safeParse(mentah.category);
  const tahunAngka = mentah.tahun ? Number(mentah.tahun) : undefined;

  const filter: FilterInformasi = {
    category: kategoriValid.success ? kategoriValid.data : undefined,
    unit: units.some((u) => u.slug === mentah.unit) ? mentah.unit : undefined,
    tahun: tahunAngka && tahunTersedia.includes(tahunAngka) ? tahunAngka : undefined,
  };

  const hasil = await saringPosts(filter);
  const totalHalaman = Math.max(1, Math.ceil(hasil.length / PER_HALAMAN));
  const halamanMentah = Number(satu(sp["halaman"]) ?? "1");
  const halaman = Number.isFinite(halamanMentah)
    ? Math.min(Math.max(1, Math.trunc(halamanMentah)), totalHalaman)
    : 1;

  const tampil = hasil.slice((halaman - 1) * PER_HALAMAN, halaman * PER_HALAMAN);

  const nilaiBersih: NilaiFilter = {
    category: filter.category,
    unit: filter.unit,
    tahun: filter.tahun ? String(filter.tahun) : undefined,
  };

  function hrefHalaman(h: number): string {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(nilaiBersih)) {
      if (v) params.set(k, v);
    }
    if (h > 1) params.set("halaman", String(h));
    const kueri = params.toString();
    return kueri ? `/informasi?${kueri}` : "/informasi";
  }

  return (
    <>
      <PageHeader
        jejak={[{ label: "Informasi", href: "/informasi" }]}
        atas="Arsip"
        judul="Berita, pengumuman, dan artikel"
        keterangan="Berita dan artikel tidak dipisah menjadi dua arsip. Keduanya ada di sini, dibedakan oleh kategori, gunakan penyaring untuk mempersempit."
      />

      <section className="py-12 md:py-16">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FilterBar nilai={nilaiBersih} units={units} tahunTersedia={tahunTersedia} />
          </div>

          <div>
            <p className="border-b border-line pb-4 text-sm text-ink-muted">
              <span className="font-semibold text-ink">{hasil.length}</span> tulisan ditemukan
              {totalHalaman > 1 ? (
                <>
                  {" "}
                  · halaman {halaman} dari {totalHalaman}
                </>
              ) : null}
            </p>

            {tampil.length === 0 ? (
              <EmptyState
                className="mt-8"
                ikon="cari"
                judul="Belum ada tulisan dengan penyaring ini"
                keterangan="Tidak ada tulisan yang cocok dengan kombinasi penyaring yang Anda pilih. Coba longgarkan salah satunya, atau lihat seluruh arsip."
                aksi={{ label: "Lihat semua tulisan", href: "/informasi" }}
              />
            ) : (
              <>
                {/* Satu kolom: kolom isi di sini lebih sempit dari beranda karena
                    berbagi baris dengan penyaring, jadi kartu melebar butuh lebar penuh. */}
                <ul className="mt-8 grid grid-cols-1 gap-5">
                  {tampil.map((post, i) => (
                    <PostCardKabar key={post.slug} post={post} prioritas={i < 2} />
                  ))}
                </ul>

                <Pagination
                  halaman={halaman}
                  totalHalaman={totalHalaman}
                  buatHref={hrefHalaman}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
