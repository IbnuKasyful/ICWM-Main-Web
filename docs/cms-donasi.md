# Sistem update angka donasi lewat CMS

Angka `terkumpul` dan `target` tiap program donasi diedit di WordPress, bukan di
repo ini. Dokumen ini memuat cara memasangnya (sekali) dan cara memakainya
(rutin).

Arsitekturnya: **WordPress dan Next.js berada di satu cPanel.** WordPress hanya
menjadi tempat mengisi data (headless) — pengunjung tidak pernah membukanya.

```
Admin  →  wp-admin  →  simpan
                          ├─ WPGraphQL  ──────→  Next.js membaca angka
                          └─ POST /api/revalidate → cache disegarkan seketika
```

---

## Bagian 1 — Pemasangan (sekali saja)

### 1. WordPress di subdomain

Di cPanel: **Domains → Create A Domain**, buat `cms.wadimubarak.com`, lalu pasang
WordPress ke situ via **Softaculous → WordPress**. Jangan pasang di domain utama —
domain utama dipakai Next.js.

### 2. Plugin

Pasang **WPGraphQL** dari direktori plugin WordPress (wajib), lalu unggah folder
`cms/wm-donasi/` dari repo ini ke `wp-content/plugins/` dan aktifkan
"Wadi Mubarak — Program Donasi".

Setelah aktif, menu **Program Donasi** muncul di sidebar wp-admin.

### 3. Rahasia bersama

Bangkitkan satu nilai:

```bash
openssl rand -hex 32
```

Pasang di **dua** tempat dengan nilai yang sama persis.

`wp-config.php` (di atas baris `/* That's all, stop editing! */`):

```php
define('WM_NEXT_REVALIDATE_URL',    'https://wadimubarak.com/api/revalidate');
define('WM_NEXT_REVALIDATE_SECRET', 'tempel-nilai-di-sini');
```

`.env.local` di aplikasi Next.js:

```
WPGRAPHQL_ENDPOINT=http://127.0.0.1/graphql
REVALIDATE_SECRET=tempel-nilai-yang-sama
```

`WPGRAPHQL_ENDPOINT` sengaja memakai `127.0.0.1`: kueri tidak keluar ke internet,
jadi lebih cepat dan tidak terpengaruh masalah DNS. Bila WordPress berada di
server lain, ganti dengan `https://cms.wadimubarak.com/graphql`.

Gambar unggulan dilayani WordPress, jadi domainnya harus terdaftar di
`next.config.ts` → `images.remotePatterns`. `cms.wadimubarak.com` sudah ada di
sana; ganti bila subdomainnya berbeda.

### 4. Akun untuk amil

Buat pengguna dengan peran **Editor**, bukan Administrator. Editor cukup untuk
mengelola program donasi tetapi tidak bisa memasang plugin, mengubah tema, atau
membaca `wp-config.php` — dan rahasia penyegaran cache tidak tersimpan di
basis data, jadi tidak ikut terbaca siapa pun yang masuk wp-admin.

### 5. Uji

```bash
# Harus membalas {"ok":true,"siap":true}
curl https://wadimubarak.com/api/revalidate

# Harus membalas 401
curl -X POST https://wadimubarak.com/api/revalidate

# Harus membalas {"ok":true,...}
curl -X POST https://wadimubarak.com/api/revalidate \
  -H "x-revalidate-secret: nilai-rahasia-anda"
```

---

## Bagian 2 — Pemakaian rutin oleh admin

Buka **Program Donasi → pilih program → ubah angka → Update**. Selesai.

Bila sambungannya benar, muncul pemberitahuan hijau *"Angka tersimpan dan
halaman donasi di situs sudah diperbarui"*, dan angka baru tampil di situs dalam
hitungan detik. Bila pemberitahuan itu tidak muncul, angka tetap tersusul
otomatis dalam maksimal 15 menit (ISR).

### Isi tiap kolom

| Kolom | Cara mengisi |
|---|---|
| Judul | Nama program. Slug URL-nya ikut judul; **jangan ubah slug program yang sudah tayang** — tautan lama akan mati. |
| Kutipan (excerpt) | Ringkasan 1–2 kalimat. Dipangkas otomatis di 200 karakter. |
| Isi | Penjelasan program. Paragraf biasa; heading dan daftar didukung. |
| Gambar unggulan | Rasio 3:2, minimal 1200 px. Bila kosong, situs memakai ilustrasi cadangan. |
| Jenis dana | Menentukan nomor rekening mana yang tampil di halaman program. |
| Target (Rp) | Angka polos. **Isi 0** bila program berkelanjutan — bar progres otomatis hilang dan situs menulis "program berkelanjutan". |
| Terkumpul (Rp) | Angka polos hasil rekapitulasi. Ini kolom yang biasanya diperbarui. |
| Penerima manfaat | Ringkas dan terukur, mis. "180 santri di seluruh unit". |
| Batas waktu | Kosongkan bila tanpa batas. |
| Tandai mendesak | Menaikkan program ke urutan teratas + jadi sorotan donasi di beranda. |

Menempel `Rp 1.305.000.000` dari pembukuan tidak masalah — titik dan "Rp"
dibuang otomatis saat disimpan. Kolom **Capaian** di daftar program menampilkan
persentasenya supaya salah ketik satu nol langsung kelihatan.

Begitu `Terkumpul` mencapai `Target`, situs otomatis mengubah nada progresnya
menjadi "Target terpenuhi". Tidak ada kolom status yang perlu diubah.

Menghapus program (ke Trash) juga menyegarkan situs. Halaman lamanya akan
menjawab 404 — pertimbangkan mengosongkan target dan menandainya selesai alih-alih
menghapus, bila tautannya sudah pernah disebar.

---

## Perilaku saat WordPress bermasalah

Dirancang supaya halaman donasi **tidak pernah** menjadi halaman galat:

| Keadaan | Yang terjadi |
|---|---|
| `WPGRAPHQL_ENDPOINT` kosong | Situs memakai data statis `src/data/donasi.ts`. Ini mode pratinjau Cloudflare. |
| WordPress mati / lambat >8 detik | Angka statis terakhir dipakai, galat dicatat di log server. |
| Belum ada program terbit di CMS | Data statis dipakai, bukan halaman kosong. |
| Satu program cacat (mis. jenis dana kosong) | Seluruh data CMS ditolak Zod, data statis dipakai, log menyebut indeks dan field yang salah. |

Karena itu data di `src/data/donasi.ts` tetap layak diperbarui sesekali: ia
adalah cadangan yang tampil kalau CMS tidak dapat dihubungi. Perlakukan sebagai
rekapitulasi terakhir yang aman ditampilkan, bukan data mati.

Log galat ada di **cPanel → Metrics → Errors**, atau di berkas log aplikasi
Node.js App. Semua pesan dari sistem ini berprefiks `[wp]`, `[donasi]`,
`[revalidate]`, atau `[wm-donasi]`.

---

## Berkas yang terlibat

| Berkas | Peran |
|---|---|
| `cms/wm-donasi/wm-donasi.php` | Sisi WordPress: CPT, kolom angka, WPGraphQL, pemicu penyegaran. |
| `src/lib/wp.ts` | Klien WPGraphQL. Tidak pernah melempar; `null` berarti gagal. |
| `src/lib/content.ts` | Batas API: memilih WP atau data statis, menjalankan Zod. |
| `src/app/api/revalidate/route.ts` | Menerima panggilan WordPress, menyegarkan cache. |
| `src/lib/schemas.ts` | `programDonasiSchema` — kontrak yang mengikat kedua sisi. |

Menambah kolom baru: tambahkan di `wm_donasi_kolom()` (PHP), di kueri dan
pemeta `src/lib/wp.ts`, lalu di `programDonasiSchema`. Ketiganya harus sepakat,
dan Zod akan berteriak lebih dulu kalau tidak.
