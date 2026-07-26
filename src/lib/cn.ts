/**
 * Penggabung className sederhana. Sengaja tanpa dependensi tambahan
 * (PRD §6 — jangan menambah paket di luar daftar tumpukan teknologi).
 */
export function cn(...kelas: (string | false | null | undefined)[]): string {
  return kelas.filter(Boolean).join(" ");
}
