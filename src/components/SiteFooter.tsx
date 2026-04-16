import { Link } from "react-router-dom";

import { brandName, t } from "@/src/content/site";
import { pagePath, servicePath } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container footer-dock">
        <div className="footer-dock__brand">
          <p className="eyebrow">{t(locale, brandName)}</p>
          <h2>
            {locale === "ru"
              ? "Сильная инженерная команда для задач, где цена ошибки слишком высока."
              : "Ուժեղ ինժեներական թիմ այն խնդիրների համար, որտեղ սխալի գինը չափազանց բարձր է։"}
          </h2>
          <p>
            {locale === "ru"
              ? "Электрика, щиты, автоматика, видеонаблюдение, доступ, smart и аварийные выезды по Еревану."
              : "Էլեկտրիկա, վահաններ, ավտոմատիկա, տեսահսկում, մուտք, smart և արտակարգ մեկնումներ Երևանում։"}
          </p>
        </div>

        <div className="footer-dock__grid">
          <div className="footer-dock__column">
            <h3>{locale === "ru" ? "Навигация" : "Նավիգացիա"}</h3>
            <div className="footer-links">
              <Link to={`/${locale}`}>{locale === "ru" ? "Главная" : "Գլխավոր"}</Link>
              <Link to={pagePath(locale, "services")}>{locale === "ru" ? "Услуги" : "Ծառայություններ"}</Link>
              <Link to={pagePath(locale, "about")}>{locale === "ru" ? "О компании" : "Մեր մասին"}</Link>
              <Link to={pagePath(locale, "why")}>{locale === "ru" ? "Почему выбирают нас" : "Ինչու ընտրում են մեզ"}</Link>
              <Link to={pagePath(locale, "certificates")}>{locale === "ru" ? "Сертификаты" : "Սերտիֆիկատներ"}</Link>
              <Link to={pagePath(locale, "contacts")}>{locale === "ru" ? "Контакты" : "Կոնտակտներ"}</Link>
              <Link to={pagePath(locale, "request")}>{locale === "ru" ? "Заявка" : "Հայտ"}</Link>
            </div>
          </div>

          <div className="footer-dock__column">
            <h3>{locale === "ru" ? "Режим" : "Ռեժիմ"}</h3>
            <p>{locale === "ru" ? "10:00–22:00, кроме воскресенья" : "10:00–22:00, բացի կիրակիից"}</p>
            <p>{locale === "ru" ? "Только Ереван" : "Միայն Երևան"}</p>
            <p>{locale === "ru" ? "Выезд в течение 1 часа" : "Մեկնում 1 ժամվա ընթացքում"}</p>
            <div className="footer-links">
              <Link to={servicePath(locale, "avariinyi-elektrik")}>
                {locale === "ru" ? "Аварийный электрик" : "Արտակարգ էլեկտրիկ"}
              </Link>
              <Link to={pagePath(locale, "request")}>
                {locale === "ru" ? "Оставить заявку" : "Թողնել հայտ"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
