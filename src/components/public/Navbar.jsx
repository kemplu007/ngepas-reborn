import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search, Heart, ShoppingCart, User } from "lucide-react";
import SearchDropdown from "./SearchDropdown";

const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Kategori", path: "/category" },
  { label: "Produk", path: "/category" }, // sementara
  { label: "Tentang Kami", path: "/about" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* ===== KIRI: Logo + Mobile Menu ===== */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold tracking-tight text-green-600">
              Ngepas
            </span>
          </Link>
        </div>

        {/* ===== TENGAH: Desktop Nav ===== */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* ===== KANAN: Search + Icons ===== */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search (desktop) */}
          <div className="hidden sm:block">
            <SearchDropdown />
          </div>

          {/* Search icon mobile */}
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:hidden">
            <Search size={20} />
          </button>

          <Link
            to="/favorit"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <Heart size={20} />
          </Link>

          <Link
            to="/keranjang"
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <ShoppingCart size={20} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
              3
            </span>
          </Link>

          <Link
            to="/akun"
            className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 sm:block"
          >
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;