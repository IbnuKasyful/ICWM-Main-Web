import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { TAG_BERITA } from "@/lib/wp-berita";
import { TAG_DONASI } from "@/lib/wp";

/**
 * Penyegaran cache atas permintaan WordPress, pasangan dari plugin
 * `cms/wm-donasi/wm-donasi.php`.
 *
 * WordPress memanggil route ini setiap kali program donasi disimpan atau
 * tulisan diterbitkan, sehingga isi baru tampil dalam hitungan detik alih-alih
 * menunggu ISR habis. Tanpa panggilan ini situs tetap benar, hanya lebih
 * lambat menyusul.
 *
 * Badan permintaan boleh menyertakan `jenis`: "donasi" (bawaan, menjaga
 * kecocokan dengan plugin lama) atau "berita".
 *
 * Wewenangnya diperiksa lewat rahasia bersama `REVALIDATE_SECRET`, dikirim di
 * header `x-revalidate-secret`. Tanpa variabel itu route menolak semua
 * permintaan: lebih baik cache basi daripada endpoint terbuka yang bisa dipakai
 * siapa pun untuk memaksa build ulang halaman terus-menerus.
 */

export const runtime = "nodejs";
/** Tidak boleh di-cache: setiap panggilan harus benar-benar dieksekusi. */
export const dynamic = "force-dynamic";

/** Halaman yang terdampak per jenis isi. */
const JALUR: Record<"donasi" | "berita", string[]> = {
  donasi: ["/", "/donasi", "/sitemap.xml"],
  berita: ["/", "/informasi", "/feed.xml", "/sitemap.xml"],
};

const TAG: Record<"donasi" | "berita", string> = {
  donasi: TAG_DONASI,
  berita: TAG_BERITA,
};

/** Awalan URL halaman rincian per jenis, dipakai bersama `slug`. */
const AWALAN: Record<"donasi" | "berita", string> = {
  donasi: "/donasi",
  berita: "/informasi",
};

export async function POST(request: Request) {
  const rahasia = process.env["REVALIDATE_SECRET"]?.trim();

  if (!rahasia) {
    console.error("[revalidate] REVALIDATE_SECRET belum diisi, permintaan ditolak");
    return NextResponse.json({ ok: false, pesan: "Penyegaran cache belum diaktifkan" }, { status: 503 });
  }

  const dikirim = request.headers.get("x-revalidate-secret")?.trim();
  if (dikirim !== rahasia) {
    // Sengaja tanpa penjelasan: pemanggil tak berhak tidak perlu tahu bedanya
    // rahasia salah dan rahasia tidak dikirim.
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  /* Keduanya opsional. `jenis` menentukan tag dan halaman mana yang
     disegarkan; bawaannya "donasi" supaya plugin lama tetap bekerja tanpa
     diubah. Bila WordPress menyebutkan `slug`, halaman rinciannya ikut
     disegarkan, termasuk saat isinya baru dibuat dan belum pernah ada. */
  let slug: string | undefined;
  let jenis: "donasi" | "berita" = "donasi";
  try {
    const isi = (await request.json()) as { slug?: unknown; jenis?: unknown };
    if (typeof isi.slug === "string" && isi.slug.length > 0 && isi.slug.length <= 200) {
      slug = isi.slug;
    }
    if (isi.jenis === "berita" || isi.jenis === "donasi") jenis = isi.jenis;
  } catch {
    // Body kosong atau bukan JSON, bukan galat, keduanya memang opsional.
  }

  const jalurTerdampak = JALUR[jenis];
  revalidateTag(TAG[jenis]);
  for (const jalur of jalurTerdampak) revalidatePath(jalur);
  if (slug) revalidatePath(`${AWALAN[jenis]}/${slug}`);

  return NextResponse.json({
    ok: true,
    jenis,
    disegarkan: slug ? [...jalurTerdampak, `${AWALAN[jenis]}/${slug}`] : jalurTerdampak,
  });
}

/** GET dipakai WordPress untuk menguji sambungan dari halaman pengaturannya. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    siap: Boolean(process.env["REVALIDATE_SECRET"]?.trim()),
  });
}
