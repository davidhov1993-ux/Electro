import { brandName, t } from "@/src/content/site";
import type { Locale } from "@/src/types";

const email = "example@mail.com";
const phone = "+374 99 586 469";

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const brandLabel = t(locale, brandName);

  const content = locale === "ru"
    ? {
        meta: `© ${year} ${brandLabel}`,
        city: "Ереван",
      }
    : {
        meta: `© ${year} ${brandLabel}`,
        city: "Երևան",
      };

  return (
    <footer className="site-footer site-footer--minimal">
      <div className="container site-footer__bar">
        <span className="site-footer__meta">{content.meta}</span>

        <div className="site-footer__contacts">
          <span className="site-footer__city">{content.city}</span>
          <a href={`tel:${phone.replace(/\s+/g, "")}`} className="site-footer__contact-link">
            {phone}
          </a>
          <a href={`mailto:${email}`} className="site-footer__contact-link">
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
