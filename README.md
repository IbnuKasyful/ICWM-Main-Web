# Website Induk Islamic Center Wadi Mubarak

Front-end Fase 1 untuk `wadimubarak.com`, dibangun mengikuti
[`prd-rebuild-website-induk-icwm.md`](./prd-rebuild-website-induk-icwm.md).

Bila dokumen ini dan PRD bertentangan, **PRD yang menang** (PRD §18).

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produksi
npm run typecheck  # tsc --noEmit, mode strict
npm run lint       # eslint
```

Gambar contoh dibangkitkan sekali dan sudah ada di `public/img/`. Untuk membuat
ulang: `node scripts/generate-placeholders.mjs`.

## Status terhadap peta jalan PRD

PRD §16 menempatkan **Tahap 0 (penyiapan WordPress) sebagai pemblokir** untuk
seluruh tahap berikutnya. Tahap itu belum dikerjakan, jadi front-end ini berjalan
di atas **data contoh**, persis seperti yang diminta PRD §17 sebagai mitigasi
risiko keterlambatan konten.

| Tahap | Isi | Status |
|---|---|---|
| 0 | WordPress: taksonomi, CPT, ACF, WPGraphQL | **Belum**, di luar lingkup front-end |
| 1 | Fondasi Next.js, sistem desain, layout, tipe & Zod | Selesai |
| 2 | `/`, `/program`, `/program/[slug]` | Selesai |
| 3 | `/tentang`, `/tentang/legalitas`, `/tentang/pengurus`, `/transparansi`, `/dampak` | Selesai |
| 4 | `/donasi`, `/donasi/[slug]` | Selesai |
| 5 | `/informasi`, `/agenda`, `/galeri`, `/faq`, `/cari` | Selesai |
| 6 | Halaman pendukung, kepatuhan, formulir kontak | Selesai |
| 7 | Migrasi konten, redirect, peluncuran | **Belum**, butuh Tahap 0 |

Seluruh 22 route pada PRD §8 sudah ada. Tidak ada route di luar daftar itu.

## Cara mengganti data contoh dengan WPGraphQL

Ini dirancang menjadi satu perubahan terisolasi.

```
src/data/*.ts        →  data contoh (dibuang saat Tahap 0 selesai)
src/lib/schemas.ts   →  skema Zod = kontrak dengan WPGraphQL (TIDAK berubah)
src/lib/content.ts   →  satu-satunya batas API (ini yang diganti)
src/app/**, src/components/**  →  tidak perlu disentuh sama sekali
```

`src/lib/content.ts` adalah satu-satunya berkas yang mengimpor data mentah dan
satu-satunya tempat `parseOrThrow()` dipanggil. Ketika endpoint GraphQL siap,
ganti isi fungsi-fungsi di dalamnya menjadi `fetch` + `parseOrThrow` dengan
skema yang sama; tanda tangan fungsinya sengaja dibuat tidak berubah.

Kueri GraphQL nantinya diletakkan bersebelahan dengan route yang memakainya
(PRD §18), dengan `content.ts` tetap sebagai lapisan validasi.

## Sistem desain

Token ada di `src/app/globals.css` di dalam blok `@theme` (Tailwind v4).
**Tidak ada komponen yang boleh menulis warna mentah**, semuanya lewat token.

Komponen inti sesuai PRD §10 ada di `src/components/`:

| PRD | Berkas |
|---|---|
| `Button` | `ui/Button.tsx` (`Button`, `ButtonLink`) |
| `Card` | `ui/Card.tsx` |
| `Badge` | `ui/Badge.tsx` |
| `UnitCard` | `ui/UnitCard.tsx` (+ varian ringkas) |
| `PostCard` | `ui/PostCard.tsx` (+ `PostBaris`) |
| `FilterBar` | `informasi/FilterBar.tsx`, `program/PencariProgram.tsx` |
| `Breadcrumb` | `ui/Breadcrumb.tsx`, sekaligus memancarkan JSON-LD |
| `UnitSwitcher` | `site/UnitSwitcher.tsx`, **props-driven**, siap dipakai ulang Fase 2 |
| `SiteHeader` | `site/SiteHeader.tsx` |
| `SiteFooter` | `site/SiteFooter.tsx`, **props-driven**, tanpa nilai dipatok mati |
| `StatBlock` | `ui/StatBlock.tsx` |
| `EmptyState` | `ui/EmptyState.tsx` |
| `Prose` | `ui/Prose.tsx` (+ `ProseHtml` untuk HTML dari CMS) |

Aksen per unit (`warna_aksen`) disalurkan lewat CSS variable `--unit-accent`
yang di-set inline pada pembungkus, bukan lewat kelas yang dibuat dinamis.

## Keputusan yang perlu diketahui

- **Tanpa dependensi di luar PRD §6.** Ikon, akordeon, penggabung className, dan
  pengiriman surel Resend semuanya ditulis sendiri. `resend` tidak dipasang,
  route handler memanggil REST API-nya lewat `fetch`.
- **Akordeon FAQ memakai `<details>`**, bukan JavaScript: dapat dirayapi,
  bekerja tanpa JS, dan nol biaya bundel.
- **Penyaring `/informasi` dan pagination adalah tautan `<a>` sungguhan**
  (PRD §9.6), sedangkan penyaring `/program` berjalan di klien di atas data yang
  sudah diambil saat build (PRD §9.2).
- **`/informasi` dan `/cari` dirender dinamis** karena bergantung pada
  `searchParams`; `revalidate` tetap diekspor sesuai PRD §8 untuk lapisan cache.
- **Gambar contoh berupa SVG** yang dibangkitkan skrip, dengan `width`/`height`
  eksplisit sehingga CLS tetap nol saat data nyata masuk.
- **Halaman `/karier` masih memuat daftar lowongan di dalam berkas** karena CPT
  lowongan tidak ada dalam daftar Fase 1 (PRD §7.3); menambahkannya butuh revisi
  PRD lebih dulu.

## Yang belum diverifikasi

- **Lighthouse ≥ 90 dan anggaran LCP/CLS/INP (PRD §12)** belum diukur pada
  perangkat nyata. Yang sudah dipastikan: JS awal per route maksimum **113 kB**
  terhadap anggaran 150 kB, seluruh gambar lewat `next/image` dengan dimensi
  eksplisit, font lewat `next/font`, dan tidak ada pustaka animasi.
- **Tampilan pada 390px, 768px, dan 1440px** ditulis mobile-first dan diperiksa
  lewat struktur markup, tetapi belum dilihat langsung di peramban pada sesi ini.
