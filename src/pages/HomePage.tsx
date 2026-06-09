import { homeFaqSeoContent, homeSeoContent, hs } from "@/src/content/homeSeo";
import { HomeServiceWall } from "@/src/components/HomeServiceWall";
import { HomeTrustSection } from "@/src/components/HomeTrustSection";
import { Seo } from "@/src/components/Seo";
import { usePageLocale } from "@/src/hooks/usePageLocale";
import {
  createFaqSchema,
  createHomePageSchema,
  createLocalBusinessSchema,
  createOrganizationSchema,
  createWebSiteSchema,
} from "@/src/lib/seo";

export function HomePage() {
  const locale = usePageLocale();
  const assetBase = import.meta.env.BASE_URL;
  const heroMediaVersion = "20260525-brand-yellow";
  const heroVideoSrc = locale === "hy"
    ? `${assetBase}media/hero-hy-bg-brand-yellow.mp4?v=${heroMediaVersion}`
    : `${assetBase}media/hero-ru-bg-brand-yellow.mp4?v=${heroMediaVersion}`;
  const heroPosterSrc = locale === "hy"
    ? `${assetBase}media/hero-hy-bg-brand-yellow-poster.png?v=${heroMediaVersion}`
    : `${assetBase}media/hero-ru-bg-brand-yellow-poster.png?v=${heroMediaVersion}`;
  const socialDiscountCopy = locale === "ru"
    ? {
        aria: "Скидка 10 процентов пенсионерам и людям с инвалидностью",
        label: "СКИДКА 10%",
        text: "Пенсионерам и людям с инвалидностью",
      }
    : {
        aria: "10 տոկոս զեղչ թոշակառուների և հաշմանդամություն ունեցող անձանց համար",
        label: "10% ԶԵՂՉ",
        text: "Թոշակառուներին և հաշմանդամություն ունեցողներին",
      };
  const heroMarqueeItems = locale === "ru"
    ? [
        "Аварийный выезд",
        "Электромонтаж",
        "Электрощиты",
        "Освещение",
        "Видеонаблюдение",
        "Домофоны",
        "Слаботочка",
        "Тёплый пол",
        "Умный дом",
      ]
    : [
        "Վթարային կանչ",
        "Էլեկտրամոնտաժ",
        "Էլեկտրական վահանակներ",
        "Լուսավորություն",
        "Տեսահսկում",
        "Դոմոֆոններ",
        "Թույլ հոսանքներ (Ցածրավոլտ համակարգեր)",
        "Տաքացվող հատակ",
        "Խելացի տուն",
      ];

  return (
    <>
      <Seo
        locale={locale}
        title={hs(locale, homeSeoContent.metaTitle)}
        description={hs(locale, homeSeoContent.metaDescription)}
        keywords={hs(locale, homeSeoContent.keywords)}
        path={`/${locale}/`}
        image={locale === "hy" ? `/media/hero-hy-bg-brand-yellow-poster.png?v=${heroMediaVersion}` : `/media/hero-ru-bg-brand-yellow-poster.png?v=${heroMediaVersion}`}
        imageAlt={locale === "ru" ? "Электрик в Ереване" : "Էլեկտրիկ Երևանում"}
        structuredData={[
          createOrganizationSchema(),
          createWebSiteSchema(locale),
          createLocalBusinessSchema(locale),
          createHomePageSchema(locale),
          createFaqSchema(locale, homeFaqSeoContent),
        ].filter((item): item is Record<string, unknown> => Boolean(item))}
      />

      <section className={`signal-hero signal-hero--home home-brand-hero home-brand-hero--${locale}`}>
        <h1 className="sr-only">
          {locale === "ru" ? "Услуги электрика в Ереване" : "Էլեկտրիկի ծառայություններ Երևանում"}
        </h1>
        <div className="home-brand-hero__viewport">
          <div className="home-brand-hero__stage">
            <div className="home-brand-hero__media" aria-hidden="true">
              <span className="home-brand-hero__glow home-brand-hero__glow--left" />
              <span className="home-brand-hero__glow home-brand-hero__glow--right" />
              <div className="home-brand-hero__video-shell">
                <video
                  key={heroVideoSrc}
                  className="home-brand-hero__video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={heroPosterSrc}
                >
                  <source src={heroVideoSrc} type="video/mp4" />
                  {heroPosterSrc ? <img src={heroPosterSrc} alt="" /> : null}
                </video>
              </div>
              <span className="home-brand-hero__vignette" />
            </div>

            <div className="home-brand-hero__action-bar">
              <a href="tel:+37499586469" className="home-brand-hero__cta home-brand-hero__cta--dark">
                {locale === "ru" ? "Позвонить сейчас" : "Զանգահարել"}
              </a>
              <a
                href="https://wa.me/37499586469"
                target="_blank"
                rel="noreferrer"
                className="home-brand-hero__cta home-brand-hero__cta--accent"
              >
                WhatsApp
              </a>
            </div>

            <div className="home-brand-hero__social-discount" aria-label={socialDiscountCopy.aria}>
              <span className="home-brand-hero__social-discount-label">{socialDiscountCopy.label}</span>
              <span className="home-brand-hero__social-discount-text">{socialDiscountCopy.text}</span>
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

      <HomeTrustSection locale={locale} />
    </>
  );
}
