import { type CSSProperties, useState } from "react";

import { LeadForm } from "@/src/components/LeadForm";
import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Seo } from "@/src/components/Seo";
import { t } from "@/src/content/site";
import { getServiceMedia } from "@/src/content/serviceMedia";
import type { Locale, ServiceEntry } from "@/src/types";
import { createBreadcrumbSchema, createFaqSchema, createServiceSchema } from "@/src/lib/seo";
import { pagePath, serviceAlternatePaths, servicePath, servicesAnchor } from "@/src/lib/locale";

const phone = "+374 99 586 469";
const phoneHref = "tel:+37499586469";
const viberHref = "viber://chat?number=%2B37499586469";

interface PanelTextItem {
  title: string;
  label?: string;
  text: string;
}

interface PanelPriceItem {
  service: string;
  price: string;
  note: string;
}

interface PanelPageCopy {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  heroLine: string;
  lead: string;
  cta: string;
  photoCta: string;
  bullets: string[];
  painLabel: string;
  painTitle: string;
  painIntro: string;
  painItems: PanelTextItem[];
  automationLabel: string;
  automationTitle: string;
  automationItems: PanelTextItem[];
  excellenceLabel: string;
  excellenceTitle: string;
  excellenceItems: PanelTextItem[];
  compareLabel: string;
  compareTitle: string;
  beforeLabel: string;
  beforeTitle: string;
  afterLabel: string;
  afterTitle: string;
  compareRange: string;
  cleanLabels: string[];
  showcaseLabel: string;
  showcaseTitle: string;
  showcaseText: string;
  showcaseTooltip: string;
  termsLabel: string;
  termsTitle: string;
  terms: string[];
  pricesLabel: string;
  pricesTitle: string;
  prices: PanelPriceItem[];
  faqLabel: string;
  faqTitle: string;
  requestLabel: string;
  requestTitle: string;
  requestNote: string;
  contactFallback: string;
  fab: string;
  whatsappText: string;
  imageAlt: string;
}

const panelPageCopy: Record<Locale, PanelPageCopy> = {
  ru: {
    metaTitle: "Сборка электрощитов в Ереване | Защита от скачков напряжения и перегрузок",
    metaDescription:
      "Профессиональный монтаж и сборка электрощитов 220/380V. Установка реле напряжения, УЗО и мастер-выключателей. Инженерный подход, маркировка групп, гарантия качества.",
    keywords:
      "сборка электрощитов Ереван, монтаж электрощита, автоматический выключатель, дифференциальный автомат, реле напряжения Protector, кросс-модуль, гребенчатая шина, щит встраиваемый, Schneider Electric Easy9, Acti9",
    breadcrumb: "Сборка электрощитов",
    eyebrow: "Электрощиты 220/380V · автоматика · защита",
    h1: "Сборка электрощитов и систем автоматики",
    heroLine: "Ваш дом под надежной защитой: профессиональная сборка электрощитов в Ереване.",
    lead: "Решаем проблему скачков напряжения, исключаем риск пожара и создаем понятную систему управления электрикой.",
    cta: "Рассчитать стоимость щита",
    photoCta: "Отправить фото щитка",
    bullets: [
      "Сборка на базе Schneider Electric, ABB, Hager.",
      "Защита бытовой техники (Реле напряжения).",
      "Понятная маркировка каждой линии.",
    ],
    painLabel: "Почему это важно",
    painTitle: "Электрощит — это не просто коробка с выключателями. Это система безопасности.",
    painIntro:
      "Собранный без расчета щит может отключать всю квартиру, перегреваться и оставлять технику без защиты при скачке напряжения.",
    painItems: [
      {
        title: "Защита от скачков",
        label: "Реле напряжения",
        text: "В сетях Еревана напряжение часто «гуляет». Мы ставим Реле напряжения (Protector), которое спасет ваш OLED-ТВ и холодильник.",
      },
      {
        title: "Защита от утечек",
        label: "УЗО",
        text: "Обязательно для ванн и детских комнат. УЗО и Дифференциальный автомат отключают ток за доли секунды при касании оголенного провода.",
      },
      {
        title: "Селективность",
        label: "Группы нагрузок",
        text: "Настраиваем систему так, чтобы при проблеме в одной розетке не гас свет во всей квартире.",
      },
    ],
    automationLabel: "Up-sell блок",
    automationTitle: "Автоматизация и комфорт",
    automationItems: [
      {
        title: "Мастер-выключатель",
        text: "Уходя из дома, выключайте весь свет одной кнопкой, сохраняя питание холодильника, роутера и нужных линий.",
      },
      {
        title: "Контакторы и реле",
        text: "Управление мощными потребителями: электрокотлы, теплые полы, бойлеры и наружное освещение через автоматику.",
      },
      {
        title: "Умные счетчики",
        text: "Мониторинг потребления энергии онлайн для квартиры, частного дома, кафе или офиса.",
      },
    ],
    excellenceLabel: "Как мы работаем",
    excellenceTitle: "Инженерный подход вместо случайной сборки",
    excellenceItems: [
      {
        title: "Расчет нагрузок",
        text: "Считаем мощность каждого прибора, чтобы кабель не грелся, а автоматический выключатель защищал именно линию, а не воздух.",
      },
      {
        title: "Сборка на стенде",
        text: "Собираем щит в мастерской, а не «на коленке» у клиента: кросс-модуль, гребенчатая шина и разводка проверяются до установки.",
      },
      {
        title: "Маркировка",
        text: "Клеим долговечные наклейки на каждый автомат — никаких надписей маркером.",
      },
      {
        title: "Проверка тепловизором",
        text: "После запуска проверяем щит на перегрев контактов и слабые соединения.",
      },
    ],
    compareLabel: "До и после",
    compareTitle: "Слева — каша из проводов. Справа — собранный щит с маркировкой.",
    beforeLabel: "До",
    beforeTitle: "каша из проводов",
    afterLabel: "После",
    afterTitle: "щит с маркировкой",
    compareRange: "Показать результат",
    cleanLabels: ["Ввод", "Кухня", "Свет", "Ванная", "AC", "Резерв"],
    showcaseLabel: "Компонент",
    showcaseTitle: "Реле напряжения защищает технику при нестабильной сети",
    showcaseText:
      "Модуль следит за напряжением и отключает питание при опасном отклонении. Для щитов используем решения уровня Schneider Electric Easy9 / Acti9, ABB, Hager или подходящие Protector/ZUBR по задаче.",
    showcaseTooltip:
      "Если напряжение выходит за безопасный диапазон, реле отключает линию и включает ее обратно после стабилизации сети.",
    termsLabel: "LSI / комплектация",
    termsTitle: "Что может входить в современный щит",
    terms: [
      "Автоматический выключатель",
      "Дифференциальный автомат",
      "Реле напряжения (Protector)",
      "Кросс-модуль",
      "Гребенчатая шина",
      "Щит встраиваемый",
      "Группы нагрузок",
      "Schneider Electric Easy9 / Acti9",
    ],
    pricesLabel: "Стоимость",
    pricesTitle: "Примерная таблица цен",
    prices: [
      {
        service: "Сборка щита (до 12 модулей)",
        price: "от X драм",
        note: "для квартиры или небольшого офиса после расчета групп",
      },
      {
        service: "Установка реле напряжения",
        price: "от X драм",
        note: "подбор Protector по мощности и схеме подключения",
      },
      {
        service: "Аудит текущего щитка",
        price: "от X драм",
        note: "проверка автоматов, УЗО, шин, контактов и маркировки",
      },
    ],
    faqLabel: "FAQ",
    faqTitle: "Частые вопросы по сборке электрощитов",
    requestLabel: "Расчет по фото",
    requestTitle: "Отправьте фото вашего текущего щитка, и я скажу, что в нем нужно исправить.",
    requestNote:
      "Можно прислать фото дверцы, внутренней части щита и общий список техники. Для точной сметы используйте форму.",
    contactFallback: "Открыть страницу контактов",
    fab: "Отправьте фото щитка в WhatsApp",
    whatsappText: "Здравствуйте! Хочу отправить фото щитка и узнать, что в нем нужно исправить.",
    imageAlt: "сборка электрощита с автоматикой и маркировкой линий в Ереване",
  },
  hy: {
    metaTitle: "Էլեկտրական վահանակների հավաքում Երևանում",
    metaDescription:
      "Էլեկտրական վահանակների պրոֆեսիոնալ հավաքում և ավտոմատների փոխարինում: Լարման ռելեի տեղադրում, Schneider/ABB ավտոմատիկա և Master Switch լուծումներ:",
    keywords: "Էլեկտրական վահանակ, Ավտոմատ անջատիչ, Լարման ռելե, ZUBR, Schneider Electric, ABB, Եռաֆազ վահանակ",
    breadcrumb: "Էլեկտրական վահանակներ",
    eyebrow: "Էլեկտրական վահանակներ · ավտոմատիկա · պաշտպանություն",
    h1: "Էլեկտրական վահանակների հավաքում և ինժեներական մոնտաժ",
    heroLine:
      "Ձեր տան անվտանգության «ուղեղը»: Մենք նախագծում և հավաքում ենք վահանակներ, որոնք պաշտպանում են ձեր տեխնիկան Երևանի ցանցերում լարման տատանումներից:",
    lead: "Լարման ռելե, Schneider/ABB ավտոմատիկա, Master Switch լուծումներ և հստակ մակնշված գծեր բնակարանի, տան կամ բիզնեսի համար:",
    cta: "Պատվիրել վահանակի աուդիտ",
    photoCta: "Ուղարկել նկարը",
    bullets: [
      "Schneider Electric, ABB կամ Hager օրիգինալ սարքավորումներ:",
      "Լարման տատանումներից պաշտպանություն ZUBR / Լարման ռելե:",
      "Յուրաքանչյուր գծի հստակ լազերային մակնշում:",
    ],
    painLabel: "Լուծումներ",
    painTitle: "Ինչո՞ւ է անհրաժեշտ թարմացնել էլեկտրական վահանակը?",
    painIntro:
      "Հին կամ սխալ հավաքված վահանակը վտանգ է տեխնիկայի, լարերի և մարդկանց համար, հատկապես Երևանի անկայուն ցանցերում:",
    painItems: [
      {
        title: "Պաշտպանություն տատանումներից",
        text: "Մենք տեղադրում ենք լարման ռելեներ, որոնք ակնթարթորեն անջատում են հոսանքը 190V-ից ցածր կամ 250V-ից բարձր տատանումների դեպքում՝ փրկելով թանկարժեք սառնարանն ու լվացքի մեքենան:",
      },
      {
        title: "Անվտանգություն (ԱՍՊ / УЗО)",
        text: "Պաշտպանեք ձեզ հոսանքահարվելուց: Մեր համակարգերը հայտնաբերում են հոսանքի արտահոսքը վայրկյանի հազարերորդական մասում:",
      },
      {
        title: "Մաստեր-անջատիչ",
        text: "Մեկ կոճակով անջատեք ողջ լուսավորությունը տանից դուրս գալիս: Հարմարավետություն և էներգախնայողություն:",
      },
    ],
    automationLabel: "Հարմարավետություն",
    automationTitle: "Ավտոմատիկա տան և բիզնեսի համար",
    automationItems: [
      {
        title: "Master Switch",
        text: "Մեկ կոճակով կառավարում եք լուսավորությունը՝ պահպանելով կարևոր սարքերի սնուցումը:",
      },
      {
        title: "Կոնտակտորներ և ռելեներ",
        text: "Էլեկտրակաթսաների, տաք հատակների և հզոր սպառիչների անվտանգ կառավարում ավտոմատիկայով:",
      },
      {
        title: "Խելացի հաշվիչներ",
        text: "Էներգիայի ծախսի առցանց վերահսկում բնակարանի, առանձնատան, սրճարանի կամ գրասենյակի համար:",
      },
    ],
    excellenceLabel: "Փորձագիտական մոտեցում",
    excellenceTitle: "Պրոֆեսիոնալ մոտեցում յուրաքանչյուր մանրուքին",
    excellenceItems: [
      {
        title: "Բեռնվածության հաշվարկ",
        text: "Յուրաքանչյուր ավտոմատ ընտրվում է ըստ մալուխի հատույթի և սարքավորման հզորության (P=U⋅I):",
      },
      {
        title: "Օրիգինալ բրենդներ",
        text: "Մենք օգտագործում ենք բացառապես Schneider Electric, ABB կամ Hager ընկերությունների սարքավորումները:",
      },
      {
        title: "Լազերային մակնշում",
        text: "Յուրաքանչյուր գիծ ստանում է իր հստակ անվանումը: Այլևս կարիք չկա գուշակել, թե որ ավտոմատն է պատասխանատու խոհանոցի համար:",
      },
      {
        title: "Ջերմատեսիլ ստուգում",
        text: "Գործարկումից հետո բոլոր կոնտակտները ստուգվում են ջերմացույցով (thermal imaging)՝ թաքնված տաքացումները բացառելու համար:",
      },
    ],
    compareLabel: "Մինչև և հետո",
    compareTitle: "Հին խորհրդային վահանակն ընդդեմ ժամանակակից մակնշված վահանակի:",
    beforeLabel: "Մինչև",
    beforeTitle: "հին խառնված վահանակ",
    afterLabel: "Հետո",
    afterTitle: "մակնշված ժամանակակից վահանակ",
    compareRange: "Ցույց տալ արդյունքը",
    cleanLabels: ["Մուտք", "Խոհանոց", "Լույս", "Լոգարան", "AC", "Պահուստ"],
    showcaseLabel: "Կոմպոնենտ",
    showcaseTitle: "Լարման ռելեն պաշտպանում է տեխնիկան տատանումների ժամանակ",
    showcaseText:
      "Ռելեն վերահսկում է ցանցը և անջատում սնուցումը վտանգավոր շեղման դեպքում: Օգտագործում ենք Schneider Electric, ABB, Hager, ZUBR կամ համապատասխան լուծումներ:",
    showcaseTooltip:
      "Երբ լարումը դուրս է գալիս անվտանգ միջակայքից, ռելեն անջատում է հոսանքը և միացնում միայն ցանցի կայունացումից հետո:",
    termsLabel: "Տերմիններ",
    termsTitle: "Ինչ կարող է ներառվել ժամանակակից վահանակում",
    terms: ["Ավտոմատ անջատիչ", "Լարման ռելե", "ZUBR", "Schneider Electric", "ABB", "Եռաֆազ վահանակ"],
    pricesLabel: "Արժեք",
    pricesTitle: "Նախնական գնացուցակ",
    prices: [
      {
        service: "Վահանակի հավաքում (մինչև 12 մոդուլ)",
        price: "սկսած X դրամից",
        note: "բնակարանի կամ փոքր գրասենյակի համար",
      },
      {
        service: "Լարման ռելեի տեղադրում",
        price: "սկսած X դրամից",
        note: "ZUBR կամ համարժեք ռելեի ընտրությամբ",
      },
      {
        service: "Գործող վահանակի աուդիտ",
        price: "սկսած X դրամից",
        note: "ավտոմատների, կոնտակտների և մակնշման ստուգում",
      },
    ],
    faqLabel: "FAQ",
    faqTitle: "Հաճախ տրվող հարցեր",
    requestLabel: "Աուդիտ նկարով",
    requestTitle: "Ուղարկեք վահանակի նկարը WhatsApp-ով, և ես կասեմ՝ ինչ է պետք ուղղել:",
    requestNote: "Ուղարկեք դռնակի, ներսի հատվածի և ընդհանուր տեսքի նկարները: Ճշգրիտ նախահաշվի համար լրացրեք հայտը:",
    contactFallback: "Բացել կոնտակտների էջը",
    fab: "Ուղարկեք վահանակի նկարը WhatsApp-ով",
    whatsappText: "Բարև ձեզ: Ուզում եմ ուղարկել վահանակի նկարը և հասկանալ՝ ինչ է պետք ուղղել:",
    imageAlt: "էլեկտրական վահանակի հավաքում Երևանում",
  },
};

interface PanelAutomationServicePageProps {
  locale: Locale;
  service: ServiceEntry;
}

export function PanelAutomationServicePage({ locale, service }: PanelAutomationServicePageProps) {
  const [comparePosition, setComparePosition] = useState(52);
  const copy = panelPageCopy[locale];
  const servicePagePath = servicePath(locale, service.slug);
  const media = getServiceMedia(service.slug);
  const faqSchema = createFaqSchema(locale, service.faq);
  const requestPath = `${pagePath(locale, "contacts")}?service=${service.slug}`;
  const whatsappHref = `https://wa.me/37499586469?text=${encodeURIComponent(copy.whatsappText)}`;

  return (
    <>
      <Seo
        locale={locale}
        title={copy.metaTitle}
        description={copy.metaDescription}
        keywords={copy.keywords}
        path={servicePagePath}
        alternatePaths={serviceAlternatePaths(service.slug)}
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

      <div className="panel-service-page">
        <section className="panel-service-page__hero">
          <div className="container panel-service-page__hero-inner">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: locale === "ru" ? "Услуги" : "Ծառայություններ", to: servicesAnchor(locale) },
                { label: copy.breadcrumb },
              ]}
            />

            <div className="panel-service-page__hero-grid">
              <div className="panel-service-page__hero-copy">
                <p className="panel-service-page__eyebrow">{copy.eyebrow}</p>
                <h1>{copy.h1}</h1>
                <p className="panel-service-page__hero-line">{copy.heroLine}</p>
                <p className="panel-service-page__lead">{copy.lead}</p>

                <ul className="panel-service-page__hero-bullets" aria-label={copy.breadcrumb}>
                  {copy.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="panel-service-page__actions">
                  <a href="#panel-request" className="button panel-service-page__button panel-service-page__button--primary">
                    {copy.cta}
                  </a>
                  <a href={whatsappHref} className="button panel-service-page__button panel-service-page__button--ghost">
                    {copy.photoCta}
                  </a>
                </div>
              </div>

              <figure className="panel-service-page__visual">
                <img src={media.image} alt={copy.imageAlt} width="1024" height="1024" loading="eager" />
                <figcaption>
                  <span>220/380V</span>
                  <span>Schneider / ABB</span>
                  <span>Relay</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="panel-service-page__section panel-service-page__section--pain">
          <div className="container panel-service-page__section-inner">
            <div className="panel-service-page__section-head">
              <p className="panel-service-page__eyebrow">{copy.painLabel}</p>
              <h2>{copy.painTitle}</h2>
              <p>{copy.painIntro}</p>
            </div>

            <div className="panel-service-page__technical-grid">
              {copy.painItems.map((item) => (
                <article key={item.title} className="panel-service-page__technical-item">
                  {item.label ? <span>{item.label}</span> : null}
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel-service-page__section panel-service-page__section--automation">
          <div className="container panel-service-page__section-inner">
            <div className="panel-service-page__section-head">
              <p className="panel-service-page__eyebrow">{copy.automationLabel}</p>
              <h2>{copy.automationTitle}</h2>
            </div>

            <div className="panel-service-page__automation-grid">
              {copy.automationItems.map((item) => (
                <article key={item.title} className="panel-service-page__automation-item">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel-service-page__section panel-service-page__section--excellence">
          <div className="container panel-service-page__section-inner">
            <div className="panel-service-page__section-head">
              <p className="panel-service-page__eyebrow">{copy.excellenceLabel}</p>
              <h2>{copy.excellenceTitle}</h2>
            </div>

            <ol className="panel-service-page__process-list">
              {copy.excellenceItems.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="panel-service-page__section panel-service-page__section--compare">
          <div className="container panel-service-page__compare-inner">
            <div className="panel-service-page__section-head">
              <p className="panel-service-page__eyebrow">{copy.compareLabel}</p>
              <h2>{copy.compareTitle}</h2>
            </div>

            <div
              className="panel-service-page__compare"
              style={{ "--panel-compare": `${comparePosition}%` } as CSSProperties}
            >
              <div className="panel-service-page__compare-side panel-service-page__compare-side--before">
                <span>{copy.beforeLabel}</span>
                <strong>{copy.beforeTitle}</strong>
                <div className="panel-service-page__wire-mess" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, index) => (
                    <i key={index} />
                  ))}
                </div>
              </div>
              <div className="panel-service-page__compare-side panel-service-page__compare-side--after">
                <span>{copy.afterLabel}</span>
                <strong>{copy.afterTitle}</strong>
                <div className="panel-service-page__clean-panel" aria-hidden="true">
                  {copy.cleanLabels.map((item) => (
                    <b key={item}>{item}</b>
                  ))}
                </div>
              </div>
              <label className="panel-service-page__compare-control">
                <span>{copy.compareRange}</span>
                <input
                  type="range"
                  min="18"
                  max="82"
                  value={comparePosition}
                  onChange={(event) => setComparePosition(Number(event.target.value))}
                />
              </label>
            </div>
          </div>
        </section>

        <section className="panel-service-page__section panel-service-page__section--showcase">
          <div className="container panel-service-page__showcase-inner">
            <div className="panel-service-page__section-head">
              <p className="panel-service-page__eyebrow">{copy.showcaseLabel}</p>
              <h2>{copy.showcaseTitle}</h2>
              <p>{copy.showcaseText}</p>
            </div>

            <div className="panel-service-page__relay" aria-label={copy.showcaseTitle}>
              <img
                className="panel-service-page__relay-photo"
                src={media.image}
                alt={copy.imageAlt}
                width="1024"
                height="1024"
                loading="lazy"
              />
              <div className="panel-service-page__relay-device">
                <span>VOLTAGE</span>
                <strong>220V</strong>
                <small>Protector / ZUBR</small>
              </div>
              <span className="panel-service-page__tooltip" tabIndex={0}>
                ?
                <span role="tooltip">{copy.showcaseTooltip}</span>
              </span>
            </div>
          </div>
        </section>

        <section className="panel-service-page__section panel-service-page__section--terms">
          <div className="container panel-service-page__terms-inner">
            <div className="panel-service-page__section-head">
              <p className="panel-service-page__eyebrow">{copy.termsLabel}</p>
              <h2>{copy.termsTitle}</h2>
            </div>

            <div className="panel-service-page__term-grid" aria-label={copy.termsTitle}>
              {copy.terms.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="panel-service-page__section panel-service-page__section--pricing">
          <div className="container panel-service-page__section-inner">
            <div className="panel-service-page__section-head">
              <p className="panel-service-page__eyebrow">{copy.pricesLabel}</p>
              <h2>{copy.pricesTitle}</h2>
            </div>

            <div className="panel-service-page__price-table">
              {copy.prices.map((item) => (
                <article key={item.service} className="panel-service-page__price-row">
                  <strong>{item.service}</strong>
                  <span>{item.price}</span>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel-service-page__section panel-service-page__section--faq">
          <div className="container panel-service-page__section-inner">
            <div className="panel-service-page__section-head">
              <p className="panel-service-page__eyebrow">{copy.faqLabel}</p>
              <h2>{copy.faqTitle}</h2>
            </div>

            <div className="panel-service-page__faq-list">
              {service.faq.map((item) => (
                <details key={item.question.ru} className="panel-service-page__faq-item">
                  <summary>{t(locale, item.question)}</summary>
                  <p>{t(locale, item.answer)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="panel-request" className="panel-service-page__request">
          <div className="container panel-service-page__request-inner">
            <div className="panel-service-page__request-copy">
              <p className="panel-service-page__eyebrow">{copy.requestLabel}</p>
              <h2>{copy.requestTitle}</h2>
              <div className="panel-service-page__messengers" aria-label={copy.requestLabel}>
                <a href={whatsappHref}>WhatsApp</a>
                <a href={viberHref}>Viber</a>
                <a href={phoneHref}>{phone}</a>
              </div>
              <p className="panel-service-page__request-note">{copy.requestNote}</p>
            </div>

            <div className="panel-service-page__request-form">
              <LeadForm locale={locale} defaultServiceSlug={service.slug} variant="dark" attachmentsEnabled />
              <a href={requestPath} className="panel-service-page__fallback-link">
                {copy.contactFallback}
              </a>
            </div>
          </div>
        </section>

        <a href={whatsappHref} className="panel-service-page__fab">
          {copy.fab}
        </a>
      </div>
    </>
  );
}
