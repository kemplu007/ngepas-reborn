/*==================================================
 NGEPAS REBORN
 File    : AdminLayout.jsx
 Module  : Layouts
==================================================*/

import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { PanelLeft, Home } from "lucide-react";

import Sidebar from "../components/admin/Sidebar";

/*==================================================
 ADMIN LAYOUT
==================================================*/
function AdminLayout() {
  const location = useLocation();
  
  /*==================================================
   SIDEBAR STATE (Mobile Drawer)
  ==================================================*/
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /*==================================================
   TOGGLE HANDLER
  ==================================================*/
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/*==============================================
       SIDEBAR COMPONENT
      ==============================================*/}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/*==============================================
       MOBILE OVERLAY (Click outside to close sidebar)
      ==============================================*/}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/*==============================================
       MAIN CONTENT AREA
      ==============================================*/}
      <div className="flex flex-1 flex-col">
        
        {/*==============================================
         MOBILE HEADER (Hanya muncul di HP)
        ==============================================*/}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 lg:hidden shadow-sm">
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
          >
            <PanelLeft size={24} />
          </button>
          <p className="font-bold text-emerald-600">Ngepas Admin</p>
          <NavLink to="/" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition">
            <Home size={18} />
            Website
          </NavLink>
        </header>

        {/*==============================================
         DESKTOP HEADER (Hanya muncul di PC/Laptop)
        ==============================================*/}
        <header className="hidden border-b border-slate-200 bg-white px-8 py-4 lg:flex lg:items-center lg:justify-between">
          <p className="text-lg font-bold text-slate-800">
            {location.pathname.includes('/categories') ? 'Categories' : 
             location.pathname.includes('/products') ? 'Products' : 'Dashboard'}
          </p>
          <NavLink to="/" className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600">
            <Home size={18} />
            Kembali ke Website
          </NavLink>
        </header>

        {/*==============================================
         ADMIN CONTENT
        ==============================================*/}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;