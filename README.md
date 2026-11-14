# HireMind marketing website

Next.js marketing site: animations, pricing, SEO pages, and a **verified business-email-only** demo form.

## Run locally

```bash
cd website
cp .env.example .env
# Mailhog from repo root: docker compose up -d mailhog
npm run dev
```

Open **http://localhost:3002**

Product app (recruiter login) stays at **http://localhost:3000** (`NEXT_PUBLIC_APP_URL`).

## Demo form security

1. **Business email only** — blocks Gmail, Outlook, Yahoo, etc. Company domains like `you@acme.com` are allowed.
2. **6-digit OTP** emailed before submit (Mailhog UI: http://localhost:8025 in dev).
3. **Rate limits** on IP and email; honeypot field for bots.

## Production

Set `NEXT_PUBLIC_SITE_URL`, `DEMO_OTP_SECRET`, and real SMTP (`SMTP_*`, `SALES_EMAIL`).

```bash
npm run build && npm run start
```

## SEO

- `/sitemap.xml`, `/robots.txt`
- Per-page metadata + JSON-LD (Organization, SoftwareApplication, FAQ)
