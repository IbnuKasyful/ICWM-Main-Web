"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * PRD §14 — setiap ruas punya label yang terhubung dan pesan galat yang jelas.
 * PRD §15 — honeypot; pembatasan laju ditangani di route handler.
 */

const keperluanOpsi = [
  { nilai: "ppdb", label: "Pendaftaran santri baru" },
  { nilai: "donasi", label: "Donasi & LAZIS" },
  { nilai: "kerja-sama", label: "Kerja sama lembaga" },
  { nilai: "media", label: "Media & pers" },
  { nilai: "alumni", label: "Alumni" },
  { nilai: "lainnya", label: "Lainnya" },
];

type Keadaan = "diam" | "mengirim" | "berhasil" | "galat";

const kelasRuas =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-subtle transition-colors focus:border-brand-400";

export function FormKontak({ keperluanAwal = "ppdb" }: { keperluanAwal?: string }) {
  const [keadaan, setKeadaan] = useState<Keadaan>("diam");
  const [pesanBalasan, setPesanBalasan] = useState("");

  async function kirim(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setKeadaan("mengirim");
    setPesanBalasan("");

    try {
      const tanggapan = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const hasil: unknown = await tanggapan.json();
      const pesan =
        typeof hasil === "object" && hasil !== null && "pesan" in hasil
          ? String((hasil as { pesan: unknown }).pesan)
          : "";

      if (tanggapan.ok) {
        setKeadaan("berhasil");
        setPesanBalasan(pesan || "Pesan Anda terkirim.");
        form.reset();
      } else {
        setKeadaan("galat");
        setPesanBalasan(pesan || "Pesan gagal dikirim. Silakan coba lagi.");
      }
    } catch {
      setKeadaan("galat");
      setPesanBalasan(
        "Tidak dapat menghubungi server. Periksa sambungan Anda, atau hubungi kami lewat WhatsApp.",
      );
    }
  }

  return (
    <form onSubmit={kirim} className="flex flex-col gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className="mb-1.5 block text-sm font-semibold text-ink">
            Nama lengkap <span className="text-danger">*</span>
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className={kelasRuas}
            placeholder="Nama Anda"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
            Surel <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={kelasRuas}
            placeholder="nama@contoh.com"
          />
        </div>

        <div>
          <label htmlFor="telepon" className="mb-1.5 block text-sm font-semibold text-ink">
            Nomor WhatsApp <span className="font-normal text-ink-subtle">(opsional)</span>
          </label>
          <input
            id="telepon"
            name="telepon"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            className={kelasRuas}
            placeholder="08xx xxxx xxxx"
          />
        </div>

        <div>
          <label htmlFor="keperluan" className="mb-1.5 block text-sm font-semibold text-ink">
            Keperluan <span className="text-danger">*</span>
          </label>
          <select
            id="keperluan"
            name="keperluan"
            required
            defaultValue={keperluanAwal}
            className={cn(kelasRuas, "appearance-none bg-white")}
          >
            {keperluanOpsi.map((o) => (
              <option key={o.nilai} value={o.nilai}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="pesan" className="mb-1.5 block text-sm font-semibold text-ink">
          Pesan <span className="text-danger">*</span>
        </label>
        <textarea
          id="pesan"
          name="pesan"
          required
          minLength={20}
          maxLength={4000}
          rows={6}
          className={cn(kelasRuas, "resize-y")}
          placeholder="Tuliskan pertanyaan atau keperluan Anda. Bila menyangkut unit tertentu, sebutkan nama unitnya agar kami arahkan ke pengelola yang tepat."
        />
        <p className="mt-1.5 text-xs text-ink-subtle">Minimal 20 karakter.</p>
      </div>

      {/* Honeypot — disembunyikan dari manusia dan dari pembaca layar. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Jangan diisi</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" ukuran="lg" disabled={keadaan === "mengirim"}>
          {keadaan === "mengirim" ? "Mengirim…" : "Kirim pesan"}
        </Button>
        <p className="text-xs leading-relaxed text-ink-subtle sm:max-w-xs">
          Dengan mengirim, Anda menyetujui pemrosesan data sesuai kebijakan privasi kami.
        </p>
      </div>

      {/* Pesan hasil — selalu diumumkan ke teknologi bantu. */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-sm",
          keadaan === "berhasil" && "rounded-xl border border-brand-200 bg-brand-50 p-4 text-brand-900",
          keadaan === "galat" && "rounded-xl border border-accent-300 bg-accent-50 p-4 text-accent-900",
          keadaan !== "berhasil" && keadaan !== "galat" && "sr-only",
        )}
      >
        {pesanBalasan ? (
          <span className="flex items-start gap-2">
            <Icon
              nama={keadaan === "berhasil" ? "centang" : "info"}
              className="mt-0.5 size-4 shrink-0"
              tebal={2.2}
            />
            {pesanBalasan}
          </span>
        ) : null}
      </p>
    </form>
  );
}
