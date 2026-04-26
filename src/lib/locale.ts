import { commonSlugs, defaultLocale, localeNames, navCopy, siteUrl, supportedLocales, t } from "@/src/content/site";
import type { Locale } from "@/src/types";

export function isLocale(value?: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function normalizeLocale(value?: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function localePath(locale: Locale, suffix = "") {
  return `/${locale}${suffix}`;
}

export function pagePath(locale: Locale, slug: keyof typeof commonSlugs) {
  return `/${locale}/${commonSlugs[slug]}`;
}

export function servicePath(locale: Locale, serviceSlug: string) {
  return `/${locale}/${commonSlugs.services}/${serviceSlug}`;
}

export function absoluteUrl(path: string) {
  const origin =
    siteUrl ??
    (typeof window !== "undefined" ? window.location.origin.replace(/\/$/, "") : "");

  return origin ? `${origin}${path}` : path;
}

export function localeSwitchItems(currentPath: string) {
  return supportedLocales.map((locale) => ({
    locale,
    label: localeNames[locale],
    to: rewriteLocaleInPath(currentPath, locale),
  }));
}

export function rewriteLocaleInPath(pathname: string, nextLocale: Locale) {
  const hashIndex = pathname.indexOf("#");
  const hash = hashIndex >= 0 ? pathname.slice(hashIndex) : "";
  const pathWithSearch = hashIndex >= 0 ? pathname.slice(0, hashIndex) : pathname;
  const searchIndex = pathWithSearch.indexOf("?");
  const search = searchIndex >= 0 ? pathWithSearch.slice(searchIndex) : "";
  const cleanPath = searchIndex >= 0 ? pathWithSearch.slice(0, searchIndex) : pathWithSearch;
  const segments = cleanPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}${search}${hash}`;
  }

  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}${search}${hash}`;
  }

  return `/${nextLocale}/${segments.join("/")}${search}${hash}`;
}

export function navigationLinks(locale: Locale) {
  return [
    { label: t(locale, navCopy.home), to: localePath(locale), end: true, hash: "" },
    { label: t(locale, navCopy.services), to: pagePath(locale, "services"), end: false },
    { label: t(locale, navCopy.about), to: pagePath(locale, "about"), end: false },
    { label: t(locale, navCopy.contacts), to: pagePath(locale, "contacts"), end: false },
  ];
}
