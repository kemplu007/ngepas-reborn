/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : App.tsx
 Module  : Root Component
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

/*==================================================
 COMPONENT
==================================================*/

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
  path="/product/:slug"
  element={<ProductDetail />}
/>
    </Routes>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default App;
