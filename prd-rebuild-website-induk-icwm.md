# PRD — Rebuild Website Induk Islamic Center Wadi Mubarak

**Dokumen:** Product Requirements Document
**Ruang lingkup:** Website induk `wadimubarak.com` (Fase 1)
**Versi:** 1.0
**Status:** Draf untuk dieksekusi

> Dokumen ini ditulis untuk dipakai sebagai spesifikasi kerja bersama Claude Code. Keputusan teknis di dalamnya bersifat **mengikat** — bila sebuah keputusan perlu diubah, ubah dokumen ini lebih dulu, jangan diubah diam-diam di kode. Bagian 18 berisi aturan kerja spesifik untuk agen coding.

---

## 1. Latar belakang & masalah

Islamic Center Wadi Mubarak menaungi belasan unit pendidikan dan lembaga sosial. Situs saat ini berjalan di WordPress monolitik dan menghadapi empat masalah utama:

1. **Navigasi disusun berdasarkan bagan organisasi, bukan kebutuhan pengunjung.** Menu berisi singkatan internal (YASAQU, MIMBAR, PKM-WM) yang tidak berarti apa-apa bagi orang tua calon santri.
2. **Beranda tidak fokus.** Puluhan artikel ditampilkan langsung di beranda lengkap dengan pagination sampai halaman 51.
3. **Identitas yayasan tidak terasa.** Tidak ada legalitas, struktur pengurus, laporan keuangan, atau halaman donasi yang layak — padahal lembaga ini menaungi LAZIS.
4. **Konten tersebar tanpa tata kelola.** Kategori mencampur jenis konten, unit, dan label internal. Konten cabang Sleman bercampur dengan konten pusat Bogor tanpa penanda.

## 2. Tujuan

| # | Tujuan | Cara diukur |
|---|---|---|
| G1 | Pengunjung menemukan unit yang tepat tanpa memahami struktur organisasi | Rasio pengunjung yang mencapai halaman profil unit dari beranda |
| G2 | Yayasan terlihat kredibel dan transparan | Halaman legalitas, pengurus, dan laporan terisi & terindeks |
| G3 | LAZIS punya kanal donasi yang layak | Halaman donasi aktif dengan program, target, dan bukti penyaluran |
| G4 | Satu tempat menulis untuk seluruh jaringan | Editor memublikasikan sekali, tayang di situs yang tepat |
| G5 | Situs cepat dan terindeks baik | Anggaran performa di Bagian 12 terpenuhi |

## 3. Non-goals (Fase 1)

Ditulis eksplisit untuk mencegah pelebaran ruang lingkup. **Jangan dikerjakan** kecuali dokumen ini direvisi:

- Membangun website unit (`sma.`, `smp.`, `mbs.`, dst.) — Fase 2
- Multibahasa (EN/AR). Model data tidak boleh menghalanginya, tetapi implementasinya di luar Fase 1
- Formulir pendaftaran santri online — tetap diarahkan ke WhatsApp per unit
- Pembayaran donasi daring. Fase 1 hanya menampilkan rekening & instruksi transfer
- Area login wali santri, portal nilai, atau e-learning
- Migrasi domain STIU (`stiuwm.ac.id`) — tetap eksternal
- Aplikasi mobile

## 4. Pengguna & kebutuhannya

| Persona | Datang untuk | Berhasil bila |
|---|---|---|
| **Orang tua calon santri** (utama) | Mencari lembaga yang cocok untuk anaknya | Tahu unit mana yang sesuai jenjang, gender, lokasi, dan model belajar; sampai ke kontak PPDB unit tersebut |
| **Calon donatur** | Memastikan lembaga ini amanah | Melihat legalitas, laporan penyaluran, dan cara berdonasi |
| **Wali santri aktif** | Info kegiatan & pengumuman | Menemukan agenda dan berita unit anaknya |
| **Calon mitra / lembaga** | Menilai kelayakan kerja sama | Melihat profil, legalitas, jaringan, dan narahubung |
| **Alumni** | Terhubung kembali | Menemukan kanal alumni & berita almamater |
| **Jurnalis / peneliti** | Data & narahubung | Menemukan press kit dan kontak media |

## 5. Arsitektur

### 5.1 Model hub-and-spoke

Satu WordPress headless menjadi gudang konten. Beberapa front-end Next.js mengambil irisan berbeda dari gudang yang sama, dipilah berdasarkan taksonomi `unit`.

```
WordPress (headless, admin-only)
   └── WPGraphQL  ──┬── wadimubarak.com     (induk — Fase 1)
                    ├── sma.wadimubarak.com  (Fase 2)
                    ├── smp.wadimubarak.com  (Fase 2)
                    └── ...
```

### 5.2 Pembagian peran

**Situs induk adalah tempat pengunjung MEMUTUSKAN. Situs unit adalah tempat pengunjung MENDAFTAR.**

Konsekuensi yang harus dipegang selama implementasi: induk wajib memuat informasi yang cukup untuk mengambil keputusan (jenjang, gender, lokasi, kisaran biaya, jadwal PPDB). Jangan melempar pengunjung ke subdomain sebelum mereka yakin — mereka tidak akan kembali.

### 5.3 Perjalanan pengguna utama

```
Beranda
  └── Router niat (5 pintu)
        └── "Menyekolahkan anak"
              └── /program  — penyaring: jenjang × gender × model × lokasi
                    └── /program/[unit]  — profil ringkas + keputusan
                          └── CTA keluar ke subdomain unit
```

Empat pintu lain: belajar Al-Qur'an (umum), berdonasi, kerja sama, dan tentang yayasan.

### 5.4 Jalur balik

Sebagian besar trafik organik nantinya mendarat langsung di subdomain unit, bukan di induk. Karena itu setiap halaman induk wajib menyediakan navigasi lintas-unit, dan komponen `UnitSwitcher` serta `SiteFooter` dirancang sejak Fase 1 agar bisa dipakai ulang di seluruh subdomain Fase 2.

---

## 6. Tumpukan teknologi (terkunci)

| Lapis | Pilihan | Catatan |
|---|---|---|
| CMS | WordPress 6.x, headless | Front-end WP dimatikan; hanya `/wp-admin` dan endpoint GraphQL yang terbuka |
| API | WPGraphQL + WPGraphQL for ACF | GraphQL, bukan REST — menghindari over-fetching dan memberi tipe yang jelas |
| Custom field | ACF Pro | |
| Front-end | Next.js 15 (App Router), TypeScript strict | **Bukan SPA.** Rendering di server wajib karena SEO menentukan |
| Rendering | SSG + ISR, revalidasi on-demand via webhook | |
| Styling | Tailwind CSS | |
| Validasi data | Zod di batas API | Setiap respons GraphQL divalidasi sebelum masuk komponen |
| Gambar | `next/image` dengan `remotePatterns` ke domain WP | |
| Formulir | Next.js Route Handler + Resend | Honeypot + rate limit, tanpa CAPTCHA |
| Analitik | GA4 dengan pengukuran lintas domain | Disiapkan Fase 1, dipakai penuh Fase 2 |
| Hosting front-end | Vercel | |
| Hosting WP | Terpisah, dibatasi akses IP untuk `/wp-admin` | |

**Aturan dependensi:** jangan menambah paket di luar daftar ini tanpa persetujuan. Terutama hindari component library besar — sistem desain dibangun sendiri di atas Tailwind.

---

## 7. Model data

Skema lengkap ada di dokumen terpisah (*Skema Taksonomi & Kebutuhan Konten*). Ringkasan yang mengikat implementasi:

### 7.1 Taksonomi

| Taksonomi | Sifat | Fungsi |
|---|---|---|
| `unit` | Hierarkis | Menentukan konten ini milik situs mana |
| `category` | Datar, terkunci 7 term | Jenis konten: berita, pengumuman, artikel, prestasi, kerja-sama, laporan, kegiatan |
| `lokasi` | Datar | Bogor, Sleman, dan cabang lain |
| `topik` | Datar, hanya admin bisa menambah | Topik spesifik |

Setiap tulisan wajib memiliki minimal satu `unit`, tepat satu `category`, dan tepat satu `lokasi`. Validasi ini dipaksakan di WordPress, bukan hanya di panduan.

### 7.2 Term meta pada `unit`

Field ini yang menyalakan penyaring di `/program`. Wajib tersedia lewat GraphQL: `nama_lengkap`, `nama_pendek`, `deskripsi_singkat`, `url_subdomain`, `logo`, `warna_aksen`, `jenjang`, `gender`, `model_belajar`, `lokasi_kampus`, `status_ppdb`, `periode_ppdb`, `kisaran_biaya`, `kontak_wa`, `urutan_tampil`, `aktif`.

### 7.3 Custom post type Fase 1

`unit_profil`, `pengurus`, `program_donasi`, `laporan`, `faq`, `testimoni`, `agenda`, `mitra`.

### 7.4 Field kunci pada `post`

- `unit_utama` — menentukan URL kanonik. Wajib.
- `ringkasan` — teks kartu, maks 200 karakter. Wajib.
- `tampilkan_di_induk` — boolean. **Menentukan apakah tulisan naik ke situs induk.**

Field terakhir inilah yang menangani kasus Sleman: berita TAUD Sleman tersimpan dengan `unit=taud-saqu` dan `lokasi=sleman`, tayang penuh di situs TK nanti, dan hanya muncul di induk bila dikurasi secara sadar.

---

## 8. Peta halaman

Seluruh route Fase 1. Tidak ada route lain yang boleh dibuat tanpa merevisi dokumen ini.

| Route | Sumber data | Rendering |
|---|---|---|
| `/` | Agregat | ISR 5 menit |
| `/tentang` | `page` | SSG |
| `/tentang/legalitas` | `page` | SSG |
| `/tentang/pengurus` | CPT `pengurus` | ISR 1 jam |
| `/program` | Term `unit` + meta | ISR 1 jam |
| `/program/[slug]` | CPT `unit_profil` | ISR 1 jam |
| `/donasi` | `page` + CPT `program_donasi` | ISR 15 menit |
| `/donasi/[slug]` | CPT `program_donasi` | ISR 15 menit |
| `/transparansi` | CPT `laporan` | ISR 1 jam |
| `/dampak` | `page` + angka capaian | ISR 1 jam |
| `/informasi` | `post` dengan filter | ISR 5 menit |
| `/informasi/[slug]` | `post` | ISR on-demand |
| `/agenda` | CPT `agenda` | ISR 15 menit |
| `/galeri` | Media + CPT | ISR 1 jam |
| `/faq` | CPT `faq` | SSG |
| `/kontak` | `page` | SSG |
| `/kerja-sama` | `page` + CPT `mitra` | SSG |
| `/karier` | `page` | ISR 1 jam |
| `/cari` | GraphQL search | Dinamis |
| `/kebijakan-privasi` | `page` | SSG |
| `/syarat-ketentuan` | `page` | SSG |
| `/perlindungan-anak` | `page` | SSG |
| `/sitemap.xml`, `/robots.txt`, `/feed.xml` | Dibangkitkan | — |

**Catatan:** berita dan artikel tidak dipisah menjadi dua route. Keduanya adalah `post` yang dibedakan oleh `category`, dan `/informasi` menyediakan penyaring. Ini menghemat kode dan menjaga taksonomi tetap menjadi satu-satunya sumber kebenaran.

---

## 9. Spesifikasi halaman prioritas

### 9.1 Beranda `/`

**Susunan blok, berurutan dari atas:**

1. **Hero** — satu pesan, satu gambar, satu CTA utama. Bukan carousel. Carousel di situs lama menurunkan performa dan hampir tidak pernah diklik melewati slide pertama.
2. **Router niat** — lima kartu: menyekolahkan anak · belajar Al-Qur'an · berdonasi · kerja sama · tentang yayasan.
3. **Angka capaian** — 4–6 angka (santri aktif, alumni, hafizh, pengajar, cabang).
4. **Sekilas yayasan** — 2 paragraf + tautan ke `/tentang`.
5. **Jaringan unit** — grid ringkas seluruh unit dengan tautan ke `/program`.
6. **Ajakan donasi** — satu blok menuju `/donasi`.
7. **Informasi terbaru** — **tepat 6 kartu**, lalu tautan "Lihat semua". Tidak ada pagination di beranda.
8. **Agenda mendatang** — maks 3 item; blok disembunyikan bila kosong.

**Kriteria penerimaan:**
- [ ] Beranda memuat maksimal 6 tulisan; tidak ada elemen pagination
- [ ] Kelima kartu router niat dapat diakses keyboard dan memiliki label yang jelas
- [ ] Blok agenda tidak dirender sama sekali bila tidak ada agenda mendatang
- [ ] Hanya tulisan dengan `tampilkan_di_induk = true` yang muncul

### 9.2 Pencari program `/program`

**Fungsi:** penyaring sisi klien atas seluruh term `unit` yang `aktif = true`.

**Penyaring:** jenjang (PAUD/SD/SMP/SMA/Tinggi/Non-formal) · gender (putra/putri/campur) · model (boarding/non-boarding/hybrid) · lokasi (Bogor/Sleman/…).

**Kriteria penerimaan:**
- [ ] Seluruh data unit diambil saat build; penyaringan berjalan di klien tanpa permintaan jaringan tambahan
- [ ] Kombinasi penyaring tercermin di URL query string agar dapat dibagikan
- [ ] Keadaan kosong menampilkan pesan yang membantu, bukan halaman kosong
- [ ] Setiap kartu menampilkan: nama, deskripsi singkat, jenjang, gender, lokasi, status PPDB
- [ ] Kartu menaut ke `/program/[slug]`, **bukan** langsung ke subdomain

Poin terakhir penting dan mudah keliru: pengunjung belum memutuskan di tahap ini.

### 9.3 Profil unit `/program/[slug]`

**Susunan:** identitas unit · "untuk siapa unit ini" · 3–5 keunggulan · ringkasan kurikulum · fasilitas · galeri · info PPDB (periode, kisaran biaya, alur) · **CTA keluar ke subdomain** · berita terkait unit ini (3 item).

**Kriteria penerimaan:**
- [ ] CTA keluar hanya dirender bila `url_subdomain` terisi; bila kosong, tampilkan tombol WhatsApp unit
- [ ] Tautan keluar membawa parameter UTM dengan sumber `induk`
- [ ] Halaman memuat JSON-LD `EducationalOrganization`
- [ ] Bila `status_ppdb = tutup`, badge status ditampilkan jelas dan CTA menyesuaikan

### 9.4 Donasi `/donasi`

**Susunan:** legalitas LAZIS di paruh atas layar · penjelasan zakat/infak/sedekah/wakaf · daftar program yang bisa didanai (target & progres) · rekening resmi per jenis · alur "apa yang terjadi setelah berdonasi" · tautan ke laporan penyaluran · kontak konfirmasi.

**Kriteria penerimaan:**
- [ ] Nomor registrasi LAZIS tampil tanpa perlu menggulir di viewport 390px
- [ ] Setiap program menampilkan target, terkumpul, dan progres
- [ ] Tersedia tautan salin untuk nomor rekening
- [ ] Ada tautan ke minimal satu laporan penyaluran; bila belum ada laporan, tampilkan pernyataan jujur berisi tanggal rencana publikasi

### 9.5 Transparansi `/transparansi`

Daftar dokumen laporan yang dapat diunduh, dikelompokkan per tahun dan jenis (keuangan, program, dampak).

**Kriteria penerimaan:**
- [ ] Setiap entri menampilkan judul, tahun, jenis, ukuran berkas, dan tautan unduh
- [ ] Keadaan kosong menampilkan pernyataan jujur, bukan halaman kosong atau menu yang dihapus

### 9.6 Arsip informasi `/informasi`

Penyaring: kategori, unit, lokasi, tahun. Pagination 12 item per halaman.

**Kriteria penerimaan:**
- [ ] Penyaring tercermin di URL dan dapat dibagikan
- [ ] Hanya menampilkan `tampilkan_di_induk = true`
- [ ] Pagination memakai tautan sungguhan (dapat dirayapi), bukan tombol berbasis JavaScript

---

## 10. Sistem desain

Dibangun sendiri di atas Tailwind. **Wajib dirancang sebagai paket yang dapat dipakai ulang sejak Fase 1**, karena seluruh subdomain Fase 2 akan memakainya.

**Token:** warna (primer yayasan + aksen per unit dari `warna_aksen`), tipografi, spasi berbasis kelipatan 4, radius, bayangan.

**Komponen inti:** `Button` · `Card` · `Badge` · `UnitCard` · `PostCard` · `FilterBar` · `Breadcrumb` · `UnitSwitcher` · `SiteHeader` · `SiteFooter` · `StatBlock` · `EmptyState` · `Prose`.

**Aturan:**
- Mobile-first. Sebagian besar pengunjung datang dari ponsel
- `UnitSwitcher` dan `SiteFooter` harus menerima konfigurasi unit sebagai props, tanpa nilai yang dipatok mati
- Tidak ada warna yang ditulis langsung di komponen; semua lewat token

---

## 11. Migrasi konten

Situs lama memiliki arsip yang panjang (lebih dari 50 halaman pagination). Ini pekerjaan tersendiri, bukan tempelan.

**Langkah:**
1. Ekspor seluruh `post` beserta kategori lamanya
2. Petakan kategori lama → `unit` + `category` baru sesuai tabel migrasi di dokumen taksonomi
3. Isi `unit_utama`, `ringkasan`, dan `lokasi` — sebagian bisa diturunkan otomatis, sisanya manual
4. Setel `tampilkan_di_induk` — **default `false`**, lalu kurasi naik. Lebih aman daripada sebaliknya
5. Bangun peta redirect 301 dari URL lama ke URL baru
6. Isi `alt` gambar yang kosong

**Kriteria penerimaan:**
- [ ] Setiap URL lama yang terindeks memiliki redirect 301 atau halaman 410 yang disengaja
- [ ] Tidak ada tulisan hasil migrasi yang kosong `unit`, `category`, atau `lokasi`
- [ ] Berkas peta redirect disimpan di repositori dan dapat ditinjau

---

## 12. Performa

| Metrik | Anggaran |
|---|---|
| LCP (4G, ponsel kelas menengah) | < 2,5 detik |
| CLS | < 0,1 |
| INP | < 200 ms |
| Lighthouse Performance (mobile) | ≥ 90 |
| Ukuran JS awal per route | < 150 KB terkompresi |

**Aturan:** setiap gambar lewat `next/image` dengan `width`/`height` eksplisit. Font dimuat lewat `next/font`. Tidak ada pustaka animasi berat. Skrip pihak ketiga hanya GA4, dimuat dengan `strategy="afterInteractive"`.

---

## 13. SEO

- Metadata per halaman lewat Metadata API Next.js — tanpa kecuali
- `rel="canonical"` mengikuti field `unit_utama`
- JSON-LD: `Organization` (global), `EducationalOrganization` (profil unit), `NGO` (donasi), `Article` (tulisan), `BreadcrumbList`, `FAQPage`
- Sitemap dibangkitkan otomatis dari WPGraphQL
- Struktur heading benar: satu `h1` per halaman
- Tag `hreflang` **belum** dipasang di Fase 1, tetapi struktur route tidak boleh menghalangi penambahan prefiks bahasa nanti

---

## 14. Aksesibilitas

Target WCAG 2.1 AA.

- [ ] Rasio kontras teks minimal 4,5:1
- [ ] Seluruh fungsi dapat dijalankan dengan keyboard, indikator fokus terlihat
- [ ] Setiap gambar bermakna memiliki `alt`; gambar dekoratif memakai `alt=""`
- [ ] Landmark semantik dan tautan "lewati ke konten"
- [ ] Bahasa dokumen `lang="id"`
- [ ] Formulir memiliki label yang terhubung dan pesan galat yang jelas

---

## 15. Keamanan

- `/wp-admin` dibatasi IP atau di balik autentikasi tambahan; front-end WP dimatikan total
- Endpoint GraphQL hanya-baca untuk publik; mutasi memerlukan autentikasi
- Endpoint revalidasi dilindungi secret
- Formulir memakai honeypot dan pembatasan laju berbasis IP
- Header keamanan: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`
- Kredensial hanya lewat variabel lingkungan; tidak pernah masuk repositori

---

## 16. Fase pengerjaan

| Tahap | Isi | Keluaran |
|---|---|---|
| **0** | Penyiapan WordPress: taksonomi, CPT, ACF, peran pengguna, WPGraphQL | Skema GraphQL siap diquery |
| **1** | Fondasi Next.js: sistem desain, layout, header, footer, tipe & Zod | Kerangka situs berjalan |
| **2** | Jalur keputusan: `/`, `/program`, `/program/[slug]` | Perjalanan pengguna utama berfungsi |
| **3** | Jalur kepercayaan: `/tentang`, `/tentang/legalitas`, `/tentang/pengurus`, `/transparansi`, `/dampak` | Kredibilitas yayasan terbangun |
| **4** | Jalur donasi: `/donasi`, `/donasi/[slug]` | LAZIS punya kanal layak |
| **5** | Konten & arsip: `/informasi`, `/agenda`, `/galeri`, `/faq`, `/cari` | |
| **6** | Halaman pendukung, kepatuhan, formulir kontak | |
| **7** | Migrasi konten, redirect, pengujian, peluncuran | Situs tayang |

Tahap 0 memblokir semuanya. Jangan memulai Tahap 1 sebelum skema GraphQL dapat diquery dengan data contoh yang nyata.

---

## 17. Risiko & asumsi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten dari yayasan datang terlambat | Peluncuran mundur | Gunakan daftar kebutuhan konten bergelombang; bangun dengan data contoh sejak awal |
| Laporan keuangan tidak tersedia | G2 & G3 tidak tercapai | Sediakan halaman dengan pernyataan jujur dan tanggal rencana publikasi |
| Daftar unit belum terverifikasi | Taksonomi perlu diubah setelah migrasi | **Konfirmasi ke yayasan sebelum Tahap 0 selesai** |
| Tidak ada developer React setelah peluncuran | Situs membeku | Sistem desain terdokumentasi; seluruh konten dapat diubah lewat CMS tanpa menyentuh kode |
| Editor kehilangan penyusun halaman visual | Resistensi tim | Sediakan panduan editor dan pratinjau di Tahap 6 |

**Asumsi yang perlu divalidasi sebelum Tahap 0 dinyatakan selesai:**
- Daftar unit lengkap dan mutakhir
- Yayasan bersedia memublikasikan legalitas dan minimal ringkasan laporan keuangan
- Setiap unit memiliki narahubung WhatsApp sendiri
- Ada satu penanggung jawab konten di pihak yayasan

---

## 18. Aturan kerja dengan Claude Code

Bagian ini ditujukan langsung ke agen coding.

**Ruang lingkup**
- Kerjakan satu tahap dari Bagian 16 dalam satu waktu. Jangan melompat ke depan
- Jangan membuat route yang tidak ada di Bagian 8
- Jangan membuat field, taksonomi, atau CPT yang tidak ada di Bagian 7
- Bila spesifikasi tampak kurang, **tanyakan** — jangan mengarang field atau perilaku

**Kode**
- TypeScript mode strict. Tanpa `any`
- Setiap respons GraphQL divalidasi dengan skema Zod sebelum dipakai komponen
- Kueri GraphQL diletakkan bersebelahan dengan route yang memakainya
- Server Component sebagai default; `"use client"` hanya bila memang butuh interaktivitas
- Tanpa dependensi baru di luar Bagian 6 tanpa persetujuan
- Setiap komponen daftar wajib menangani keadaan kosong dan keadaan galat secara eksplisit

**Definisi selesai untuk setiap tahap**
- [ ] Seluruh kriteria penerimaan pada bagian terkait terpenuhi
- [ ] Lolos `tsc --noEmit` dan lint tanpa peringatan
- [ ] Anggaran performa Bagian 12 terpenuhi pada route baru
- [ ] Daftar periksa aksesibilitas Bagian 14 terpenuhi
- [ ] Bekerja dengan benar pada lebar 390px, 768px, dan 1440px
- [ ] Keadaan kosong dan galat sudah ditangani, bukan diabaikan

**Bila terjadi konflik antara dokumen ini dan kode yang ada, dokumen ini yang menang.** Bila dokumen ini keliru, perbaiki dokumennya lebih dulu.

---

## 19. Dokumen terkait

- *Skema Taksonomi & Kebutuhan Konten Website Induk ICWM* — rincian term, field, dan daftar permintaan konten ke yayasan
- Peta redirect (dibuat pada Tahap 7)
- Panduan editor CMS (dibuat pada Tahap 6)
