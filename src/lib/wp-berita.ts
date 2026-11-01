/**
 * Klien WordPress untuk berita dan artikel.
 *
 * Berita dibaca dari CMS headless di cms.wadimubarak.com lewat WPGraphQL,
 * memakai `kueri` dan `WPGRAPHQL_ENDPOINT` yang sama dengan program donasi di
 * `wp.ts`. Berkas ini terpisah karena urusannya lain: paginasi arsip 600+
 * tulisan, serta rubrik dan unit dari plugin `cms/wm-rubrik` dan `cms/wm-unit`.
 *
 * Sifatnya sama dengan `wp.ts`: **tidak pernah melempar ke pemanggil.** Setiap
 * kegagalan mengembalikan `null` dan `content.ts` melanjutkan dengan tulisan
 * contoh di `src/data/posts.ts`. Situs tidak boleh mati hanya karena WordPress
 * sedang tidak bisa dihubungi.
 *
 * Catatan penting soal ukuran: Next.js tidak meng-cache balasan di atas 2 MB,
 * sehingga setiap halaman yang dirender akan mengambil ulang seluruh arsip.
 * Satu halaman berisi 100 tulisan terukur sampai 1,25 MB (Oktober 2026), terlalu
 * dekat dengan batas itu, jadi diambil 50 per permintaan.
 */

import { unitsMentah } from "@/data/units";
import { categorySchema, type Category, type Lokasi } from "@/lib/schemas";
import { kueri, ringkas, tanpaTag, wpAktif } from "@/lib/wp";

/** Ambang satu permintaan. Halaman 50 tulisan bisa ~600 KB, jadi tidak ketat. */
const BATAS_MS = 20000;

/** Label cache Next.js, dipakai `/api/revalidate` untuk menyegarkan seketika. */
export const TAG_BERITA = "berita";

/** ISR 1 jam, sepadan dengan `revalidate` di halaman /informasi. */
const UMUR_CACHE = 3600;

/** Lihat catatan ukuran di atas. WPGraphQL sendiri membatasi `first` pada 100. */
const PER_HALAMAN = 50;

/**
 * Berapa halaman paling banyak diambil. Arsip yayasan berisi 600+ tulisan;
 * dua puluh halaman memberi ruang tumbuh sampai 1.000 tulisan tanpa membuat
 * build berjalan tanpa batas kalau suatu saat WordPress mengembalikan hal yang
 * tak terduga.
 */
const MAKS_HALAMAN = 20;

/** True bila berita dibaca dari WordPress, bukan dari data contoh. */
export function beritaWpAktif(): boolean {
  return wpAktif();
}

/** Nilai `unit_utama` untuk tulisan yang bukan milik unit tertentu. */
const UNIT_INDUK = "wadi-mubarak";

/**
 * Slug unit menurut urutan tampil di situs. WordPress tidak menyimpan urutan
 * centang, jadi unit pertama di daftar ini yang menjadi `unit_utama` tulisan
 * milik beberapa unit. Slug yang tidak dikenal situs diabaikan.
 */
const URUTAN_UNIT = unitsMentah.map((u) => (u as { slug: string }).slug);

/* -------------------------------------------------------------------------- */
/* Kueri dan bentuk balasan WPGraphQL                                          */
/* -------------------------------------------------------------------------- */

/**
 * Hanya bahasa Indonesia: tulisan terjemahan (Polylang) punya slug sendiri dan
 * belum punya tempat di situs induk. `first` pada taksonomi diisi karena
 * WPGraphQL bawaannya hanya mengembalikan 10. Kategori WordPress tidak diambil:
 * rubrik dan unit sudah punya taksonominya sendiri.
 */
const KUERI_BERITA = /* GraphQL */ `
  query Berita($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, language: ID, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        date
        modified
        title
        excerpt
        content
        # Dari plugin cms/wm-seo, isian Yoast di editor tulisan.
        seoJudul
        seoDeskripsi
        seoNoindex
        # Dari plugin cms/wm-rubrik, penentu kategori dan tampil tidaknya tulisan.
        daftarRubrik(first: 10) {
          nodes {
            slug
          }
        }
        # Dari plugin cms/wm-unit, penentu filter unit dan blok berita unit.
        daftarUnit(first: 20) {
          nodes {
            slug
          }
        }
        author {
          node {
            name
          }
        }
        tags(first: 100) {
          nodes {
            name
          }
        }
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

type NodePost = {
  slug: string | null;
  date: string | null;
  modified: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  seoJudul: string | null;
  seoDeskripsi: string | null;
  seoNoindex: boolean;
  daftarRubrik: { nodes: { slug: string | null }[] } | null;
  daftarUnit: { nodes: { slug: string | null }[] } | null;
  author: { node: { name: string | null } | null } | null;
  tags: { nodes: { name: string | null }[] } | null;
  featuredImage: {
    node: {
      sourceUrl: string | null;
      altText: string | null;
      mediaDetails: { width: number | null; height: number | null } | null;
    } | null;
  } | null;
};

type HalamanPosts = {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: NodePost[];
  };
};

/* -------------------------------------------------------------------------- */
/* Pembersih teks                                                              */
/* -------------------------------------------------------------------------- */

/** Singkatan yang harus tetap kapital saat judul KAPITAL diturunkan. */
const SINGKATAN = /\b(taud|mit|mts|ma|stiu|mbs|pkm|ppdb|saqu|lazis|pg|iqt|wm)\b/gi;

/**
 * Judul WordPress yayasan banyak yang ditulis KAPITAL SELURUHNYA dan diakhiri
 * emoji. Keduanya merusak ritme kartu di /informasi, jadi dirapikan di sini,
 * bukan di komponen, supaya JSON-LD dan feed RSS ikut memakai judul yang sama.
 */
function rapikanJudul(judul: string): string {
  const bersih = judul.replace(/[\p{Extended_Pictographic}️]/gu, "").replace(/\s+/g, " ").trim();
  const huruf = bersih.replace(/[^\p{L}]/gu, "");
  if (huruf.length > 0 && huruf === huruf.toUpperCase()) {
    return bersih
      .toLowerCase()
      .replace(/(^|[.!?|]\s*)(\p{Ll})/gu, (_, awalan: string, h: string) => awalan + h.toUpperCase())
      .replace(SINGKATAN, (w) => w.toUpperCase());
  }
  return bersih;
}

/** Gambar pengganti bila tulisan tidak punya gambar unggulan. */
const GAMBAR_CADANGAN = { src: "/img/post-1.svg", alt: "", width: 1200, height: 800 } as const;

/* -------------------------------------------------------------------------- */
/* Pemetaan                                                                    */
/* -------------------------------------------------------------------------- */

function petakan(p: NodePost): unknown | null {
  const slug = p.slug?.trim();
  const judulMentah = tanpaTag(p.title ?? "");
  const konten = p.content ?? "";
  if (!slug || !judulMentah || !konten.trim()) return null;

  const topik = (p.tags?.nodes ?? [])
    .map((t) => t.name)
    .filter((s): s is string => Boolean(s));

  // Rubrik pertama yang dikenal menentukan kategori situs induk. Tulisan tanpa
  // rubrik tetap dipetakan, supaya tautan langsungnya hidup, tetapi tidak
  // dinaikkan ke daftar mana pun.
  const rubrik = (p.daftarRubrik?.nodes ?? [])
    .map((r) => categorySchema.safeParse(r.slug))
    .find((r) => r.success)?.data;
  const category: Category = rubrik ?? "artikel";

  const dicentang = new Set((p.daftarUnit?.nodes ?? []).map((u) => u.slug));
  const unitTerkait = URUTAN_UNIT.filter((s) => dicentang.has(s));
  const unit = unitTerkait.length > 0 ? unitTerkait : [UNIT_INDUK];

  const media = p.featuredImage?.node;
  const gambar = media?.sourceUrl
    ? {
        src: media.sourceUrl,
        alt: media.altText?.trim() ? media.altText : judulMentah,
        width: media.mediaDetails?.width ?? 1200,
        height: media.mediaDetails?.height ?? 800,
      }
    : GAMBAR_CADANGAN;

  const judul = rapikanJudul(judulMentah);
  const kutipan = tanpaTag(p.excerpt ?? "") || tanpaTag(konten);

  // Seluruh unit yayasan berkampus di Bogor kecuali Sleman, dan WordPress tidak
  // menandai lokasi sama sekali, jadi Bogor adalah satu-satunya nilai jujur.
  const lokasi: Lokasi = "bogor";

  return {
    slug,
    judul,
    ringkasan: ringkas(kutipan) || judul,
    // WordPress menyimpan waktu lokal tanpa zona; situs berjalan di WIB.
    tanggal: p.date ? `${p.date}+07:00` : new Date().toISOString(),
    diperbarui: p.modified ? `${p.modified}+07:00` : undefined,
    category,
    unit_utama: unit[0] ?? UNIT_INDUK,
    unit,
    lokasi,
    topik,
    gambar,
    penulis: p.author?.node?.name ?? "Humas Wadi Mubarak",
    // Kurasi PRD §9.1: redaksi menaikkan tulisan ke situs induk dengan
    // memberinya rubrik di CMS. Sisanya tetap tersimpan tanpa ikut didaftar.
    tampilkan_di_induk: rubrik !== undefined,
    konten,
    seo: {
      judul: p.seoJudul?.trim() || null,
      deskripsi: p.seoDeskripsi?.trim() || null,
      noindex: p.seoNoindex,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Pengambilan                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Selama build, satu worker merender ratusan halaman /informasi sekaligus dan
 * cache fetch masih kosong, jadi tanpa ini setiap halaman mengambil seluruh
 * arsip sendiri-sendiri. Itu pernah membanjiri CMS dengan ~600 kueri dalam
 * semenit dan membuat server kehabisan memori (17 Oktober 2026). Di luar build
 * tidak dipakai, supaya ISR tetap membaca data terbaru.
 */
let janjiBuild: Promise<unknown[] | null> | undefined;

/**
 * Ambil seluruh tulisan dari WordPress dalam bentuk mentah yang sama dengan
 * `postsMentah`. Validasi Zod tetap dijalankan `content.ts` memakai skema yang
 * sama, jadi data CMS tidak lebih dipercaya daripada data statis.
 *
 * `null` berarti WordPress tidak dapat dihubungi sama sekali.
 */
export function ambilPostsWp(): Promise<unknown[] | null> {
  if (process.env["NEXT_PHASE"] !== "phase-production-build") return ambilSemua();
  return (janjiBuild ??= ambilSemua());
}

async function ambilSemua(): Promise<unknown[] | null> {
  const mentah: NodePost[] = [];
  let after: string | null = null;

  for (let n = 1; n <= MAKS_HALAMAN; n++) {
    const data: HalamanPosts | null = await kueri<HalamanPosts>(`posts halaman ${n}`, KUERI_BERITA, {
      tag: TAG_BERITA,
      umur: UMUR_CACHE,
      batasMs: BATAS_MS,
      variables: { first: PER_HALAMAN, after },
    });
    // Gagal di halaman pertama = WordPress tidak terjangkau; menyerah dan pakai
    // data statis. Gagal di halaman lanjutan = pakai saja yang sudah terkumpul.
    if (!data) {
      if (n === 1) return null;
      break;
    }
    mentah.push(...data.posts.nodes);
    if (!data.posts.pageInfo.hasNextPage || !data.posts.pageInfo.endCursor) break;
    after = data.posts.pageInfo.endCursor;
  }

  const hasil: unknown[] = [];
  for (const p of mentah) {
    const dipetakan = petakan(p);
    if (dipetakan) hasil.push(dipetakan);
  }

  return hasil.length > 0 ? hasil : null;
}
