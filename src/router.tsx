import { createBrowserRouter, Navigate, useParams } from "react-router-dom";

import { commonSlugs, defaultLocale, getService } from "@/src/content/site";
import { LocaleLayout } from "@/src/layout/LocaleLayout";
import { ContactsPage } from "@/src/pages/ContactsPage";
import { HomePage } from "@/src/pages/HomePage";
import { InfoPage } from "@/src/pages/InfoPage";
import { ServiceDetailPage } from "@/src/pages/ServiceDetailPage";
import { contactAnchor, serviceLeadPath, trustAnchor } from "@/src/lib/locale";

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

function LocalizedAboutRoute() {
  const params = useParams();
  const locale = params.locale ?? defaultLocale;

  if (locale === "ru") {
    return <Navigate to={trustAnchor(locale)} replace />;
  }

  return <InfoPage pageKey="about" />;
}

function LocalizedContactsRoute() {
  const params = useParams();
  const locale = params.locale ?? defaultLocale;

  if (locale === "ru") {
    return <Navigate to={contactAnchor(locale)} replace />;
  }

  return <ContactsPage />;
}

function LocalizedServiceRoute({ serviceSlug }: { serviceSlug?: string }) {
  const params = useParams();
  const locale = params.locale ?? defaultLocale;
  const slug = serviceSlug ?? params.slug;
  const service = getService(slug);

  if (locale === "ru" && service) {
    return <Navigate to={serviceLeadPath(locale, service.slug)} replace />;
  }

  return <ServiceDetailPage serviceSlug={serviceSlug} />;
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
        element: <LocalizedServiceRoute />,
      },
      {
        path: "elektromontazh-erevan",
        element: <LocalizedServiceRoute serviceSlug="elektromontazh" />,
      },
      {
        path: "sborka-elektroshitov-erevan",
        element: <LocalizedServiceRoute serviceSlug="elektroshchity-i-avtomatika" />,
      },
      {
        path: "elektrakan-vahanakner-montazh-erevan",
        element: <LocalizedServiceRoute serviceSlug="elektroshchity-i-avtomatika" />,
      },
      {
        path: "srochnyi-elektrik-erevan",
        element: <LocalizedServiceRoute serviceSlug="avariinyi-elektrik" />,
      },
      {
        path: "shtap-elektrik-erevan",
        element: <LocalizedServiceRoute serviceSlug="avariinyi-elektrik" />,
      },
      {
        path: commonSlugs.about,
        element: <LocalizedAboutRoute />,
      },
      {
        path: commonSlugs.contacts,
        element: <LocalizedContactsRoute />,
      },
      {
        path: "pochemu-vybirayut-nas",
        element: <LocalizedAboutRoute />,
      },
      {
        path: "sertifikaty",
        element: <LocalizedAboutRoute />,
      },
      {
        path: "zayavka",
        element: <LocalizedContactsRoute />,
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
