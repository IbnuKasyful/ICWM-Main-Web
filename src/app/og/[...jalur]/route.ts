import { readFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

/**
 * Gambar pratinjau tautan (og:image): foto yang sama dengan gambar halaman,
 * dipotong 1200×630 dan dikirim sebagai JPEG kecil. Alamatnya dibentuk
 * `urlGambarBagikan` di src/lib/seo.ts.
 *
 * Alasannya dua. Foto unggulan CMS rata-rata 0,5-2,5 MB, sedangkan WhatsApp
 * tidak menampilkan pratinjau untuk gambar di atas ±300 KB. Gambar bawaan
 * situs berformat SVG, yang tidak didukung Facebook, WhatsApp, maupun X.
 *
 *   /og/cms/2026/10/foto.png.jpg  →  cms.wadimubarak.com/wp-content/uploads/2026/10/foto.png
 *   /og/img/hero-tentang.svg.jpg  →  public/img/hero-tentang.svg
 *
 * Sumbernya hanya dua folder itu, jadi route ini tidak bisa dipakai memperkecil
 * gambar dari situs lain. Akhiran `.jpg` membuat Cloudflare ikut menyimpannya.
 */

export const runtime = "nodejs";

const ASAL_CMS = "https://cms.wadimubarak.com/wp-content/uploads/";
const LEBAR = 1200;
const TINGGI = 630;

async function ambilSumber(jalur: string[]): Promise<Buffer | null> {
  const [akar, ...bagian] = jalur;
  const terakhir = bagian.at(-1);
  if (!terakhir?.endsWith(".jpg") || bagian.some((s) => s === "" || s === "." || s === "..")) {
    return null;
  }
  // Buang akhiran `.jpg` yang ditambahkan `urlGambarBagikan`.
  bagian[bagian.length - 1] = terakhir.slice(0, -".jpg".length);

  if (akar === "cms") {
    // Berkasnya bisa 2 MB lebih, di atas batas cache fetch Next, jadi tidak di-cache
    // di sini; hasil JPEG-nya yang di-cache lewat header.
    const res = await fetch(ASAL_CMS + bagian.map(encodeURIComponent).join("/"), {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? Buffer.from(await res.arrayBuffer()) : null;
  }

  if (akar === "img" && bagian.length === 1) {
    return readFile(path.join(process.cwd(), "public", "img", bagian[0]!)).catch(() => null);
  }

  return null;
}

export async function GET(_: Request, { params }: { params: Promise<{ jalur: string[] }> }) {
  const { jalur } = await params;

  try {
    const sumber = await ambilSumber(jalur.map((s) => decodeURIComponent(s)));
    if (!sumber) return new Response("Tidak ditemukan", { status: 404 });

    const jpeg = await sharp(sumber, { density: 144 })
      .rotate()
      .resize(LEBAR, TINGGI, { fit: "cover", position: "attention" })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();

    return new Response(new Uint8Array(jpeg), {
      headers: {
        "content-type": "image/jpeg",
        // Seminggu: foto unggulan yang diganti di CMS memakai nama berkas baru.
        "cache-control": "public, max-age=604800, stale-while-revalidate=86400",
      },
    });
  } catch (galat) {
    console.error(`[og] ${jalur.join("/")}: ${galat instanceof Error ? galat.message : String(galat)}`);
    return new Response("Gambar tidak dapat diolah", { status: 500 });
  }
}
