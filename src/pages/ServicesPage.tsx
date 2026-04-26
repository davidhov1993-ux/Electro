import { homeSeoContent, hs } from "@/src/content/homeSeo";
import { brandName, getService, getServicesByGroup, services, serviceGroups, t, uiCopy } from "@/src/content/site";
import { getServiceMedia } from "@/src/content/serviceMedia";
import { MediaPlaceholder } from "@/src/components/MediaPlaceholder";
import { PageBreadcrumbs } from "@/src/components/PageBreadcrumbs";
import { Section } from "@/src/components/Section";
import { Seo } from "@/src/components/Seo";
import { usePageLocale } from "@/src/hooks/usePageLocale";
import { NavLink } from "react-router-dom";
import { pagePath, servicePath } from "@/src/lib/locale";
import {
  createBreadcrumbSchema,
  createLocalBusinessSchema,
  createOrganizationSchema,
  createServiceSchema,
} from "@/src/lib/seo";

export function ServicesPage() {
  const locale = usePageLocale();
  const brandLabel = t(locale, brandName);
  const leadService = getServicesByGroup("power")[0];
  const leadMedia = getServiceMedia(leadService.slug);
  const serviceSchemas = services.map((service) =>
    createServiceSchema(locale, getService(service.slug)!, servicePath(locale, service.slug)),
  );

  const heading = locale === "ru" ? "Услуги" : "Ծառայություններ";

  return (
    <>
      <Seo
        locale={locale}
        title={
          locale === "ru"
            ? `Услуги электрика в Ереване | ${brandLabel}`
            : `Էլեկտրիկի ծառայություններ Երևանում | ${brandLabel}`
        }
        description={hs(locale, homeSeoContent.servicesIntro)}
        path={pagePath(locale, "services")}
        structuredData={[
          createOrganizationSchema(),
          createLocalBusinessSchema(locale),
          ...serviceSchemas,
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: heading, path: pagePath(locale, "services") },
          ]),
        ]}
      />

      <section className="signal-hero signal-hero--catalog">
        <div className="container signal-hero__grid signal-hero__grid--catalog">
          <div className="signal-hero__copy">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: heading },
              ]}
            />
            <p className="eyebrow">{heading}</p>
            <h1>
              {locale === "ru"
                ? "Электромонтаж и инженерные системы в Ереване"
                : "Էլեկտրամոնտաժ և ինժեներական համակարգեր Երևանում"}
            </h1>
            <p className="signal-hero__intro">{hs(locale, homeSeoContent.servicesIntro)}</p>

            <div className="catalog-index">
              {serviceGroups.map((group) => {
                const lead = getServicesByGroup(group.id)[0]!;
                return (
                  <article key={group.id} className="catalog-index__item">
                    <div className="catalog-index__head">
                      <span className={`atlas-band__dot atlas-band__dot--${lead.accent}`} />
                      <span className="catalog-index__label">{t(locale, group.title)}</span>
                    </div>
                    <p>{t(locale, group.description)}</p>
                  </article>
                );
              })}
            </div>

            <div className="signal-hero__actions">
              <NavLink to={pagePath(locale, "contacts")} className="button button--primary">
                {t(locale, uiCopy.discussProject)}
              </NavLink>
              <NavLink to={`/${locale}`} className="button button--ghost">
                {locale === "ru" ? "На главную" : "Դեպի գլխավոր"}
              </NavLink>
            </div>
          </div>

          <aside className="signal-hero__aside">
            <MediaPlaceholder
              accent={leadService.accent}
              badge={t(locale, leadMedia.badge)}
              title={t(locale, leadService.title)}
              caption={t(locale, leadService.summary)}
              signals={serviceGroups.map((group) => t(locale, group.title))}
              variant="hero"
              image={leadMedia.image}
            />
          </aside>
        </div>
      </section>

      <Section
        layout="wide"
        className="section--catalog"
        eyebrow={locale === "ru" ? "Каталог" : "Կատալոգ"}
        title={locale === "ru" ? "Все направления" : "Բոլոր ուղղությունները"}
      >
        <div className="catalog-sections">
          {serviceGroups.map((group, index) => {
            const groupServices = getServicesByGroup(group.id);
            if (groupServices.length === 0) return null;
            const groupLead = groupServices[0]!;
            const groupLeadMedia = getServiceMedia(groupLead.slug);

            return (
              <section
                key={group.id}
                className={`catalog-section ${index % 2 === 1 ? "catalog-section--reverse" : ""}`.trim()}
              >
                <div className="catalog-section__intro">
                  <p className="catalog-section__eyebrow">{t(locale, group.title)}</p>
                  <h3>{t(locale, group.description)}</h3>
                </div>

                <div className="catalog-section__stage">
                  <NavLink to={servicePath(locale, groupLead.slug)} className="catalog-section__visual">
                    <MediaPlaceholder
                      accent={groupLead.accent}
                      badge={t(locale, groupLeadMedia.badge)}
                      title={t(locale, groupLead.shortLabel)}
                      caption={t(locale, groupLead.summary)}
                      signals={groupServices.slice(0, 3).map((service) => t(locale, service.shortLabel))}
                      variant="panel"
                      image={groupLeadMedia.image}
                    />
                  </NavLink>

                  <div className="catalog-section__list">
                    {groupServices.map((service) => (
                      <NavLink
                        key={service.slug}
                        to={servicePath(locale, service.slug)}
                        className="catalog-section__item"
                      >
                        <div className="catalog-section__meta">
                          <span className={`atlas-band__dot atlas-band__dot--${service.accent}`} />
                          <span>{t(locale, service.shortLabel)}</span>
                        </div>
                        <h4>{t(locale, service.title)}</h4>
                        <p>{t(locale, service.summary)}</p>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="section-actions">
          <NavLink to={pagePath(locale, "contacts")} className="button button--primary">
            {t(locale, uiCopy.discussProject)}
          </NavLink>
        </div>
      </Section>
    </>
  );
}
