import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const cwd = process.cwd();
const distDir = resolve(cwd, "dist");
const indexPath = resolve(distDir, "index.html");
const defaultSiteUrl = "https://electric-yerevan.am";
const siteUrl = readSiteUrl();
const imageByLocale = {
  ru: "/media/hero-ru-bg-brand-yellow-poster.png",
  hy: "/media/hero-hy-bg-brand-yellow-poster.png",
};
const phone = "+37499586469";
const whatsappUrl = "https://wa.me/37499586469";
const telegramUrl = readEnvValue("VITE_TELEGRAM_URL") || "https://t.me/electric_yerevan";
const viberUrl = readEnvValue("VITE_VIBER_URL") || "viber://chat?number=%2B37499586469";

const homeSeo = {
  ru: {
    title: "Услуги электрика в Ереване | Вызов электрика на дом круглосуточно",
    description:
      "Профессиональные услуги электрика в Ереване. Круглосуточный вызов мастера на дом 24/7. Ремонт проводки, монтаж щитов, установка розеток. Гарантия и доступные цены.",
    h1: "Услуги электрика в Ереване",
    serviceHeadings: ["Срочный вызов электрика 24/7", "Монтаж электропроводки", "Установка и замена автоматов"],
    serviceAreaTitle: "Зона обслуживания",
    serviceAreaBody:
      "Выезжаем во все административные районы Еревана: Кентрон, Арабкир, Нор-Норк, Малатия-Себастия, Ачапняк, Шенгавит, Канакер-Зейтун, Эребуни, Норк-Мараш, Аван, Давташен, Нубарашен.",
    priceHeaders: ["Услуга", "Цена"],
    prices: [
      ["Установка розетки", "от 1 500 AMD"],
      ["Вызов электрика на дом", "от 10 000 AMD"],
      ["Срочный вызов электрика 24/7", "от 20 000 AMD"],
      ["Диагностика электрики", "от 10 000 AMD"],
      ["Монтаж электропроводки", "от 5 000 AMD за точку"],
      ["Прокладка кабеля", "от 500 AMD/м.п."],
      ["Установка и замена автоматов", "от 5 000 AMD"],
      ["Сборка щита", "от 30 000 AMD"],
    ],
  },
  hy: {
    title: "Էլեկտրիկ Երևանում | Էլեկտրիկի ծառայություններ հայաստանում",
    description:
      "Պրոֆեսիոնալ էլեկտրիկի ծառայություններ Երևանում: Էլեկտրիկի կանչ տուն 24/7, լարանցում, վարդակների և ավտոմատների տեղադրում: Մատչելի գներ: Զանգահարեք:",
    h1: "Էլեկտրիկի ծառայություններ Երևանում",
    serviceHeadings: ["Էլեկտրիկի շտապ կանչ", "Էլեկտրոմոնտաժային աշխատանքներ", "Մալուխների անցկացում"],
    serviceAreaTitle: "Սպասարկման տարածքները",
    serviceAreaBody:
      "Աշխատում ենք Երևանի բոլոր վարչական շրջաններում՝ Կենտրոն, Արաբկիր, Նոր Նորք, Մալաթիա-Սեբաստիա, Աջափնյակ, Շենգավիթ, Քանաքեռ-Զեյթուն, Էրեբունի, Նորք-Մարաշ, Ավան, Դավթաշեն, Նուբարաշեն:",
    priceHeaders: ["Ծառայություն", "Արժեք"],
    prices: [
      ["Վարդակի տեղադրում", "սկսած 1 500 AMD-ից"],
      ["Էլեկտրիկի կանչ տուն", "սկսած 10 000 AMD-ից"],
      ["Էլեկտրիկի շտապ կանչ 24/7", "սկսած 20 000 AMD-ից"],
      ["Էլեկտրականության ախտորոշում", "սկսած 10 000 AMD-ից"],
      ["Էլեկտրոմոնտաժային աշխատանքներ", "սկսած 5 000 AMD-ից մեկ կետի համար"],
      ["Մալուխների անցկացում", "սկսած 500 AMD/մ.պ."],
      ["Ավտոմատների տեղադրում և փոխարինում", "սկսած 5 000 AMD-ից"],
      ["Վահանակի հավաքում", "սկսած 30 000 AMD"],
    ],
  },
};

const routes = [
  {
    path: "/",
    locale: "ru",
    title: homeSeo.ru.title,
    description: homeSeo.ru.description,
    canonical: "/",
    alternates: [
      ["ru-AM", "/ru/"],
      ["hy-AM", "/hy/"],
      ["x-default", "/"],
    ],
  },
  {
    path: "/ru",
    locale: "ru",
    title: homeSeo.ru.title,
    description: homeSeo.ru.description,
    canonical: "/ru/",
    alternates: [
      ["ru-AM", "/ru/"],
      ["hy-AM", "/hy/"],
      ["x-default", "/"],
    ],
  },
  {
    path: "/hy",
    locale: "hy",
    title: homeSeo.hy.title,
    description: homeSeo.hy.description,
    canonical: "/hy/",
    alternates: [
      ["ru-AM", "/ru/"],
      ["hy-AM", "/hy/"],
      ["x-default", "/"],
    ],
  },
  {
    path: "/ru/politika-konfidentsialnosti",
    locale: "ru",
    title: "Политика конфиденциальности и использования файлов cookie | Электрик",
    description: "Как сайт Электрик собирает, обрабатывает и защищает личные данные и использует cookies.",
    canonical: "/ru/politika-konfidentsialnosti/",
    alternates: [
      ["ru-AM", "/ru/politika-konfidentsialnosti/"],
      ["hy-AM", "/hy/politika-konfidentsialnosti/"],
      ["x-default", "/ru/politika-konfidentsialnosti/"],
    ],
  },
  {
    path: "/hy/politika-konfidentsialnosti",
    locale: "hy",
    title: "Գաղտնիության քաղաքականություն և Cookie ֆայլերի օգտագործման կանոններ | Էլեկտրիկ",
    description:
      "Ինչպես է Էլեկտրիկ կայքը հավաքում, մշակում և պաշտպանում անձնական տվյալները և օգտագործում cookie ֆայլերը։",
    canonical: "/hy/politika-konfidentsialnosti/",
    alternates: [
      ["ru-AM", "/ru/politika-konfidentsialnosti/"],
      ["hy-AM", "/hy/politika-konfidentsialnosti/"],
      ["x-default", "/ru/politika-konfidentsialnosti/"],
    ],
  },
];

if (!existsSync(indexPath)) {
  console.warn("dist/index.html not found; skipping static SEO enhancement.");
  process.exit(0);
}

const baseHtml = readFileSync(indexPath, "utf8");

for (const route of routes) {
  const html = enhanceHtml(baseHtml, route);
  const outputPath = route.path === "/" ? indexPath : resolve(distDir, route.path.slice(1), "index.html");

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, "utf8");
}

function readSiteUrl() {
  const configuredSiteUrl = readEnvValue("VITE_SITE_URL");
  if (configuredSiteUrl) {
    return cleanSiteUrl(configuredSiteUrl);
  }

  return cleanSiteUrl(defaultSiteUrl);
}

function readEnvValue(name) {
  for (const file of [".env.local", ".env"]) {
    try {
      const content = readFileSync(resolve(cwd, file), "utf8");
      const match = content.match(new RegExp(`^${name}=(.+)$`, "m"));
      if (match?.[1]) {
        return match[1].trim().replace(/^['"]|['"]$/g, "");
      }
    } catch {
      continue;
    }
  }

  return process.env[name]?.trim() || "";
}

function cleanSiteUrl(value) {
  return value.trim().replace(/^['"]|['"]$/g, "").replace(/\/$/, "");
}

function absolute(path) {
  return `${siteUrl}${path}`;
}

function enhanceHtml(html, route) {
  const image = absolute(imageByLocale[route.locale]);
  const canonical = absolute(route.canonical);
  const staticSeo = [
    "<!-- static-seo:start -->",
    `<title data-rh="true">${escapeHtml(route.title)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeHtml(route.description)}" />`,
    '<meta data-rh="true" name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />',
    '<meta data-rh="true" name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />',
    '<meta data-rh="true" name="theme-color" content="#fed400" />',
    `<link data-rh="true" rel="canonical" href="${canonical}" />`,
    ...route.alternates.map(([hreflang, href]) => `<link data-rh="true" rel="alternate" hreflang="${hreflang}" href="${absolute(href)}" />`),
    `<meta data-rh="true" property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta data-rh="true" property="og:url" content="${canonical}" />`,
    '<meta data-rh="true" property="og:type" content="website" />',
    '<meta data-rh="true" property="og:site_name" content="Электрик" />',
    `<meta data-rh="true" property="og:locale" content="${route.locale === "ru" ? "ru_RU" : "hy_AM"}" />`,
    `<meta data-rh="true" property="og:image" content="${image}" />`,
    `<meta data-rh="true" property="og:image:secure_url" content="${image}" />`,
    '<meta data-rh="true" name="twitter:card" content="summary_large_image" />',
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${image}" />`,
    `<script data-rh="true" type="application/ld+json">${JSON.stringify(createStaticSchema(route))}</script>`,
    "<!-- static-seo:end -->",
  ].join("\n    ");

  const withoutOldStatic = html.replace(/\n?\s*<!-- static-seo:start -->[\s\S]*?<!-- static-seo:end -->/g, "");
  const withoutHeadDuplicates = withoutOldStatic
    .replace(/<html\s+lang="[^"]*">/, `<html lang="${route.locale === "ru" ? "ru-AM" : "hy-AM"}">`)
    .replace(/\n?\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(/\n?\s*<meta\s+name="description"[\s\S]*?>/gi, "")
    .replace(/\n?\s*<meta\s+name="robots"[\s\S]*?>/gi, "")
    .replace(/\n?\s*<meta\s+name="googlebot"[\s\S]*?>/gi, "")
    .replace(/\n?\s*<meta\s+name="theme-color"[\s\S]*?>/gi, "")
    .replace(/\n?\s*<meta\s+name="format-detection"[\s\S]*?>/gi, "")
    .replace(/\n?\s*<meta\s+name="twitter:[^"]+"[\s\S]*?>/gi, "")
    .replace(/\n?\s*<meta\s+property="og:[^"]+"[\s\S]*?>/gi, "")
    .replace(/\n?\s*<link\s+rel="canonical"[\s\S]*?>/gi, "")
    .replace(/\n?\s*<link\s+rel="alternate"[\s\S]*?>/gi, "");

  const withStaticHead = withoutHeadDuplicates.replace("</head>", `    ${staticSeo}\n  </head>`);
  const staticFallback = createStaticFallback(route);

  if (!staticFallback) {
    return withStaticHead;
  }

  return withStaticHead.replace('<div id="root"></div>', `<div id="root">${staticFallback}</div>`);
}

function createStaticSchema(route) {
  if (route.path.includes("politika-konfidentsialnosti")) {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: route.title,
      url: absolute(route.canonical),
      inLanguage: route.locale === "ru" ? "ru-AM" : "hy-AM",
      isPartOf: {
        "@type": "WebSite",
        name: "Электрик",
        url: siteUrl,
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteUrl}#electrician`,
        name: "Electric Yerevan",
        alternateName: route.locale === "ru" ? ["Электрик", "Электрик в Ереване"] : ["Էլեկտրիկ", "Էլեկտրիկ Երևանում"],
        url: siteUrl,
        image: absolute(imageByLocale[route.locale]),
        telephone: phone,
        priceRange: "AMD",
        currenciesAccepted: "AMD",
        areaServed: {
          "@type": "City",
          name: "Yerevan",
          containedInPlace: {
            "@type": "Country",
            name: "Armenia",
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: route.locale === "ru" ? "Ереван" : "Երևան",
          addressCountry: "AM",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "40.1792",
          longitude: "44.5152",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        potentialAction: [
          {
            "@type": "ContactAction",
            name: route.locale === "ru" ? "Позвонить электрику" : "Զանգահարել էլեկտրիկին",
            target: `tel:${phone}`,
          },
          {
            "@type": "CommunicateAction",
            name: "WhatsApp",
            target: whatsappUrl,
          },
          {
            "@type": "CommunicateAction",
            name: "Telegram",
            target: telegramUrl,
          },
          {
            "@type": "CommunicateAction",
            name: "Viber",
            target: viberUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${absolute(route.canonical)}#webpage`,
        url: absolute(route.canonical),
        name: route.title,
        description: route.description,
        inLanguage: route.locale === "ru" ? "ru-AM" : "hy-AM",
        about: {
          "@id": `${siteUrl}#electrician`,
        },
      },
    ],
  };
}

function createStaticFallback(route) {
  if (route.path.includes("politika-konfidentsialnosti")) {
    return "";
  }

  const content = homeSeo[route.locale];
  const serviceHeadings = content.serviceHeadings
    .map((heading) => `<h3>${escapeHtml(heading)}</h3>`)
    .join("");
  const priceRows = content.prices
    .map(([label, value]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`)
    .join("");

  return `<noscript data-static-content="true">
      <main>
        <section>
          <h1>${escapeHtml(content.h1)}</h1>
          <h2>${escapeHtml(content.serviceHeadings[0])}</h2>
          ${serviceHeadings}
        </section>
        <section>
          <h2>${escapeHtml(content.serviceAreaTitle)}</h2>
          <p>${escapeHtml(content.serviceAreaBody)}</p>
        </section>
        <section>
          <h2>${escapeHtml(route.locale === "ru" ? "Цены на услуги электрика" : "Էլեկտրիկի ծառայությունների գներ")}</h2>
          <table>
            <thead>
              <tr><th scope="col">${escapeHtml(content.priceHeaders[0])}</th><th scope="col">${escapeHtml(content.priceHeaders[1])}</th></tr>
            </thead>
            <tbody>${priceRows}</tbody>
          </table>
        </section>
        <section>
          <h2>${escapeHtml(route.locale === "ru" ? "Контакты" : "Կապ")}</h2>
          <p><a href="tel:${phone}">${phone}</a></p>
          <p><a href="${whatsappUrl}">WhatsApp</a> <a href="${telegramUrl}">Telegram</a> <a href="${viberUrl}">Viber</a></p>
        </section>
      </main>
    </noscript>`;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
