import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Seo } from "@/src/components/Seo";
import { brandName, t } from "@/src/content/site";
import type { Locale, ServiceEntry } from "@/src/types";
import { createBreadcrumbSchema, createServiceSchema } from "@/src/lib/seo";
import { servicePath, servicesAnchor } from "@/src/lib/locale";

const phone = "+374 99 586 469";
const phoneHref = "tel:+37499586469";
const whatsappHref = "https://wa.me/37499586469";

interface EmergencyPageLocaleCopy {
  eyebrow: string;
  summary: string;
  callNow: string;
  whatsapp: string;
  signalRail: string[];
  whenLabel: string;
  whenTitle: string;
  whenItems: string[];
  checksLabel: string;
  checksTitle: string;
  checksItems: string[];
  commonLabel: string;
  commonTitle: string;
  commonItems: string[];
  footerLabel: string;
  footerTitle: string;
  footerMeta: string;
}

const emergencyPageCopy: Record<Locale, EmergencyPageLocaleCopy> = {
  ru: {
    eyebrow: "Срочный выезд",
    summary:
      "Срочный выезд при отключении света, коротком замыкании, искрении, запахе гари, перегреве проводки и других опасных сбоях в электрике.",
    callNow: "Позвонить сейчас",
    whatsapp: "WhatsApp",
    signalRail: [
      "Свет пропал",
      "Выбивает автомат",
      "Искрит",
      "Пахнет гарью",
      "Короткое замыкание",
    ],
    whenLabel: "Сценарии",
    whenTitle: "Когда нужен срочный выезд",
    whenItems: [
      "полностью пропал свет на объекте",
      "автомат выбивает повторно",
      "искрит розетка, выключатель, щит или автомат",
      "появился запах гари",
      "розетка, проводка, вилка или оборудование греются",
      "произошло короткое замыкание",
      "часть линий отключилась без понятной причины",
      "техника отключилась после скачка напряжения",
      "щит работает нестабильно",
      "при касании чувствуется удар током",
    ],
    checksLabel: "Проверка",
    checksTitle: "Что проверяется на месте",
    checksItems: [
      "ввод и распределение питания",
      "автоматы и щит",
      "аварийный участок линии",
      "розетки, выключатели и соединения",
      "перегрузка, короткое замыкание и повреждённые участки",
      "причина отключения или нестабильной работы",
    ],
    commonLabel: "Частые обращения",
    commonTitle: "С чем обращаются чаще всего",
    commonItems: [
      "выбивает автомат при включении нагрузки",
      "пропал свет в части помещения",
      "греется розетка или вилка",
      "искрит выключатель",
      "пахнет гарью из щита",
      "после аварии не работает линия или оборудование",
    ],
    footerLabel: "Связь",
    footerTitle: "Если ситуация срочная, лучше сразу звонок.",
    footerMeta: "Аварийный электрик в Ереване",
  },
  hy: {
    eyebrow: "Շտապ մեկնում",
    summary:
      "Շտապ մեկնում՝ հոսանքի անջատման, կարճ միացման, կայծի, այրման հոտի, լարանցքի տաքացման և էլեկտրիկայի այլ վտանգավոր խափանումների դեպքում։",
    callNow: "Զանգել հիմա",
    whatsapp: "WhatsApp",
    signalRail: [
      "Լույս չկա",
      "Ավտոմատն ընկնում է",
      "Կայծ է տալիս",
      "Այրման հոտ կա",
      "Կարճ միացում",
    ],
    whenLabel: "Սցենարներ",
    whenTitle: "Երբ է պետք շտապ մեկնում",
    whenItems: [
      "օբյեկտում հոսանքն ամբողջությամբ անհետացել է",
      "ավտոմատը կրկին ընկնում է",
      "վարդակը, անջատիչը, վահանը կամ ավտոմատը կայծ է տալիս",
      "այրման հոտ է առաջացել",
      "վարդակը, լարը, խրոցը կամ սարքավորումը տաքանում են",
      "տեղի է ունեցել կարճ միացում",
      "գծերի մի մասը անջատվել է առանց հասկանալի պատճառի",
      "լարման տատանումից հետո տեխնիկան անջատվել է",
      "վահանն աշխատում է անկայուն",
      "դիպչելիս զգացվում է հոսանքի հարված",
    ],
    checksLabel: "Ստուգում",
    checksTitle: "Ինչ է ստուգվում տեղում",
    checksItems: [
      "մուտքային և բաշխիչ սնուցումը",
      "ավտոմատները և վահանը",
      "վթարային հատվածը",
      "վարդակները, անջատիչները և միացումները",
      "ծանրաբեռնվածությունը, կարճ միացումն ու վնասված հատվածները",
      "անջատման կամ անկայուն աշխատանքի պատճառը",
    ],
    commonLabel: "Հաճախ դիմում են",
    commonTitle: "Ինչով են ավելի հաճախ դիմում",
    commonItems: [
      "ավտոմատը ընկնում է բեռ միացնելիս",
      "սենյակի կամ օբյեկտի մի հատվածում լույս չկա",
      "վարդակը կամ խրոցը տաքանում է",
      "անջատիչը կայծ է տալիս",
      "վահանից այրման հոտ է գալիս",
      "վթարից հետո գիծը կամ սարքավորումը չի աշխատում",
    ],
    footerLabel: "Կապ",
    footerTitle: "Եթե իրավիճակը շտապ է, ավելի ճիշտ է անմիջապես զանգել։",
    footerMeta: "Արտակարգ էլեկտրիկ Երևանում",
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

  return (
    <>
      <Seo
        locale={locale}
        title={`${t(locale, service.title)} ${locale === "ru" ? "в Ереване" : "Երևանում"} | ${brandLabel}`}
        description={copy.summary}
        path={servicePagePath}
        structuredData={[
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: locale === "ru" ? "Услуги" : "Ծառայություններ", path: servicesAnchor(locale) },
            { name: t(locale, service.title), path: servicePagePath },
          ]),
          createServiceSchema(locale, service, servicePagePath),
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
                { label: t(locale, service.title) },
              ]}
            />

            <p className="emergency-service-page__eyebrow">{copy.eyebrow}</p>

            <div className="emergency-service-page__hero-grid">
              <div className="emergency-service-page__hero-copy">
                <h1>{t(locale, service.title)}</h1>
                <p className="emergency-service-page__summary">{copy.summary}</p>

                <div className="emergency-service-page__actions">
                  <a href={phoneHref} className="button emergency-service-page__button emergency-service-page__button--primary">
                    {copy.callNow}
                  </a>
                  <a href={whatsappHref} className="button emergency-service-page__button emergency-service-page__button--ghost">
                    {copy.whatsapp}
                  </a>
                </div>
              </div>

              <div className="emergency-service-page__alert-box" aria-hidden="true">
                <span className="emergency-service-page__alert-code">EMG</span>
                <span className="emergency-service-page__alert-line">{copy.signalRail[0]}</span>
                <span className="emergency-service-page__alert-line">{copy.signalRail[1]}</span>
                <span className="emergency-service-page__alert-line">{copy.signalRail[2]}</span>
              </div>
            </div>

            <div className="emergency-service-page__signal-rail">
              {copy.signalRail.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="emergency-service-page__section">
          <div className="container emergency-service-page__section-inner">
            <div className="emergency-service-page__section-head">
              <p className="emergency-service-page__section-label">{copy.whenLabel}</p>
              <h2>{copy.whenTitle}</h2>
            </div>

            <div className="emergency-service-page__columns emergency-service-page__columns--wide">
              {splitList(copy.whenItems).map((column, index) => (
                <ul key={`${copy.whenTitle}-${index}`} className="emergency-service-page__list">
                  {column.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="emergency-service-page__section emergency-service-page__section--technical">
          <div className="container emergency-service-page__section-inner">
            <div className="emergency-service-page__split">
              <div className="emergency-service-page__split-copy">
                <p className="emergency-service-page__section-label">{copy.checksLabel}</p>
                <h2>{copy.checksTitle}</h2>
              </div>

              <ul className="emergency-service-page__list emergency-service-page__list--technical">
                {copy.checksItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="emergency-service-page__section emergency-service-page__section--narrow">
          <div className="container emergency-service-page__section-inner">
            <div className="emergency-service-page__section-head">
              <p className="emergency-service-page__section-label">{copy.commonLabel}</p>
              <h2>{copy.commonTitle}</h2>
            </div>

            <ul className="emergency-service-page__list emergency-service-page__list--stacked">
              {copy.commonItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="emergency-service-page__final">
          <div className="container emergency-service-page__final-inner">
            <div className="emergency-service-page__final-copy">
              <p className="emergency-service-page__section-label">{copy.footerLabel}</p>
              <h2>{copy.footerTitle}</h2>
              <p className="emergency-service-page__final-meta">{copy.footerMeta}</p>
            </div>

            <div className="emergency-service-page__actions emergency-service-page__actions--final">
              <a href={phoneHref} className="button emergency-service-page__button emergency-service-page__button--primary">
                {copy.callNow}
              </a>
              <a href={whatsappHref} className="button emergency-service-page__button emergency-service-page__button--ghost">
                {copy.whatsapp}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function splitList(items: string[]) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}
