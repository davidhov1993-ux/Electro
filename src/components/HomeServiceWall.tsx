import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";

import {
  AccessMotionIcon,
  CameraMotionIcon,
  FloorHeatMotionIcon,
  InternetLowVoltageIcon,
  LightBulbIcon,
  PanelMotionIcon,
  ServiceVanIcon,
  SmartHomeMotionIcon,
  WiringMotionIcon,
} from "@/src/components/icons";
import { services, t } from "@/src/content/site";
import { servicePath } from "@/src/lib/locale";
import type { Locale, ServiceSlug } from "@/src/types";

type IconComponent = ComponentType<{ className?: string; title?: string }>;

const serviceIcons: Partial<Record<ServiceSlug, IconComponent>> = {
  elektromontazh: WiringMotionIcon,
  "elektroshchity-i-avtomatika": PanelMotionIcon,
  osveshchenie: LightBulbIcon,
  videonablyudenie: CameraMotionIcon,
  "elektrozamki-i-kontrol-dostupa": AccessMotionIcon,
  "umnyi-dom-i-umnaya-tekhnika": SmartHomeMotionIcon,
  "teplyi-pol": FloorHeatMotionIcon,
  "slabotochnye-sistemy": InternetLowVoltageIcon,
  "avariinyi-elektrik": ServiceVanIcon,
};

const primaryServiceSlug: ServiceSlug = "avariinyi-elektrik";
const catalogServices = [
  ...services.filter((service) => service.slug === primaryServiceSlug),
  ...services.filter((service) => service.slug !== primaryServiceSlug),
];

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
    eyebrow: "Услуги",
    eyebrowHint: "Электрик в Ереване",
    heading: "Что мы делаем",
    subtitle: "Электромонтаж, щиты, освещение, слаботочка, видеонаблюдение, тёплый пол и аварийный выезд.",
    servicesLabel: "Направления",
    primaryLabel: "Срочный выезд",
    more: "Подробнее",
  },
  hy: {
    attention: "ՈՒՇԱԴՐՈՒԹՅՈՒՆ",
    attentionHint: "Արագ կապ և մեկնում",
    titleLineOne: "ՊԵՏՔ Է ԼՈՒԾԵԼ",
    titleAccent: "ՀԱՐՑ",
    titleTail: "ԷԼԵԿՏՐԻԿԱՅԻ՞",
    triggerLabel: "Անվճար խորհրդատվության համար զանգահարեք",
    phone: "+374 99 586 469",
    phoneLabel: "Զանգահարել",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Էլեկտրիկի SEO բլոկ Երևանում",
    eyebrow: "Ծառայություններ",
    eyebrowHint: "Էլեկտրիկ Երևանում",
    heading: "Ինչ ենք անում",
    subtitle: "Էլեկտրամոնտաժ, վահաններ, լուսավորություն, թույլ հոսանք, տեսահսկում, տաք հատակ և արտակարգ մեկնում։",
    servicesLabel: "Ուղղություններ",
    primaryLabel: "Շտապ մեկնում",
    more: "Մանրամասն",
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
              <span className="home-service-wall__title-line">{c.titleLineOne}</span>
              <span className="block">
                {c.titleAccent} {c.titleTail}
              </span>
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

      <div id="uslugi" className="home-service-wall__catalog">
        <div className="home-service-wall__catalog-head">
          <div className="home-service-wall__catalog-kicker">
            <svg className="home-service-wall__catalog-icon" viewBox="0 0 24 24" fill="#ffd500" aria-hidden="true">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-8h-2v6h2v-6z" />
            </svg>
            <span className="home-service-wall__catalog-eyebrow">
              {c.eyebrow}
            </span>
            <span className="home-service-wall__catalog-hint">
              · {c.eyebrowHint}
            </span>
          </div>

          <h2 className="home-service-wall__catalog-title">
            {c.heading}
          </h2>
          <p className="home-service-wall__catalog-subtitle">{c.subtitle}</p>
        </div>

        <p className="home-service-wall__catalog-label">
          {c.servicesLabel}
        </p>

        <ul className="home-service-wall__catalog-grid">
          {catalogServices.map((service) => {
            const Icon = serviceIcons[service.slug];
            const isPrimary = service.slug === primaryServiceSlug;
            return (
              <li
                key={service.slug}
                className={`home-service-wall__catalog-cell${isPrimary ? " home-service-wall__catalog-cell--primary" : ""}`}
              >
                <NavLink
                  to={servicePath(locale, service.slug)}
                  className={`home-service-wall__catalog-card electro-icon-trigger${isPrimary ? " home-service-wall__catalog-card--primary" : ""}`}
                >
                  <div className="home-service-wall__catalog-card-head">
                    <div className="home-service-wall__catalog-title-stack">
                      {isPrimary ? (
                        <span className="home-service-wall__catalog-card-badge">
                          {c.primaryLabel}
                        </span>
                      ) : null}
                      <h3 className="home-service-wall__catalog-card-title">
                        {t(locale, service.title)}
                      </h3>
                    </div>
                    <span aria-hidden="true" className="home-service-wall__catalog-arrow">
                      →
                    </span>
                  </div>
                  <p className="home-service-wall__catalog-card-text">
                    {t(locale, service.tagline)}
                  </p>
                  {Icon ? (
                    <span aria-hidden="true" className="home-service-wall__catalog-card-icon">
                      <Icon />
                    </span>
                  ) : null}
                  <span className="home-service-wall__catalog-more">
                    {c.more}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
