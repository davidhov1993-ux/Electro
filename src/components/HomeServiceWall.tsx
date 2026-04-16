import { NavLink } from "react-router-dom";

import { servicePath } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

const seoWallItems = [
  { slug: "avariinyi-elektrik",             label: { ru: "Аварийный электрик",   hy: "Ававарийин электрик" } },
  { slug: "elektromontazh",                 label: { ru: "Электромонтаж",        hy: "Электромонтаж" } },
  { slug: "elektroshchity-i-avtomatika",    label: { ru: "Электрощиты",          hy: "Электращиты" } },
  { slug: "osveshchenie",                   label: { ru: "Освещение",            hy: "Освещение" } },
  { slug: "videonablyudenie",               label: { ru: "Видеонаблюдение",      hy: "Видеонаблюдение" } },
  { slug: "slabotochnye-sistemy",           label: { ru: "Слаботочные системы",  hy: "Слаботочные системы" } },
  { slug: "elektrozamki-i-kontrol-dostupa", label: { ru: "Электрозамки",         hy: "Электрозамки" } },
  { slug: "elektrozamki-i-kontrol-dostupa", label: { ru: "Контроль доступа",     hy: "Контроль доступа" } },
  { slug: "teplyi-pol",                     label: { ru: "Тёплый пол",           hy: "Тёплый пол" } },
  { slug: "umnyi-dom-i-umnaya-tekhnika",    label: { ru: "Умный дом",            hy: "Умный дом" } },
  { slug: "umnyi-dom-i-umnaya-tekhnika",    label: { ru: "Автоматизация",        hy: "Автоматизация" } },
  { slug: "elektromontazh",                 label: { ru: "Замена проводки",      hy: "Замена проводки" } },
  { slug: "elektromontazh",                 label: { ru: "Разводка электрики",   hy: "Разводка электрики" } },
  { slug: "elektromontazh",                 label: { ru: "Ремонт проводки",      hy: "Ремонт проводки" } },
  { slug: "elektromontazh",                 label: { ru: "Розетки и выключатели",hy: "Розетки и выключатели" } },
  { slug: "elektromontazh",                 label: { ru: "Проектирование",       hy: "Проектирование" } },
  { slug: "avariinyi-elektrik",             label: { ru: "Диагностика",          hy: "Диагностика" } },
  { slug: "elektromontazh",                 label: { ru: "Заземление",           hy: "Заземление" } },
] as const;

const content = {
  ru: {
    attention: "ВНИМАНИЕ",
    attentionHint: "Оперативная связь и выезд",
    titleLineOne: "НУЖНО РЕШИТЬ",
    titleAccent: "ВОПРОС",
    titleTail: "С ЭЛЕКТРИКОЙ?",
    triggerLabel: "Для бесплатной консультации — звоните",
    phone: "+374 99 586 469",
    phoneLabel: "Позвонить",
    whatsappLabel: "WhatsApp",
    sectionLabel: "SEO блок с услугами электрика в Ереване",
    servicesLabel: "Ключевые направления",
  },
  hy: {
    attention: "ՈՒՇАДРУТЮН",
    attentionHint: "Штап кап у мeкнум",
    titleLineOne: "ПЕТК Э ЛУЦЕЛ",
    titleAccent: "ХАРЦЭ",
    titleTail: "ЭЛЕКТРИКАЙИ?",
    triggerLabel: "★ АНВЧАР ХОРHУРДАТВУТЮН",
    phone: "+374 99 586 469",
    phoneLabel: "Зангахарел",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Электрики SEO хатвац Еревaнум",
    servicesLabel: "Бoлор угhутюннерe",
  },
} as const;

export function HomeServiceWall({ locale }: { locale: Locale }) {
  const c = content[locale];
  const phoneHref = "tel:+37499586469";
  const whatsappHref = "https://wa.me/37499586469";

  return (
    <section aria-label={c.sectionLabel} className="home-service-wall">
      <div className="home-service-wall__card">
        <div aria-hidden="true" className="home-service-wall__hazard home-service-wall__hazard--top" />

        <div className="home-service-wall__card-inner">
          <div className="home-service-wall__main">
            <div className="warning-header">
              <div className="warning-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a0a0a" aria-hidden="true">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-8h-2v6h2v-6z" />
                </svg>
                <span>{c.attention}</span>
              </div>
              <span className="warning-subtitle">{c.attentionHint}</span>
            </div>

            <h2 className="home-service-wall__title">
              <span className="home-service-wall__title-line">
                {c.titleLineOne} {c.titleAccent}
              </span>
              <span className="block">{c.titleTail}</span>
            </h2>

            <div className="cta-block">
              <div className="cta-left">
                <span className="cta-label">{c.triggerLabel}</span>
                <a href={phoneHref} className="cta-phone">{c.phone}</a>
              </div>
              <div className="cta-right">
                <a href={phoneHref} className="btn-primary" aria-label={c.phoneLabel}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a" aria-hidden="true">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  {c.phoneLabel}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  {c.whatsappLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="home-service-wall__hazard home-service-wall__hazard--bottom" />
      </div>

      <div className="home-service-wall__services">
        <p className="home-service-wall__services-label">{c.servicesLabel}</p>
        <div className="home-service-wall__services-grid">
          {seoWallItems.map((item, index) => (
            <NavLink
              key={`${locale}-${item.label.ru}`}
              to={servicePath(locale, item.slug)}
              className={`home-service-wall__service-tag${index === 0 ? " home-service-wall__service-tag--active" : ""}`}
            >
              {item.label[locale]}
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
