import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { brandName, t } from "@/src/content/site";
import { localePath, localeSwitchItems, navigationLinks } from "@/src/lib/locale";
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

  const isNavItemActive = (target: string) => {
    const [targetPath, targetHash = ""] = target.split("#");
    const normalizedPath = targetPath || location.pathname;

    if (target.includes("#")) {
      return location.pathname === normalizedPath && location.hash === `#${targetHash}`;
    }

    return location.pathname === normalizedPath && location.hash === "";
  };

  return (
    <header className={`site-header ${menuOpen ? "site-header--menu-open" : ""}`.trim()}>
      <div className="container header-main">
        <div className="header-bar">
          <Link to={`/${locale}`} className="brand-mark" aria-label={brandLabel}>
            <span className="brand-mark__name">{brandLabel}</span>
          </Link>

          <nav
            className="main-nav main-nav--desktop"
            aria-label={locale === "ru" ? "Основная навигация" : "Հիմնական մենյու"}
          >
            {desktopNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={() => `nav-link ${isNavItemActive(item.to) ? "active" : ""}`.trim()}
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
              aria-label={
                menuOpen
                  ? locale === "ru"
                    ? "Закрыть меню"
                    : "Փակել մենյուն"
                  : locale === "ru"
                    ? "Открыть меню"
                    : "Բացել մենյուն"
              }
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
          aria-label={locale === "ru" ? "Закрыть меню" : "Փակել մենյուն"}
          onClick={() => setMenuOpen(false)}
        />
        <div className="mobile-menu__panel">
          <div className="mobile-menu__panel-head">
            <p className="mobile-menu__eyebrow">
              {locale === "ru" ? "Навигация" : "Նավարկում"}
            </p>
            <p className="mobile-menu__brand">{brandLabel}</p>
          </div>

          <div
            className="mobile-menu__locale"
            aria-label={locale === "ru" ? "Сменить язык" : "Փոխել լեզուն"}
          >
            {localeItems.map((item) => (
              <NavLink
                key={item.locale}
                to={item.to}
                className={({ isActive }) => `mobile-menu__locale-link ${isActive ? "active" : ""}`.trim()}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <nav
            className="mobile-menu__nav"
            aria-label={locale === "ru" ? "Мобильная навигация" : "Մոբայլ մենյու"}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={() => `mobile-menu__link ${isNavItemActive(item.to) ? "active" : ""}`.trim()}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-menu__footer">
            <Link
              to={localePath(locale)}
              className="mobile-menu__cta"
              onClick={() => setMenuOpen(false)}
            >
              {locale === "ru" ? "На главную" : "Դեպի գլխավոր"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
