import { type NamaIkon } from "@/components/ui/Icon";
import { KartuFoto } from "@/components/ui/KartuFoto";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { routerNiat } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * PRD §9.1 blok 2 & §5.3, lima pintu berdasarkan NIAT pengunjung.
 *
 * Rupa tiap bilah ditangani `KartuFoto`; yang diatur di sini hanyalah
 * perilaku barisnya. Kelimanya berjajar dalam satu baris sebagai bilah yang
 * sama lebar dan kelabu, keadaan menganggur yang sengaja dibuat "padam".
 * Begitu satu bilah disentuh kursor, bilah itu melebar dan fotonya menyala
 * berwarna sementara yang lain menyempit. Jadi hanya ada satu pintu yang
 * hidup pada satu waktu, dan pilihan itu terbaca dari jauh tanpa perlu
 * membaca satu kata pun.
 *
 * Kriteria penerimaan: kelima pintu dapat diakses keyboard dan memiliki label
 * yang jelas. Setiap bilah adalah satu tautan tunggal, bukan div yang diberi
 * penangan klik, dan ia ikut terbuka saat tautannya menerima fokus
 * (`focus-within`), pengguna papan tik melihat isi yang sama dengan pengguna
 * tetikus. Seluruh isi selalu ada di DOM, hanya penampakannya yang berubah,
 * sehingga pembaca layar tidak pernah bergantung pada hover.
 *
 * Di bawah lg susunan sebaris ini ditinggalkan: lima bilah selebar 1/5 layar
 * sempit tidak terbaca, dan pada layar sentuh tidak ada hover yang bisa
 * membukanya. Di sana kelimanya menumpuk sebagai kartu penuh yang langsung
 * berwarna dan lengkap isinya.
 */
export function RouterNiat() {
  return (
    <Section nada="sejuk">
      <div className="container-page">
        <JudulSeksi
          atas="Mulai dari sini"
          judul="Apa yang sedang"
          sorot="Anda cari"
          penutup="hari ini?"
          keterangan="Pilih satu pintu di bawah ini. Kami mengarahkan Anda langsung ke halaman yang tepat, tanpa perlu memahami struktur organisasi yayasan lebih dulu."
        />

        <ul className="mt-12 flex flex-col gap-3 lg:h-[27rem] lg:flex-row lg:gap-4">
          {routerNiat.map((pintu, i) => (
            <KartuFoto
              key={pintu.href}
              gambar={pintu.gambar}
              ikon={pintu.ikon as NamaIkon}
              judul={pintu.label}
              keterangan={pintu.deskripsi}
              href={pintu.href}
              aksi={pintu.aksi}
              prioritas={i < 2}
              /* Bilah menyempit saat menganggur dan melebar saat terbuka;
                 ukuran terbesarlah yang harus tersedia agar foto tidak buram
                 saat melebar. */
              sizes="(min-width: 1024px) 34rem, 92vw"
              className={cn(
                "h-[13rem] sm:h-[15rem]",
                // Yang dianimasikan hanya `flex-grow`: lebar bilah lain ikut
                // menyesuaikan sendiri karena semuanya berbagi ruang yang
                // sama, jadi tidak ada satu pun ukuran yang perlu dihitung.
                "transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none",
                "lg:h-auto lg:flex-[1_1_0%] lg:hover:flex-[3.4_1_0%] lg:focus-within:flex-[3.4_1_0%]",
              )}
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
