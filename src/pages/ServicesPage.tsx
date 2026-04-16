import { homeSeoContent, hs } from "@/src/content/homeSeo";
import { brandName, getService, getServicesByGroup, serviceGroups, t, uiCopy } from "@/src/content/site";
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
  const serviceCopy = new Map(homeSeoContent.servicesBlock.items.map((item) => [item.slug, item]));
  const groupLeads = serviceGroups.map((group) => ({
    group,
    lead: getServicesByGroup(group.id)[0]!,
  }));
  const serviceSchemas = homeSeoContent.servicesBlock.items.map((item) =>
    createServiceSchema(locale, getService(item.slug)!, servicePath(locale, item.slug)),
  );

  return (
    <>
      <Seo
        locale={locale}
        title={
          locale === "ru"
            ? `Услуги электрика и комплексные электротехнические работы в Ереване | ${brandLabel}`
            : `Էլեկտրիկի ծառայություններ և համալիր էլեկտրատեխնիկական աշխատանքներ Երևանում | ${brandLabel}`
        }
        description={
          locale === "ru"
            ? hs(locale, homeSeoContent.servicesBlock.intro)
            : hs(locale, homeSeoContent.servicesBlock.intro)
        }
        path={pagePath(locale, "services")}
        structuredData={[
          createOrganizationSchema(),
          createLocalBusinessSchema(locale),
          ...serviceSchemas,
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: locale === "ru" ? "Услуги" : "Ծառայություններ", path: pagePath(locale, "services") },
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
                { label: locale === "ru" ? "Услуги" : "Ծառայություններ" },
              ]}
            />
            <p className="eyebrow">{locale === "ru" ? "Хаб направлений" : "Ուղղությունների հանգույց"}</p>
            <h1>{hs(locale, homeSeoContent.servicesBlock.title)}</h1>
            <p className="signal-hero__intro">{hs(locale, homeSeoContent.servicesBlock.intro)}</p>

            <div className="catalog-index">
              {groupLeads.map(({ group, lead }) => (
                <article key={group.id} className="catalog-index__item">
                  <div className="catalog-index__head">
                    <span className={`atlas-band__dot atlas-band__dot--${lead.accent}`} />
                    <span className="catalog-index__label">{t(locale, group.title)}</span>
                  </div>
                  <p>{t(locale, group.description)}</p>
                </article>
              ))}
            </div>

            <div className="signal-hero__actions">
              <NavLink to={pagePath(locale, "request")} className="button button--primary">
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

            <div className="signal-note">
              <p className="signal-note__label">
                {locale === "ru" ? "Как читать каталог" : "Ինչպես կարդալ կատալոգը"}
              </p>
              <ul className="signal-note__list">
                <li>
                  {locale === "ru"
                    ? "Каждое направление собрано как отдельная сцена с собственными услугами."
                    : "Յուրաքանչյուր ուղղություն հավաքված է որպես առանձին տեսարան իր ծառայություններով։"}
                </li>
                <li>
                  {locale === "ru"
                    ? "Для детального разбора переходите на страницу конкретной услуги."
                    : "Մանրամասների համար անցեք կոնկրետ ծառայության էջ։"}
                </li>
                <li>
                  {locale === "ru"
                    ? "Аварийный сценарий вынесен отдельно и не смешивается с плановыми задачами."
                    : "Արտակարգ սցենարը առանձնացված է և չի խառնվում պլանային խնդիրների հետ։"}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Section
        layout="wide"
        className="section--catalog"
        eyebrow={locale === "ru" ? "Направления" : "Ուղղություններ"}
        title={locale === "ru" ? "Электромонтажные работы в Ереване" : "Էլեկտրամոնտաժային աշխատանքներ Երևանում"}
        intro={
          locale === "ru"
            ? "Все направления разложены по смысловым группам, чтобы можно было быстро найти нужную задачу и перейти на детальную страницу."
            : "Բոլոր ուղղությունները բաժանված են իմաստային խմբերի, որպեսզի արագ գտնեք անհրաժեշտ խնդիրը և անցնեք մանրամասն էջին։"
        }
      >
        <div className="catalog-sections">
          {serviceGroups.map((group, index) => {
            const groupServices = getServicesByGroup(group.id);
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
                  <p>
                    {locale === "ru"
                      ? `В этой группе ${groupServices.length} ${groupServices.length === 1 ? "сервис" : "сервиса"}, собранных в один понятный контур.`
                      : `Այս խմբում կա ${groupServices.length} ծառայություն, հավաքված մեկ հասկանալի կոնտուրի մեջ։`}
                  </p>
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
                    {groupServices.map((service) => {
                      const seoItem = serviceCopy.get(service.slug)!;

                      return (
                        <NavLink
                          key={service.slug}
                          to={servicePath(locale, service.slug)}
                          className="catalog-section__item"
                        >
                          <div className="catalog-section__meta">
                            <span className={`atlas-band__dot atlas-band__dot--${service.accent}`} />
                            <span>{t(locale, service.shortLabel)}</span>
                          </div>
                          <h4>{hs(locale, seoItem.title)}</h4>
                          <p>{hs(locale, seoItem.description)}</p>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="section-actions">
          <NavLink to={pagePath(locale, "request")} className="button button--primary">
            {t(locale, uiCopy.discussProject)}
          </NavLink>
        </div>
      </Section>

      <Section
        layout="wide"
        className="section--home-seo"
        eyebrow={locale === "ru" ? "SEO-текст" : "SEO-текст"}
        title={hs(locale, homeSeoContent.seoBlock.title)}
      >
        <div className="copy-stack copy-stack--seo">
          {homeSeoContent.seoBlock.paragraphs.map((paragraph) => (
            <p key={paragraph.ru}>{hs(locale, paragraph)}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
