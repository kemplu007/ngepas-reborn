/*==================================================
 NGEPAS REBORN
 File    : Sidebar.jsx
 Module  : Admin Components
==================================================*/

import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import adminMenu from "../../config/admin/menu";

/*==================================================
 COMPONENT
==================================================*/
function Sidebar({ isOpen, toggleSidebar }) {
  
  /*==================================================
   CLOSE SIDEBAR ON NAVIGATION (Mobile UX)
  ==================================================*/
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-emerald-900 text-white
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}
    >
      {/*==============================================
       SIDEBAR HEADER (LOGO)
      ==============================================*/}
      <div className="border-b border-emerald-800 p-6">
        <h1 className="text-2xl font-bold tracking-tight">Ngepas</h1>
        <p className="text-xs text-emerald-300">Admin Panel</p>
      </div>

      {/*==============================================
       SIDEBAR MENU (NARIK DARI adminMenu)
      ==============================================*/}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {adminMenu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `
                  flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-emerald-800 text-white"
                      : "text-emerald-100 hover:bg-emerald-800/50"
                  }
                `
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/*==============================================
       SIDEBAR FOOTER (LOGOUT)
      ==============================================*/}
      <div className="border-t border-emerald-800 p-4">
        <button
          type="button"
          onClick={() => {
            // Placeholder untuk logic logout di masa depan
            alert("Logout functionality coming soon!");
          }}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-red-500/20 hover:text-red-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;