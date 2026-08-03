/*==================================================
 NGEPAS REBORN
 Nama File : AdminLayout.jsx
 Desc      : Layout wrapper for all admin panel pages
 Author    : Tim Ngepas
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

/* React */
import { useState } from "react";

/* Router */
import { NavLink, Outlet, useLocation } from "react-router-dom";

/* Icons */
import { PanelLeft, Home } from "lucide-react";

/* Components */
import Sidebar from "../components/admin/Sidebar";

/*==================================================
 RENDER / UI
==================================================*/

function AdminLayout() {

  /*============================================
    HOOKS
  ============================================*/

  const location = useLocation();

  /*============================================
    STATE
  ============================================*/

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /*============================================
    HANDLERS
  ============================================*/

  /* Toggle Sidebar */
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/*==========================================
        Sidebar
      ==========================================*/}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/*==========================================
        Mobile Overlay
      ==========================================*/}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/*==========================================
        Main Content
      ==========================================*/}

      <div className="flex flex-1 flex-col">

        {/*========================================
          Mobile Header
        ========================================*/}

        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden">
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
          >
            <PanelLeft size={24} />
          </button>

          <p className="font-bold text-emerald-600">Ngepas Admin</p>

          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            <Home size={18} />
            Website
          </NavLink>
        </header>

        {/*========================================
          Desktop Header
        ========================================*/}

        <header className="hidden border-b border-slate-200 bg-white px-8 py-4 lg:flex lg:items-center lg:justify-between">
          <p className="text-lg font-bold text-slate-800">
            {location.pathname.includes("/categories")
              ? "Categories"
              : location.pathname.includes("/products")
                ? "Products"
                : "Dashboard"}
          </p>

          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            <Home size={18} />
            Kembali ke Website
          </NavLink>
        </header>

        {/*========================================
          Page Content
        ========================================*/}

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default AdminLayout;