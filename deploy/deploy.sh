#!/usr/bin/env bash
# Deploy Adam IT Corp — Docker Compose (web + nginx :8080) + optional host Nginx.
# Usage:
#   ./deploy/deploy.sh              # rebuild & start containers
#   ./deploy/deploy.sh --nginx      # also install/reload host Nginx site
#   ./deploy/deploy.sh --status     # show status only
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

DOMAIN="${DOMAIN:-adamitcorp.com}"
APP_PORT="${APP_PORT:-8080}"
COMPOSE=""

log()  { printf '==> %s\n' "$*"; }
fail() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

detect_compose() {
  if docker compose version >/dev/null 2>&1; then
    COMPOSE="docker compose"
  elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE="docker-compose"
  else
    fail "Docker Compose not found. Install with: apt-get install -y docker-compose-plugin"
  fi
}

ensure_env() {
  if [[ ! -f .env ]]; then
    if [[ -f .env.example ]]; then
      cp .env.example .env
      log "Created .env from .env.example — edit NEXT_PUBLIC_SITE_URL if needed"
    else
      cat > .env <<EOF
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
EOF
      log "Created .env with NEXT_PUBLIC_SITE_URL=https://${DOMAIN}"
    fi
  fi
}

wait_healthy() {
  local url="http://127.0.0.1:${APP_PORT}"
  local i
  log "Waiting for ${url} ..."
  for i in $(seq 1 40); do
    if curl -fsS -o /dev/null -w '' "${url}" 2>/dev/null; then
      log "App is responding on :${APP_PORT}"
      return 0
    fi
    sleep 2
  done
  fail "App did not become ready on :${APP_PORT}. Check: ${COMPOSE} logs --tail 80"
}

show_status() {
  detect_compose
  log "Container status"
  ${COMPOSE} ps || true
  echo
  log "Local health check"
  if curl -fsSI "http://127.0.0.1:${APP_PORT}" | head -n 12; then
    :
  else
    echo "  (not reachable on :${APP_PORT})"
  fi
  echo
  if command -v nginx >/dev/null 2>&1; then
    log "Host Nginx sites-enabled"
    ls -la /etc/nginx/sites-enabled/ 2>/dev/null || true
  fi
}

install_host_nginx() {
  local src="${APP_DIR}/deploy/nginx.host.conf"
  local dest="/etc/nginx/sites-available/adamitcorp"

  [[ -f "$src" ]] || fail "Missing ${src}"
  command -v nginx >/dev/null 2>&1 || fail "Host nginx not installed (apt-get install -y nginx)"

  log "Installing host Nginx site → ${dest}"
  sudo cp "$src" "$dest"
  sudo ln -sf "$dest" /etc/nginx/sites-enabled/adamitcorp
  sudo rm -f /etc/nginx/sites-enabled/default

  log "Testing and reloading Nginx"
  sudo nginx -t
  sudo systemctl reload nginx
  log "Host Nginx reloaded (proxy → 127.0.0.1:${APP_PORT})"
  log "SSL: if needed, run: sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
}

deploy_docker() {
  detect_compose
  ensure_env

  log "Using: ${COMPOSE}"
  log "Building and starting stack"
  ${COMPOSE} up -d --build

  wait_healthy

  log "Done"
  echo
  echo "  Local:   http://127.0.0.1:${APP_PORT}"
  echo "  Domain:  https://${DOMAIN}  (via host Nginx + Cloudflare)"
  echo
  echo "  Logs:    ${COMPOSE} logs -f"
  echo "  Status:  ./deploy/deploy.sh --status"
}

case "${1:-}" in
  --status|-s)
    show_status
    ;;
  --nginx|-n)
    deploy_docker
    install_host_nginx
    show_status
    ;;
  --help|-h)
    sed -n '2,8p' "$0"
    ;;
  "")
    deploy_docker
    show_status
    ;;
  *)
    fail "Unknown option: $1 (try --help)"
    ;;
esac
