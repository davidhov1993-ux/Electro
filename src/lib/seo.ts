import {
  brandName,
  businessPhoneDisplay,
  businessPhoneMachine,
  businessTelegramUrl,
  businessViberUrl,
  businessWhatsappUrl,
  siteUrl,
  t,
} from "@/src/content/site";
import { absoluteUrl } from "@/src/lib/locale";
import type { Locale, LocalizedFaqItem, ServiceEntry } from "@/src/types";

type Schema = Record<string, unknown>;

interface BreadcrumbItem {
  name: string;
  path?: string;
}

const organizationId = `${siteUrl}#organization`;
const localBusinessId = `${siteUrl}#electrician`;
const webSiteId = `${siteUrl}#website`;

const serviceArea = {
  "@type": "City",
  name: "Yerevan",
  containedInPlace: {
    "@type": "Country",
    name: "Armenia",
  },
};

const yerevanGeo = {
  "@type": "GeoCoordinates",
  latitude: "40.1792",
  longitude: "44.5152",
};

const mainServices = {
  ru: [
    "Аварийный вызов электрика",
    "Электромонтаж",
    "Ремонт электрики",
    "Сборка электрощитов",
    "Освещение",
    "Видеонаблюдение",
    "Домофоны",
    "Слаботочные системы",
    "Тёплый пол",
  ],
  hy: [
    "Էլեկտրիկի վթարային կանչ",
    "Էլեկտրամոնտաժ",
    "Էլեկտրականության վերանորոգում",
    "Էլեկտրական վահանակների հավաքում",
    "Լուսավորություն",
    "Տեսահսկում",
    "Դոմոֆոններ",
    "Թույլ հոսանքներ",
    "Տաք հատակ",
  ],
} satisfies Record<Locale, string[]>;

const offerCatalog = {
  ru: [
    ["Установка розетки", "1500", "AMD"],
    ["Вызов электрика на дом", "10000", "AMD"],
    ["Срочный вызов электрика 24/7", "20000", "AMD"],
    ["Диагностика электрики", "10000", "AMD"],
    ["Монтаж электропроводки за точку", "5000", "AMD"],
    ["Прокладка кабеля за метр", "500", "AMD"],
    ["Установка и замена автоматов", "5000", "AMD"],
    ["Сборка электрощита", "30000", "AMD"],
  ],
  hy: [
    ["Վարդակի տեղադրում", "1500", "AMD"],
    ["Էլեկտրիկի կանչ տուն", "10000", "AMD"],
    ["Էլեկտրիկի շտապ կանչ 24/7", "20000", "AMD"],
    ["Էլեկտրականության ախտորոշում", "10000", "AMD"],
    ["Էլեկտրոմոնտաժային աշխատանքներ մեկ կետի համար", "5000", "AMD"],
    ["Մալուխների անցկացում մեկ մետրի համար", "500", "AMD"],
    ["Ավտոմատների տեղադրում և փոխարինում", "5000", "AMD"],
    ["Էլեկտրական վահանակի հավաքում", "30000", "AMD"],
  ],
} satisfies Record<Locale, Array<[string, string, string]>>;

function languageCode(locale: Locale) {
  return locale === "ru" ? "ru-AM" : "hy-AM";
}

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
    alternateName: [brandName.hy, "Elektrik Yerevan"],
    url: siteUrl,
    telephone: businessPhoneMachine,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: businessPhoneMachine,
        contactType: "customer service",
        areaServed: "AM",
        availableLanguage: ["ru", "hy"],
      },
    ],
    areaServed: serviceArea,
  };
}

export function createLocalBusinessSchema(locale: Locale): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": localBusinessId,
    name: "Electric Yerevan",
    alternateName: [t(locale, brandName), locale === "ru" ? "Электрик в Ереване" : "Էլեկտրիկ Երևանում"],
    description:
      locale === "ru"
        ? "Профессиональные услуги электрика в Ереване: срочный вызов 24/7, ремонт проводки, монтаж щитов, установка розеток и автоматов."
        : "Պրոֆեսիոնալ էլեկտրիկի ծառայություններ Երևանում՝ շտապ կանչ 24/7, լարանցում, վարդակների և ավտոմատների տեղադրում:",
    url: siteUrl,
    image: absoluteUrl(locale === "hy" ? "/media/hero-hy-bg-brand-yellow-poster.png" : "/media/hero-ru-bg-brand-yellow-poster.png"),
    telephone: businessPhoneMachine,
    priceRange: "AMD",
    currenciesAccepted: "AMD",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: serviceArea,
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ru" ? "Ереван" : "Երևան",
      addressCountry: "AM",
    },
    geo: yerevanGeo,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    availableLanguage: ["ru", "hy"],
    knowsLanguage: ["ru", "hy"],
    makesOffer: offerCatalog[locale].map(([name, price, currency]) => ({
      "@type": "Offer",
      name,
      price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      areaServed: serviceArea,
      url: absoluteUrl(`/${locale}/`),
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "ru" ? "Услуги электрика в Ереване" : "Էլեկտրիկի ծառայություններ Երևանում",
      itemListElement: mainServices[locale].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          areaServed: serviceArea,
          provider: {
            "@id": localBusinessId,
          },
        },
      })),
    },
    potentialAction: [
      {
        "@type": "ContactAction",
        name: locale === "ru" ? "Позвонить электрику" : "Զանգահարել էլեկտրիկին",
        target: `tel:${businessPhoneMachine}`,
      },
      {
        "@type": "CommunicateAction",
        name: "WhatsApp",
        target: businessWhatsappUrl,
      },
      {
        "@type": "CommunicateAction",
        name: "Telegram",
        target: businessTelegramUrl,
      },
      {
        "@type": "CommunicateAction",
        name: "Viber",
        target: businessViberUrl,
      },
    ],
  };
}

export function createWebSiteSchema(locale: Locale): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": webSiteId,
    name: t(locale, brandName),
    alternateName: locale === "ru" ? "Электрик в Ереване" : "Էլեկտրիկ Երևանում",
    url: siteUrl,
    inLanguage: languageCode(locale),
    publisher: {
      "@id": organizationId,
    },
  };
}

export function createHomePageSchema(locale: Locale): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(`/${locale}/`)}#webpage`,
    url: absoluteUrl(`/${locale}/`),
    name: locale === "ru" ? "Услуги электрика в Ереване" : "Էլեկտրիկի ծառայություններ Երևանում",
    description:
      locale === "ru"
        ? "Профессиональные услуги электрика в Ереване. Круглосуточный вызов мастера на дом 24/7. Ремонт проводки, монтаж щитов, установка розеток."
        : "Պրոֆեսիոնալ էլեկտրիկի ծառայություններ Երևանում: Էլեկտրիկի կանչ տուն 24/7, լարանցում, վարդակների և ավտոմատների տեղադրում:",
    inLanguage: languageCode(locale),
    isPartOf: {
      "@id": webSiteId,
    },
    about: {
      "@id": localBusinessId,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(locale === "hy" ? "/media/hero-hy-bg-brand-yellow-poster.png" : "/media/hero-ru-bg-brand-yellow-poster.png"),
    },
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
    areaServed: serviceArea,
    provider: {
      "@type": "Electrician",
      "@id": localBusinessId,
      name: t(locale, brandName),
      telephone: businessPhoneDisplay,
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
