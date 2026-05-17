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
  titleLineOne: string;
  titleAccent: string;
  titleTail: string;
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
    titleLineOne: "НУЖНО РЕШИТЬ",
    titleAccent: "ВОПРОС",
    titleTail: "С ЭЛЕКТРИКОЙ?",
    triggerLabel: "Для бесплатной консультации — звоните",
    phone: "+374 99 586 469",
    phoneLabel: "Позвонить",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Вызов электрика и электромонтаж в Ереване",
    eyebrow: "С чем можно обратиться",
    heading: "Аварийный вызов, выезд электрика и монтаж",
    subtitle:
      "Пропал свет, выбивает автомат, нужен монтаж или нужно переделать после других — звоните. Сразу скажем, можем ли помочь.",
    blocks: [
      {
        title: "Авария",
        items: [
          "пропал свет",
          "выбивает автомат",
          "искрит розетка или щит",
          "нужен срочный выезд",
        ],
      },
      {
        title: "Выезд на дом",
        items: [
          "розетки, выключатели и свет",
          "диагностика и поиск причины",
          "замена автомата, розетки, выключателя",
          "исправление после чужой работы",
        ],
      },
      {
        title: "Монтаж",
        items: [
          "новая проводка и замена старой",
          "сборка щитов и защита техники",
          "квартиры, дома, офисы, магазины",
          "частичный и полный монтаж",
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
    titleLineOne: "ԷԼԵԿՏՐԱԿԱՆՈՒԹՅԱՆ ՀԵՏ ԿԱՊՎԱԾ",
    titleAccent: "ԽՆԴԻ՞Ր",
    titleTail: "ՈՒՆԵՔ",
    triggerLabel: "Անվճար խորհրդատվության համար զանգահարեք՝",
    phone: "+374 99 586 469",
    phoneLabel: "Զանգահարել",
    whatsappLabel: "WhatsApp",
    sectionLabel: "Վթարային կանչեր, էլեկտրիկի այց և մոնտաժ",
    eyebrow: "Ինչպիսի՞ հարցերով կարող եք դիմել",
    heading: "Վթարային կանչեր, էլեկտրիկի այց և մոնտաժ",
    subtitle:
      "Լույսն անջատվե՞լ է, ավտոմատը գցո՞ւմ է, մոնտաժի կամ ուրիշների թերի աշխատանքը վերանորոգելու կարի՞ք կա. զանգահարեք: Մենք անմիջապես կասենք՝ կարող ենք օգնել, թե ոչ:",
    blocks: [
      {
        title: "Վթարային իրավիճակներ",
        items: [
          "Լույսը հանգել է (հոսանք չկա)",
          "Ավտոմատը գցում է",
          "Վարդակից կամ վահանակից կայծեր են թռչում",
          "Անհրաժեշտ է շտապ այց",
        ],
      },
      {
        title: "Կանչով այցելություն",
        items: [
          "Վարդակներ, անջատիչներ և լուսավորություն",
          "Ախտորոշում և պատճառի հայտնաբերում",
          "Ավտոմատի, վարդակի, անջատիչի փոխարինում",
          "Ուրիշների սխալների ու թերի աշխատանքի շտկում",
        ],
      },
      {
        title: "Էլեկտրամոնտաժ",
        items: [
          "Նոր լարանցում (պրովոդկա) և հնի փոխարինում",
          "Վահանակների հավաքում և տեխնիկայի պաշտպանություն",
          "Բնակարաններ, առանձնատներ, գրասենյակներ, խանութներ",
          "Մասնակի և ամբողջական մոնտաժ",
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
  const phoneHref = "tel:+37499586469";
  const whatsappHref = "https://wa.me/37499586469";

  return (
    <section aria-label={c.sectionLabel} className="home-service-wall">
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

      <div id="uslugi" className="home-service-wall__summary">
        <div className="home-service-wall__summary-head">
          <p className="home-service-wall__summary-eyebrow">{c.eyebrow}</p>
          <h2 className="home-service-wall__summary-title">{c.heading}</h2>
          <p className="home-service-wall__summary-subtitle">{c.subtitle}</p>
        </div>

        <div id="raboty" className="home-service-wall__summary-grid">
          {c.blocks.map((block) => (
            <section key={block.title} className="home-service-wall__summary-block">
              <h3 className="home-service-wall__summary-block-title">{block.title}</h3>
              <ul className="home-service-wall__summary-list">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="home-service-wall__summary-note">{c.note}</p>

        <div className="home-service-wall__summary-footer">
          <div className="home-service-wall__summary-strip">
            {c.strip.map((item) => (
              <article key={item.label} className="home-service-wall__summary-stat">
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </article>
            ))}
          </div>

          <div className="home-service-wall__summary-cta">
            <div className="home-service-wall__summary-cta-copy">
              <p className="home-service-wall__summary-cta-title">{c.ctaTitle}</p>
              <p className="home-service-wall__summary-cta-text">{c.ctaText}</p>
            </div>

            <div className="home-service-wall__summary-actions">
              <a href={phoneHref} className="btn-primary">{c.phoneLabel}</a>
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
    </section>
  );
}
