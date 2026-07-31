import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { TAG_DONASI } from "@/lib/wp";

/**
 * Penyegaran cache atas permintaan WordPress — pasangan dari plugin
 * `cms/wm-donasi/wm-donasi.php`.
 *
 * WordPress memanggil route ini setiap kali program donasi disimpan, sehingga
 * angka baru tampil dalam hitungan detik alih-alih menunggu ISR 15 menit habis.
 * Tanpa panggilan ini situs tetap benar — hanya lebih lambat menyusul.
 *
 * Wewenangnya diperiksa lewat rahasia bersama `REVALIDATE_SECRET`, dikirim di
 * header `x-revalidate-secret`. Tanpa variabel itu route menolak semua
 * permintaan: lebih baik cache basi daripada endpoint terbuka yang bisa dipakai
 * siapa pun untuk memaksa build ulang halaman terus-menerus.
 */

export const runtime = "nodejs";
/** Tidak boleh di-cache: setiap panggilan harus benar-benar dieksekusi. */
export const dynamic = "force-dynamic";

/** Halaman yang menampilkan angka donasi dan harus ikut disegarkan. */
const JALUR_TERDAMPAK = ["/", "/donasi", "/dampak", "/sitemap.xml"];

export async function POST(request: Request) {
  const rahasia = process.env["REVALIDATE_SECRET"]?.trim();

  if (!rahasia) {
    console.error("[revalidate] REVALIDATE_SECRET belum diisi — permintaan ditolak");
    return NextResponse.json({ ok: false, pesan: "Penyegaran cache belum diaktifkan" }, { status: 503 });
  }

  const dikirim = request.headers.get("x-revalidate-secret")?.trim();
  if (dikirim !== rahasia) {
    // Sengaja tanpa penjelasan: pemanggil tak berhak tidak perlu tahu bedanya
    // rahasia salah dan rahasia tidak dikirim.
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  /* Slug opsional. Bila WordPress menyebutkannya, halaman program itu ikut
     disegarkan — termasuk saat programnya baru dibuat dan belum pernah ada. */
  let slug: string | undefined;
  try {
    const isi = (await request.json()) as { slug?: unknown };
    if (typeof isi.slug === "string" && isi.slug.length > 0 && isi.slug.length <= 200) {
      slug = isi.slug;
    }
  } catch {
    // Body kosong atau bukan JSON — bukan galat, slug memang opsional.
  }

  revalidateTag(TAG_DONASI);
  for (const jalur of JALUR_TERDAMPAK) revalidatePath(jalur);
  if (slug) revalidatePath(`/donasi/${slug}`);

  return NextResponse.json({
    ok: true,
    disegarkan: slug ? [...JALUR_TERDAMPAK, `/donasi/${slug}`] : JALUR_TERDAMPAK,
  });
}

/** GET dipakai WordPress untuk menguji sambungan dari halaman pengaturannya. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    siap: Boolean(process.env["REVALIDATE_SECRET"]?.trim()),
  });
}
