import { NavLink } from "react-router-dom";

import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Seo } from "@/src/components/Seo";
import { brandName, t } from "@/src/content/site";
import { pagePath, servicePath } from "@/src/lib/locale";
import { createBreadcrumbSchema, createServiceSchema } from "@/src/lib/seo";
import type { Locale, ServiceEntry } from "@/src/types";

const whatsappHref = "https://wa.me/37499586469";

interface InstallationPageLocaleCopy {
  eyebrow: string;
  summary: string;
  request: string;
  whatsapp: string;
  objectRail: string[];
  routeSignals: string[];
  startLabel: string;
  startTitle: string;
  startItems: string[];
  scopeLabel: string;
  scopeTitle: string;
  scopeItems: string[];
  logicLabel: string;
  logicTitle: string;
  logicItems: string[];
  footerLabel: string;
  footerTitle: string;
  footerMeta: string;
}

const installationPageCopy: Record<Locale, InstallationPageLocaleCopy> = {
  ru: {
    eyebrow: "Линии, группы, подключение",
    summary:
      "Электромонтаж в квартирах, домах, офисах и коммерческих помещениях. Прокладываем линии, разводим группы, ставим щит, подключаем розетки, выключатели, свет и оборудование.",
    request: "Оставить заявку",
    whatsapp: "WhatsApp",
    objectRail: ["Квартира", "Дом", "Офис", "Коммерческое помещение"],
    routeSignals: ["Линии", "Группы", "Щит", "Подключение"],
    startLabel: "Типовые задачи",
    startTitle: "Что обычно делают по электромонтажу",
    startItems: [
      "электрика делается с нуля",
      "старая проводка меняется полностью",
      "объект уходит в капитальный ремонт",
      "нужно собрать новые линии и группы",
      "под технику и оборудование нужны отдельные подключения",
      "помещение меняет назначение и требует новой схемы",
      "после черновых работ нужна чистая сборка по плану",
      "нужна понятная база под свет, щит и дальнейшие системы",
    ],
    scopeLabel: "Состав работ",
    scopeTitle: "Что входит в работу",
    scopeItems: [
      "прокладка кабеля и монтаж линий",
      "сборка групп по нагрузке",
      "монтаж розеток, выключателей и выводов",
      "подключение света и оборудования",
      "сборка и подключение щита",
      "проверка и тестирование после монтажа",
    ],
    logicLabel: "Что закладываем",
    logicTitle: "Что предусматриваем заранее",
    logicItems: [
      "разделение на группы по назначению",
      "запас по мощности",
      "защиту линий: автоматы, УЗО, реле напряжения",
      "доступ к щиту для обслуживания",
      "резерв под технику и свет",
      "трассы под штукатурку без временных решений",
    ],
    footerLabel: "Заявка",
    footerTitle: "Электромонтаж под ключ",
    footerMeta: "Электромонтаж в Ереване",
  },
  hy: {
    eyebrow: "Գծեր, խմբեր, միացում",
    summary:
      "Էլեկտրամոնտաժ բնակարաններում, տներում, գրասենյակներում և կոմերցիոն տարածքներում։ Անցկացնում ենք գծեր, բաշխում խմբերը, տեղադրում վահան, միացնում վարդակները, անջատիչները, լույսը և սարքավորումները։",
    request: "Թողնել հայտ",
    whatsapp: "WhatsApp",
    objectRail: ["Բնակարան", "Տուն", "Գրասենյակ", "Կոմերցիոն տարածք"],
    routeSignals: ["Գծեր", "Խմբեր", "Վահան", "Միացում"],
    startLabel: "Տիպիկ խնդիրներ",
    startTitle: "Ինչ են սովորաբար անում էլեկտրամոնտաժով",
    startItems: [
      "էլեկտրիկան արվում է զրոյից",
      "հին լարանցումը փոխվում է ամբողջությամբ",
      "օբյեկտը գնում է կապիտալ վերանորոգման",
      "պետք է հավաքել նոր գծեր և խմբեր",
      "տեխնիկայի և սարքավորման համար պետք են առանձին միացումներ",
      "տարածքը փոխում է նշանակությունը և պահանջում նոր սխեմա",
      "սև աշխատանքներից հետո պետք է մաքուր հավաքում ըստ պլանի",
      "պետք է հստակ հիմք լույսի, վահանի և հետագա համակարգերի համար",
    ],
    scopeLabel: "Աշխատանքների կազմ",
    scopeTitle: "Ինչ է մտնում աշխատանքի մեջ",
    scopeItems: [
      "մալուխի անցկացում և գծերի մոնտաժ",
      "խմբերի հավաքում ըստ ծանրաբեռնվածության",
      "վարդակների, անջատիչների և ելքերի մոնտաժ",
      "լուսավորության և սարքավորման միացում",
      "վահանի հավաքում և միացում",
      "ստուգում և թեստավորում մոնտաժից հետո",
    ],
    logicLabel: "Ինչ ենք դնում",
    logicTitle: "Ինչ ենք նախատեսում նախապես",
    logicItems: [
      "խմբերի բաժանում ըստ նշանակության",
      "հզորության պաշար",
      "գծերի պաշտպանություն՝ ավտոմատներ, ՈՒԶՕ, լարման ռելեներ",
      "մուտք վահանին՝ սպասարկման համար",
      "պահուստ տեխնիկայի և լույսի համար",
      "գծեր՝ առանց ժամանակավոր լուծումների",
    ],
    footerLabel: "Հայտ",
    footerTitle: "Էլեկտրամոնտաժ ամբողջությամբ",
    footerMeta: "Էլեկտրամոնտաժ Երևանում",
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
  const requestPath = `${pagePath(locale, "contacts")}?service=${service.slug}`;

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
            { name: locale === "ru" ? "Услуги" : "Ծառայություններ", path: pagePath(locale, "services") },
            { name: t(locale, service.title), path: servicePagePath },
          ]),
          createServiceSchema(locale, service, servicePagePath),
        ]}
      />

      <div className="installation-service-page">
        <section className="installation-service-page__hero">
          <div className="container installation-service-page__hero-inner">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: locale === "ru" ? "Услуги" : "Ծառայություններ", to: pagePath(locale, "services") },
                { label: t(locale, service.title) },
              ]}
            />

            <div className="installation-service-page__hero-grid">
              <div className="installation-service-page__hero-copy">
                <p className="installation-service-page__eyebrow">{copy.eyebrow}</p>
                <h1>{t(locale, service.title)}</h1>
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
                  <div key={item} className="installation-service-page__route-row">
                    <span className="installation-service-page__route-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="installation-service-page__route-line" />
                    <span className="installation-service-page__route-label">{item}</span>
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
              <p className="installation-service-page__section-label">{copy.startLabel}</p>
              <h2>{copy.startTitle}</h2>
            </div>

            <div className="installation-service-page__columns">
              {splitList(copy.startItems).map((column, index) => (
                <ul key={`${copy.startTitle}-${index}`} className="installation-service-page__list">
                  {column.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="installation-service-page__section installation-service-page__section--scope">
          <div className="container installation-service-page__section-inner">
            <div className="installation-service-page__split">
              <div className="installation-service-page__split-copy">
                <p className="installation-service-page__section-label">{copy.scopeLabel}</p>
                <h2>{copy.scopeTitle}</h2>
              </div>

              <ul className="installation-service-page__list installation-service-page__list--scope">
                {copy.scopeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="installation-service-page__section installation-service-page__section--logic">
          <div className="container installation-service-page__section-inner">
            <div className="installation-service-page__section-head">
              <p className="installation-service-page__section-label">{copy.logicLabel}</p>
              <h2>{copy.logicTitle}</h2>
            </div>

            <div className="installation-service-page__logic-grid">
              {copy.logicItems.map((item) => (
                <div key={item} className="installation-service-page__logic-item">
                  <span className="installation-service-page__logic-mark" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
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

function splitList(items: string[]) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}
