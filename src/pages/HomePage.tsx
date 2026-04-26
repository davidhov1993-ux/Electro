import { homeSeoContent, hs } from "@/src/content/homeSeo";
import { HomeObjectsSection } from "@/src/components/HomeObjectsSection";
import { HomeServiceWall } from "@/src/components/HomeServiceWall";
import { Seo } from "@/src/components/Seo";
import { usePageLocale } from "@/src/hooks/usePageLocale";
import { createLocalBusinessSchema, createOrganizationSchema } from "@/src/lib/seo";

export function HomePage() {
  const locale = usePageLocale();
  const assetBase = import.meta.env.BASE_URL;
  const heroVideoSrc = locale === "hy"
    ? `${assetBase}media/DavoCriator_httpss.mj.runEUk2acGrRdc_animated_graphic_poster__8400b071-e04e-4487-930c-874b7f3bd03b_0.mp4`
    : `${assetBase}media/DavoCriator_httpss.mj.runUJdjoo-jviU_animated_graphic_poster__34d1f2e0-a56e-408c-b0af-bd140fd198a4_0.mp4`;
  const heroPosterSrc = locale === "hy"
    ? `${assetBase}media/DavoCriator_httpss.mj.runEUk2acGrRdc_animated_graphic_poster__8400b071-e04e-4487-930c-874b7f3bd03b_0.gif`
    : undefined;
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
        "Արտակարգ մեկնում",
        "Էլեկտրամոնտաժ",
        "Վահաններ",
        "Լուսավորություն",
        "Տեսահսկում",
        "Դոմոֆոններ",
        "Թույլ հոսանք",
        "Տաք հատակ",
        "Խելացի տուն",
      ];

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
                {locale === "ru" ? "Позвонить сейчас" : "Զանգահարել հիմա"}
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

      <HomeObjectsSection locale={locale} />
    </>
  );
}
