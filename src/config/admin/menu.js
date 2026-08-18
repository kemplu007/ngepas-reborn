import {
  LayoutDashboard,
  Package,
  Tags,
} from "lucide-react";

const adminMenu = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Categories", path: "/admin/categories", icon: Tags },
];

export default adminMenu;
