import type { MouseEvent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { brandName, t } from "@/src/content/site";
import { localeSwitchItems, saveLocalePreference } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

const localeScrollStorageKey = "electro_locale_switch_scroll_y";

export function SiteHeader({ locale }: { locale: Locale }) {
  const location = useLocation();
  const brandLabel = t(locale, brandName);
  const localeItems = localeSwitchItems(`${location.pathname}${location.search}${location.hash}`);

  const handleLocaleClick = (event: MouseEvent<HTMLAnchorElement>, nextLocale: Locale) => {
    saveLocalePreference(nextLocale);

    if (
      nextLocale === locale ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    try {
      window.sessionStorage.setItem(
        localeScrollStorageKey,
        JSON.stringify({
          at: Date.now(),
          y: window.scrollY,
        }),
      );
    } catch {
      // Ignore storage errors in private or locked-down browsing modes.
    }
  };

  return (
    <header className="site-header">
      <div className="container header-main">
        <div className="header-bar">
          <Link to={`/${locale}/`} className="brand-mark" aria-label={brandLabel}>
            <span className="brand-mark__name">{brandLabel}</span>
          </Link>

          <div className="header-actions">
            <div className="locale-switch locale-switch--header">
              <div className="locale-switch__items">
                {localeItems.map((item) => (
                  <NavLink
                    key={item.locale}
                    to={item.to}
                    onClick={(event) => handleLocaleClick(event, item.locale)}
                    className={({ isActive }) => `locale-link ${isActive ? "active" : ""}`.trim()}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
