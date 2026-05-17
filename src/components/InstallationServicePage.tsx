import { NavLink } from "react-router-dom";

import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Seo } from "@/src/components/Seo";
import { brandName, t } from "@/src/content/site";
import { pagePath, serviceAlternatePaths, servicePath, servicesAnchor } from "@/src/lib/locale";
import { createBreadcrumbSchema, createFaqSchema, createServiceSchema } from "@/src/lib/seo";
import type { Locale, ServiceEntry } from "@/src/types";

const whatsappHref = "https://wa.me/37499586469";

interface InstallationInfoItem {
  title: string;
  text: string;
}

interface InstallationPriceItem {
  label: string;
  value: string;
  note: string;
}

interface InstallationPageLocaleCopy {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  eyebrow: string;
  h1: string;
  h1Lines: string[];
  lead: string;
  summary: string;
  request: string;
  whatsapp: string;
  objectRail: string[];
  routeSignals: InstallationInfoItem[];
  servicesLabel: string;
  servicesTitle: string;
  servicesItems: InstallationInfoItem[];
  processLabel: string;
  processTitle: string;
  processItems: InstallationInfoItem[];
  trustLabel: string;
  trustTitle: string;
  trustItems: InstallationInfoItem[];
  materialsLabel: string;
  materialsTitle: string;
  materialsItems: InstallationInfoItem[];
  areasLabel: string;
  areasTitle: string;
  areasItems: string[];
  pricesLabel: string;
  pricesTitle: string;
  priceItems: InstallationPriceItem[];
  pricesNote: string;
  footerLabel: string;
  footerTitle: string;
  footerMeta: string;
}

const installationPageCopy: Record<Locale, InstallationPageLocaleCopy> = {
  ru: {
    seoTitle: "Электромонтажные работы в Ереване | Замена проводки",
    seoDescription:
      "Профессиональный электромонтаж в квартирах и частных домах. Замена проводки, проектирование и монтаж в Ереване. Качественные материалы и гарантия.",
    keywords: "электромонтаж, замена проводки, разводка электрики, ремонт квартиры Ереван",
    eyebrow: "Электромонтаж под ключ",
    h1: "Электромонтажные работы и замена проводки в Ереване",
    h1Lines: ["Электромонтажные", "работы и замена", "проводки в Ереване"],
    lead: "Надежная электрика - фундамент безопасности вашего дома.",
    summary:
      "Будь то ремонт в новостройке или модернизация старого фонда, качественный электромонтаж определяет, насколько комфортной и безопасной будет ваша жизнь. Мы предлагаем полный цикл работ: от штробления стен до установки чистовой электрики.",
    request: "Оставить заявку",
    whatsapp: "WhatsApp",
    objectRail: ["Новостройки", "Квартиры", "Частные дома", "Ремонт под ключ", "Замена проводки"],
    routeSignals: [
      { title: "Замер", text: "объект и нагрузка" },
      { title: "Проект", text: "трассы и группы" },
      { title: "Монтаж", text: "кабель, точки, щит" },
      { title: "Проверка", text: "тест перед сдачей" },
    ],
    servicesLabel: "Состав работ",
    servicesTitle: "Что входит в наши услуги",
    servicesItems: [
      {
        title: "Полная замена электропроводки",
        text: "Демонтаж старой алюминиевой проводки и прокладка новой медной с учетом современных нагрузок.",
      },
      {
        title: "Монтаж электрики в новостройках",
        text: "Разводка кабеля с нуля, установка подрозетников и сборка щита под ключ.",
      },
      {
        title: "Проектирование трасс",
        text: "Профессиональный расчет сечения кабеля и подбор автоматики для защиты вашей техники.",
      },
      {
        title: "Установка фурнитуры",
        text: "Монтаж розеток, выключателей, терморегуляторов и проходных переключателей.",
      },
    ],
    processLabel: "Процесс",
    processTitle: "Как мы ведем электромонтаж",
    processItems: [
      {
        title: "Консультация и замер",
        text: "Выезжаем на объект, фиксируем точки, технику, нагрузки и ограничения по ремонту.",
      },
      {
        title: "Проектирование",
        text: "Определяем отдельные линии для стиральной машины, кондиционера, кухни, теплого пола и света.",
      },
      {
        title: "Черновой монтаж",
        text: "Выполняем штробление, прокладываем кабели, ставим подрозетники и собираем щит.",
      },
      {
        title: "Проверка",
        text: "Тестируем линии и защиту до чистовой отделки и передаем понятную схему.",
      },
    ],
    trustLabel: "Надежность",
    trustTitle: "Почему стоит доверить монтаж нам",
    trustItems: [
      {
        title: "Соблюдение стандартов",
        text: "Работаем строго по нормам безопасности, чтобы избежать перегревов и замыканий.",
      },
      {
        title: "Чистота и аккуратность",
        text: "Используем штроборезы с пылесосом, чтобы минимизировать количество строительной пыли.",
      },
      {
        title: "Прозрачная смета",
        text: "Вы заранее знаете стоимость материалов и работ. Никаких скрытых платежей в процессе.",
      },
    ],
    materialsLabel: "Материалы",
    materialsTitle: "На чем собираем систему",
    materialsItems: [
      {
        title: "Автоматика и фурнитура",
        text: "Подбираем решения уровня Schneider Electric, Legrand и сопоставимые по качеству серии.",
      },
      {
        title: "Медный кабель",
        text: "Используем кабель с правильным сечением под расчетную нагрузку и отдельные линии.",
      },
      {
        title: "Защита линий",
        text: "Закладываем автоматы, УЗО, дифавтоматы и реле напряжения там, где это необходимо.",
      },
    ],
    areasLabel: "География",
    areasTitle: "Работаем по районам Еревана",
    areasItems: ["Малый Центр", "Кентрон", "Давташен", "Аван", "Арабкир", "Нор Норк"],
    pricesLabel: "Смета",
    pricesTitle: "Ориентиры для расчета",
    priceItems: [
      {
        label: "1-комнатная квартира",
        value: "после замера",
        note: "зависит от количества точек, щита и материала стен",
      },
      {
        label: "Точка: розетка или выключатель",
        value: "по смете",
        note: "учитываем подрозетник, кабель, штробу и чистовой монтаж",
      },
      {
        label: "Штробление бетона",
        value: "по метражу",
        note: "рассчитывается после осмотра стен и трасс",
      },
    ],
    pricesNote: "Точные цифры фиксируем после замера и согласования материалов.",
    footerLabel: "Заявка",
    footerTitle: "Нужен электромонтаж под ремонт или новостройку?",
    footerMeta: "Электромонтаж в Ереване с гарантией",
  },
  hy: {
    seoTitle: "Էլեկտրոմոնտաժային աշխատանքներ Երևանում | Լարերի փոխարինում",
    seoDescription:
      "Պրոֆեսիոնալ էլեկտրոմոնտաժ բնակարաններում և առանձնատներում: Լարերի փոխարինում, նախագծում և տեղադրում: Որակյալ աշխատանք և երաշխիք:",
    keywords: "էլեկտրոմոնտաժ, լարերի փոխում, էլեկտրականության անցկացում, բնակարանի վերանորոգում",
    eyebrow: "Էլեկտրոմոնտաժ ամբողջությամբ",
    h1: "Էլեկտրոմոնտաժային աշխատանքներ և լարանցում Երևանում",
    h1Lines: ["Էլեկտրոմոնտաժային", "աշխատանքներ և", "լարանցում Երևանում"],
    lead: "Որակյալ էլեկտրականություն՝ ձեր տան հարմարավետության և անվտանգության հիմքը:",
    summary:
      "Նոր բնակարանի վերանորոգումը կամ հին լարերի փոխարինումը պահանջում է պրոֆեսիոնալ մոտեցում: Մենք իրականացնում ենք ցանկացած բարդության էլեկտրոմոնտաժային աշխատանքներ՝ պահպանելով անվտանգության բոլոր միջազգային նորմերը (ՊՈՒԷ/ԳՈՍՏ):",
    request: "Թողնել հայտ",
    whatsapp: "WhatsApp",
    objectRail: ["Նորակառույցներ", "Բնակարաններ", "Առանձնատներ", "Վերանորոգում", "Լարերի փոխում"],
    routeSignals: [
      { title: "Չափագրում", text: "օբյեկտ և հզորություն" },
      { title: "Նախագիծ", text: "գծեր և խմբեր" },
      { title: "Մոնտաժ", text: "մալուխ, կետեր, վահան" },
      { title: "Ստուգում", text: "թեստավորում հանձնելուց առաջ" },
    ],
    servicesLabel: "Ծառայություններ",
    servicesTitle: "Մեր ծառայությունները ներառում են",
    servicesItems: [
      {
        title: "Լարերի ամբողջական փոխարինում",
        text: "Հին ալյումինե լարերի փոխարինում ժամանակակից պղնձե մալուխներով:",
      },
      {
        title: "Էլեկտրոմոնտաժ նորակառույցներում",
        text: "Լարանցում զրոյից՝ ըստ ձեր դիզայն-նախագծի կամ մեր առաջարկած սխեմայի:",
      },
      {
        title: "Վարդակների և անջատիչների տեղադրում",
        text: "Կետերի ճիշտ տեղաբաշխում՝ առավելագույն հարմարավետության համար:",
      },
      {
        title: "Բաշխիչ տուփերի և վահանակների մոնտաժ",
        text: "Հզորության ճիշտ հաշվարկ և ծանրաբեռնվածության բաշխում:",
      },
    ],
    processLabel: "Գործընթաց",
    processTitle: "Ինչպե՞ս ենք մենք աշխատում",
    processItems: [
      {
        title: "Խորհրդատվություն և չափագրում",
        text: "Այցելում ենք օբյեկտ, կատարում հաշվարկներ և կազմում նախահաշիվ:",
      },
      {
        title: "Նախագծում",
        text: "Որոշում ենք հզոր սարքերի՝ լվացքի մեքենա, օդորակիչ և այլ գծերը:",
      },
      {
        title: "Մոնտաժ",
        text: "Կատարում ենք պատերի շտրոբավորում, մալուխների անցկացում և վահանակի հավաքում:",
      },
      {
        title: "Ստուգում",
        text: "Թեստավորում ենք համակարգը նախքան հանձնելը:",
      },
    ],
    trustLabel: "Վստահություն",
    trustTitle: "Ինչու վստահել մոնտաժը մեզ",
    trustItems: [
      {
        title: "Ստանդարտների պահպանում",
        text: "Աշխատում ենք անվտանգության նորմերով՝ գերտաքացումից և կարճ միացումից խուսափելու համար:",
      },
      {
        title: "Մաքրություն և ճշտապահություն",
        text: "Օգտագործում ենք փոշեկուլով շտրոբորեզ, որպեսզի նվազեցնենք շինարարական փոշին:",
      },
      {
        title: "Թափանցիկ նախահաշիվ",
        text: "Նախապես համաձայնեցնում ենք նյութերի և աշխատանքի արժեքը՝ առանց թաքնված վճարների:",
      },
    ],
    materialsLabel: "Նյութեր",
    materialsTitle: "Ինչ նյութերով ենք աշխատում",
    materialsItems: [
      {
        title: "Ավտոմատիկա և ֆուրնիտուրա",
        text: "Ընտրում ենք Schneider Electric, Legrand կամ որակով համարժեք լուծումներ:",
      },
      {
        title: "Պղնձե մալուխ",
        text: "Օգտագործում ենք ճիշտ հատույթով մալուխ՝ հաշվարկված ծանրաբեռնվածության համար:",
      },
      {
        title: "Գծերի պաշտպանություն",
        text: "Անհրաժեշտության դեպքում տեղադրում ենք ավտոմատներ, ՈՒԶՕ և լարման ռելեներ:",
      },
    ],
    areasLabel: "Տարածքներ",
    areasTitle: "Աշխատում ենք Երևանի շրջաններում",
    areasItems: ["Փոքր Կենտրոն", "Կենտրոն", "Դավթաշեն", "Ավան", "Արաբկիր", "Նոր Նորք"],
    pricesLabel: "Նախահաշիվ",
    pricesTitle: "Հաշվարկի կողմնորոշիչներ",
    priceItems: [
      {
        label: "1 սենյականոց բնակարան",
        value: "չափագրումից հետո",
        note: "կախված է կետերի քանակից, վահանից և պատերի նյութից",
      },
      {
        label: "Կետ՝ վարդակ կամ անջատիչ",
        value: "նախահաշվով",
        note: "հաշվի ենք առնում ենթատուփը, մալուխը, ակոսը և մոնտաժը",
      },
      {
        label: "Բետոնի շտրոբավորում",
        value: "մետրաժով",
        note: "հաշվարկվում է պատերի և գծերի զննումից հետո",
      },
    ],
    pricesNote: "Ճշգրիտ արժեքը ֆիքսվում է չափագրումից և նյութերի համաձայնեցումից հետո:",
    footerLabel: "Հայտ",
    footerTitle: "Պե՞տք է էլեկտրոմոնտաժ վերանորոգման կամ նորակառույցի համար",
    footerMeta: "Էլեկտրոմոնտաժ Երևանում երաշխիքով",
  },
};

interface InstallationServicePageProps {
  locale: Locale;
  service: ServiceEntry;
}

export function InstallationServicePage({ locale, service }: InstallationServicePageProps) {
  const brandLabel = t(locale, brandName);
  const copy = installationPageCopy[locale];
  const servicePagePath = servicePath(locale, service.slug);
  const alternatePaths = serviceAlternatePaths(service.slug);
  const requestPath = `${pagePath(locale, "contacts")}?service=${service.slug}`;
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

      <div className="installation-service-page">
        <section className="installation-service-page__hero">
          <div className="container installation-service-page__hero-inner">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: locale === "ru" ? "Услуги" : "Ծառայություններ", to: servicesAnchor(locale) },
                { label: copy.eyebrow },
              ]}
            />

            <div className="installation-service-page__hero-grid">
              <div className="installation-service-page__hero-copy">
                <p className="installation-service-page__eyebrow">{copy.eyebrow}</p>
                <h1 aria-label={copy.h1}>
                  {copy.h1Lines.map((line) => (
                    <span key={line} className="installation-service-page__hero-title-line">
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="installation-service-page__lead">{copy.lead}</p>
                <p className="installation-service-page__summary">{copy.summary}</p>

                <div className="installation-service-page__actions">
                  <NavLink
                    to={requestPath}
                    className="button installation-service-page__button installation-service-page__button--primary"
                  >
                    {copy.request}
                  </NavLink>
                  <a
                    href={whatsappHref}
                    className="button installation-service-page__button installation-service-page__button--ghost"
                  >
                    {copy.whatsapp}
                  </a>
                </div>
              </div>

              <div className="installation-service-page__route-board" aria-hidden="true">
                {copy.routeSignals.map((item, index) => (
                  <div key={item.title} className="installation-service-page__route-row">
                    <span className="installation-service-page__route-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="installation-service-page__route-line" />
                    <span className="installation-service-page__route-label">
                      <strong>{item.title}</strong>
                      <small>{item.text}</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="installation-service-page__object-rail">
              {copy.objectRail.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="installation-service-page__section">
          <div className="container installation-service-page__section-inner">
            <div className="installation-service-page__section-head">
              <p className="installation-service-page__section-label">{copy.servicesLabel}</p>
              <h2>{copy.servicesTitle}</h2>
            </div>

            <div className="installation-service-page__columns">
              {splitItems(copy.servicesItems).map((column, index) => (
                <ul key={`${copy.servicesTitle}-${index}`} className="installation-service-page__list">
                  {column.map((item) => (
                    <li key={item.title}>
                      <strong className="installation-service-page__list-title">{item.title}</strong>
                      <span className="installation-service-page__list-text">{item.text}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="installation-service-page__section installation-service-page__section--process">
          <div className="container installation-service-page__section-inner">
            <div className="installation-service-page__section-head">
              <p className="installation-service-page__section-label">{copy.processLabel}</p>
              <h2>{copy.processTitle}</h2>
            </div>

            <ol className="installation-service-page__process-grid">
              {copy.processItems.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="installation-service-page__section installation-service-page__section--scope">
          <div className="container installation-service-page__section-inner">
            <div className="installation-service-page__split">
              <div className="installation-service-page__split-copy">
                <p className="installation-service-page__section-label">{copy.trustLabel}</p>
                <h2>{copy.trustTitle}</h2>
              </div>

              <ul className="installation-service-page__list installation-service-page__list--scope">
                {copy.trustItems.map((item) => (
                  <li key={item.title}>
                    <strong className="installation-service-page__list-title">{item.title}</strong>
                    <span className="installation-service-page__list-text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="installation-service-page__section installation-service-page__section--materials">
          <div className="container installation-service-page__section-inner">
            <div className="installation-service-page__section-head">
              <p className="installation-service-page__section-label">{copy.materialsLabel}</p>
              <h2>{copy.materialsTitle}</h2>
            </div>

            <div className="installation-service-page__materials-layout">
              <div className="installation-service-page__materials-list">
                {copy.materialsItems.map((item) => (
                  <article key={item.title} className="installation-service-page__material-item">
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>

              <aside className="installation-service-page__areas-panel">
                <p className="installation-service-page__section-label">{copy.areasLabel}</p>
                <h3>{copy.areasTitle}</h3>
                <div className="installation-service-page__areas-list">
                  {copy.areasItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="installation-service-page__section installation-service-page__section--prices">
          <div className="container installation-service-page__section-inner">
            <div className="installation-service-page__section-head">
              <p className="installation-service-page__section-label">{copy.pricesLabel}</p>
              <h2>{copy.pricesTitle}</h2>
            </div>

            <div className="installation-service-page__price-table">
              {copy.priceItems.map((item) => (
                <div key={item.label} className="installation-service-page__price-row">
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>

            <p className="installation-service-page__prices-note">{copy.pricesNote}</p>
          </div>
        </section>

        <section className="installation-service-page__final">
          <div className="container installation-service-page__final-inner">
            <div className="installation-service-page__final-copy">
              <p className="installation-service-page__section-label">{copy.footerLabel}</p>
              <h2>{copy.footerTitle}</h2>
              <p className="installation-service-page__final-meta">{copy.footerMeta}</p>
            </div>

            <div className="installation-service-page__actions installation-service-page__actions--final">
              <NavLink
                to={requestPath}
                className="button installation-service-page__button installation-service-page__button--primary"
              >
                {copy.request}
              </NavLink>
              <a
                href={whatsappHref}
                className="button installation-service-page__button installation-service-page__button--ghost"
              >
                {copy.whatsapp}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function splitItems<T>(items: T[]) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}
