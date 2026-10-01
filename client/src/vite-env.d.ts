/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical site URL for SEO (default https://DermicIQ.com). */
  readonly VITE_SITE_URL?: string;
  /** Production base path override for Vite (`/` for apex, `/repo/` for GitHub Pages project sites). */
  readonly VITE_BASE?: string;
  /** Cloudflare Turnstile site key (public) for the contact form widget. */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  /** Contact form API endpoint (default `/api/contact`). */
  readonly VITE_CONTACT_API_URL?: string;
  /** Account deletion request API endpoint (default `/api/account-deletion`). */
  readonly VITE_ACCOUNT_DELETION_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
