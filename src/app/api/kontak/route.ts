import { NextResponse } from "next/server";
import { z } from "zod";

import { endpointWp } from "@/lib/wp";

/**
 * Penerima formulir kontak, PRD §6 & §15.
 *
 * Honeypot + pembatasan laju berbasis IP, tanpa CAPTCHA. Pesan yang lolos
 * diteruskan ke plugin `cms/wm-kontak` di CMS, yang menyimpannya di wp-admin
 * lalu mengirim surel ke PSB pusat lewat WP Mail SMTP (Gmail). Alamat tujuan
 * dan label keperluan diatur di plugin itu, bukan di sini.
 */

export const runtime = "nodejs";

const skemaPesan = z.object({
  nama: z.string().trim().min(2, "Nama minimal 2 karakter").max(120),
  email: z.string().trim().email("Format surel tidak valid").max(200),
  telepon: z.string().trim().max(30).optional().or(z.literal("")),
  keperluan: z.enum(["ppdb", "donasi", "kerja-sama", "media", "alumni", "lainnya"]),
  pesan: z.string().trim().min(20, "Pesan minimal 20 karakter").max(4000),
  /**
   * Honeypot. Sengaja menerima nilai apa pun: penolakan lewat skema akan
   * membalas 400 dengan pesan galat, dan itu memberi tahu bot bahwa ruas ini
   * yang menjebaknya. Pemeriksaan isinya dilakukan setelah validasi.
   */
  website: z.string().max(200).optional(),
});

/**
 * Pembatas laju sederhana di memori proses.
 *
 * Cukup untuk meredam pengiriman berulang dari satu IP. Bila situs berjalan di
 * banyak instans, ganti dengan penyimpanan bersama, catatan ini sengaja
 * ditinggalkan agar keputusannya tidak hilang.
 */
const jejakIp = new Map<string, { jumlah: number; sejak: number }>();
const JENDELA_MS = 10 * 60 * 1000;
const BATAS = 5;

function lewatBatas(ip: string): boolean {
  const sekarang = Date.now();
  const catatan = jejakIp.get(ip);

  if (!catatan || sekarang - catatan.sejak > JENDELA_MS) {
    jejakIp.set(ip, { jumlah: 1, sejak: sekarang });
    return false;
  }

  catatan.jumlah += 1;
  return catatan.jumlah > BATAS;
}

function ambilIp(request: Request): string {
  const teruskan = request.headers.get("x-forwarded-for");
  const pertama = teruskan?.split(",")[0]?.trim();
  return pertama || request.headers.get("x-real-ip") || "tidak-diketahui";
}

export async function POST(request: Request) {
  const ip = ambilIp(request);

  if (lewatBatas(ip)) {
    return NextResponse.json(
      { ok: false, pesan: "Terlalu banyak pengiriman. Silakan coba lagi dalam beberapa menit." },
      { status: 429 },
    );
  }

  let mentah: unknown;
  try {
    mentah = await request.json();
  } catch {
    return NextResponse.json({ ok: false, pesan: "Permintaan tidak valid." }, { status: 400 });
  }

  const hasil = skemaPesan.safeParse(mentah);
  if (!hasil.success) {
    const pertama = hasil.error.issues[0];
    return NextResponse.json(
      { ok: false, pesan: pertama?.message ?? "Data yang dikirim belum lengkap." },
      { status: 400 },
    );
  }

  const data = hasil.data;

  // Honeypot terisi: balas seolah berhasil agar bot tidak belajar dari galat.
  if (data.website) {
    return NextResponse.json({ ok: true, pesan: "Pesan Anda terkirim." });
  }

  const rahasia = process.env["KONTAK_SECRET"]?.trim();
  const cms = endpointWp();

  // Tanpa CMS atau rahasia (mis. saat pengembangan front-end), pesan dicatat di
  // server dan pengunjung tetap menerima balasan yang jujur.
  if (!rahasia || !cms) {
    console.info("[kontak] CMS belum diatur; pesan tidak diteruskan.", {
      keperluan: data.keperluan,
      nama: data.nama,
    });
    return NextResponse.json({
      ok: true,
      pesan:
        "Pesan Anda tercatat. Layanan surel otomatis belum aktif pada tahap ini, untuk hal mendesak, silakan hubungi kami lewat WhatsApp.",
    });
  }

  try {
    // Penerimanya plugin cms/wm-kontak, di CMS yang sama dengan WPGraphQL.
    const tanggapan = await fetch(new URL("/wp-json/wm/v1/kontak", cms), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-kontak-secret": rahasia,
      },
      body: JSON.stringify({
        nama: data.nama,
        email: data.email,
        telepon: data.telepon ?? "",
        keperluan: data.keperluan,
        pesan: data.pesan,
      }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });

    if (!tanggapan.ok) {
      console.error("[kontak] CMS menolak pesan", tanggapan.status);
      return NextResponse.json(
        {
          ok: false,
          pesan: "Pesan gagal dikirim. Silakan coba lagi atau hubungi kami lewat WhatsApp.",
        },
        { status: 502 },
      );
    }

    // Pesan sudah tersimpan di CMS walau surelnya gagal; redaksi membacanya di
    // menu Pesan Kontak, jadi bagi pengunjung pesannya tetap sampai.
    const hasilCms = (await tanggapan.json().catch(() => null)) as { terkirim?: boolean } | null;
    if (hasilCms?.terkirim === false) {
      console.error("[kontak] Pesan tersimpan di CMS tetapi surel gagal dikirim");
    }
  } catch (galat) {
    console.error("[kontak] Gagal menghubungi CMS", galat);
    return NextResponse.json(
      { ok: false, pesan: "Pesan gagal dikirim. Silakan hubungi kami lewat WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    pesan: "Pesan Anda terkirim. Kami membalas pada jam kerja, biasanya dalam 1–2 hari kerja.",
  });
}
