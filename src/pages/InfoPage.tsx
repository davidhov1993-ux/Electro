import { homeSeoContent, hs } from "@/src/content/homeSeo";
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

const pageAccents = {
  about: "blue",
  why: "steel",
  certificates: "amber",
} as const;

const pageImages = {
  about: sceneAssetLibrary.switchboard,
  why: sceneAssetLibrary.installation,
  certificates: sceneAssetLibrary.intercom,
} as const;

export function InfoPage({ pageKey }: { pageKey: InfoPageKey }) {
  const locale = usePageLocale();
  const page = staticPages[pageKey];
  const isAbout = pageKey === "about";
  const isWhy = pageKey === "why";
  const brandLabel = t(locale, brandName);

  const pageTitle =
    pageKey === "about"
      ? locale === "ru"
        ? `О компании «${brandLabel}» в Ереване | ${brandLabel}`
        : `«${brandLabel}» ընկերության մասին Երևանում | ${brandLabel}`
      : pageKey === "why"
        ? locale === "ru"
          ? `Почему выбирают ${brandLabel} в Ереване | ${brandLabel}`
          : `Ինչու են Երևանում ընտրում ${brandLabel}-ը | ${brandLabel}`
        : locale === "ru"
          ? `Сертификаты и материалы ${brandLabel} | ${brandLabel}`
          : `${brandLabel}-ի սերտիֆիկատներն ու նյութերը | ${brandLabel}`;

  const pageDescription = t(locale, page.description);

  const heroIntro = isAbout
    ? hs(locale, homeSeoContent.aboutBlock.paragraphs[0])
    : isWhy
      ? hs(locale, homeSeoContent.whyBlock.intro)
      : t(locale, page.intro);

  return (
    <>
      <Seo
        locale={locale}
        title={pageTitle}
        description={pageDescription}
        path={pagePath(locale, pageKey)}
        structuredData={[
          createOrganizationSchema(),
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: t(locale, page.title), path: pagePath(locale, pageKey) },
          ]),
        ]}
      />

      <section className={`signal-hero signal-hero--manifest signal-hero--${pageKey}`.trim()}>
        <div className="container signal-hero__grid signal-hero__grid--manifest">
          <div className="signal-hero__copy">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: t(locale, page.title) },
              ]}
            />
            <p className="eyebrow">{brandLabel}</p>
            <h1>{t(locale, page.title)}</h1>
            <p className="signal-hero__intro">{heroIntro}</p>
            <div className="signal-metrics signal-metrics--detail">
              {page.panels.map((panel) => (
                <article key={panel.title.ru} className="signal-metrics__item">
                  <span className={`signal-metrics__dot signal-metrics__dot--${pageAccents[pageKey]}`} />
                  <span>{t(locale, panel.title)}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="signal-hero__aside">
            <MediaPlaceholder
              accent={pageAccents[pageKey]}
              badge={t(locale, page.title)}
              title={t(locale, page.title)}
              caption={heroIntro}
              signals={page.panels.map((panel) => t(locale, panel.title))}
              variant="hero"
              image={pageImages[pageKey]}
            />
          </aside>
        </div>
      </section>

      {isAbout ? (
        <>
          <Section
            layout="wide"
            className="section--home-copy"
            eyebrow={locale === "ru" ? "О компании" : "Մեր մասին"}
            title={hs(locale, homeSeoContent.aboutBlock.title)}
          >
            <div className="copy-columns">
              {homeSeoContent.aboutBlock.paragraphs.map((paragraph) => (
                <p key={paragraph.ru}>{hs(locale, paragraph)}</p>
              ))}
            </div>
          </Section>

          <Section
            layout="wide"
            className="section--home-copy"
            eyebrow={locale === "ru" ? "Сложные объекты" : "Բարդ օբյեկտներ"}
            title={hs(locale, homeSeoContent.complexBlock.title)}
          >
            <div className="copy-stack">
              {homeSeoContent.complexBlock.paragraphs.map((paragraph) => (
                <p key={paragraph.ru}>{hs(locale, paragraph)}</p>
              ))}
            </div>
          </Section>

          <Section
            layout="wide"
            className="section--home-copy"
            eyebrow={locale === "ru" ? "Доверие" : "Վստահություն"}
            title={hs(locale, homeSeoContent.trustBlock.title)}
          >
            <div className="copy-stack">
              {homeSeoContent.trustBlock.paragraphs.map((paragraph) => (
                <p key={paragraph.ru}>{hs(locale, paragraph)}</p>
              ))}
            </div>
          </Section>
        </>
      ) : isWhy ? (
        <>
          <Section
            layout="wide"
            className="section--home-why"
            eyebrow={locale === "ru" ? "Почему выбирают нас" : "Ինչու են ընտրում"}
            title={hs(locale, homeSeoContent.whyBlock.title)}
            intro={hs(locale, homeSeoContent.whyBlock.intro)}
          >
            <div className="numbered-grid">
              {homeSeoContent.whyBlock.items.map((item, index) => (
                <article key={item.title.ru} className="numbered-grid__item">
                  <span className="numbered-grid__index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="numbered-grid__body">
                    <h3>{hs(locale, item.title)}</h3>
                    <p>{hs(locale, item.description)}</p>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section
            layout="wide"
            className="section--home-process"
            eyebrow={locale === "ru" ? "Как мы работаем" : "Ինչպես ենք աշխատում"}
            title={hs(locale, homeSeoContent.processBlock.title)}
          >
            <div className="timeline">
              {homeSeoContent.processBlock.steps.map((step, index) => (
                <article key={step.ru} className="timeline__item">
                  <span className="timeline__index">{String(index + 1).padStart(2, "0")}</span>
                  <p>{hs(locale, step)}</p>
                </article>
              ))}
            </div>
          </Section>
        </>
      ) : (
        <Section
          layout="wide"
          className={`section--info section--info-${pageKey}`.trim()}
          eyebrow={locale === "ru" ? "Материалы" : "Նյութեր"}
          title={locale === "ru" ? "Основа под реальные подтверждения и документы" : "Հիմք իրական հաստատումների և փաստաթղթերի համար"}
          intro={t(locale, page.description)}
        >
          <div className="document-wall">
            {page.panels.map((panel) => (
              <article key={panel.title.ru} className="document-wall__item">
                <p className="document-wall__eyebrow">{t(locale, page.title)}</p>
                <h3>{t(locale, panel.title)}</h3>
                <p>{t(locale, panel.description)}</p>
              </article>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
