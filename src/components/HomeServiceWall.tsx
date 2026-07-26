import {
  businessPhoneDisplay,
  businessPhoneMachine,
  businessWhatsappUrl,
} from "@/src/content/site";
import type { Locale } from "@/src/types";

interface SummaryBlock {
  title: string;
  items: string[];
}

interface SummaryStripItem {
  label: string;
  value: string;
}

interface SectionCopy {
  attention: string;
  attentionHint: string;
  titleLines: string[];
  triggerLabel: string;
  phone: string;
  phoneLabel: string;
  whatsappLabel: string;
  sectionLabel: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  blocks: SummaryBlock[];
  note: string;
  strip: SummaryStripItem[];
  ctaTitle: string;
  ctaText: string;
}

const content: Record<Locale, SectionCopy> = {
  ru: {
    attention: "ВНИМАНИЕ",
    attentionHint: "Оперативная связь и выезд",
    titleLines: ["НУЖНО РЕШИТЬ", "ВОПРОС С ЭЛЕКТРИКОЙ?"],
    triggerLabel: "Для бесплатной консультации — звоните",
    phone: "+374 99 586 469",
    phoneLabel: "Позвонить",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Вызов электрика и электромонтаж в Ереване",
    eyebrow: "С чем можно обратиться",
    heading: "Срочный вызов электрика 24/7",
    subtitle:
      "Пропал свет, выбивает автомат, нужен монтаж или нужно переделать после других — звоните. Сразу скажем, можем ли помочь.",
    blocks: [
      {
        title: "Срочный вызов электрика 24/7",
        items: [
          "пропал свет",
          "выбивает автомат",
          "искрит розетка или щит",
          "нужен срочный выезд",
        ],
      },
      {
        title: "Монтаж электропроводки",
        items: [
          "новая проводка и замена старой",
          "прокладка кабеля по группам",
          "розетки, выключатели и освещение",
          "квартиры, дома, офисы, магазины",
        ],
      },
      {
        title: "Установка и замена автоматов",
        items: [
          "сборка щитов и защита техники",
          "замена автоматов и УЗО",
          "реле напряжения и защита линий",
          "диагностика щита и нагрузки",
        ],
      },
    ],
    note: "Щиты, свет, камеры, домофоны, интернет и тёплый пол — это тоже к нам.",
    strip: [
      { label: "24/7", value: "аварийные вызовы" },
      { label: "30–60 минут", value: "выезд по городу" },
      { label: "цена заранее", value: "до начала работ" },
    ],
    ctaTitle: "Можно просто позвонить и коротко объяснить, что случилось.",
    ctaText: "Если ответ можно дать сразу, скажем сразу. Если нужен осмотр, предупредим до выезда.",
  },
  hy: {
    attention: "ՈՒՇԱԴՐՈՒԹՅՈՒՆ",
    attentionHint: "Օպերատիվ կապ և արագ այցելություն",
    titleLines: ["ԷԼԵԿՏՐԱԿԱՆՈՒԹՅԱՆ", "ՀԵՏ ԿԱՊՎԱԾ", "ԽՆԴԻՐ ՈՒՆԵ՞Ք"],
    triggerLabel: "Անվճար խորհրդատվության համար զանգահարեք՝",
    phone: "+374 99 586 469",
    phoneLabel: "Զանգահարել",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Վթարային կանչեր, էլեկտրիկի այց և մոնտաժ",
    eyebrow: "Ինչպիսի՞ հարցերով կարող եք դիմել",
    heading: "Էլեկտրիկի շտապ կանչ",
    subtitle:
      "Լույսն անջատվե՞լ է, ավտոմատը գցո՞ւմ է, մոնտաժի կամ ուրիշների թերի աշխատանքը վերանորոգելու կարի՞ք կա. զանգահարեք: Մենք անմիջապես կասենք՝ կարող ենք օգնել, թե ոչ:",
    blocks: [
      {
        title: "Էլեկտրիկի շտապ կանչ",
        items: [
          "Լույսը հանգել է (հոսանք չկա)",
          "Ավտոմատը գցում է",
          "Վարդակից կամ վահանակից կայծեր են թռչում",
          "Անհրաժեշտ է շտապ այց",
        ],
      },
      {
        title: "Էլեկտրոմոնտաժային աշխատանքներ",
        items: [
          "Նոր լարանցում (պրովոդկա) և հնի փոխարինում",
          "Վարդակներ, անջատիչներ և լուսավորություն",
          "Բնակարաններ, առանձնատներ, գրասենյակներ, խանութներ",
          "Մասնակի և ամբողջական մոնտաժ",
        ],
      },
      {
        title: "Մալուխների անցկացում",
        items: [
          "Մալուխների անցկացում ըստ խմբերի",
          "Վահանակների հավաքում և տեխնիկայի պաշտպանություն",
          "Ավտոմատների, ՈւԶՕ-ի և ռելեների տեղադրում",
          "Ախտորոշում և ծանրաբեռնվածության ստուգում",
        ],
      },
    ],
    note:
      "Վահանակներ, լուսավորություն, տեսախցիկներ, դոմոֆոններ, ինտերնետ և տաքացվող հատակ. սա նույնպես մեր պրոֆիլն է:",
    strip: [
      { label: "24/7", value: "վթարային կանչեր" },
      { label: "30–60 րոպե", value: "արագ այց քաղաքի տարածքում" },
      { label: "Ֆիքսված արժեք", value: "նախքան աշխատանքը սկսելը" },
    ],
    ctaTitle: "Կարող եք պարզապես զանգահարել և հակիրճ բացատրել, թե ինչ է պատահել:",
    ctaText: "Եթե հնարավոր է անմիջապես պատասխանել, կասենք տեղում: Եթե զննում է անհրաժեշտ, նախապես կզգուշացնենք մինչև այցելելը:",
  },
};

export function HomeServiceWall({ locale }: { locale: Locale }) {
  const c = content[locale];
  const phoneHref = `tel:${businessPhoneMachine}`;
  const whatsappHref = businessWhatsappUrl;

  return (
    <section aria-label={c.sectionLabel} className={`home-service-wall home-service-wall--${locale}`}>
      <div id="avariinyi-vyezd" className="home-service-wall__card">
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
              {c.titleLines.map((line) => (
                <span key={line} className="home-service-wall__title-line">
                  {line}
                </span>
              ))}
            </h2>

            <div className="cta-block">
              <div className="cta-left">
                <span className="cta-label">{c.triggerLabel}</span>
                <a href={phoneHref} className="cta-phone">{businessPhoneDisplay}</a>
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

      <HomeServiceScopeCopy
        copy={c}
        locale={locale}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
      />
    </section>
  );
}

function HomeServiceScopeCopy({
  copy,
  locale,
  phoneHref,
  whatsappHref,
}: {
  copy: SectionCopy;
  locale: Locale;
  phoneHref: string;
  whatsappHref: string;
}) {
  return (
    <div id="uslugi" className={`home-service-scope home-service-scope--${locale}`}>
      <div className="home-service-scope__head">
        <div className="home-service-scope__label-row">
          <span className="home-service-scope__label-mark" aria-hidden="true" />
          <p className="home-service-scope__eyebrow">{copy.eyebrow}</p>
        </div>

        <div className="home-service-scope__headline">
          <h2 className="home-service-scope__title">{copy.heading}</h2>
          <p className="home-service-scope__subtitle">{copy.subtitle}</p>
        </div>
      </div>

      <div id="raboty" className="home-service-scope__grid">
        {copy.blocks.map((block, index) => (
          <section key={block.title} className="home-service-scope__block">
            <div className="home-service-scope__block-head">
              <span className="home-service-scope__block-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="home-service-scope__block-title">{block.title}</h3>
            </div>

            <ul className="home-service-scope__list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="home-service-scope__info">
        <p className="home-service-scope__note">{copy.note}</p>

        <div className="home-service-scope__stats">
          {copy.strip.map((item) => (
            <article key={item.label} className="home-service-scope__stat">
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="home-service-scope__cta">
        <div className="home-service-scope__cta-copy">
          <p className="home-service-scope__cta-title">{copy.ctaTitle}</p>
          <p className="home-service-scope__cta-text">{copy.ctaText}</p>
        </div>

        <div className="home-service-scope__actions">
          <a href={phoneHref} className="home-service-scope__button home-service-scope__button--primary">
            {copy.phoneLabel}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="home-service-scope__button home-service-scope__button--ghost"
          >
            {copy.whatsappLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
