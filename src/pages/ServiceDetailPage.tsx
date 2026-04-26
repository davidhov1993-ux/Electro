import { NavLink, useParams } from "react-router-dom";

import { brandName, getRelatedServices, getService, t, uiCopy } from "@/src/content/site";
import { EmergencyServicePage } from "@/src/components/EmergencyServicePage";
import { InstallationServicePage } from "@/src/components/InstallationServicePage";
import { LightingServicePage } from "@/src/components/LightingServicePage";
import { VideoSurveillanceServicePage } from "@/src/components/VideoSurveillanceServicePage";
import { getServiceMedia } from "@/src/content/serviceMedia";
import { LeadForm } from "@/src/components/LeadForm";
import { MediaPlaceholder } from "@/src/components/MediaPlaceholder";
import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Section } from "@/src/components/Section";
import { Seo } from "@/src/components/Seo";
import { usePageLocale } from "@/src/hooks/usePageLocale";
import { createBreadcrumbSchema, createFaqSchema, createServiceSchema } from "@/src/lib/seo";
import { NotFoundPage } from "@/src/pages/NotFoundPage";
import { pagePath, servicePath } from "@/src/lib/locale";

export function ServiceDetailPage() {
  const params = useParams();
  const locale = usePageLocale();
  const brandLabel = t(locale, brandName);
  const service = getService(params.slug);

  if (!service) {
    return <NotFoundPage locale={locale} />;
  }

  if (service.slug === "avariinyi-elektrik") {
    return <EmergencyServicePage locale={locale} service={service} />;
  }

  if (service.slug === "elektromontazh") {
    return <InstallationServicePage locale={locale} service={service} />;
  }

  if (service.slug === "osveshchenie") {
    return <LightingServicePage locale={locale} service={service} />;
  }

  if (service.slug === "videonablyudenie" && locale === "ru") {
    return <VideoSurveillanceServicePage locale={locale} service={service} />;
  }

  const related = getRelatedServices(service.slug, service.group);
  const media = getServiceMedia(service.slug);
  const requestBasePath = pagePath(locale, "contacts");
  const requestPath = `${requestBasePath}?service=${service.slug}`;
  const servicePagePath = servicePath(locale, service.slug);
  const faqSchema = createFaqSchema(locale, service.faq);

  return (
    <>
      <Seo
        locale={locale}
        title={`${t(locale, service.title)} ${locale === "ru" ? "в Ереване" : "Երևանում"} | ${brandLabel}`}
        description={
          locale === "ru"
            ? `${t(locale, service.summary)} Работаем по Еревану, выезд до 1 часа.`
            : `${t(locale, service.summary)} Աշխատում ենք Երևանում, մեկնումը մինչև 1 ժամում։`
        }
        path={servicePagePath}
        structuredData={[
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: locale === "ru" ? "Услуги" : "Ծառայություններ", path: pagePath(locale, "services") },
            { name: t(locale, service.title), path: servicePagePath },
          ]),
          createServiceSchema(locale, service, servicePagePath),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <section className="signal-hero signal-hero--detail">
        <div className="container signal-hero__grid signal-hero__grid--detail">
          <div className="signal-hero__copy">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: locale === "ru" ? "Услуги" : "Ծառայություններ", to: pagePath(locale, "services") },
                { label: t(locale, service.title) },
              ]}
            />
            <p className="eyebrow">{locale === "ru" ? "Направление" : "Ուղղություն"}</p>
            <h1>{t(locale, service.title)}</h1>
            <p className="signal-hero__lead">{t(locale, service.tagline)}</p>
            <p className="signal-hero__intro">{t(locale, service.summary)}</p>

            <div className="signal-hero__actions">
              <NavLink to={requestPath} className="button button--primary">
                {t(locale, uiCopy.getConsultation)}
              </NavLink>
            </div>

            <div className="signal-metrics signal-metrics--detail">
              {service.bullets[locale].map((item) => (
                <article key={item} className="signal-metrics__item">
                  <span className={`signal-metrics__dot signal-metrics__dot--${service.accent}`} />
                  <span>{item}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="signal-hero__aside">
            <MediaPlaceholder
              accent={service.accent}
              badge={t(locale, media.badge)}
              title={t(locale, service.shortLabel)}
              caption={t(locale, service.summary)}
              signals={service.included[locale]}
              variant="hero"
              image={media.image}
            />

            <div className="signal-note signal-note--dark">
              <p className="signal-note__label">{t(locale, uiCopy.worksFor)}</p>
              <ul className="signal-note__list">
                {service.objects[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Section
        layout="wide"
        eyebrow={locale === "ru" ? "Сценарии" : "Սցենարներ"}
        title={t(locale, uiCopy.whenNeeded)}
      >
        <div className="signal-grid">
          {service.problems[locale].map((item) => (
            <article key={item} className="signal-grid__item">
              <span className={`signal-metrics__dot signal-metrics__dot--${service.accent}`} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        layout="wide"
        eyebrow={locale === "ru" ? "Состав работ" : "Աշխատանքների կազմ"}
        title={t(locale, uiCopy.whatIncluded)}
      >
        <div className="scope-columns">
          <article className="scope-columns__item">
            <p className="scope-columns__label">{locale === "ru" ? "Что делаем" : "Ինչ ենք անում"}</p>
            <ul className="scope-columns__list">
              {service.included[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="scope-columns__item">
            <p className="scope-columns__label">
              {locale === "ru" ? "На чём делаем акцент" : "Ինչի վրա ենք շեշտ դնում"}
            </p>
            <ul className="scope-columns__list">
              {service.bullets[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section
        layout="narrow"
        eyebrow="FAQ"
        title={locale === "ru" ? "Частые вопросы" : "Հաճախ տրվող հարցեր"}
      >
        <div className="faq-list">
          {service.faq.map((item) => (
            <details key={item.question.ru} className="faq-item">
              <summary>{t(locale, item.question)}</summary>
              <p>{t(locale, item.answer)}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section
        layout="wide"
        eyebrow={locale === "ru" ? "Связанные услуги" : "Կապված ծառայություններ"}
        title={t(locale, uiCopy.relatedServices)}
      >
        <div className="related-list">
          {related.map((item) => (
            <NavLink key={item.slug} to={servicePath(locale, item.slug)} className="related-list__item">
              <div className="related-list__meta">
                <span className={`atlas-band__dot atlas-band__dot--${item.accent}`} />
                <span>{t(locale, item.shortLabel)}</span>
              </div>
              <h3>{t(locale, item.title)}</h3>
              <p>{t(locale, item.summary)}</p>
            </NavLink>
          ))}
        </div>
      </Section>

      <Section
        layout="wide"
        className="section--utility section--detail-form"
        eyebrow={locale === "ru" ? "Заявка" : "Հայտ"}
        title={locale === "ru" ? "Оставить заявку" : "Թողնել հայտ"}
      >
        <div className="utility-shell utility-shell--form-first">
          <div className="utility-shell__form">
            <LeadForm
              key={`${locale}-${service.slug}`}
              locale={locale}
              defaultServiceSlug={service.slug}
            />
          </div>

          <div className="utility-shell__notes">
            <article className="utility-shell__note">
              <p className="utility-shell__label">{locale === "ru" ? "Подходит для" : "Հարմար է"}</p>
              <ul className="utility-shell__list">
                {service.objects[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="utility-shell__note">
              <p className="utility-shell__label">{locale === "ru" ? "Что входит" : "Ինչ է ներառված"}</p>
              <ul className="utility-shell__list">
                {service.included[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </Section>
    </>
  );
}
