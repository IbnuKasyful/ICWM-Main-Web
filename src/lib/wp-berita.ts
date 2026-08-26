/**
 * Klien REST WordPress untuk berita dan artikel.
 *
 * Terpisah dari `wp.ts` karena berbicara dengan antarmuka yang berbeda:
 * `wp.ts` memakai WPGraphQL untuk CPT `program_donasi`, sedangkan berita
 * diambil lewat REST API bawaan WordPress (`/wp-json/wp/v2`). Alasannya
 * praktis — instalasi WordPress yayasan di wadimubarak.com tidak memasang
 * WPGraphQL, tetapi REST API-nya publik dan sudah menyediakan seluruh yang
 * dibutuhkan halaman /informasi.
 *
 * Sifatnya sama dengan `wp.ts`: **tidak pernah melempar ke pemanggil.** Setiap
 * kegagalan mengembalikan `null` dan `content.ts` melanjutkan dengan tulisan
 * contoh di `src/data/posts.ts`. Situs tidak boleh mati hanya karena WordPress
 * sedang tidak bisa dihubungi.
 *
 * Catatan penting soal ukuran: pemakaian `_embed` ditolak dengan sengaja.
 * Balasan ber-`_embed` untuk 100 tulisan mencapai 5,5 MB — 2,8 MB di antaranya
 * hanya objek taksonomi dan media yang disematkan berulang-ulang — dan itu
 * melewati batas cache data Next.js, sehingga setiap halaman yang dirender
 * mengambil ulang seluruh arsip. Dengan `_fields` yang ketat plus tiga tabel
 * pencarian kecil (kategori, penulis, media), satu halaman turun ke ~1 MB dan
 * benar-benar ter-cache.
 */

import type { Category, Lokasi } from "@/lib/schemas";

/** Ambang satu permintaan. Arsip 100 tulisan bisa ~1 MB, jadi tidak ketat. */
const BATAS_MS = 20000;

/** Label cache Next.js — dipakai `/api/revalidate` untuk menyegarkan seketika. */
export const TAG_BERITA = "berita";

/** ISR 1 jam, sepadan dengan `revalidate` di halaman /informasi. */
const UMUR_CACHE = 3600;

/** WordPress membatasi `per_page` pada 100. */
const PER_HALAMAN = 100;

/**
 * Berapa halaman paling banyak diambil. Arsip yayasan berisi 600+ tulisan;
 * delapan halaman memberi ruang tumbuh tanpa membuat build berjalan tanpa batas
 * kalau suatu saat WordPress mengembalikan hal yang tak terduga.
 */
const MAKS_HALAMAN = 8;

/** Kolom yang benar-benar dipakai. Sisanya tidak diminta. */
const KOLOM_POST =
  "id,slug,date,title,excerpt,content,featured_media,categories,tags,author";

export function endpointBerita(): string | undefined {
  const url = process.env["WP_REST_ENDPOINT"]?.trim();
  return url ? url.replace(/\/+$/, "") : undefined;
}

/** True bila berita dibaca dari WordPress, bukan dari data contoh. */
export function beritaWpAktif(): boolean {
  return endpointBerita() !== undefined;
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
 * (lihat `tampilkan_di_induk` di bawah) — itu cara kurasi PRD §9.1 bekerja
 * selama WordPress belum punya penanda khusus. Yang sengaja ditinggalkan:
 * `pemasaran`, `publishing`, `bimbel-saqu`, `madrasah-online`, `sahabat-resto`,
 * dan `live-streaming` — semuanya lini usaha atau kanal lain, bukan kabar
 * yayasan. Menambah kategori ke situs induk cukup dengan satu baris di sini.
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
/* Bentuk balasan REST WordPress                                               */
/* -------------------------------------------------------------------------- */

type Terender = { rendered?: string | null };

type PostWp = {
  id?: number;
  slug?: string | null;
  date?: string | null;
  title?: Terender | null;
  excerpt?: Terender | null;
  content?: Terender | null;
  featured_media?: number | null;
  categories?: number[] | null;
  tags?: number[] | null;
  author?: number | null;
};

type TermWp = { id?: number; slug?: string | null; name?: string | null };

type MediaWp = {
  id?: number;
  source_url?: string | null;
  alt_text?: string | null;
  media_details?: { width?: number | null; height?: number | null } | null;
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
 * emoji. Keduanya merusak ritme kartu di /informasi, jadi dirapikan di sini —
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
/* Pengambilan                                                                 */
/* -------------------------------------------------------------------------- */

/** Satu permintaan JSON. `null` berarti gagal; `[]` berarti memang kosong. */
async function ambil<T>(alamat: string, label: string): Promise<T[] | null> {
  try {
    const res = await fetch(alamat, {
      signal: AbortSignal.timeout(BATAS_MS),
      next: { revalidate: UMUR_CACHE, tags: [TAG_BERITA] },
    });

    // Melewati halaman terakhir dijawab 400 oleh WordPress; itu akhir yang wajar.
    if (res.status === 400) return [];
    if (!res.ok) {
      console.error(`[wp-berita] ${label}: HTTP ${res.status}`);
      return null;
    }
    return (await res.json()) as T[];
  } catch (galat) {
    console.error(
      `[wp-berita] ${label}: ${galat instanceof Error ? galat.message : String(galat)}`,
    );
    return null;
  }
}

/** Tabel id → slug/nama untuk taksonomi dan penulis. Kecil, sekali ambil. */
async function tabel(
  url: string,
  jalur: string,
  kolom: "slug" | "name",
): Promise<Map<number, string>> {
  const peta = new Map<number, string>();
  const isi = await ambil<TermWp>(
    `${url}/wp/v2/${jalur}?per_page=100&_fields=id,${kolom}`,
    jalur,
  );
  for (const t of isi ?? []) {
    const nilai = t[kolom];
    if (typeof t.id === "number" && nilai) peta.set(t.id, nilai);
  }
  return peta;
}

/** Gambar unggulan diambil sekaligus lewat `include`, bukan satu per satu. */
async function tabelMedia(url: string, id: number[]): Promise<Map<number, MediaWp>> {
  const peta = new Map<number, MediaWp>();
  for (let i = 0; i < id.length; i += 100) {
    const potongan = id.slice(i, i + 100);
    const isi = await ambil<MediaWp>(
      `${url}/wp/v2/media?per_page=100&include=${potongan.join(",")}` +
        `&_fields=id,source_url,alt_text,media_details`,
      `media ${i / 100 + 1}`,
    );
    for (const m of isi ?? []) if (typeof m.id === "number") peta.set(m.id, m);
  }
  return peta;
}

type Tabel = {
  kategori: Map<number, string>;
  tag: Map<number, string>;
  penulis: Map<number, string>;
  media: Map<number, MediaWp>;
};

function petakan(p: PostWp, t: Tabel): unknown | null {
  const slug = p.slug?.trim();
  const judulMentah = tanpaTag(p.title?.rendered ?? "");
  const konten = p.content?.rendered ?? "";
  if (!slug || !judulMentah || !konten.trim()) return null;

  const kategoriWp = (p.categories ?? [])
    .map((id) => t.kategori.get(id))
    .filter((s): s is string => Boolean(s));
  const topik = (p.tags ?? [])
    .map((id) => t.tag.get(id))
    .filter((s): s is string => Boolean(s));

  // Kategori pertama yang dikenal menentukan kategori situs induk. Tulisan yang
  // tak satu pun kategorinya dikenal tetap dipetakan, tetapi tidak dinaikkan.
  const slugDikenal = kategoriWp.find((s) => s in KATEGORI_INDUK);
  const category: Category = slugDikenal ? (KATEGORI_INDUK[slugDikenal] as Category) : "artikel";

  const unitTerkait = [...new Set(kategoriWp.flatMap((s) => UNIT_DARI_KATEGORI[s] ?? []))];
  const unit = unitTerkait.length > 0 ? unitTerkait : [UNIT_INDUK];

  const media = p.featured_media ? t.media.get(p.featured_media) : undefined;
  const gambar = media?.source_url
    ? {
        src: media.source_url,
        alt: media.alt_text?.trim() ? media.alt_text : judulMentah,
        width: media.media_details?.width ?? 1200,
        height: media.media_details?.height ?? 800,
      }
    : GAMBAR_CADANGAN;

  const judul = rapikanJudul(judulMentah);
  const kutipan = tanpaTag(p.excerpt?.rendered ?? "") || tanpaTag(konten);

  // Seluruh unit yayasan berkampus di Bogor kecuali Sleman, dan WordPress tidak
  // menandai lokasi sama sekali — jadi Bogor adalah satu-satunya nilai jujur.
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
    penulis: (p.author ? t.penulis.get(p.author) : undefined) ?? "Humas Wadi Mubarak",
    // Kurasi PRD §9.1: hanya tulisan yang kategorinya terdaftar di
    // `KATEGORI_INDUK` yang naik ke situs induk. Sisanya tetap tinggal di
    // wadimubarak.com tanpa ikut tayang di situs induk.
    tampilkan_di_induk: slugDikenal !== undefined,
    konten,
  };
}

/**
 * Ambil seluruh tulisan dari WordPress dalam bentuk mentah yang sama dengan
 * `postsMentah`. Validasi Zod tetap dijalankan `content.ts` memakai skema yang
 * sama, jadi data CMS tidak lebih dipercaya daripada data statis.
 *
 * `null` berarti WordPress tidak dapat dihubungi sama sekali.
 */
export async function ambilPostsWp(): Promise<unknown[] | null> {
  const url = endpointBerita();
  if (!url) return null;

  const mentah: PostWp[] = [];
  for (let n = 1; n <= MAKS_HALAMAN; n++) {
    const isi = await ambil<PostWp>(
      `${url}/wp/v2/posts?per_page=${PER_HALAMAN}&page=${n}` +
        `&status=publish&orderby=date&order=desc&_fields=${KOLOM_POST}`,
      `posts halaman ${n}`,
    );
    // Gagal di halaman pertama = WordPress tidak terjangkau; menyerah dan pakai
    // data statis. Gagal di halaman lanjutan = pakai saja yang sudah terkumpul.
    if (isi === null) {
      if (n === 1) return null;
      break;
    }
    if (isi.length === 0) break;
    mentah.push(...isi);
    if (isi.length < PER_HALAMAN) break;
  }

  if (mentah.length === 0) return null;

  const idMedia = [
    ...new Set(mentah.map((p) => p.featured_media).filter((id): id is number => Boolean(id))),
  ];
  const [kategori, tag, penulis, media] = await Promise.all([
    tabel(url, "categories", "slug"),
    tabel(url, "tags", "name"),
    tabel(url, "users", "name"),
    tabelMedia(url, idMedia),
  ]);

  const hasil: unknown[] = [];
  for (const p of mentah) {
    const dipetakan = petakan(p, { kategori, tag, penulis, media });
    if (dipetakan) hasil.push(dipetakan);
  }

  return hasil.length > 0 ? hasil : null;
}
