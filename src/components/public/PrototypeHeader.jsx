/*==================================================
 NGEPAS REBORN
 File    : PrototypeHeader.jsx
 Module  : Public Prototype Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { Bell, CircleUserRound, Menu, Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

/*==================================================
 COMPONENT
==================================================*/

function PrototypeHeader({ query, onQueryChange, onSubmit, onFilter }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:py-4">
        <button
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <Link to="/prototype/discover" className="shrink-0 text-xl font-extrabold tracking-tight text-emerald-800 lg:text-2xl">
          Ngepas<span className="text-amber-400">.</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi prototype">
          <Link className="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800" to="/prototype/discover">Discover</Link>
          <Link className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-800" to="/category">Kategori</Link>
          <Link className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-800" to="/prototype/discover#why-ngepas">Why Ngepas</Link>
        </nav>

        <form onSubmit={handleSubmit} className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Cari produk terbaik, kategori, atau merek..."
            aria-label="Cari produk terbaik, kategori, atau merek"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
          />
          <button
            type="button"
            aria-label="Buka filter"
            onClick={onFilter}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <SlidersHorizontal size={17} />
          </button>
        </form>

        <div className="hidden items-center gap-1 lg:flex">
          <Link to="/prototype/discover#compare" className="rounded-xl px-3 py-2 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
            <span className="block text-base">⚖</span>
            Bandingkan
          </Link>
          <div className="relative">
            <button
              type="button"
              aria-label="Buka notifikasi"
              onClick={() => setNotificationOpen((open) => !open)}
              className="relative rounded-xl p-2.5 text-slate-700 transition hover:bg-slate-50"
            >
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-400" />
            </button>
            {notificationOpen && (
              <div className="absolute right-0 top-12 w-64 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
                <p className="text-sm font-bold text-slate-900">Notifikasi</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">Prototype aktif. Nanti area ini bisa dipakai untuk update produk dan stok.</p>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              aria-label="Buka akun"
              onClick={() => setAccountOpen((open) => !open)}
              className="rounded-xl p-2.5 text-slate-700 transition hover:bg-slate-50"
            >
              <CircleUserRound size={21} />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-12 w-48 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl">
                <p className="px-2 py-2 text-sm font-bold text-slate-900">Akun saya</p>
                <p className="px-2 pb-2 text-xs text-slate-500">Akun publik belum masuk scope Phase 1.</p>
              </div>
            )}
          </div>
        </div>

        <button type="button" aria-label="Buka notifikasi" className="relative rounded-xl p-2 text-slate-700 lg:hidden" onClick={() => setNotificationOpen((open) => !open)}>
          <Bell size={20} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-400" />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link to="/prototype/discover" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-emerald-800">Discover</Link>
            <Link to="/category" className="rounded-xl px-3 py-2.5 text-sm text-slate-600">Kategori</Link>
            <Link to="/prototype/discover#compare" className="rounded-xl px-3 py-2.5 text-sm text-slate-600">Bandingkan pilihan</Link>
          </div>
        </div>
      )}
    </header>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default PrototypeHeader;
