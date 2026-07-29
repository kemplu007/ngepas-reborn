/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Sidebar.jsx
 Module  : Admin Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { NavLink } from "react-router-dom";
import adminMenu from "../../config/admin/menu";

/*==================================================
 COMPONENT
==================================================*/

function Sidebar() {
  /*==================================================
   UI
  ==================================================*/

  return (
    <aside className="w-64 min-h-screen bg-green-900 text-white flex flex-col">
      {/*==================================================
        LOGO
      ==================================================*/}
      <div className="p-6 border-b border-green-800">
        <h1 className="text-2xl font-bold">Ngepas</h1>
        <p className="text-sm text-green-200">Admin Panel</p>
      </div>

      {/*==================================================
        MENU
      ==================================================*/}
      <nav className="flex-1 p-4 space-y-2">
        {adminMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive ? "bg-green-700 font-semibold" : "hover:bg-green-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/*==================================================
        LOGOUT
      ==================================================*/}
      <div className="border-t border-green-800 p-4">
        <button className="w-full rounded-lg bg-red-500 px-4 py-3 font-medium transition hover:bg-red-600">
          Logout
        </button>
      </div>
    </aside>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Sidebar;
