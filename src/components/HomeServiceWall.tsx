import { NavLink } from "react-router-dom";

import { servicePath } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

const seoWallItems = [
  { slug: "avariinyi-elektrik",             label: { ru: "Аварийный электрик",   hy: "Արտակարգ էլեկտրիկ" } },
  { slug: "elektromontazh",                 label: { ru: "Электромонтаж",        hy: "Էլեկտրամոնտաժ" } },
  { slug: "osveshchenie",                   label: { ru: "Освещение",            hy: "Լուսավորություն" } },
  { slug: "videonablyudenie",               label: { ru: "Видеонаблюдение",      hy: "Տեսահսկում" } },
  { slug: "slabotochnye-sistemy",           label: { ru: "Слаботочные системы",  hy: "Թույլ հոսանքային համակարգեր" } },
  { slug: "elektrozamki-i-kontrol-dostupa", label: { ru: "Безопасность",         hy: "Անվտանգություն" } },
  { slug: "teplyi-pol",                     label: { ru: "Тёплый пол",           hy: "Տաք հատակ" } },
  { slug: "umnyi-dom-i-umnaya-tekhnika",    label: { ru: "Автоматизация",        hy: "Ավտոմատացում" } },
  { slug: "elektromontazh",                 label: { ru: "Ремонт",               hy: "Վերանորոգում" } },
  { slug: "avariinyi-elektrik",             label: { ru: "Диагностика",          hy: "Ախտորոշում" } },
  { slug: "slozhnye-proekty-pod-klyuch",    label: { ru: "Проектирование",       hy: "Նախագծում" } },
  { slug: "umnyi-dom-i-umnaya-tekhnika",    label: { ru: "Умный дом",            hy: "Խելացի տուն" } },
  { slug: "slozhnye-proekty-pod-klyuch",    label: { ru: "Солнечные панели",     hy: "Արևային պանելներ" } },
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
    attention: "ՈՒՇԱԴՐՈՒԹՅՈՒՆ",
    attentionHint: "Արագ կապ և մեկնում",
    titleLineOne: "ՊԵՏՔ Է ԼՈՒԾԵԼ",
    titleAccent: "ՀԱՐՑԸ",
    titleTail: "ԷԼԵԿՏՐԻԿԱՅԻ՞",
    triggerLabel: "Անվճար խորհրդատվության համար զանգահարեք",
    phone: "+374 99 586 469",
    phoneLabel: "Զանգահարել",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Էլեկտրիկի SEO բլոկ Երևանում",
    servicesLabel: "Հիմնական ուղղություններ",
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
          {seoWallItems.map((item) => (
            <NavLink
              key={`${locale}-${item.label.ru}`}
              to={servicePath(locale, item.slug)}
              className="home-service-wall__service-tag"
            >
              {item.label[locale]}
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
