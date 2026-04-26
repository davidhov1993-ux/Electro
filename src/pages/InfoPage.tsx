import { brandName, staticPages, t } from "@/src/content/site";
import { sceneAssetLibrary } from "@/src/content/serviceMedia";
import { MediaPlaceholder } from "@/src/components/MediaPlaceholder";
import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Section } from "@/src/components/Section";
import { Seo } from "@/src/components/Seo";
import { usePageLocale } from "@/src/hooks/usePageLocale";
import { pagePath } from "@/src/lib/locale";
import { createBreadcrumbSchema, createOrganizationSchema } from "@/src/lib/seo";
import type { InfoPageKey } from "@/src/types";

const aboutCopy = {
  ru: {
    eyebrow: "Ереван",
    body: [
      "Делаем электромонтаж и подключаем инженерные системы в Ереване. Берём квартиры в ремонте, частные дома, офисы, магазины и небольшие коммерческие объекты.",
      "Работаем небольшой командой. На объект приходит электрик с инструментом, а не мастер «на час». Если задача сложная — приедем замерить и посчитать заранее.",
      "Гарантия на работы — 12 месяцев. По аварийным вызовам выезжаем в первую очередь.",
    ],
    scopeTitle: "Чем занимаемся",
    scope: [
      "Электромонтаж: проводка, кабельные трассы, розетки и выключатели",
      "Электрощиты: сборка, замена, реле напряжения и УЗО",
      "Освещение: люстры, споты, треки, LED, фасадный свет",
      "Видеонаблюдение и домофоны",
      "Слаботочка: интернет, сигнальные линии",
      "Тёплый пол",
      "Аварийный выезд",
    ],
    howTitle: "Как это обычно проходит",
    how: [
      "Вы пишете в WhatsApp или звоните, описываете задачу. Если можно ответить по фото — отвечаем по фото.",
      "Если нужен замер — договариваемся о времени и приезжаем. По несложным работам сразу называем стоимость.",
      "Делаем работу, проверяем, показываем результат. Расчёт после приёмки.",
    ],
  },
  hy: {
    eyebrow: "Երևան",
    body: [
      "Անում ենք էլեկտրամոնտաժ և միացնում ինժեներական համակարգեր Երևանում։ Վերցնում ենք վերանորոգման բնակարաններ, առանձնատներ, գրասենյակներ, խանութներ և փոքր կոմերցիոն օբյեկտներ։",
      "Աշխատում ենք փոքր թիմով։ Օբյեկտ է գալիս էլեկտրիկ՝ գործիքով, ոչ թե «մեկ ժամվա վարպետ»։ Բարդ խնդրի դեպքում նախապես գալիս ենք չափել և հաշվարկել։",
      "Աշխատանքի երաշխիք՝ 12 ամիս։ Արտակարգ կանչերին մեկնում ենք առաջնահերթ։",
    ],
    scopeTitle: "Ինչով ենք զբաղվում",
    scope: [
      "Էլեկտրամոնտաժ՝ լարանցում, մալուխային գծեր, վարդակներ և անջատիչներ",
      "Էլեկտրական վահաններ՝ հավաքում, փոխարինում, լարման ռելեներ և ՈՒԶՕ",
      "Լուսավորություն՝ ջահեր, սպոտեր, թրեքեր, LED, ֆասադի լույս",
      "Տեսահսկում և դոմոֆոններ",
      "Թույլ հոսանք՝ ինտերնետ, ազդանշանային գծեր",
      "Տաք հատակ",
      "Արտակարգ մեկնում",
    ],
    howTitle: "Ինչպես է սովորաբար ընթանում",
    how: [
      "Գրում եք WhatsApp կամ զանգահարում, նկարագրում խնդիրը։ Եթե կարելի է պատասխանել լուսանկարով՝ պատասխանում ենք լուսանկարով։",
      "Չափման անհրաժեշտության դեպքում պայմանավորվում ենք ժամի շուրջ և գալիս։ Պարզ աշխատանքների դեպքում արժեքը նշում ենք անմիջապես։",
      "Կատարում ենք աշխատանքը, ստուգում, ցույց տալիս արդյունքը։ Վճարումը՝ ընդունումից հետո։",
    ],
  },
};

export function InfoPage({ pageKey }: { pageKey: InfoPageKey }) {
  const locale = usePageLocale();
  const page = staticPages[pageKey];
  const brandLabel = t(locale, brandName);
  const copy = aboutCopy[locale];

  const pageTitle =
    locale === "ru"
      ? `О компании ${brandLabel} в Ереване | ${brandLabel}`
      : `${brandLabel} ընկերության մասին Երևանում | ${brandLabel}`;

  return (
    <>
      <Seo
        locale={locale}
        title={pageTitle}
        description={t(locale, page.description)}
        path={pagePath(locale, pageKey)}
        structuredData={[
          createOrganizationSchema(),
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: t(locale, page.title), path: pagePath(locale, pageKey) },
          ]),
        ]}
      />

      <section className="signal-hero signal-hero--manifest signal-hero--about">
        <div className="container signal-hero__grid signal-hero__grid--manifest">
          <div className="signal-hero__copy">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: t(locale, page.title) },
              ]}
            />
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{t(locale, page.title)}</h1>
            <p className="signal-hero__intro">{t(locale, page.intro)}</p>
            <div className="signal-metrics signal-metrics--detail">
              {page.panels.map((panel) => (
                <article key={panel.title.ru} className="signal-metrics__item">
                  <span className="signal-metrics__dot signal-metrics__dot--blue" />
                  <span>{t(locale, panel.title)}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="signal-hero__aside">
            <MediaPlaceholder
              accent="blue"
              badge={t(locale, page.title)}
              title={t(locale, page.title)}
              caption={t(locale, page.intro)}
              signals={page.panels.map((panel) => t(locale, panel.title))}
              variant="hero"
              image={sceneAssetLibrary.switchboard}
            />
          </aside>
        </div>
      </section>

      <Section
        layout="wide"
        className="section--home-copy"
        eyebrow={locale === "ru" ? "О компании" : "Մեր մասին"}
        title={t(locale, page.title)}
      >
        <div className="copy-stack">
          {copy.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section
        layout="wide"
        className="section--home-copy"
        eyebrow={locale === "ru" ? "Услуги" : "Ծառայություններ"}
        title={copy.scopeTitle}
      >
        <ul className="copy-stack">
          {copy.scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section
        layout="wide"
        className="section--home-process"
        eyebrow={locale === "ru" ? "Процесс" : "Գործընթաց"}
        title={copy.howTitle}
      >
        <div className="timeline">
          {copy.how.map((step, index) => (
            <article key={step} className="timeline__item">
              <span className="timeline__index">{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
