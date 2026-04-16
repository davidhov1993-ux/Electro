import { useSearchParams } from "react-router-dom";

import { homeSeoContent, hs } from "@/src/content/homeSeo";
import { brandName, staticPages, t } from "@/src/content/site";
import { sceneAssetLibrary } from "@/src/content/serviceMedia";
import { LeadForm } from "@/src/components/LeadForm";
import { MediaPlaceholder } from "@/src/components/MediaPlaceholder";
import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Section } from "@/src/components/Section";
import { Seo } from "@/src/components/Seo";
import { usePageLocale } from "@/src/hooks/usePageLocale";
import { pagePath } from "@/src/lib/locale";
import { createBreadcrumbSchema, createLocalBusinessSchema } from "@/src/lib/seo";

export function RequestPage() {
  const [searchParams] = useSearchParams();
  const locale = usePageLocale();
  const brandLabel = t(locale, brandName);
  const page = staticPages.request;
  const urgent = searchParams.get("type") === "urgent";
  const requestedService = searchParams.get("service") ?? undefined;

  return (
    <>
      <Seo
        locale={locale}
        title={
          locale === "ru"
            ? `Заявка на электромонтаж в Ереване | ${brandLabel}`
            : `Էլեկտրամոնտաժի հայտ Երևանում | ${brandLabel}`
        }
        description={
          locale === "ru"
            ? "Оставить заявку на электромонтаж, щиты, автоматику, слаботочку, тёплый пол или аварийный выезд по Еревану."
            : "Թողնել հայտ էլեկտրամոնտաժի, վահանների, ավտոմատիկայի, թույլ հոսանքի, տաք հատակի կամ արտակարգ մեկնելու համար Երևանում։"
        }
        path={pagePath(locale, "request")}
        structuredData={[
          createLocalBusinessSchema(locale),
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: locale === "ru" ? "Заявка" : "Հայտ", path: pagePath(locale, "request") },
          ]),
        ]}
      />

      <section className={`signal-hero signal-hero--utility ${urgent ? "signal-hero--urgent" : ""}`.trim()}>
        <div className="container signal-hero__grid signal-hero__grid--utility">
          <div className="signal-hero__copy">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: locale === "ru" ? "Заявка" : "Հայտ" },
              ]}
            />
            <p className="eyebrow">
              {urgent
                ? locale === "ru"
                  ? "Срочный сценарий"
                  : "Շտապ սցենար"
                : brandLabel}
            </p>
            <h1>{hs(locale, homeSeoContent.ctaBlock.title)}</h1>
            <p className="signal-hero__intro">{hs(locale, homeSeoContent.ctaBlock.description)}</p>
            <div className="signal-metrics signal-metrics--detail">
              {page.panels.map((panel) => (
                <article key={panel.title.ru} className="signal-metrics__item">
                  <span className={`signal-metrics__dot signal-metrics__dot--${urgent ? "amber" : "blue"}`} />
                  <span>{t(locale, panel.title)}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="signal-hero__aside">
            <MediaPlaceholder
              accent={urgent ? "amber" : "blue"}
              badge={hs(locale, homeSeoContent.ctaBlock.title)}
              title={hs(locale, homeSeoContent.formBlock.title)}
              caption={hs(locale, homeSeoContent.formBlock.description)}
              signals={page.panels.map((panel) => t(locale, panel.title))}
              variant="hero"
              image={urgent ? sceneAssetLibrary.emergency : sceneAssetLibrary.laptop}
            />
          </aside>
        </div>
      </section>

      <Section
        layout="wide"
        className="section--utility section--utility-request"
        eyebrow={locale === "ru" ? "Заявка" : "Հայտ"}
        title={hs(locale, homeSeoContent.formBlock.title)}
        intro={t(locale, page.intro)}
      >
        <div className="utility-shell utility-shell--form-first">
          <div className="utility-shell__form">
            <LeadForm
              key={`${locale}-${requestedService ?? "none"}-${urgent ? "urgent" : "normal"}`}
              locale={locale}
              urgent={urgent}
              defaultServiceSlug={requestedService}
            />
          </div>

          <div className="utility-shell__notes">
            {page.panels.map((panel) => (
              <article key={panel.title.ru} className="utility-shell__note">
                <p className="utility-shell__label">{t(locale, panel.title)}</p>
                <p>{t(locale, panel.description)}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
