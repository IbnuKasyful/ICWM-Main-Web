#!/usr/bin/env bash
# Menempatkan commit HEAD ke VPS aaPanel (76.13.196.166).
#
# Yang dikirim hanya isi commit (git archive), jadi .env.local dan berkas yang
# belum di-commit tidak pernah ikut. Build berjalan di server dalam folder rilis
# tersendiri, lalu symlink `current` dan PM2 dialihkan ke rilis itu. Tiga rilis
# terakhir disimpan untuk mundur cepat:
#
#   ssh root@76.13.196.166 'ln -sfn /www/apps/icwm-web/releases/<sha>/.next/standalone \
#     /www/apps/icwm-web/current && pm2 reload icwm-web'
#
# Variabel produksi tidak ada di repo: tinggal di server, di
# /www/apps/icwm-web/shared/.env.production, bersama ecosystem.config.cjs PM2.
#
# Jalankan dari akar proyek: bash scripts/deploy-vps.sh

set -euo pipefail

HOST="${DEPLOY_HOST:-root@76.13.196.166}"
APP=/www/apps/icwm-web
SHA=$(git rev-parse --short HEAD)

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "Peringatan: ada perubahan yang belum di-commit, yang dikirim hanya commit $SHA." >&2
fi

echo "==> Mengirim $SHA"
git archive --format=tar HEAD | ssh "$HOST" "rm -rf $APP/releases/$SHA && mkdir -p $APP/releases/$SHA && tar -x -C $APP/releases/$SHA"

ssh "$HOST" "bash -s" -- "$APP" "$SHA" <<'REMOTE'
set -euo pipefail
APP=$1
SHA=$2
REL=$APP/releases/$SHA
cd "$REL"

echo "==> npm ci"
cp "$APP/shared/.env.production" .env.production
npm ci --no-audit --no-fund --loglevel=error

echo "==> Build"
BUILD_TARGET=cpanel npm run build

# `standalone` tidak menyertakan aset statis dan folder public; keduanya disalin
# ke sebelah server.js. node_modules build dibuang, standalone membawa miliknya.
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
# Cache fetch hasil build juga tidak ikut. Tanpanya pengunjung pertama setelah
# deploy menunggu ~13 detik selama arsip berita diambil ulang dari CMS.
if [ -d .next/cache/fetch-cache ]; then
  mkdir -p .next/standalone/.next/cache
  cp -r .next/cache/fetch-cache .next/standalone/.next/cache/
fi
rm -rf node_modules
chown -R www:www "$REL"

echo "==> Mengalihkan ke $SHA"
ln -sfn "$REL/.next/standalone" "$APP/current"
pm2 startOrReload "$APP/shared/ecosystem.config.cjs" --update-env
pm2 save --force >/dev/null

# Simpan tiga rilis terbaru.
ls -1dt "$APP"/releases/*/ | tail -n +4 | xargs -r rm -rf

sleep 3
curl -fsS -o /dev/null -w "==> Uji lokal: HTTP %{http_code} dalam %{time_total}s\n" http://127.0.0.1:3000/
REMOTE
