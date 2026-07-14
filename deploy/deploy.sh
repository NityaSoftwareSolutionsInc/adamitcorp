#!/usr/bin/env bash
# Deploy Adam IT Corp Next.js app behind Nginx (Linux server)
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

echo "==> Installing dependencies"
npm ci

echo "==> Building Next.js (standalone)"
npm run build

echo "==> Standalone output ready at .next/standalone"
echo "    Start with: NODE_ENV=production node .next/standalone/server.js"
echo "    Or: npm run start"
echo ""
echo "Nginx: copy deploy/nginx.conf to /etc/nginx/sites-available/adamitcorp"
echo "       then enable the site and reload nginx."
