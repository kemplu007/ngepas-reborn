/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : AdminLayout.jsx
 Module  : Layouts
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, Home } from "lucide-react";

/*==================================================
 ADMIN LAYOUT
==================================================*/

/*
Layout utama untuk seluruh halaman Admin.

Tugas:
- Menampilkan navigasi Admin
- Menjadi kerangka halaman Admin
- Merender halaman aktif melalui Outlet
*/

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/*==============================================
       ADMIN HEADER
      ==============================================*/}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="font-bold text-emerald-600">Ngepas Admin</p>

            <p className="text-xs text-slate-500">Control Center</p>
          </div>

          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            <Home size={18} />
            Website
          </NavLink>
        </div>
      </header>

      {/*==============================================
       ADMIN NAVIGATION
      ==============================================*/}

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `
                flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                transition
                ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `
                flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                transition
                ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `
            }
          >
            <Package size={18} />
            Products
          </NavLink>

          <NavLink
            to="/admin/products/new"
            className={({ isActive }) =>
              `
                flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                transition
                ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `
            }
          >
            <PlusCircle size={18} />
            Add Product
          </NavLink>
        </div>
      </nav>

      {/*==============================================
       ADMIN CONTENT
      ==============================================*/}

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default AdminLayout;
