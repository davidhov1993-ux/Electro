import { createBrowserRouter, Navigate } from "react-router-dom";

import { commonSlugs, defaultLocale } from "@/src/content/site";
import { LocaleLayout } from "@/src/layout/LocaleLayout";
import { ContactsPage } from "@/src/pages/ContactsPage";
import { HomePage } from "@/src/pages/HomePage";
import { InfoPage } from "@/src/pages/InfoPage";
import { LocalizedNotFoundPage } from "@/src/pages/NotFoundPage";
import { RequestPage } from "@/src/pages/RequestPage";
import { ServiceDetailPage } from "@/src/pages/ServiceDetailPage";
import { ServicesPage } from "@/src/pages/ServicesPage";

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
        element: <ServicesPage />,
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
        path: commonSlugs.why,
        element: <InfoPage pageKey="why" />,
      },
      {
        path: commonSlugs.certificates,
        element: <InfoPage pageKey="certificates" />,
      },
      {
        path: commonSlugs.contacts,
        element: <ContactsPage />,
      },
      {
        path: commonSlugs.request,
        element: <RequestPage />,
      },
      {
        path: "*",
        element: <LocalizedNotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={`/${defaultLocale}`} replace />,
  },
]);
