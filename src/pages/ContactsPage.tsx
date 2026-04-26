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
import { useSearchParams } from "react-router-dom";

const phone = "+374 99 586 469";
const phoneHref = "tel:+37499586469";
const whatsappHref = "https://wa.me/37499586469";
const email = "example@mail.com";

export function ContactsPage() {
  const locale = usePageLocale();
  const [searchParams] = useSearchParams();
  const brandLabel = t(locale, brandName);
  const page = staticPages.contacts;
  const requestedService = searchParams.get("service") ?? undefined;
  const urgent = searchParams.get("type") === "urgent";

  const heading = locale === "ru" ? "Контакты" : "Կոնտակտներ";
  const formTitle = locale === "ru" ? "Заявка" : "Հայտ";
  const formIntro =
    locale === "ru"
      ? "Опишите задачу — что за объект, что нужно сделать, есть ли срочность."
      : "Նկարագրեք խնդիրը՝ ինչ օբյեկտ, ինչ պետք է անել, արդյոք շտապ է։";

  return (
    <>
      <Seo
        locale={locale}
        title={locale === "ru" ? `Контакты | ${brandLabel}` : `Կոնտակտներ | ${brandLabel}`}
        description={t(locale, page.description)}
        path={pagePath(locale, "contacts")}
        structuredData={[
          createOrganizationSchema(),
          createLocalBusinessSchema(locale),
          createBreadcrumbSchema([
            { name: locale === "ru" ? "Главная" : "Գլխավոր", path: `/${locale}` },
            { name: heading, path: pagePath(locale, "contacts") },
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
                { label: heading },
              ]}
            />
            <p className="eyebrow">{locale === "ru" ? "Ереван" : "Երևան"}</p>
            <h1>{heading}</h1>
            <p className="signal-hero__intro">{t(locale, page.intro)}</p>

            <div className="signal-hero__contact-list">
              <p>
                <a href={phoneHref}>{phone}</a>
              </p>
              <p>
                <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
              </p>
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            </div>

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
              badge={heading}
              title={heading}
              caption={t(locale, page.intro)}
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
        eyebrow={formTitle}
        title={
          locale === "ru"
            ? "Оставить заявку"
            : "Թողնել հայտ"
        }
        intro={formIntro}
      >
        <div className="utility-shell utility-shell--form-first">
          <div className="utility-shell__form">
            <LeadForm
              key={`${locale}-${requestedService ?? "none"}-${urgent ? "urgent" : "normal"}`}
              locale={locale}
              urgent={urgent}
              defaultServiceSlug={requestedService}
              attachmentsEnabled
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
