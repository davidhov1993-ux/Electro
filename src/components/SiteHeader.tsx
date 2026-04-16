import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { brandName, t } from "@/src/content/site";
import { localeSwitchItems, navigationLinks } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

export function SiteHeader({ locale }: { locale: Locale }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const brandLabel = t(locale, brandName);
  const navItems = navigationLinks(locale);
  const localeItems = localeSwitchItems(`${location.pathname}${location.search}${location.hash}`);
  const desktopNavItems = navItems.filter((item) => item.to !== `/${locale}`);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${menuOpen ? "site-header--menu-open" : ""}`.trim()}>
      <div className="container header-main">
        <div className="header-bar">
          <Link to={`/${locale}`} className="brand-mark" aria-label={brandLabel}>
            <span className="brand-mark__name">{brandLabel}</span>
          </Link>

          <nav
            className="main-nav main-nav--desktop"
            aria-label={locale === "ru" ? "Основная навигация" : "Հիմնական նավիգացիա"}
          >
            {desktopNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <div className="locale-switch locale-switch--header">
              <div className="locale-switch__items">
                {localeItems.map((item) => (
                  <NavLink
                    key={item.locale}
                    to={item.to}
                    className={({ isActive }) => `locale-link ${isActive ? "active" : ""}`.trim()}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="header-toggle"
              aria-label={locale === "ru" ? "Открыть меню" : "Բացել ընտրացանկը"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`.trim()}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="mobile-menu__backdrop"
          aria-label={locale === "ru" ? "Закрыть меню" : "Փակել ընտրացանկը"}
          onClick={() => setMenuOpen(false)}
        />
        <div className="mobile-menu__panel">
          <nav
            className="mobile-menu__nav"
            aria-label={locale === "ru" ? "Мобильная навигация" : "Բջջային նավիգացիա"}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `mobile-menu__link ${isActive ? "active" : ""}`.trim()}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
