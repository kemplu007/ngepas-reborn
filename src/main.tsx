/*==================================================
 NGEPAS REBORN
 File    : main.tsx
 Module  : Core
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ScrollToTop from "./components/ScrollToTop";
import { FavoritesProvider } from "./context/FavoritesContext";

/*==================================================
 APPLICATION
==================================================*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <ScrollToTop />
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
);