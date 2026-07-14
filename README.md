# Adam IT Corp

Company website built with **Next.js** and served behind **Nginx**.

## Stack

- Next.js 16 (App Router, standalone output)
- Docker Compose (`web` + nginx on host `:8080`)
- Host Nginx + Certbot for HTTPS (`adamitcorp.com`)

## Project structure

```
src/
  app/           # pages & API routes
  components/    # Header, Hero, About, Services, Contact, Footer
  styles/        # site CSS
public/
  images/        # logo + hero image
deploy/
  deploy.sh            # one-shot production deploy
  nginx.host.conf      # host Nginx → Docker :8080
  nginx.docker.conf    # Nginx inside Docker Compose
Dockerfile
docker-compose.yml
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production deploy (Docker + host Nginx)

On the server (`/opt/adamitcorp`):

```bash
# First time / every update — rebuild containers
chmod +x deploy/deploy.sh
./deploy/deploy.sh

# First time only — install host Nginx site (proxy to :8080)
./deploy/deploy.sh --nginx

# Check health
./deploy/deploy.sh --status
```

Or via npm:

```bash
npm run deploy
npm run deploy:nginx
npm run deploy:status
```

Stack:

| Layer | Role |
|-------|------|
| `adamitcorp-web` | Next.js (`:3010`, internal) |
| `adamitcorp-nginx` | Docker Nginx → host `:8080` |
| Host Nginx + Certbot | `:80`/`:443` → `127.0.0.1:8080` |

App URL: https://adamitcorp.com

**Cloudflare:** SSL mode **Full (strict)**. Do not also force `www` in Cloudflare if Nginx already redirects www → apex (avoids redirect loops).

## Docker only (no host Nginx)

```bash
docker compose up -d --build
# http://SERVER_IP:8080
```

## Contact form

`POST /api/contact` validates submissions. Wire email delivery in `src/app/api/contact/route.ts`.
