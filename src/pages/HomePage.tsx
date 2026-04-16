import { NavLink } from "react-router-dom";

import { homeSeoContent, hs } from "@/src/content/homeSeo";
import { HomeServiceWall } from "@/src/components/HomeServiceWall";
import { getService, serviceGroups, t } from "@/src/content/site";
import { Section } from "@/src/components/Section";
import { Seo } from "@/src/components/Seo";
import { usePageLocale } from "@/src/hooks/usePageLocale";
import { pagePath, servicePath } from "@/src/lib/locale";
import { createLocalBusinessSchema, createOrganizationSchema } from "@/src/lib/seo";

export function HomePage() {
  const locale = usePageLocale();
  const contactPath = pagePath(locale, "contacts");
  const servicesPath = pagePath(locale, "services");
  const heroMarqueeItems = homeSeoContent.servicesBlock.items.map((item) => hs(locale, item.title));
  const serviceOverview = serviceGroups
    .map((group) => ({
      group,
      items: homeSeoContent.servicesBlock.items.filter((item) => getService(item.slug)?.group === group.id),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <>
      <Seo
        locale={locale}
        title={hs(locale, homeSeoContent.metaTitle)}
        description={hs(locale, homeSeoContent.metaDescription)}
        path={`/${locale}`}
        structuredData={[createOrganizationSchema(), createLocalBusinessSchema(locale)]}
      />

      <section className="signal-hero signal-hero--home home-brand-hero">
        <div className="home-brand-hero__viewport">
          <div className="home-brand-hero__stage">
            <div className="home-brand-hero__media" aria-hidden="true">
              <span className="home-brand-hero__glow home-brand-hero__glow--left" />
              <span className="home-brand-hero__glow home-brand-hero__glow--right" />
              <div className="home-brand-hero__video-shell">
                <video
                  className="home-brand-hero__video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/media/hero-poster-last.jpg"
                >
                  <source src="/media/DavoCriator_httpss.mj.runUJdjoo-jviU_animated_graphic_poster__34d1f2e0-a56e-408c-b0af-bd140fd198a4_0.mp4" type="video/mp4" />
                </video>
              </div>
              <span className="home-brand-hero__vignette" />
            </div>

            <div className="home-brand-hero__action-bar">
              <a href="tel:+37499586469" className="home-brand-hero__cta home-brand-hero__cta--dark">
                {locale === "ru" ? "Позвонить сейчас" : "Զանգահարել հիմա"}
              </a>
              <a href="https://wa.me/37499586469" target="_blank" rel="noreferrer" className="home-brand-hero__cta home-brand-hero__cta--accent">
                WhatsApp
              </a>
            </div>

            <div className="home-brand-hero__marquee" aria-label={locale === "ru" ? "Направления" : "Ուղղություններ"}>
              <div className="home-brand-hero__marquee-track">
                {[...heroMarqueeItems, ...heroMarqueeItems].map((item, index) => (
                  <span key={`${item}-${index}`} className="home-brand-hero__marquee-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeServiceWall locale={locale} />

      <Section
        layout="wide"
        className="section--home-page section--home-copy"
        eyebrow={locale === "ru" ? "Инженерный подход" : "Ինժեներական մոտեցում"}
        title={hs(locale, homeSeoContent.firstBlock.title)}
      >
        <div className="copy-stack">
          {homeSeoContent.firstBlock.paragraphs.map((paragraph) => (
            <p key={paragraph.ru}>{hs(locale, paragraph)}</p>
          ))}
        </div>
      </Section>

      <Section
        layout="wide"
        className="section--home-page section--home-overview"
        eyebrow={locale === "ru" ? "Ключевые направления" : "Հիմնական ուղղություններ"}
        title={
          locale === "ru"
            ? "С чем мы работаем"
            : "Ինչ ուղղություններով ենք աշխատում"
        }
        intro={
          locale === "ru"
            ? "Электромонтаж, щиты, безопасность, свет, smart-сценарии и аварийные выезды по Еревану."
            : "Էլեկտրամոնտաժ, վահաններ, անվտանգություն, լուսավորություն, smart սցենարներ և արտակարգ մեկնումներ Երևանում։"
        }
      >
        <div className="service-overview-grid">
          {serviceOverview.map(({ group, items }) => (
            <article key={group.id} className="service-overview-grid__item">
              <p className="service-overview-grid__label">{t(locale, group.title)}</p>
              <div className="service-overview-grid__links">
                {items.map((item) => (
                  <NavLink key={item.slug} to={servicePath(locale, item.slug)} className="service-overview-grid__link">
                    {hs(locale, item.title)}
                  </NavLink>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="section-actions">
          <NavLink to={servicesPath} className="button button--ghost">
            {locale === "ru" ? "Смотреть все направления" : "Տեսնել բոլոր ուղղությունները"}
          </NavLink>
        </div>
      </Section>

      <Section
        layout="wide"
        className="section--home-page section--home-cta"
        eyebrow={locale === "ru" ? "Связь и запуск" : "Կապ և մեկնարկ"}
        title={hs(locale, homeSeoContent.ctaBlock.title)}
        intro={hs(locale, homeSeoContent.ctaBlock.description)}
      >
        <div className="cta-rail">
          <NavLink to={pagePath(locale, "request")} className="button button--primary">
            {locale === "ru" ? "Оставить заявку" : "Թողնել հայտ"}
          </NavLink>
          <NavLink to={contactPath} className="button button--ghost">
            {locale === "ru" ? "Позвонить сейчас" : "Զանգահարել հիմա"}
          </NavLink>
          <NavLink to={contactPath} className="button button--ghost">
            WhatsApp
          </NavLink>
        </div>
      </Section>
    </>
  );
}
