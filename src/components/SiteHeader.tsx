import { Link, NavLink, useLocation } from "react-router-dom";

import { brandName, t } from "@/src/content/site";
import { localeSwitchItems, saveLocalePreference } from "@/src/lib/locale";
import type { Locale } from "@/src/types";

export function SiteHeader({ locale }: { locale: Locale }) {
  const location = useLocation();
  const brandLabel = t(locale, brandName);
  const localeItems = localeSwitchItems(`${location.pathname}${location.search}${location.hash}`);

  return (
    <header className="site-header">
      <div className="container header-main">
        <div className="header-bar">
          <Link to={`/${locale}`} className="brand-mark" aria-label={brandLabel}>
            <span className="brand-mark__name">{brandLabel}</span>
          </Link>

          <div className="header-actions">
            <div className="locale-switch locale-switch--header">
              <div className="locale-switch__items">
                {localeItems.map((item) => (
                  <NavLink
                    key={item.locale}
                    to={item.to}
                    onClick={() => saveLocalePreference(item.locale)}
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
