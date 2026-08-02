/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : admin/routes.js
 Version : 1.0.0
==================================================*/

import Dashboard from "../../pages/admin/Dashboard";
import Products from "../../pages/admin/Products";
import Categories from "../../pages/admin/Categories";
import ProductForm from "../../pages/admin/ProductForm";
import CategoryForm from "../../pages/admin/CategoryForm";

const adminRoutes = [
  {
    path: "/admin",
    component: Dashboard,
  },
  {
    path: "/admin/products",
    component: Products,
  },
  {
    path: "/admin/products/new",
    component: ProductForm,
  },
  {
    path: "/admin/categories",
    component: Categories,
  },
  {
    path: "/admin/categories/new",
    component: CategoryForm,
  },
];

export default adminRoutes;
