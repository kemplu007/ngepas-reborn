/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : menu.js
 Module  : Admin Config
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import {
  LayoutDashboard,
  Package,
  Tags,
  Image,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

/*==================================================
 ADMIN MENU
==================================================*/

const adminMenu = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: Tags,
  },
  {
    label: "Banner",
    path: "/admin/banner",
    icon: Image,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

/*==================================================
 EXPORT
==================================================*/

export default adminMenu;
