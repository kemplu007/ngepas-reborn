/*==================================================
 NGEPAS REBORN
 File    : DiscoverHeader.jsx
 Module  : Public Discover Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import {
  Bell,
  Baby,
  CircleUserRound,
  Dumbbell,
  Ellipsis,
  House,
  Menu,
  Monitor,
  Search,
  SlidersHorizontal,
  Smartphone,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

/*==================================================
 DATA
==================================================*/

const headerCategories = [
  { label: "Elektronik", icon: Smartphone },
  { label: "Komputer", icon: Monitor },
  { label: "Rumah", icon: House },
  { label: "Olahraga", icon: Dumbbell },
  { label: "Ibu & Anak", icon: Baby },
  { label: "Lainnya", icon: Ellipsis },
];

/*==================================================
 COMPONENT
==================================================*/

function DiscoverHeader({ query, onQueryChange, onSubmit, onFilter }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 sm:px-6 lg:flex-nowrap lg:gap-5 lg:py-3">
        <button
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="order-1 rounded-xl p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <Link to="/" className="order-2 mx-auto shrink-0 text-xl font-extrabold tracking-tight text-emerald-800 lg:order-none lg:mx-0 lg:text-2xl">
          Ngepas<span className="text-amber-400">.</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          <Link className="rounded-lg px-2.5 py-2 text-sm font-semibold text-emerald-800" to="/">Discover</Link>
          <Link className="rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-800" to="/category">Kategori</Link>
          <Link className="rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-800" to="/#why-ngepas">Why Ngepas</Link>
        </nav>

        <form onSubmit={handleSubmit} className="order-4 basis-full lg:order-none lg:min-w-0 lg:flex-1">
          <div className="relative mx-auto max-w-2xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Cari produk terbaik, kategori, atau merek..."
              aria-label="Cari produk terbaik, kategori, atau merek"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
            />
            <button
              type="button"
              aria-label="Buka filter"
              onClick={onFilter}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              <SlidersHorizontal size={17} />
            </button>
          </div>
        </form>

        <div className="order-3 ml-auto flex items-center gap-1 lg:order-none">
          <Link to="/#hasil-produk" className="hidden rounded-xl px-2.5 py-1.5 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50 lg:block">
            <span className="block text-base leading-none">⚖</span>
            Bandingkan
          </Link>
          <div className="relative hidden lg:block">
            <button
              type="button"
              aria-label="Buka notifikasi"
              aria-expanded={notificationOpen}
              onClick={() => setNotificationOpen((open) => !open)}
              className="relative rounded-xl p-2.5 text-slate-700 transition hover:bg-slate-50"
            >
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-400" />
            </button>
            {notificationOpen && (
              <div className="absolute right-0 top-12 w-64 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
                <p className="text-sm font-bold text-slate-900">Notifikasi</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">Update kurasi dan informasi produk akan muncul di sini.</p>
              </div>
            )}
          </div>
          <div className="relative hidden lg:block">
            <button
              type="button"
              aria-label="Buka akun"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((open) => !open)}
              className="rounded-xl p-2.5 text-slate-700 transition hover:bg-slate-50"
            >
              <CircleUserRound size={21} />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-12 w-48 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl">
                <p className="px-2 py-2 text-sm font-bold text-slate-900">Akun saya</p>
                <p className="px-2 pb-2 text-xs text-slate-500">Fitur akun publik akan hadir pada fase berikutnya.</p>
              </div>
            )}
          </div>
          <button type="button" aria-label="Buka notifikasi" aria-expanded={notificationOpen} className="relative rounded-xl p-2 text-slate-700 lg:hidden" onClick={() => setNotificationOpen((open) => !open)}>
            <Bell size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-400" />
          </button>
        </div>
      </div>

      <div className="hidden border-t border-slate-50 lg:block">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-2" aria-label="Kategori cepat">
          {headerCategories.map(({ label, icon: Icon }) => (
            <Link key={label} to={`/category?name=${encodeURIComponent(label)}`} className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800">
              <Icon size={15} strokeWidth={1.7} />
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {notificationOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto max-w-7xl rounded-2xl bg-emerald-50/70 p-4">
            <p className="text-sm font-bold text-slate-900">Notifikasi</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">Update kurasi dan informasi produk akan muncul di sini.</p>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link to="/" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-emerald-800">Discover</Link>
            <Link to="/category" className="rounded-xl px-3 py-2.5 text-sm text-slate-600">Kategori</Link>
            <Link to="/#hasil-produk" className="rounded-xl px-3 py-2.5 text-sm text-slate-600">Bandingkan pilihan</Link>
            <Link to="/#why-ngepas" className="rounded-xl px-3 py-2.5 text-sm text-slate-600">Why Ngepas</Link>
          </div>
        </div>
      )}
    </header>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default DiscoverHeader;
