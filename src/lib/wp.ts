/**
 * Klien WPGraphQL, satu-satunya tempat aplikasi ini berbicara dengan WordPress.
 *
 * Dipakai oleh `src/lib/content.ts` (batas API, PRD §18) dan oleh
 * `src/lib/wp-berita.ts`, yang memakai `kueri` dari sini. Tidak ada komponen
 * yang boleh mengimpor berkas ini langsung.
 *
 * Sifat penting: **tidak pernah melempar ke pemanggil.** Setiap kegagalan
 * jaringan, kesalahan GraphQL, atau WordPress mati mengembalikan `null`, dan
 * pemanggil melanjutkan dengan data statis di `src/data/`. Halaman donasi lebih
 * baik menampilkan angka rekapitulasi terakhir yang ikut build daripada berubah
 * menjadi halaman galat, nomor rekening dan penjelasan programnya tetap benar.
 */

/** Ambang waktu satu kueri. WordPress di cPanel yang sama biasanya <200 ms. */
const BATAS_MS = 8000;

/** Label cache Next.js, dipakai `/api/revalidate` untuk menyegarkan seketika. */
export const TAG_DONASI = "donasi";

/** ISR 15 menit, sepadan dengan `export const revalidate` di halaman donasi. */
const UMUR_CACHE = 900;

export function endpointWp(): string | undefined {
  const url = process.env["WPGRAPHQL_ENDPOINT"]?.trim();
  return url ? url : undefined;
}

/** True bila situs dikonfigurasi memakai WordPress sebagai sumber data. */
export function wpAktif(): boolean {
  return endpointWp() !== undefined;
}

type BalasanGraphql<T> = {
  data?: T;
  errors?: { message: string }[];
};

type OpsiKueri = {
  /** Label cache Next.js, disegarkan lewat `/api/revalidate`. */
  tag: string;
  /** Umur cache ISR dalam detik. */
  umur: number;
  batasMs?: number;
  variables?: Record<string, unknown>;
};

/**
 * Menjalankan satu kueri GraphQL. Mengembalikan `null` pada kegagalan apa pun.
 *
 * @param label Nama kueri untuk pesan galat di log server.
 */
export async function kueri<T>(label: string, query: string, opsi: OpsiKueri): Promise<T | null> {
  const url = endpointWp();
  if (!url) return null;

  const token = process.env["WPGRAPHQL_TOKEN"]?.trim();

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ query, variables: opsi.variables }),
      signal: AbortSignal.timeout(opsi.batasMs ?? BATAS_MS),
      // Hasilnya di-cache Next.js dan disegarkan lewat tag, bukan per permintaan.
      next: { revalidate: opsi.umur, tags: [opsi.tag] },
    });

    if (!res.ok) {
      console.error(`[wp] ${label}: HTTP ${res.status} dari ${url}`);
      return null;
    }

    const isi = (await res.json()) as BalasanGraphql<T>;
    if (isi.errors?.length) {
      console.error(`[wp] ${label}: ${isi.errors.map((e) => e.message).join("; ")}`);
      return null;
    }
    return isi.data ?? null;
  } catch (galat) {
    // Termasuk timeout (AbortError) dan DNS/koneksi gagal.
    console.error(`[wp] ${label}: ${galat instanceof Error ? galat.message : String(galat)}`);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Program donasi                                                              */
/* -------------------------------------------------------------------------- */

const KUERI_DONASI = /* GraphQL */ `
  query ProgramDonasi {
    programDonasis(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
        title
        excerpt
        content
        jenisDana
        target
        terkumpul
        penerimaManfaat
        batasWaktu
        mendesak
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`;

type NodeDonasi = {
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  jenisDana: string | null;
  target: number | null;
  terkumpul: number | null;
  penerimaManfaat: string | null;
  batasWaktu: string | null;
  mendesak: boolean | null;
  featuredImage: {
    node: {
      sourceUrl: string | null;
      altText: string | null;
      mediaDetails: { width: number | null; height: number | null } | null;
    } | null;
  } | null;
};

/** Gambar pengganti bila admin lupa memasang gambar unggulan. */
const GAMBAR_CADANGAN = {
  src: "/img/donasi-1.svg",
  alt: "",
  width: 1200,
  height: 800,
} as const;

function tanpaTag(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Ambil seluruh program donasi dari WordPress dalam bentuk mentah yang sama
 * dengan `programDonasiMentah`, validasi Zod tetap dijalankan di `content.ts`,
 * memakai skema yang sama, sehingga data CMS tidak lebih dipercaya daripada
 * data statis.
 *
 * `null` berarti WordPress tidak dapat dihubungi.
 */
export async function ambilProgramDonasiWp(): Promise<unknown[] | null> {
  const data = await kueri<{ programDonasis: { nodes: NodeDonasi[] } }>("programDonasi", KUERI_DONASI, {
    tag: TAG_DONASI,
    umur: UMUR_CACHE,
  });
  if (!data) return null;

  return data.programDonasis.nodes.map((n) => {
    const gambar = n.featuredImage?.node;
    return {
      slug: n.slug ?? "",
      judul: tanpaTag(n.title ?? ""),
      // `ringkasan` dibatasi 200 karakter oleh skema; kutipan WordPress kadang
      // lebih panjang, jadi dipangkas di sini alih-alih menggagalkan halaman.
      ringkasan: tanpaTag(n.excerpt ?? "").slice(0, 200),
      jenis: n.jenisDana ?? "infak",
      gambar: gambar?.sourceUrl
        ? {
            src: gambar.sourceUrl,
            alt: gambar.altText ?? tanpaTag(n.title ?? ""),
            width: gambar.mediaDetails?.width ?? 1200,
            height: gambar.mediaDetails?.height ?? 800,
          }
        : GAMBAR_CADANGAN,
      target: n.target ?? 0,
      terkumpul: n.terkumpul ?? 0,
      penerima_manfaat: n.penerimaManfaat ?? "—",
      // Kolom tanggal WordPress kosong terkirim sebagai "", skema menuntut null.
      batas_waktu: n.batasWaktu ? n.batasWaktu : null,
      konten: n.content ?? "",
      mendesak: n.mendesak ?? false,
    };
  });
}

/* -------------------------------------------------------------------------- */
/* Foto galeri                                                                 */
/* -------------------------------------------------------------------------- */

export const TAG_GALERI = "galeri";

/**
 * Foto CMS yang ikut ke /galeri. Dibatasi supaya halamannya tidak terus
 * memberat seiring foto dicentang; yang tertua tergeser keluar.
 */
const BATAS_FOTO_GALERI = 60;

/** Pasangan field `fotoGaleri` di plugin `cms/wm-galeri/wm-galeri.php`. */
const KUERI_GALERI = /* GraphQL */ `
  query FotoGaleri($first: Int) {
    fotoGaleri(first: $first) {
      src
      keterangan
      lebar
      tinggi
      kelompok
      tulisanSlug
      tulisanJudul
    }
  }
`;

type NodeFotoGaleri = {
  src: string;
  keterangan: string;
  lebar: number;
  tinggi: number;
  kelompok: string;
  tulisanSlug: string | null;
  tulisanJudul: string | null;
};

/**
 * Foto yang dicentang "Tampilkan di galeri" di Media CMS, terbaru lebih dulu,
 * dalam bentuk mentah yang sama dengan `galeriMentah`. Validasinya di
 * `content.ts`.
 *
 * `null` berarti WordPress tidak dapat dihubungi.
 */
export async function ambilGaleriWp(): Promise<unknown[] | null> {
  const data = await kueri<{ fotoGaleri: NodeFotoGaleri[] | null }>("fotoGaleri", KUERI_GALERI, {
    tag: TAG_GALERI,
    umur: 3600,
    variables: { first: BATAS_FOTO_GALERI },
  });
  if (!data) return null;

  return (data.fotoGaleri ?? []).map((f) => ({
    src: f.src,
    alt: f.keterangan,
    width: f.lebar,
    height: f.tinggi,
    kategori: f.kelompok,
    ...(f.tulisanSlug
      ? { tulisan: { slug: f.tulisanSlug, judul: f.tulisanJudul ?? f.keterangan } }
      : {}),
  }));
}
