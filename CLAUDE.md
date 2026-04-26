# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on `0.0.0.0:4157`.
- `npm run build` — generates `public/sitemap.xml` + `public/robots.txt`, runs `tsc -b`, then `vite build`. The TypeScript step is real type-checking — there is no separate lint/test setup.
- `npm run build:pages` — same as `build`, but with `--base=/Electro/` for GitHub Pages deploys.
- `npm run preview` — serves the built `dist/`.

There is no test runner, ESLint, or Prettier configured. Type errors from `tsc -b` are the only automated check.

## Environment

`VITE_SITE_URL` (e.g. `https://example.com`) is read both at runtime (for canonical URLs / OG / hreflang in `src/lib/seo.ts` and `src/components/Seo.tsx`) and at build time by `scripts/generate-sitemap.mjs`. Without it, `siteUrl` is `null` at runtime and absolute URLs fall back to `window.location.origin`; the sitemap script falls back to `https://example.com`. Set it before building for production.

## Architecture

Single-page React 18 + TypeScript + Vite app. Two locales: `ru` (default) and `hy`. No backend — the lead form in `src/components/LeadForm.tsx` / `QuickLeadForm.tsx` is UI-only and explicitly waiting for a CRM/Telegram/email integration (see `uiCopy.formHint` in `src/content/site.ts`).

### Routing & locale

- All routes live under `/:locale/...` (`src/router.tsx`). `/` redirects to `/ru`. Unknown top-level segments fall through to `*` and redirect to the default-locale home.
- `LocaleLayout` (`src/layout/LocaleLayout.tsx`) guards the locale param: if it isn't in `supportedLocales`, the path is rewritten so the first segment becomes `defaultLocale` and the rest of the path is preserved.
- Page slugs are Russian-transliterated and shared across both locales (`commonSlugs` in `src/content/site.ts`: `uslugi`, `o-kompanii`, `pochemu-vybirayut-nas`, `sertifikaty`, `kontakty`, `zayavka`). When adding a new page, add it to `commonSlugs` and to `scripts/generate-sitemap.mjs`'s `staticPages` array — the sitemap is generated from a hardcoded list, not from the router.
- Use the helpers in `src/lib/locale.ts` (`pagePath`, `servicePath`, `localePath`, `rewriteLocaleInPath`) rather than building locale-prefixed URLs by hand.
- `usePageLocale()` (`src/hooks/usePageLocale.ts`) is the standard way for a page component to read the current locale.

### Content model

`src/content/site.ts` is the single source of truth for site copy and the service catalog. It exports localized text (`LocalizedText = Record<Locale, string>`), nav/UI strings, page panels, and the full `services: ServiceEntry[]` array typed by `src/types.ts`. The `t(locale, value)` helper resolves a `LocalizedText` object to a string — prefer it over inline `value[locale]` access.

Service slugs are a closed union (`ServiceSlug` in `src/types.ts`). To add a service: extend the `ServiceSlug` union, add the entry to `services`, add the slug to `scripts/generate-sitemap.mjs`, and (if it needs a custom layout) wire a branch in `src/pages/ServiceDetailPage.tsx`.

`ServiceDetailPage` dispatches to bespoke per-service components (`EmergencyServicePage`, `InstallationServicePage`, `LightingServicePage`, `VideoSurveillanceServicePage`) by slug — these are full custom layouts, not variants of a shared template. Services without a bespoke component render the generic detail template inline in `ServiceDetailPage`.

### SEO

Every page renders `<Seo>` (`src/components/Seo.tsx`) inside a `HelmetProvider` (set up in `src/main.tsx`). It emits canonical, `hreflang` for all locales + `x-default`, OpenGraph, Twitter, and inlines any JSON-LD schemas passed via `structuredData`. Schema builders live in `src/lib/seo.ts` (`createBreadcrumbSchema`, `createOrganizationSchema`, `createLocalBusinessSchema`, `createServiceSchema`, `createFaqSchema`).

### Path alias

`@/` maps to the repo root in both `tsconfig.json` and `vite.config.mts`. Imports therefore look like `@/src/content/site`, not `@/content/site`.

### Styling

Tailwind is configured (`tailwind.config.js`, `postcss.config.js`) but the bulk of the design system lives in `src/styles.old.css` (~280KB), imported at the top of `src/index.css`. New styles can use Tailwind utilities; existing components rely heavily on the legacy class names defined in `styles.old.css` (`page-shell`, `page-main`, etc.).

### `blueprint/` and `docs/`

Per `README.md`: `docs/implementation-blueprint.md` and `blueprint/` describe target/future direction and are **not** an accurate description of the current Vite implementation. Treat `src/` as authoritative; consult those folders only when the user explicitly references them.
