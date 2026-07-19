/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Navbar.jsx
 Module  : Components
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import navigation from "../data/navigation";
import MenuItem from "./MenuItem";

/*==================================================
 COMPONENT
==================================================*/

/*
 * Navbar utama Ngepas.
 *
 * Berisi:
 * - Logo
 * - Tombol Mobile Menu
 * - Navigasi (Next Sprint)
 */

function Navbar() {
  /*==================================================
   LOGIC
  ==================================================*/

  // State untuk membuka dan menutup menu mobile.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu mobile.
  const handleToggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};
  
  // Menutup menu mobile.
const handleCloseMenu = () => {
  setIsMenuOpen(false);

};

  /*==================================================
   UI
  ==================================================*/

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/*==================================================
            MOBILE MENU BUTTON
        ==================================================*/}
        <button
          type="button"
          onClick={handleToggleMenu}
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          <Menu size={24} />
        </button>

        {/*==================================================
    MOBILE MENU
==================================================*/}

{isMenuOpen && (
  <div className="absolute left-0 top-16 w-full border-b border-slate-200 bg-white shadow-lg">
    <div className="flex flex-col gap-2 p-4">

      {navigation
  .filter((item) => item.enabled)
  .map((item) => (
    <MenuItem
      key={item.id}
      label={item.label}
      path={item.path}
      onClick={handleCloseMenu}
    />
))}

    </div>
  </div>
)}

        {/*==================================================
            LOGO
        ==================================================*/}
        <Link to="/">
          <h2 className="text-2xl font-extrabold text-green-600">
            Ngepas
          </h2>
        </Link>
      </div>
    </nav>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Navbar;