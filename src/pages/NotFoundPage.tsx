import { Link } from "react-router-dom";

import { Seo } from "@/src/components/Seo";
import { brandName, t } from "@/src/content/site";
import { pagePath } from "@/src/lib/locale";
import { usePageLocale } from "@/src/hooks/usePageLocale";
import type { Locale } from "@/src/types";

interface NotFoundPageProps {
  locale: Locale;
}

export function NotFoundPage({ locale }: NotFoundPageProps) {
  const brandLabel = t(locale, brandName);
  return (
    <>
      <Seo
        locale={locale}
        title={locale === "ru" ? `Страница не найдена | ${brandLabel}` : `Էջը չի գտնվել | ${brandLabel}`}
        description={
          locale === "ru"
            ? "Запрошенная страница не существует или была перемещена."
            : "Պահանջված էջը գոյություն չունի կամ տեղափոխվել է։"
        }
        noIndex
      />

      <section className="signal-hero signal-hero--narrow">
        <div className="container signal-hero__grid signal-hero__grid--narrow">
          <div className="signal-hero__copy">
            <p className="eyebrow">404</p>
            <h1>{locale === "ru" ? "Страница не найдена" : "Էջը չի գտնվել"}</h1>
            <p className="signal-hero__intro">
              {locale === "ru"
                ? "Проверьте адрес или вернитесь к основным разделам сайта."
                : "Ստուգեք հասցեն կամ վերադարձեք կայքի հիմնական բաժիններին։"}
            </p>
            <div className="signal-hero__actions">
              <Link to={`/${locale}`} className="button button--primary">
                {locale === "ru" ? "На главную" : "Գլխավոր էջ"}
              </Link>
              <Link to={pagePath(locale, "services")} className="button button--ghost">
                {locale === "ru" ? "К услугам" : "Դեպի ծառայություններ"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LocalizedNotFoundPage() {
  const locale = usePageLocale();

  return <NotFoundPage locale={locale} />;
}
