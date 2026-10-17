/**
 * Klien WordPress untuk berita dan artikel.
 *
 * Berita dibaca dari CMS headless di cms.wadimubarak.com lewat WPGraphQL,
 * memakai `kueri` dan `WPGRAPHQL_ENDPOINT` yang sama dengan program donasi di
 * `wp.ts`. Berkas ini terpisah karena urusannya lain: paginasi arsip 600+
 * tulisan dan pemetaan 37 kategori WordPress ke taksonomi situs induk.
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

import type { Category, Lokasi } from "@/lib/schemas";
import { kueri, wpAktif } from "@/lib/wp";

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

/* -------------------------------------------------------------------------- */
/* Pemetaan taksonomi WordPress → taksonomi situs induk                        */
/* -------------------------------------------------------------------------- */

/**
 * PRD §7.1 mengunci kategori situs induk pada tujuh term, sedangkan WordPress
 * yayasan memakai 37 kategori yang tumbuh apa adanya. Peta ini jembatannya.
 *
 * Kunci adalah slug kategori WordPress. Kategori yang TIDAK ada di sini
 * dianggap bukan isi redaksional situs induk dan tulisannya tidak dinaikkan
 * (lihat `tampilkan_di_induk` di bawah), itu cara kurasi PRD §9.1 bekerja
 * selama WordPress belum punya penanda khusus. Yang sengaja ditinggalkan:
 * `pemasaran`, `publishing`, `bimbel-saqu`, `madrasah-online`, `sahabat-resto`,
 * dan `live-streaming`, semuanya lini usaha atau kanal lain, bukan kabar
 * yayasan. Menambah kategori ke situs induk cukup dengan satu baris di sini.
 *
 * Slug ini aman dari Polylang: kategori sengaja tidak diterjemahkan di CMS
 * (mu-plugin `icwm-polylang.php`), jadi slug-nya sama di semua bahasa.
 */
const KATEGORI_INDUK: Record<string, Category> = {
  // Berita
  "berita-nasional": "berita",
  "berita-timur-tengah": "berita",
  "dunia-islam": "berita",
  yasaqu: "berita",
  // Pengumuman
  pendaftaran: "pengumuman",
  // Kegiatan unit dan program
  "taud-saqu": "kegiatan",
  "mahabbah-boarding-school": "kegiatan",
  "mts-ma": "kegiatan",
  "stiu-wm": "kegiatan",
  "lkid-saqu": "kegiatan",
  "graha-quran": "kegiatan",
  "wq-wisata-quran": "kegiatan",
  "mimbar-membangun-dan-memakmurkan-masjid": "kegiatan",
  // Artikel keilmuan dan pengasuhan
  artikel: "artikel",
  akhlaq: "artikel",
  fiqh: "artikel",
  "fiqh-artikel": "artikel",
  hadist: "artikel",
  tafsir: "artikel",
  qiraat: "artikel",
  "sirah-nabi": "artikel",
  ulama: "artikel",
  sahabat: "artikel",
  tausiyah: "artikel",
  "quranic-parenting": "artikel",
  ramadhan: "artikel",
  dzulhijjah: "artikel",
  "haji-umrah": "artikel",
};

/**
 * Kategori WordPress yang menandai tulisan milik sebuah unit. Dipakai mengisi
 * `unit` dan `unit_utama`, yang menentukan URL kanonik sekaligus penyaring
 * "unit" di /informasi dan blok berita di halaman profil unit.
 */
const UNIT_DARI_KATEGORI: Record<string, string[]> = {
  "taud-saqu": ["taud-saqu"],
  "mahabbah-boarding-school": ["mts-mbs-putri", "ma-mbs-putri"],
  "mts-ma": ["mts-tahfizh-putra", "ma-tahfizh-putra"],
  "stiu-wm": ["stiu-wadi-mubarak"],
  "lkid-saqu": ["pkm-wadi-mubarak"],
};

/** Nilai `unit_utama` untuk tulisan yang bukan milik unit tertentu. */
const UNIT_INDUK = "wadi-mubarak";

/* -------------------------------------------------------------------------- */
/* Kueri dan bentuk balasan WPGraphQL                                          */
/* -------------------------------------------------------------------------- */

/**
 * Hanya bahasa Indonesia: tulisan terjemahan (Polylang) punya slug sendiri dan
 * belum punya tempat di situs induk. `first: 100` pada taksonomi karena
 * WPGraphQL bawaannya hanya mengembalikan 10.
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
        title
        excerpt
        content
        author {
          node {
            name
          }
        }
        categories(first: 100) {
          nodes {
            slug
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
  title: string | null;
  excerpt: string | null;
  content: string | null;
  author: { node: { name: string | null } | null } | null;
  categories: { nodes: { slug: string | null }[] } | null;
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

const ENTITAS: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8211;": "–",
  "&#8212;": "—",
  "&hellip;": "…",
  "&#039;": "'",
  "&#39;": "'",
};

function tanpaTag(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITAS[e.toLowerCase()] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

/** Ringkasan dibatasi 200 karakter oleh skema; dipotong di batas kata. */
function ringkas(teks: string, batas = 200): string {
  if (teks.length <= batas) return teks;
  const potong = teks.slice(0, batas - 1);
  const spasi = potong.lastIndexOf(" ");
  return (spasi > batas * 0.6 ? potong.slice(0, spasi) : potong).trimEnd() + "…";
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

  const kategoriWp = (p.categories?.nodes ?? [])
    .map((k) => k.slug)
    .filter((s): s is string => Boolean(s));
  const topik = (p.tags?.nodes ?? [])
    .map((t) => t.name)
    .filter((s): s is string => Boolean(s));

  // Kategori pertama yang dikenal menentukan kategori situs induk. Tulisan yang
  // tak satu pun kategorinya dikenal tetap dipetakan, tetapi tidak dinaikkan.
  const slugDikenal = kategoriWp.find((s) => s in KATEGORI_INDUK);
  const category: Category = slugDikenal ? (KATEGORI_INDUK[slugDikenal] as Category) : "artikel";

  const unitTerkait = [...new Set(kategoriWp.flatMap((s) => UNIT_DARI_KATEGORI[s] ?? []))];
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
    category,
    unit_utama: unit[0] ?? UNIT_INDUK,
    unit,
    lokasi,
    topik,
    gambar,
    penulis: p.author?.node?.name ?? "Humas Wadi Mubarak",
    // Kurasi PRD §9.1: hanya tulisan yang kategorinya terdaftar di
    // `KATEGORI_INDUK` yang naik ke situs induk. Sisanya tetap tersimpan di
    // CMS tanpa ikut tayang di situs induk.
    tampilkan_di_induk: slugDikenal !== undefined,
    konten,
  };
}

/* -------------------------------------------------------------------------- */
/* Pengambilan                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Ambil seluruh tulisan dari WordPress dalam bentuk mentah yang sama dengan
 * `postsMentah`. Validasi Zod tetap dijalankan `content.ts` memakai skema yang
 * sama, jadi data CMS tidak lebih dipercaya daripada data statis.
 *
 * `null` berarti WordPress tidak dapat dihubungi sama sekali.
 */
export async function ambilPostsWp(): Promise<unknown[] | null> {
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
