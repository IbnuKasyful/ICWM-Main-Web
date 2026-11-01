# Program donasi lewat CMS

Program donasi dikelola operator di `cms.wadimubarak.com`, seperti menulis post:
judul, isi, gambar unggulan, lalu terbitkan. Dokumen ini memuat cara memasangnya
(sekali) dan cara memakainya (rutin).

WordPress hanya menjadi tempat mengisi data (headless), pengunjung tidak pernah
membukanya.

```
Operator  →  wp-admin  →  simpan
                            ├─ WPGraphQL  ──────→  Next.js membaca program
                            └─ POST /api/revalidate → cache disegarkan seketika
```

Nomor rekening, penjelasan jenis dana, dan alur setelah berdonasi di `/donasi`
tidak bisa diubah dari CMS. Nomor rekening sengaja tetap di `src/data/donasi.ts`:
perubahannya harus lewat peninjauan, bukan satu akun wp-admin.

---

## Bagian 1, Pemasangan (sekali saja)

Jalankan berurutan dari akar proyek:

```bash
bash scripts/deploy-vps.sh
bash scripts/pasang-donasi-cms.sh
```

Urutannya penting: rilis lama tidak mengambil satuan biaya, jadi begitu CMS
berisi program, kartunya akan menulis "Rp 0 terkumpul".

`pasang-donasi-cms.sh` mengirim plugin `cms/wm-donasi`, menulis dua konstanta di
`wp-config.php` (rahasianya disalin dari `REVALIDATE_SECRET` di
`/www/apps/icwm-web/shared/.env.production`), mengaktifkan plugin, membuat program
dari `src/data/donasi.ts` beserta gambarnya, lalu memeriksa program terbaca lewat
GraphQL publik. Skripnya aman diulang untuk memperbarui plugin, program yang sudah
ada tidak ditimpa.

Gambar SVG tidak diterima WordPress, jadi program tanpa foto (Konsultasi dan
Penyaluran Zakat) memakai ilustrasi cadangan sampai operator memasang gambar.

### Akun operator

Buat pengguna dengan peran **Editor**, bukan Administrator. Editor cukup untuk
mengelola program donasi dan tidak bisa memasang plugin, mengubah tema, atau
membaca `wp-config.php`.

---

## Bagian 2, Pemakaian rutin oleh operator

Buka menu **Program Donasi** di sidebar. **Tambah Program Donasi** membuat program
baru, klik judul untuk mengubah yang sudah ada, lalu tekan **Perbarui** atau
**Terbitkan**. Perubahan tampil di situs dalam hitungan detik. Bila sambungannya
sedang terganggu, situs menyusul otomatis dalam maksimal 15 menit.

### Isi tiap kolom

| Kolom | Cara mengisi |
|---|---|
| Judul | Nama program. Slug URL-nya ikut judul saat pertama diterbitkan. **Jangan ubah slug program yang sudah tayang**, tautan lama akan mati. |
| Isi | Wajib. Penjelasan program. **Program tanpa isi tidak tampil di situs.** |
| Kutipan | Ringkasan 1–2 kalimat. Bila kosong, diambil dari awal isi. Dipotong di 200 karakter. |
| Gambar unggulan | Foto lanskap 3:2 minimal 1200 px, atau poster potret (tampil utuh di halaman program). Bila kosong, situs memakai ilustrasi cadangan. |
| Jenis dana | Label di halaman program dan anjuran berita transfer. Nomor rekening sama untuk semua jenis. |
| Target (Rp) | **Isi 0** bila program berkelanjutan, bar progres otomatis hilang. |
| Terkumpul (Rp) | Hasil rekapitulasi. Biarkan 0 bila lembaga tidak menerbitkan angkanya. |
| Satuan biaya | Mis. "Rp 13.000 / kg" atau "Nominal bebas". Tampil menggantikan bar progres bila Target dan Terkumpul sama-sama 0. |
| Penerima manfaat | Ringkas dan terukur, mis. "180 santri di seluruh unit". |
| Batas waktu | Kosongkan bila tanpa batas. |
| Tandai mendesak | Menaikkan program ke urutan teratas + jadi sorotan donasi di beranda. Urutan sisanya menurut abjad judul. |

Menempel `Rp 1.305.000.000` dari pembukuan tidak masalah, titik dan "Rp" dibuang
saat disimpan. Kolom **Capaian** di daftar program menampilkan persentasenya
supaya salah ketik satu nol langsung kelihatan.

Begitu `Terkumpul` mencapai `Target`, situs otomatis menulis "Target terpenuhi".

Program yang sudah berakhir: ubah statusnya ke **Draf**, atau pindahkan ke Tong
Sampah. Keduanya mengeluarkan program dari situs dan halamannya menjadi 404, jadi
pertimbangkan membiarkannya terbit bila tautannya sudah pernah disebar.

---

## Perilaku saat WordPress bermasalah

Dirancang supaya halaman donasi **tidak pernah** menjadi halaman galat:

| Keadaan | Yang terjadi |
|---|---|
| WordPress mati / lambat >8 detik | Data cadangan `src/data/donasi.ts` dipakai, galat dicatat di log. |
| Tidak ada program terbit yang sah | Data cadangan dipakai, bukan halaman kosong. |
| Satu program cacat (mis. isi kosong) | Hanya program itu yang dilewati, lainnya tetap tampil, log menyebut slug dan kolom yang salah. |

Data cadangan tidak mengikuti suntingan operator. Bila CMS tidak dapat dihubungi,
yang tampil adalah isi `src/data/donasi.ts` saat build terakhir.

Log Next.js: `pm2 logs icwm-web`, cari prefiks `[wp]` dan `[content]`. Log plugin
ada di log PHP dengan prefiks `[wm-donasi]`.

---

## Berkas yang terlibat

| Berkas | Peran |
|---|---|
| `cms/wm-donasi/wm-donasi.php` | Sisi WordPress: CPT, kolom rincian, WPGraphQL, pemicu penyegaran. |
| `src/lib/wp.ts` | Klien WPGraphQL. Tidak pernah melempar; `null` berarti gagal. |
| `src/lib/content.ts` | Batas API: memilih WP atau data statis, menjalankan Zod. |
| `src/app/api/revalidate/route.ts` | Menerima panggilan WordPress, menyegarkan cache. |
| `src/lib/schemas.ts` | `programDonasiSchema`, kontrak yang mengikat kedua sisi. |
| `scripts/pasang-donasi-cms.sh`, `scripts/cms/impor-donasi.php` | Pemasangan dan pengisian awal. |

Menambah kolom baru: tambahkan di `wm_donasi_kolom()` (PHP), di kueri dan pemeta
`src/lib/wp.ts`, lalu di `programDonasiSchema`. Ketiganya harus sepakat. Pasang
plugin setelah rilis Next, tetapi rilis yang meminta kolom baru harus menyusul
secepatnya: selama kolomnya belum ada di CMS, kueri gagal dan situs memakai data
cadangan.
