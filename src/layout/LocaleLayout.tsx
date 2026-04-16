import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { defaultLocale } from "@/src/content/site";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";
import { isLocale } from "@/src/lib/locale";

export function LocaleLayout() {
  const params = useParams();
  const location = useLocation();

  if (!isLocale(params.locale)) {
    const segments = location.pathname.split("/").filter(Boolean).slice(1);
    const nextPath = `/${defaultLocale}${segments.length > 0 ? `/${segments.join("/")}` : ""}${location.search}${location.hash}`;

    return <Navigate to={nextPath} replace />;
  }

  const locale = params.locale;

  return (
    <div className="page-shell">
      <SiteHeader locale={locale} />
      <main className="page-main">
        <Outlet />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
