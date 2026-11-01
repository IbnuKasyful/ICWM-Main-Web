#!/usr/bin/env bash
# Memasang plugin Program Donasi di CMS dan mengisinya dari src/data/donasi.ts,
# sekaligus plugin Segarkan Berita yang memakai sambungan yang sama.
#
# Jalankan sekali dari akar proyek, SETELAH rilis Next.js yang membaca kolom
# satuanBiaya sudah di-deploy:
#
#   bash scripts/deploy-vps.sh
#   bash scripts/pasang-donasi-cms.sh
#
# Urutannya penting: rilis lama tidak mengambil satuan biaya, jadi begitu CMS
# berisi program, kartu donasinya akan menulis "Rp 0 terkumpul".
#
# Aman diulang untuk memperbarui plugin. Program yang sudah ada tidak ditimpa.

set -euo pipefail

HOST="${DEPLOY_HOST:-root@76.13.196.166}"
CMS=/www/wwwroot/cms.wadimubarak.com
ENV_NEXT=/www/apps/icwm-web/shared/.env.production

SEMENTARA=$(mktemp -d)
trap 'rm -rf "$SEMENTARA"' EXIT

echo "==> Menyalin data program"
node --experimental-strip-types --no-warnings --input-type=module -e "
  import { programDonasiMentah } from './src/data/donasi.ts';
  import { writeFileSync } from 'node:fs';
  writeFileSync(process.argv[1], JSON.stringify(programDonasiMentah));
" "$SEMENTARA/program-donasi.json"

echo "==> Mengirim plugin dan data"
tar -C cms -cf - wm-donasi wm-segarkan-berita | ssh "$HOST" "mkdir -p /root/.cms-setup/donasi && tar -x -C $CMS/wp-content/plugins && chown -R www:www $CMS/wp-content/plugins/wm-donasi $CMS/wp-content/plugins/wm-segarkan-berita"
scp -q "$SEMENTARA/program-donasi.json" scripts/cms/impor-donasi.php "$HOST:/root/.cms-setup/donasi/"

ssh "$HOST" "bash -s" -- "$CMS" "$ENV_NEXT" <<'REMOTE'
set -euo pipefail
CMS=$1
ENV_NEXT=$2
cd "$CMS"
wp() { php -d error_reporting=24575 /usr/local/bin/wp --allow-root --path="$CMS" "$@"; }

RAHASIA=$(sed -nE 's/^REVALIDATE_SECRET=//p' "$ENV_NEXT" | tr -d '"'"'"'\r')
if [ -z "$RAHASIA" ]; then
  echo "REVALIDATE_SECRET kosong di $ENV_NEXT" >&2
  exit 1
fi

echo "==> Menyambungkan CMS ke Next.js"
wp config set WM_NEXT_REVALIDATE_URL 'http://127.0.0.1:3000/api/revalidate' --type=constant --quiet
wp config set WM_NEXT_REVALIDATE_SECRET "$RAHASIA" --type=constant --quiet

echo "==> Mengaktifkan plugin"
wp plugin activate wm-donasi wm-segarkan-berita

echo "==> Mengisi program"
wp eval-file /root/.cms-setup/donasi/impor-donasi.php \
  /root/.cms-setup/donasi/program-donasi.json \
  /www/apps/icwm-web/current/public/img

# WP-CLI berjalan sebagai root; gambar yang baru masuk harus bisa dibaca PHP-FPM.
find wp-content/uploads -user root -exec chown www:www {} +

echo "==> Memeriksa sambungan"
BALASAN=$(curl -fsS -X POST https://cms.wadimubarak.com/graphql \
  -H 'content-type: application/json' \
  -d '{"query":"{ programDonasis(first: 100) { nodes { slug satuanBiaya featuredImage { node { sourceUrl } } } } }"}')
JUMLAH=$(echo "$BALASAN" | grep -o '"slug"' | wc -l || true)
GAMBAR=$(echo "$BALASAN" | grep -o '"sourceUrl"' | wc -l || true)
echo "    Terbaca lewat GraphQL publik: $JUMLAH program, $GAMBAR gambar"
if [ "$JUMLAH" -eq 0 ]; then
  echo "Program tidak terbaca GraphQL, situs akan tetap memakai data statis." >&2
  exit 1
fi
if [ "$GAMBAR" -eq 0 ]; then
  echo "Gambar unggulan tidak terbaca GraphQL, semua program memakai ilustrasi cadangan." >&2
  exit 1
fi

curl -fsS -X POST http://127.0.0.1:3000/api/revalidate \
  -H 'content-type: application/json' \
  -H "x-revalidate-secret: $RAHASIA" \
  -d '{"jenis":"donasi"}'
echo

# Uji jalur yang sama dengan saat tulisan terbit, dari dalam WordPress.
HASIL=$(wp eval 'echo wm_berita_kirim_penyegaran("") ? "ok" : "gagal";')
echo "    Penyegaran berita dari CMS: $HASIL"
if [ "$HASIL" != "ok" ]; then
  echo "CMS tidak berhasil menyegarkan situs, tulisan baru tetap menunggu cache 1 jam." >&2
  exit 1
fi
REMOTE

echo "==> Selesai. Periksa https://wadimubarak.com/donasi"
