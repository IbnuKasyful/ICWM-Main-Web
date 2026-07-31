# Penempatan di cPanel

Sasaran produksi situs ini adalah cPanel. Cloudflare Workers (`npm run cf:deploy`)
dipertahankan hanya untuk **pratinjau ke pihak yayasan**, memakai data statis.

## Langkah nol: periksa dukungan Node.js

Sistem update donasi lewat CMS membutuhkan Next.js berjalan sebagai proses Node.
Periksa dulu:

1. Masuk cPanel, cari ikon **Setup Node.js App** (di grup "Software").
2. Bila ada, buka dan lihat versi Node yang tersedia — **butuh Node 20 atau lebih baru**.

Kalau ikonnya tidak ada, atau versinya di bawah 20, hubungi penyedia hosting dan
minta LiteSpeed/Passenger dengan Node 20+ diaktifkan. Paket hosting PHP-saja
tidak bisa menjalankan konfigurasi ini — lihat catatan di bawah.

## Jalur A — Node.js App (yang dipakai)

```bash
# di mesin lokal atau di SSH cPanel
BUILD_TARGET=cpanel npm run build
```

`BUILD_TARGET=cpanel` menyalakan `output: "standalone"` di `next.config.ts`,
menghasilkan `.next/standalone` yang sudah memuat dependensi yang dipakai saja.

Unggah ke folder aplikasi (mis. `~/nextapp`):

```
.next/standalone/*        →  ~/nextapp/
.next/static/             →  ~/nextapp/.next/static/
public/                   →  ~/nextapp/public/
```

Lalu di **Setup Node.js App**:

| Ruas | Nilai |
|---|---|
| Application root | `nextapp` |
| Application URL | domain utama |
| Application startup file | `server.js` |
| Node version | 20+ |

Tambahkan variabel lingkungan di panel yang sama (bukan berkas `.env`, agar tidak
ikut terunggah): `NEXT_PUBLIC_SITE_URL`, `WPGRAPHQL_ENDPOINT`,
`REVALIDATE_SECRET`, `RESEND_API_KEY`, `KONTAK_EMAIL_*`. Kosongkan
`NEXT_PUBLIC_MODE_PRATINJAU` hanya setelah seluruh data Tier 1 resmi.

Klik **Restart**. Cache ISR ditulis ke disk di dalam `.next/cache` — tidak perlu
R2 atau layanan tambahan seperti pada Cloudflare.

Hal yang perlu diperhatikan:

- **Restart menghapus cache ISR.** Wajar dan tidak berbahaya: halaman dibangun
  ulang saat permintaan pertama.
- **`next/image` memerlukan `sharp`**, yang ikut terbawa `standalone`. Bila
  optimasi gambar gagal di server, jalankan `npm install sharp` di dalam
  `~/nextapp`.
- Pastikan Passenger tidak menaruh aplikasi di subpath; situs ini menganggap
  dirinya berada di akar domain.

## Jalur B — hanya PHP, tanpa Node (bukan jalur yang dipilih)

Bila hosting benar-benar tidak bisa menjalankan Node, satu-satunya cara adalah
`output: "export"` — HTML statis murni. Konsekuensinya harus disadari:

- **Sistem update CMS ini tidak berlaku.** Tanpa server, tidak ada ISR dan tidak
  ada `/api/revalidate`; angka donasi hanya berubah saat build ulang diunggah.
  Alurnya berubah menjadi: admin edit di WordPress → build dijalankan di mesin
  lain → hasilnya diunggah.
- `/api/kontak` mati, jadi formulir kontak harus dialihkan ke layanan luar.
- `/cari` yang `force-dynamic` harus diubah menjadi pencarian di sisi peramban.
- Optimasi `next/image` harus dimatikan (`images.unoptimized`).

Kalau ini yang tersedia, beri tahu — pekerjaannya berbeda dan lebih baik
dikerjakan sebagai perubahan tersendiri.

## Pratinjau Cloudflare

Tetap seperti sebelumnya: `npm run cf:deploy`, tanpa `WPGRAPHQL_ENDPOINT`.
Pratinjau memakai data statis di `src/data/`, jadi tidak menyentuh WordPress
produksi dan tidak butuh cache R2 (lihat catatan di `wrangler.jsonc`).
