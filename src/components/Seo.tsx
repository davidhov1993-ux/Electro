import { Helmet } from "react-helmet-async";

import { brandName, defaultLocale, supportedLocales } from "@/src/content/site";
import { absoluteUrl, rewriteLocaleInPath } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

interface SeoProps {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  structuredData?: Array<Record<string, unknown>>;
  noIndex?: boolean;
}

export function Seo({ locale, title, description, path, structuredData = [], noIndex = false }: SeoProps) {
  const siteName = brandName.ru;
  const canonical = path ? absoluteUrl(path) : undefined;
  const alternateUrls = path
    ? supportedLocales.map((item) => ({
        hrefLang: item,
        href: absoluteUrl(rewriteLocaleInPath(path, item)),
      }))
    : [];

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {alternateUrls.map((item) => (
        <link key={item.hrefLang} rel="alternate" hrefLang={item.hrefLang} href={item.href} />
      ))}
      {path ? <link rel="alternate" hrefLang="x-default" href={absoluteUrl(rewriteLocaleInPath(path, defaultLocale))} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale === "ru" ? "ru_RU" : "hy_AM"} />
      <meta name="twitter:card" content="summary_large_image" />
      {structuredData.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
