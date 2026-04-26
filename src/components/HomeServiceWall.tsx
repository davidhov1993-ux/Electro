import { NavLink } from "react-router-dom";

import { servicePath } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

const wallItems = [
  { slug: "avariinyi-elektrik",             label: { ru: "Аварийный выезд",      hy: "Արտակարգ մեկնում" } },
  { slug: "elektromontazh",                 label: { ru: "Электромонтаж",        hy: "Էլեկտրամոնտաժ" } },
  { slug: "elektroshchity-i-avtomatika",    label: { ru: "Щиты и автоматика",    hy: "Վահաններ" } },
  { slug: "osveshchenie",                   label: { ru: "Освещение",            hy: "Լուսավորություն" } },
  { slug: "videonablyudenie",               label: { ru: "Видеонаблюдение",      hy: "Տեսահսկում" } },
  { slug: "elektrozamki-i-kontrol-dostupa", label: { ru: "Замки и домофоны",     hy: "Կողպեքներ և դոմոֆոններ" } },
  { slug: "slabotochnye-sistemy",           label: { ru: "Слаботочка",           hy: "Թույլ հոսանք" } },
  { slug: "teplyi-pol",                     label: { ru: "Тёплый пол",           hy: "Տաք հատակ" } },
  { slug: "umnyi-dom-i-umnaya-tekhnika",    label: { ru: "Умный дом",            hy: "Խելացի տուն" } },
] as const;

const content = {
  ru: {
    attention: "ВЫЗОВ",
    attentionHint: "Звонок и выезд по Еревану",
    title: "Нужен электрик?",
    subtitle: "Опишите задачу — посчитаем и приедем.",
    triggerLabel: "Звонок без скрытых платежей",
    phone: "+374 99 586 469",
    phoneLabel: "Позвонить",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Услуги электрика в Ереване",
    servicesLabel: "Чем занимаемся",
  },
  hy: {
    attention: "ԿԱՆՉ",
    attentionHint: "Զանգ և մեկնում Երևանում",
    title: "Պետք է էլեկտրիկ։",
    subtitle: "Նկարագրեք խնդիրը՝ կհաշվարկենք և կգանք։",
    triggerLabel: "Զանգ՝ առանց թաքնված վճարների",
    phone: "+374 99 586 469",
    phoneLabel: "Զանգահարել",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Էլեկտրիկի ծառայություններ Երևանում",
    servicesLabel: "Ինչով ենք զբաղվում",
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
              <span className="home-service-wall__title-line">{c.title}</span>
              <span className="block">{c.subtitle}</span>
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
          {wallItems.map((item) => (
            <NavLink
              key={item.slug}
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
