# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on `0.0.0.0:4157`.
- `npm run build` — generates `public/sitemap.xml` + `public/robots.txt`, runs `tsc -b`, then `vite build`. The TypeScript step is real type-checking — there is no separate lint/test setup.
- `npm run build:pages` — same as `build`, but with `--base=/Electro/` for GitHub Pages deploys.
- `npm run deploy` — runs `build:pages` then publishes `dist/` to the `gh-pages` branch via `npx gh-pages -d dist`.
- `npm run preview` — serves the built `dist/`.

There is no test runner, ESLint, or Prettier configured. Type errors from `tsc -b` are the only automated check.

## Environment

`VITE_SITE_URL` (e.g. `https://example.com`) is read both at runtime (for canonical URLs / OG / hreflang in `src/lib/seo.ts` and `src/components/Seo.tsx`) and at build time by `scripts/generate-sitemap.mjs`. Without it, `siteUrl` is `null` at runtime and absolute URLs fall back to `window.location.origin`; the sitemap script falls back to `https://example.com`. Set it before building for production.

`VITE_GA_MEASUREMENT_ID` enables Google Analytics 4 through the consent manager in `src/components/CookieConsent.tsx` and `src/lib/analytics.ts`. `VITE_GA_CONSENT_MODE` defaults to `advanced`, which loads gtag with Consent Mode v2 defaults set to denied; set it to `basic` if no Google request should be made before consent.

## Architecture

Single-page React 18 + TypeScript + Vite app. Two locales: `ru` (default) and `hy`. No backend — the lead forms are UI-only and explicitly waiting for a CRM/Telegram/email integration.

### Routing & locale

- Active routes are `/:locale` and `/:locale/politika-konfidentsialnosti` (`src/router.tsx`). `/` redirects to `/ru`. Unknown locale child routes fall through to the locale home.
- `LocaleLayout` (`src/layout/LocaleLayout.tsx`) guards the locale param: if it isn't in `supportedLocales`, the path is rewritten so the first segment becomes `defaultLocale` and the rest of the path is preserved.
- The public site is intentionally one-page. Do not reintroduce top navigation pages for services/about/contacts unless the product direction changes.
- Use the helpers in `src/lib/locale.ts` (`pagePath`, `localePath`, `rewriteLocaleInPath`) rather than building locale-prefixed URLs by hand.
- `usePageLocale()` (`src/hooks/usePageLocale.ts`) is the standard way for a page component to read the current locale.

### Content model

`src/content/site.ts` contains shared localized text and the privacy page metadata. The visible one-page content currently lives mostly in `HomePage`, `HomeServiceWall`, and `HomeTrustSection`. The `t(locale, value)` helper resolves a `LocalizedText` object to a string — prefer it over inline `value[locale]` access.

### SEO

Every page renders `<Seo>` (`src/components/Seo.tsx`) inside a `HelmetProvider` (set up in `src/main.tsx`). It emits canonical, `hreflang` for all locales + `x-default`, OpenGraph, Twitter, and inlines any JSON-LD schemas passed via `structuredData`. Schema builders live in `src/lib/seo.ts` (`createBreadcrumbSchema`, `createOrganizationSchema`, `createLocalBusinessSchema`, `createServiceSchema`, `createFaqSchema`).

### Path alias

`@/` maps to the repo root in both `tsconfig.json` and `vite.config.mts`. Imports therefore look like `@/src/content/site`, not `@/content/site`.

### Styling

Tailwind is configured (`tailwind.config.js`, `postcss.config.js`) but the bulk of the design system lives in `src/styles.old.css` (~280KB), imported at the top of `src/index.css`. New styles can use Tailwind utilities; existing components rely heavily on the legacy class names defined in `styles.old.css` (`page-shell`, `page-main`, etc.).

### `blueprint/` and `docs/`

Per `README.md`: `docs/implementation-blueprint.md` and `blueprint/` describe target/future direction and are **not** an accurate description of the current Vite implementation. Treat `src/` as authoritative; consult those folders only when the user explicitly references them.
