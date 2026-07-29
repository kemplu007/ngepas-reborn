/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : admin/routes.js
 Version : 1.0.0
==================================================*/

import Dashboard from "../../pages/admin/Dashboard";
import Products from "../../pages/admin/Products";
import ProductForm from "../../pages/admin/ProductForm";

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
];

export default adminRoutes;
