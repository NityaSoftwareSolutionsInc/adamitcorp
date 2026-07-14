# Adam IT Corp

Company website built with **Next.js** and served behind **Nginx**.

## Stack

- Next.js 16 (App Router, standalone output)
- Bootstrap 5 + Bootstrap Icons + Boxicons
- Nginx reverse proxy → Node on port `3000`

## Project structure

```
src/
  app/           # pages & API routes
  components/    # Header, Hero, About, Services, Contact, Footer
  styles/        # site CSS
public/
  images/        # logo + hero image
deploy/
  nginx.conf           # Nginx config (bare-metal)
  nginx.docker.conf    # Nginx config (Docker Compose)
  deploy.sh            # bare-metal build helper
Dockerfile
docker-compose.yml
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker (recommended)

Builds Next.js (standalone) and runs Nginx in front on **host port 8080**
(so it does not clash with other stacks using `:80` / `:3000`).

```bash
docker compose up -d --build
```

Open [http://localhost:8080](http://localhost:8080).

Useful commands:

```bash
docker compose logs -f          # follow logs
docker compose down             # stop
docker compose up -d --build    # rebuild after code changes
```

Services:

| Service | Role               | Exposed |
|---------|--------------------|---------|
| `web`   | Next.js on `:3010` | internal only |
| `nginx` | Reverse proxy      | host `:8080` → container `:80` |

## Production (bare metal — Nginx + Next.js)

On the server:

```bash
npm ci
npm run build
npm run start          # listens on port 3000
# or for standalone:
# node .next/standalone/server.js
```

Then install Nginx config:

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/adamitcorp
sudo ln -sf /etc/nginx/sites-available/adamitcorp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Update `server_name` in `deploy/nginx.conf` to your domain. For HTTPS, use Certbot and uncomment the SSL server block.

### systemd (optional)

```ini
[Unit]
Description=Adam IT Corp Next.js
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/adamitcorp
ExecStart=/usr/bin/node .next/standalone/server.js
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1

[Install]
WantedBy=multi-user.target
```

## Contact form

`POST /api/contact` validates submissions. Wire it to your email provider in `src/app/api/contact/route.ts`.
