/*==================================================
 NGEPAS REBORN
 File    : App.tsx
 Module  : Application Router
==================================================*/

import { Routes, Route } from "react-router-dom";

/*==================================================
 LAYOUTS
==================================================*/
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

/*==================================================
 PUBLIC PAGES
==================================================*/
import Home from "./pages/public/Home";
import ProductDetail from "./pages/public/ProductDetail";
import CategoryPage from "./pages/public/CategoryPage";

/*==================================================
 ADMIN PAGES
==================================================*/
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";
import Categories from "./pages/admin/Categories";
import CategoryForm from "./pages/admin/CategoryForm";

/*==================================================
 APP
==================================================*/
function App() {
  return (
    <Routes>
      {/*==================================================
          PUBLIC ROUTES
        ==================================================*/}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/product/:slug" element={<ProductDetail />} />

        <Route path="/category" element={<CategoryPage />} />
      </Route>

      {/*==================================================
          ADMIN ROUTES
        ==================================================*/}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="products" element={<Products />} />

        <Route path="products/new" element={<ProductForm />} />

        <Route path="products/:id/edit" element={<ProductForm />} />

        <Route path="categories" element={<Categories />} />

        <Route path="categories/new" element={<CategoryForm />} />

        <Route path="categories/:id/edit" element={<CategoryForm />} />
      </Route>
    </Routes>
  );
}

export default App;
