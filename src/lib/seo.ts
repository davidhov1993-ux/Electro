import { brandName, siteUrl, t } from "@/src/content/site";
import { absoluteUrl } from "@/src/lib/locale";
import type { Locale, LocalizedFaqItem, ServiceEntry } from "@/src/types";

type Schema = Record<string, unknown>;

interface BreadcrumbItem {
  name: string;
  path?: string;
}

const organizationId = `${siteUrl ?? "https://example.com"}#organization`;
const localBusinessId = `${siteUrl ?? "https://example.com"}#local-business`;

export function createBreadcrumbSchema(items: BreadcrumbItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };
}

export function createOrganizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: brandName.ru,
    url: siteUrl ?? undefined,
    areaServed: "Yerevan",
  };
}

export function createLocalBusinessSchema(locale: Locale): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": localBusinessId,
    name: t(locale, brandName),
    url: siteUrl ?? undefined,
    areaServed: "Yerevan",
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ru" ? "Ереван" : "Երևան",
      addressCountry: "AM",
    },
    openingHours: "Mo-Sa 10:00-22:00",
  };
}

export function createServiceSchema(locale: Locale, service: ServiceEntry, path: string): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: t(locale, service.title),
    name: t(locale, service.title),
    description: t(locale, service.summary),
    url: absoluteUrl(path),
    areaServed: "Yerevan",
    provider: {
      "@type": "Organization",
      "@id": organizationId,
      name: t(locale, brandName),
    },
  };
}

export function createFaqSchema(locale: Locale, faq: LocalizedFaqItem[]): Schema | null {
  if (faq.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: t(locale, item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(locale, item.answer),
      },
    })),
  };
}
