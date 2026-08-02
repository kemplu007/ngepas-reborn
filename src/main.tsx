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
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import ScrollToTop from "./components/common/ScrollToTop";
import { FavoritesProvider } from "./context/FavoritesContext";

/*==================================================
 APPLICATION
==================================================*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <BrowserRouter>

    <CategoryProvider>

      <ProductProvider>

        <FavoritesProvider>

          <ScrollToTop />
          <App />

        </FavoritesProvider>

      </ProductProvider>

    </CategoryProvider>

  </BrowserRouter>
</StrictMode>,
);
