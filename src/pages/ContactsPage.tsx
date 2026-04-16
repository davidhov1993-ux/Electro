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
import { createBreadcrumbSchema, createLocalBusinessSchema, createOrganizationSchema } from "@/src/lib/seo";

export function ContactsPage() {
  const locale = usePageLocale();
  const brandLabel = t(locale, brandName);
  const page = staticPages.contacts;

  return (
    <>
      <Seo
        locale={locale}
        title={locale === "ru" ? `Контакты электрика в Ереване | ${brandLabel}` : `Էլեկտրիկի կոնտակտներ Երևանում | ${brandLabel}`}
        description={
          locale === "ru"
            ? `Контакты ${brandLabel} в Ереване: выезд до 1 часа, работа по городу, форма заявки для электромонтажа, щитов и аварийных вызовов.`
            : `${brandLabel}-ի կոնտակտները Երևանում՝ մեկնում մինչև 1 ժամում, աշխատանք քաղաքի ներսում, հայտի ձև էլեկտրամոնտաժի, վահանների և արտակարգ կանչերի համար։`
        }
        path={pagePath(locale, "contacts")}
        structuredData={[
          createOrganizationSchema(),
          createLocalBusinessSchema(locale),
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: locale === "ru" ? "Контакты" : "Կոնտակտներ", path: pagePath(locale, "contacts") },
          ]),
        ]}
      />

      <section className="signal-hero signal-hero--utility">
        <div className="container signal-hero__grid signal-hero__grid--utility">
          <div className="signal-hero__copy">
            <PageBreadcrumbs
              ariaLabel={locale === "ru" ? "Хлебные крошки" : "Նավարկման շղթա"}
              items={[
                { label: locale === "ru" ? "Главная" : "Գլխավոր", to: `/${locale}` },
                { label: locale === "ru" ? "Контакты" : "Կոնտակտներ" },
              ]}
            />
            <p className="eyebrow">{locale === "ru" ? "Ереван" : "Երևան"}</p>
            <h1>{hs(locale, homeSeoContent.contactBlock.title)}</h1>
            <p className="signal-hero__intro">{hs(locale, homeSeoContent.contactBlock.description)}</p>
            <div className="signal-metrics signal-metrics--detail">
              {page.panels.map((panel) => (
                <article key={panel.title.ru} className="signal-metrics__item">
                  <span className="signal-metrics__dot signal-metrics__dot--amber" />
                  <span>{t(locale, panel.title)}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="signal-hero__aside">
            <MediaPlaceholder
              accent="amber"
              badge={hs(locale, homeSeoContent.contactBlock.title)}
              title={hs(locale, homeSeoContent.contactBlock.description)}
              caption={hs(locale, homeSeoContent.contactBlock.note)}
              signals={page.panels.map((panel) => t(locale, panel.title))}
              variant="hero"
              image={sceneAssetLibrary.access}
            />
          </aside>
        </div>
      </section>

      <Section
        layout="wide"
        className="section--utility section--utility-contact"
        eyebrow={locale === "ru" ? "Связь" : "Կապ"}
        title={
          locale === "ru"
            ? "Как быстрее получить ответ"
            : "Ինչպես արագ ստանալ պատասխան"
        }
        intro={t(locale, page.intro)}
      >
        <div className="utility-shell">
          <div className="utility-shell__notes">
            {page.panels.map((panel) => (
              <article key={panel.title.ru} className="utility-shell__note">
                <p className="utility-shell__label">{t(locale, panel.title)}</p>
                <p>{t(locale, panel.description)}</p>
              </article>
            ))}
          </div>

          <div className="utility-shell__form">
            <LeadForm key={locale} locale={locale} />
          </div>
        </div>
      </Section>
    </>
  );
}
