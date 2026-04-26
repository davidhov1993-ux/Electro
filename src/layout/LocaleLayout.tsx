import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { defaultLocale } from "@/src/content/site";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";
import { isLocale } from "@/src/lib/locale";

export function LocaleLayout() {
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToTarget();
    const timeout = window.setTimeout(scrollToTarget, 80);
    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash, location.key]);

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
