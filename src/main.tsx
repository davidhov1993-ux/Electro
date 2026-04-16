import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import "@/src/index.css";
import { router } from "@/src/router";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element '#root' was not found.");
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
