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
import { Menu, Search, Heart, ShoppingCart } from "lucide-react";
import navigation from "../data/navigation";
import MenuItem from "./MenuItem";
import SearchDropdown from "./SearchDropdown"


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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 gap-2 sm:gap-4">
        {/*==================================================
            KIRI: MOBILE MENU BUTTON & LOGO
        ==================================================*/}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleMenu}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
          >
            <Menu size={20} />
          </button>

          <Link to="/">
            <h2 className="text-xl sm:text-lg font-extrabold text-green-600 tracking-tight">
              Ngepas
            </h2>
          </Link>
        </div>

        {/*==================================================
             SEARCH BAR
        ==================================================*/}
        <SearchDropdown />

        {/*==================================================
            KANAN: FAVORIT & KERANJANG
        ==================================================*/}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Tombol Favorit */}
          <Link
            to="/favorit"
            className="relative rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
            title="Favorit"
          >
            <Heart size={20} />
          </Link>

          {/* Tombol Keranjang */}
          <Link
            to="/keranjang"
            className="relative rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 flex items-center"
            title="Keranjang"
          >
            <ShoppingCart size={20} />
            {/* Badge Angka Keranjang */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-green-600 text-[10px] sm:text-xs font-bold text-white shadow-sm">
              3
            </span>
          </Link>
        </div>

        {/*==================================================
            MOBILE DROPDOWN MENU
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
      </div>
    </nav>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Navbar;
