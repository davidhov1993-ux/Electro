import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Seo } from "@/src/components/Seo";
import { brandName, t } from "@/src/content/site";
import type { Locale, ServiceEntry } from "@/src/types";
import { createBreadcrumbSchema, createFaqSchema, createServiceSchema } from "@/src/lib/seo";
import { serviceAlternatePaths, servicePath, servicesAnchor } from "@/src/lib/locale";

const phone = "+374 99 586 469";
const phoneHref = "tel:+37499586469";
const whatsappHref = "https://wa.me/37499586469";

interface EmergencyInfoItem {
  title: string;
  text: string;
}

interface EmergencyPageLocaleCopy {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  eyebrow: string;
  h1: string;
  h1Main: string;
  h1MainLines: string[];
  stampText: string;
  lead: string;
  callNow: string;
  whatsapp: string;
  signalRail: string[];
  alertPanelLabel: string;
  alertItems: EmergencyInfoItem[];
  alertNote: string;
  whenLabel: string;
  whenTitle: string;
  whenItems: EmergencyInfoItem[];
  priceLabel: string;
  priceTitle: string;
  priceItems: string[];
  whyLabel: string;
  whyTitle: string;
  whyItems: EmergencyInfoItem[];
  faqLabel: string;
  faqTitle: string;
}

const emergencyPageCopy: Record<Locale, EmergencyPageLocaleCopy> = {
  ru: {
    seoTitle: "Аварийный электрик в Ереване 24/7 | Выезд 30-60 минут",
    seoDescription:
      "Аварийный электрик в Ереване с выездом 30-60 минут. Работаем круглосуточно 24/7: устраним короткое замыкание, искрение и вернем свет.",
    keywords: "аварийный электрик Ереван, срочный электрик Ереван, короткое замыкание, нет света, электрик 24/7",
    eyebrow: "Аварийный выезд",
    h1: "Аварийный электрик в Ереване — Выезд 30-60 минут",
    h1Main: "Аварийный электрик в Ереване",
    h1MainLines: ["Аварийный электрик", "в Ереване —"],
    stampText: "Выезд 30-60 минут",
    lead: "Работаем круглосуточно 24/7. Устраним короткое замыкание, искрение и вернем свет в кратчайшие сроки.",
    callNow: "ПОЗВОНИТЬ СЕЙЧАС",
    whatsapp: "WHATSAPP",
    signalRail: ["Весь Ереван (30-60 мин)", "24/7 (Без выходных)", "Диагностика при ремонте", "Кентрон / Арабкир / Ачапняк"],
    alertPanelLabel: "Quick Info",
    alertItems: [
      { title: "Выезд", text: "Весь Ереван (30-60 мин)" },
      { title: "График", text: "24/7 (Без выходных)" },
      { title: "Диагностика", text: "Бесплатно при выполнении работ" },
      { title: "Районы", text: "Кентрон, Арабкир, Ачапняк, Нор-Норк, Давташен, Малатия, Шенгавит." },
    ],
    alertNote: "Кентрон, Арабкир, Ачапняк, Нор-Норк, Давташен, Малатия, Шенгавит.",
    whenLabel: "Когда вызывать?",
    whenTitle: "Срочно звоните нам, если:",
    whenItems: [
      {
        title: "Короткое замыкание.",
        text: "Выбивает автоматы, видны вспышки в розетках или щитке.",
      },
      {
        title: "Запах гари.",
        text: "Чувствуете запах паленой изоляции — это критическая угроза пожара.",
      },
      {
        title: "Пропал свет.",
        text: "Электричество исчезло только в вашей квартире или офисе.",
      },
      {
        title: "Неисправен щиток.",
        text: "Греются автоматы или слышен сильный гул/треск.",
      },
    ],
    priceLabel: "Стоимость",
    priceTitle: "Стоимость аварийных услуг",
    priceItems: [
      "Вызов и диагностика — 5 000 ֏",
      "Поиск и устранение замыкания — от 10 000 ֏",
      "Замена сгоревшего автомата — 3 000 ֏",
      "Восстановление освещения — от 5 000 ֏",
    ],
    whyLabel: "Преимущества",
    whyTitle: "Почему выбирают нашу аварийную службу",
    whyItems: [
      {
        title: "Мастер рядом.",
        text: "Дежурные электрики распределены по районам для быстрого прибытия.",
      },
      {
        title: "Инструменты с собой.",
        text: "Всё необходимое для ремонта — от тестеров до запчастей — в наличии в машине.",
      },
      {
        title: "Чисто и надежно.",
        text: "Делаем качественные соединения (не \"скрутки\"), которые не сгорят через неделю.",
      },
    ],
    faqLabel: "FAQ",
    faqTitle: "FAQ",
  },
  hy: {
    seoTitle: "Շտապ էլեկտրիկ Երևանում 24/7 | Այցելություն 30-60 րոպեում",
    seoDescription:
      "Շտապ էլեկտրիկ Երևանում՝ այց 30-60 րոպեում: Աշխատում ենք շուրջօրյա 24/7, վերացնում ենք կարճ միացումը, կայծերը և վերականգնում հոսանքը:",
    keywords: "շտապ էլեկտրիկ Երևան, վթարային էլեկտրիկ, կարճ միացում, հոսանք չկա, էլեկտրիկ 24/7",
    eyebrow: "Շտապ կանչ",
    h1: "Շտապ էլեկտրիկ Երևանում — Այցելություն 30-60 րոպեում",
    h1Main: "Շտապ էլեկտրիկ Երևանում",
    h1MainLines: ["Շտապ էլեկտրիկ", "Երևանում —"],
    stampText: "Այցելություն 30-60 րոպեում",
    lead: "Աշխատում ենք շուրջօրյա 24/7: Կվերացնենք կարճ միացումը, կայծերը և կվերականգնենք հոսանքը հաշված րոպեների ընթացքում:",
    callNow: "ԶԱՆԳԱՀԱՐԵԼ ՀԻՄԱ",
    whatsapp: "WHATSAPP",
    signalRail: ["30-60 րոպե (Ամբողջ Երևան)", "24/7 (Շուրջօրյա)", "Ստուգումն անվճար է աշխատանքի դեպքում", "Կենտրոն / Արաբկիր / Աջափնյակ"],
    alertPanelLabel: "Quick Info",
    alertItems: [
      { title: "Այցելություն՝", text: "30-60 րոպե (Ամբողջ Երևան)" },
      { title: "Գրաֆիկ՝", text: "24/7 (Շուրջօրյա)" },
      { title: "Ստուգումը՝", text: "Անվճար (Աշխատանքների կատարման դեպքում)" },
      { title: "Շրջաններ՝", text: "Կենտրոն, Արաբկիր, Աջափնյակ, Նոր Նորք, Դավթաշեն, Մալաթիա, Շենգավիթ:" },
    ],
    alertNote: "Կենտրոն, Արաբկիր, Աջափնյակ, Նոր Նորք, Դավթաշեն, Մալաթիա, Շենգավիթ:",
    whenLabel: "Սցենարներ",
    whenTitle: "Ո՞ր դեպքերում է անհրաժեշտ էլեկտրիկի շտապ կանչ",
    whenItems: [
      {
        title: "Կարճ միացում:",
        text: "Ավտոմատներն անջատվում են, կայծեր են երևում վարդակներում կամ վահանակում:",
      },
      {
        title: "Այրվածի հոտ:",
        text: "Զգում եք այրված լարերի կամ պլաստմասսայի հոտ. սա հրդեհի լուրջ վտանգ է:",
      },
      {
        title: "Հոսանք չկա:",
        text: "Էլեկտրականությունը բացակայում է միայն ձեր տանը կամ գրասենյակում:",
      },
      {
        title: "Վահանակի անսարքություն:",
        text: "Ավտոմատները տաքանում են կամ լսվում է տարօրինակ ճարճատյուն:",
      },
    ],
    priceLabel: "Գներ",
    priceTitle: "Վթարային ծառայությունների արժեքը",
    priceItems: [
      "Կանչ և ստուգում — 5 000 ֏",
      "Կարճ միացման վերացում — սկսած 10 000 ֏-ից",
      "Ավտոմատի փոխարինում — 3 000 ֏",
      "Լուսավորության վերականգնում — սկսած 5 000 ֏-ից",
    ],
    whyLabel: "Առավելություններ",
    whyTitle: "Ինչու՞ դիմել հենց մեր վթարային ծառայությանը",
    whyItems: [
      {
        title: "Օպերատիվություն.",
        text: "Մեր վարպետները հերթապահում են Երևանի բոլոր թաղամասերում՝ արագ ժամանման համար:",
      },
      {
        title: "Պրոֆեսիոնալ գործիքներ.",
        text: "Ունենք ժամանակակից սարքավորումներ նույնիսկ պատի տակ թաքնված անսարքությունները գտնելու համար:",
      },
      {
        title: "Որակի երաշխիք.",
        text: "Մենք չենք անում ժամանակավոր «կպցրած» գործ, այլ ապահովում ենք հուսալի և անվտանգ միացումներ:",
      },
    ],
    faqLabel: "FAQ",
    faqTitle: "FAQ",
  },
};

interface EmergencyServicePageProps {
  locale: Locale;
  service: ServiceEntry;
}

export function EmergencyServicePage({ locale, service }: EmergencyServicePageProps) {
  const brandLabel = t(locale, brandName);
  const copy = emergencyPageCopy[locale];
  const servicePagePath = servicePath(locale, service.slug);
  const alternatePaths = serviceAlternatePaths(service.slug);
  const faqSchema = createFaqSchema(locale, service.faq);

  return (
    <>
      <Seo
        locale={locale}
        title={`${copy.seoTitle} | ${brandLabel}`}
        description={copy.seoDescription}
        keywords={copy.keywords}
        path={servicePagePath}
        alternatePaths={alternatePaths}
        structuredData={[
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: locale === "ru" ? "Услуги" : "Ծառայություններ", path: servicesAnchor(locale) },
            { name: copy.h1, path: servicePagePath },
          ]),
          createServiceSchema(locale, service, servicePagePath),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <div className="emergency-service-page">
        <section className="emergency-service-page__hero">
          <div className="container emergency-service-page__hero-inner">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: locale === "ru" ? "Услуги" : "Ծառայություններ", to: servicesAnchor(locale) },
                { label: copy.eyebrow },
              ]}
            />

            <p className="emergency-service-page__eyebrow">{copy.eyebrow}</p>

            <div className="emergency-service-page__hero-grid">
              <div className="emergency-service-page__hero-copy">
                <h1 aria-label={copy.h1}>
                  <span className="emergency-service-page__hero-title-main" aria-label={copy.h1Main}>
                    {copy.h1MainLines.map((line) => (
                      <span key={line} className="emergency-service-page__hero-title-line">
                        {line}
                      </span>
                    ))}
                  </span>
                  <span className="emergency-service-page__hero-stamp">{copy.stampText}</span>
                </h1>
                <p className="emergency-service-page__lead">{copy.lead}</p>

                <div className="emergency-service-page__actions">
                  <a href={phoneHref} className="button emergency-service-page__button emergency-service-page__button--primary">
                    {copy.callNow}
                  </a>
                  <a href={whatsappHref} className="button emergency-service-page__button emergency-service-page__button--ghost">
                    {copy.whatsapp}
                  </a>
                </div>
              </div>

              <div className="emergency-service-page__alert-box">
                <span className="emergency-service-page__alert-kicker">{copy.alertPanelLabel}</span>
                <span className="emergency-service-page__alert-code">24/7</span>
                <div className="emergency-service-page__alert-matrix">
                  {copy.alertItems.map((item) => (
                    <span key={item.title} className="emergency-service-page__alert-cell">
                      <small>{item.title}</small>
                      <strong>{item.text}</strong>
                    </span>
                  ))}
                </div>
                <span className="emergency-service-page__alert-phone">{phone}</span>
                <span className="emergency-service-page__alert-note">{copy.alertNote}</span>
              </div>
            </div>

            <div className="emergency-service-page__signal-rail">
              {copy.signalRail.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="emergency-service-page__section emergency-service-page__section--when">
          <div className="container emergency-service-page__section-inner">
            <div className="emergency-service-page__section-head">
              <p className="emergency-service-page__section-label">{copy.whenLabel}</p>
              <h2>{copy.whenTitle}</h2>
            </div>

            <div className="emergency-service-page__columns emergency-service-page__columns--wide">
              {splitList(copy.whenItems).map((column, index) => (
                <ul key={`${copy.whenTitle}-${index}`} className="emergency-service-page__list">
                  {column.map((item) => (
                    <li key={item.title}>
                      <h3 className="emergency-service-page__list-title">
                        {item.title} <span>{item.text}</span>
                      </h3>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="emergency-service-page__section emergency-service-page__section--prices">
          <div className="container emergency-service-page__section-inner">
            <div className="emergency-service-page__section-head">
              <p className="emergency-service-page__section-label">{copy.priceLabel}</p>
              <h2>{copy.priceTitle}</h2>
            </div>

            <ul className="emergency-service-page__price-list">
              {copy.priceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="emergency-service-page__section emergency-service-page__section--technical">
          <div className="container emergency-service-page__section-inner">
            <div className="emergency-service-page__split">
              <div className="emergency-service-page__split-copy">
                <p className="emergency-service-page__section-label">{copy.whyLabel}</p>
                <h2>{copy.whyTitle}</h2>
              </div>

              <ul className="emergency-service-page__list emergency-service-page__list--technical">
                {copy.whyItems.map((item) => (
                  <li key={item.title}>
                    <h3 className="emergency-service-page__list-title">{item.title}</h3>
                    <span className="emergency-service-page__list-text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="emergency-service-page__section emergency-service-page__section--faq">
          <div className="container emergency-service-page__section-inner">
            <div className="emergency-service-page__section-head">
              <p className="emergency-service-page__section-label">{copy.faqLabel}</p>
              <h2>{copy.faqTitle}</h2>
            </div>

            <div className="emergency-service-page__faq-list">
              {service.faq.map((item) => (
                <details key={item.question.ru} className="emergency-service-page__faq-item">
                  <summary>{t(locale, item.question)}</summary>
                  <p>{t(locale, item.answer)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <a href={phoneHref} className="emergency-service-page__mobile-call">
          {copy.callNow}
        </a>
      </div>
    </>
  );
}

function splitList<T>(items: T[]) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}
