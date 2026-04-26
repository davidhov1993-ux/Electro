import { createBrowserRouter, Navigate, useParams } from "react-router-dom";

import { commonSlugs, defaultLocale } from "@/src/content/site";
import { LocaleLayout } from "@/src/layout/LocaleLayout";
import { ContactsPage } from "@/src/pages/ContactsPage";
import { HomePage } from "@/src/pages/HomePage";
import { InfoPage } from "@/src/pages/InfoPage";
import { ServiceDetailPage } from "@/src/pages/ServiceDetailPage";

const basename = import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL.replace(/\/$/, "");

function LocalizedHomeRedirect() {
  const params = useParams();
  const locale = params.locale ?? defaultLocale;

  return <Navigate to={`/${locale}`} replace />;
}

function LocalizedServicesRedirect() {
  const params = useParams();
  const locale = params.locale ?? defaultLocale;

  return <Navigate to={`/${locale}#uslugi`} replace />;
}

function LocaleSlugRedirect({ slug }: { slug: string }) {
  const params = useParams();
  const locale = params.locale ?? defaultLocale;

  return <Navigate to={`/${locale}/${slug}`} replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/${defaultLocale}`} replace />,
  },
  {
    path: "/:locale",
    element: <LocaleLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: commonSlugs.services,
        element: <LocalizedServicesRedirect />,
      },
      {
        path: `${commonSlugs.services}/:slug`,
        element: <ServiceDetailPage />,
      },
      {
        path: commonSlugs.about,
        element: <InfoPage pageKey="about" />,
      },
      {
        path: commonSlugs.contacts,
        element: <ContactsPage />,
      },
      {
        path: "pochemu-vybirayut-nas",
        element: <LocaleSlugRedirect slug={commonSlugs.about} />,
      },
      {
        path: "sertifikaty",
        element: <LocaleSlugRedirect slug={commonSlugs.about} />,
      },
      {
        path: "zayavka",
        element: <LocaleSlugRedirect slug={commonSlugs.contacts} />,
      },
      {
        path: "*",
        element: <LocalizedHomeRedirect />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={`/${defaultLocale}`} replace />,
  },
], { basename });
