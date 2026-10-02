# DermicIQ Brand Aesthetics

Shareable brand card for marketing site, product code, and blog repos.  
Source of truth on the marketing site: `client/src/config/brand.ts` + `client/src/styles/brand-tokens.css`.

Do **not** use ™ in wordmarks, tab titles, or logo alt text. Prefer **DermicIQ** (plain).

## Direction

Clinical-calm mint and bright aqua teal. Clean, trustworthy, light surfaces.  
Not purple/indigo gradients. Not cream + serif + terracotta. Not dark-mode-first.

## Colors

| Role | Name | Hex | Use |
|------|------|-----|-----|
| Recognition | Light Cyan Aqua | `#76EEC6` | Logo highlight, accent chips |
| Header / Border | Bright Aqua Teal | `#40C0BA` | Top header bar (all breakpoints), hero CTA fill |
| Nav caption accent | Soft Aqua Mist | `#e2f7f4` | “Technologies” under wordmark (nav + footer) |
| Background | Minty Off-White | `#F8FFFE` | Page canvas, DermicIQ wordmark on aqua header |
| Primary | Deep Sea Teal | `#005F5B` | Primary CTAs, headings, links, theme-color, mobile menu text |
| Secondary | Soft Mint | `#C8F2EB` | Soft fills, section washes, mobile menu panel, hero headline |
| Text | Deep Charcoal Teal | `#223331` | Body copy, hero CTA label text |
| Alert | Soft Coral | `#FF9E9E` | Errors / warnings |

### Chrome & surfaces

- **Theme / PWA chrome:** `#005F5B`
- **Header background (all sizes):** `#40C0BA`
- **Mobile hamburger menu panel only:** `#C8F2EB` (header stays `#40C0BA`)
- **Footer background:** deeper teal `hsl(177 100% 16%)`
- **Footer foreground / wordmark:** DermicIQ `#F8FFFE`, Technologies `#e2f7f4`

## Marketing surface rules (site-specific, mirror where useful)

### Nav / footer wordmark

- Line 1 **DermicIQ** — Montserrat 700, `text-sm`, color `#F8FFFE`
- Line 2 **Technologies** — Montserrat 600, `0.625rem`, uppercase, tracking `0.14em`, color `#e2f7f4`
- Logo mark sits left of the wordmark (`logo-96`, rounded-2xl)

### Mobile nav (`< lg`)

- Hamburger on the **right**
- Opens a full-height **vertically scrollable** panel
- Panel background `#C8F2EB`; link text Deep Sea Teal `#005F5B`
- Header bar remains `#40C0BA` above the panel

### Hero

- Headline color: Soft Mint `#C8F2EB`
- Primary CTA (“Set up your profile”): background `#40C0BA`, text `#223331`

### Other marketing CTAs

Outline / secondary marketing buttons that should feel quiet on mint washes (e.g. “Read our full mission…”, “Sensitive skin?…”, partner “Learn How It Works”) use background `#F8FFFE` with a light primary border.

## Typography

| Token | Value |
|-------|--------|
| Family | Montserrat |
| Weights | 400, 600, 700 |
| Stack | `"Montserrat", system-ui, sans-serif` |
| Google Fonts | `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap` |

### Type scale

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| Hero (mobile) | `2.5rem` | 700 | line-height 1.12, letter-spacing `-0.02em` |
| Hero | `3.25rem` | 700 | line-height 1.1, letter-spacing `-0.02em` |
| Hero (lg) | `3.75rem` | 700 | line-height 1.08, letter-spacing `-0.02em` |
| Section | `2.25rem` | 600 | letter-spacing `-0.01em` |
| Section (lg) | `2.75rem` | 600 | letter-spacing `-0.01em` |
| Body large | `1.125rem` | 400 | line-height 1.7 |
| Body | `1rem` | 400 | line-height 1.6 |
| Caption | `0.875rem` | 500 | line-height 1.5 |
| Nav caption | `0.625rem` | 600 | letter-spacing `0.14em`, uppercase |

## Shape & elevation

- **Radius base:** `0.5rem`
  - sm: base − 4px · md: base − 2px · lg: base · xl: base + 4px · 2xl: base + 0.5rem
- **Shadows:** soft charcoal-teal tint, low opacity — no heavy glow
- **Motion:** `fade-up` 0.55s ease-out (subtle presence)

## Semantic UI mapping

Prefer semantic tokens in components — not raw hex (except documented one-offs like `#e2f7f4` on the wordmark caption).

| Token | Maps to |
|-------|---------|
| `primary` | Deep Sea Teal `#005F5B` |
| `primary-foreground` | Minty Off-White `#F8FFFE` |
| `accent` | Light Cyan Aqua `#76EEC6` |
| `header` | Bright Aqua Teal `#40C0BA` |
| `header-foreground` | Deep Charcoal Teal `#223331` |
| `secondary` | Soft Mint `#C8F2EB` |
| `destructive` | Soft Coral `#FF9E9E` |
| `background` | Minty Off-White `#F8FFFE` |
| `foreground` | Deep Charcoal Teal `#223331` |

## Drop-in CSS primitives

```css
:root {
  --brand-cyan-aqua: #76EEC6;
  --brand-header-bg: #40C0BA;
  --brand-nav-caption: #e2f7f4;
  --brand-mint-bg: #F8FFFE;
  --brand-teal: #005F5B;
  --brand-soft-mint: #C8F2EB;
  --brand-charcoal: #223331;
  --brand-coral: #FF9E9E;
  --brand-font-sans: "Montserrat", system-ui, sans-serif;
  --radius: 0.5rem;
  --theme-color: #005F5B;
}
```

## Do / don’t

**Do**

- Mint washes and soft secondary fills
- Teal for primary CTAs, headings, and links
- Aqua header `#40C0BA` on all breakpoints
- Soft mint `#C8F2EB` for the mobile menu panel only
- Left-border accents in primary teal
- Light, airy layouts with calm hierarchy
- Plain **DermicIQ** (no ™) in UI chrome and titles

**Don’t**

- Dark forest green headers
- ™ in logos, wordmarks, or browser tab titles
- Purple / indigo gradient themes
- Cream background + high-contrast serif + terracotta
- Dark mode as the default brand surface
- Heavy glow effects or neon accents
- Emoji decoration as brand language
- Card-heavy heroes or dashboard clutter on marketing surfaces

## Logo & favicon assets

| Asset | Files | Typical use |
|-------|-------|-------------|
| Logo 96 | `logo-96.png` / `logo-96.webp` | Nav (~44px), footer (~48px) |
| Logo 192 | `logo-192.png` / `logo-192.webp` | OG / larger marks |
| Favicon 48 | `favicon-48.png` | Browser tab |
| Favicon 96 | `favicon-96.png` | Higher-DPI tab icon |
| Apple touch | `apple-touch-icon.png` (180) | iOS home screen |
| PWA | `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`, `site.webmanifest` | Install / manifest |

Display treatment for logo mark: `rounded-2xl`, light shadow.  
Mark is the cyan tile with dark-teal **dIQ** circle (no TM in the artwork).

## Keeping repos in sync

1. Treat this file as the portable brand card across marketing, app (`dermiciq_code`), and blog.
2. Keep marketing `brand.ts` + `brand-tokens.css` aligned with the hex values above.
3. Platform / blog should mirror these hexes — do not invent alternate teals.
4. Product exception (if still required by app UX): near-black primary CTAs may remain app-only; marketing CTAs stay Deep Sea Teal / documented hero aqua as above.
