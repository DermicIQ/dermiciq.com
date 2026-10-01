# DermicIQ contact form Worker

Cloudflare Worker that accepts `POST /api/contact`, verifies Turnstile, rate-limits by IP, and emails `support@dermiciq.com` via Resend.

## API

`POST /api/contact` (JSON):

```json
{
  "name": "string",
  "email": "string",
  "phone": "string optional",
  "subject": "string",
  "message": "string",
  "turnstileToken": "string"
}
```

| Status | Body |
|--------|------|
| 200 | `{ "ok": true }` |
| 400 | `{ "error": "..." }` |
| 429 | `{ "error": "..." }` |
| 502 | `{ "error": "..." }` (email provider failure) |

Intended route: same-origin `https://dermiciq.com/api/contact*` (no CORS).

## Prerequisites

1. **Turnstile** widget for `dermiciq.com` (+ `localhost` / `127.0.0.1` for local testing). Site key goes in the Vite frontend; secret is a Worker secret.
2. **Resend** account with domain `dermiciq.com` verified, and an API key. The `CONTACT_FROM` address (default `DermicIQ <noreply@dermiciq.com>`) must be allowed on that verified domain.
3. Zone `dermiciq.com` on Cloudflare (already true for DNS/proxy in front of GitHub Pages).

## Multi-project Cloudflare auth (important)

This Cursor machine may use **several Cloudflare accounts** (DermicIQ, Forjyn, …). Global `wrangler login` OAuth is shared across all repos and will deploy to whichever account you last logged into.

**Do not use global `wrangler login` for deploys here.** Use a **project-local** `.env` instead:

```bash
cd workers/contact
cp .env.example .env
# Fill CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN for the DermicIQ account
npm run whoami   # must list the DermicIQ account
npm run deploy   # predeploy refuses to run without project .env
```

Wrangler prefers `CLOUDFLARE_API_TOKEN` over OAuth, so Forjyn’s login cannot hijack this deploy.

Create the token in Cloudflare → My Profile → API Tokens (Workers Edit template is enough). Account ID is on Workers & Pages → Overview (sidebar).

## Secrets (never commit)

```bash
cd workers/contact
npm install

# Requires project .env auth (see above)
npx wrangler secret put TURNSTILE_SECRET
npx wrangler secret put RESEND_API_KEY
```

**Turnstile pairing (required):** `TURNSTILE_SECRET` must be the **secret key** from the **same** Turnstile widget as `VITE_TURNSTILE_SITE_KEY` in the repo-root `.env` (site key = public, secret = Worker only). In the Turnstile widget settings, allow hostnames `dermiciq.com`, `www.dermiciq.com`, and `localhost` for local dev. If the widget shows “Success” but the API returns verification errors, re-copy both keys from that widget and redeploy the Worker secret plus rebuild the SPA.

Optional non-secret vars in `wrangler.jsonc`:

- `CONTACT_FROM` — default `DermicIQ <noreply@dermiciq.com>` (Resend domain must be verified)
- `CONTACT_TO` — default `support@dermiciq.com`

Local runtime secrets for `wrangler dev`: copy `.dev.vars.example` → `.dev.vars`.

## Rate limiting

Uses the Cloudflare **Rate Limiting** binding (`CONTACT_RATE_LIMITER`).

Cloudflare only allows periods of **10 or 60 seconds**, so this Worker uses **5 requests / 60 seconds per IP** (stricter burst than “5 / 10 minutes”, which cannot be expressed with the binding). Limits are applied per Cloudflare location.

## Deploy

1. Create `workers/contact/.env` from `.env.example` with DermicIQ credentials (see Multi-project auth).
2. Enable the production route in `wrangler.jsonc` (uncomment `routes`):

   ```jsonc
   "routes": [
     { "pattern": "dermiciq.com/api/contact*", "zone_name": "dermiciq.com" }
   ]
   ```

3. Deploy:

   ```bash
   cd workers/contact
   npm install
   npm run deploy
   ```

4. Confirm the route in the Cloudflare dashboard: Workers → `dermiciq-contact` → Triggers → Routes → `dermiciq.com/api/contact*`.

## Local test

```bash
cd workers/contact
cp .dev.vars.example .dev.vars   # fill secrets
npm run dev
```

```bash
curl -sS -X POST http://127.0.0.1:8787/api/contact \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test User",
    "email": "you@example.com",
    "subject": "Hello",
    "message": "Smoke test",
    "turnstileToken": "<token-from-widget-or-test-keys>"
  }'
```

For Turnstile without a real widget, use [test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).

## Project layout

```
workers/contact/
  .env.example        # CLOUDFLARE_* for this account only
  wrangler.jsonc      # name, vars, ratelimits, routes
  scripts/            # deploy auth guard
  src/index.ts        # HTTP handler
  src/validate.ts     # field validation
  src/turnstile.ts    # siteverify
  src/resend.ts       # Resend email
  README.md
```
