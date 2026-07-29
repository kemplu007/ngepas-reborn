/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : public/routes.js
 Version : 1.0.0
==================================================*/

import Home from "../../pages/public/Home";
import CategoryPage from "../../pages/public/CategoryPage";
import ProductDetail from "../../pages/public/ProductDetail";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/category/:slug",
    component: CategoryPage,
  },
  {
    path: "/product/:slug",
    component: ProductDetail,
  },
];

export default publicRoutes;
