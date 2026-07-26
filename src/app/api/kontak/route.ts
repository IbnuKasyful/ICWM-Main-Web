import { NextResponse } from "next/server";
import { z } from "zod";

import { site } from "@/lib/site";

/**
 * Penerima formulir kontak — PRD §6 & §15.
 *
 * Honeypot + pembatasan laju berbasis IP, tanpa CAPTCHA. Pengiriman surel
 * memakai REST API Resend lewat `fetch` sehingga tidak menambah dependensi
 * (PRD §6: jangan menambah paket di luar daftar).
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
 * banyak instans, ganti dengan penyimpanan bersama — catatan ini sengaja
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

const labelKeperluan: Record<z.infer<typeof skemaPesan>["keperluan"], string> = {
  ppdb: "Pendaftaran santri baru",
  donasi: "Donasi & LAZIS",
  "kerja-sama": "Kerja sama lembaga",
  media: "Media & pers",
  alumni: "Alumni",
  lainnya: "Lainnya",
};

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

  const kunciResend = process.env["RESEND_API_KEY"];
  const tujuan = process.env["KONTAK_EMAIL_TUJUAN"] ?? site.kontak.email;
  const pengirim = process.env["KONTAK_EMAIL_PENGIRIM"];

  // Tanpa kredensial (mis. saat pengembangan front-end), pesan dicatat di server
  // dan pengunjung tetap menerima balasan yang jujur.
  if (!kunciResend || !pengirim) {
    console.info("[kontak] Kredensial surel belum diatur; pesan tidak dikirim.", {
      keperluan: data.keperluan,
      nama: data.nama,
    });
    return NextResponse.json({
      ok: true,
      pesan:
        "Pesan Anda tercatat. Layanan surel otomatis belum aktif pada tahap ini — untuk hal mendesak, silakan hubungi kami lewat WhatsApp.",
    });
  }

  const isi = [
    `Keperluan: ${labelKeperluan[data.keperluan]}`,
    `Nama: ${data.nama}`,
    `Surel: ${data.email}`,
    `Telepon: ${data.telepon || "-"}`,
    "",
    data.pesan,
  ].join("\n");

  try {
    const tanggapan = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kunciResend}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: pengirim,
        to: [tujuan],
        reply_to: data.email,
        subject: `[${labelKeperluan[data.keperluan]}] Pesan dari ${data.nama}`,
        text: isi,
      }),
    });

    if (!tanggapan.ok) {
      console.error("[kontak] Resend menolak permintaan", tanggapan.status);
      return NextResponse.json(
        {
          ok: false,
          pesan: "Pesan gagal dikirim. Silakan coba lagi atau hubungi kami lewat WhatsApp.",
        },
        { status: 502 },
      );
    }
  } catch (galat) {
    console.error("[kontak] Gagal menghubungi layanan surel", galat);
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
