import {
  commonSlugs,
  defaultLocale,
  getService,
  getPublicServiceSlug,
  localeNames,
  navCopy,
  siteUrl,
  supportedLocales,
  t,
} from "@/src/content/site";
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

export function servicesAnchor(locale: Locale) {
  return `${localePath(locale)}#uslugi`;
}

export function trustAnchor(locale: Locale) {
  return `${localePath(locale)}#doverie`;
}

export function contactAnchor(locale: Locale) {
  return `${localePath(locale)}#svyaz`;
}

export function workAnchor(locale: Locale) {
  return `${localePath(locale)}#raboty`;
}

export function emergencyAnchor(locale: Locale) {
  return `${localePath(locale)}#avariinyi-vyezd`;
}

export function servicePath(locale: Locale, serviceSlug: string) {
  const publicSlug = getPublicServiceSlug(locale, serviceSlug);
  return publicSlug === serviceSlug
    ? `/${locale}/${commonSlugs.services}/${serviceSlug}`
    : `/${locale}/${publicSlug}`;
}

export function serviceLeadPath(locale: Locale, serviceSlug: string) {
  if (locale === "ru") {
    return serviceSlug === "avariinyi-elektrik" ? emergencyAnchor(locale) : workAnchor(locale);
  }

  return servicePath(locale, serviceSlug);
}

export function serviceAlternatePaths(serviceSlug: string) {
  return supportedLocales.reduce(
    (paths, locale) => {
      paths[locale] = servicePath(locale, serviceSlug);
      return paths;
    },
    {} as Record<Locale, string>,
  );
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
    const serviceFromCollection = segments[1] === commonSlugs.services && segments[2]
      ? getService(segments[2])
      : undefined;
    const serviceFromTopLevel = segments.length === 2 ? getService(segments[1]) : undefined;

    if (serviceFromCollection) {
      return `${servicePath(nextLocale, serviceFromCollection.slug)}${search}${hash}`;
    }

    if (serviceFromTopLevel) {
      return `${servicePath(nextLocale, serviceFromTopLevel.slug)}${search}${hash}`;
    }

    segments[0] = nextLocale;
    return `/${segments.join("/")}${search}${hash}`;
  }

  return `/${nextLocale}/${segments.join("/")}${search}${hash}`;
}

export function navigationLinks(locale: Locale) {
  return [
    { label: t(locale, navCopy.home), to: localePath(locale), end: true, hash: "" },
    { label: t(locale, navCopy.services), to: servicesAnchor(locale), end: true },
    { label: t(locale, navCopy.about), to: locale === "ru" ? trustAnchor(locale) : pagePath(locale, "about"), end: true },
    { label: t(locale, navCopy.contacts), to: locale === "ru" ? contactAnchor(locale) : pagePath(locale, "contacts"), end: true },
  ];
}
