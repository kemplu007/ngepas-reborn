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
import { useEffect, useRef, useState } from "react";
import MobileNavDrawer from "../navigation/MobileNavDrawer";

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
  const menuButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    if (!searchOpen) return undefined;

    const focusSearch = () => searchInputRef.current?.focus();
    const frameId = window.requestAnimationFrame(focusSearch);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 sm:px-6 lg:flex-nowrap lg:gap-5 lg:py-3">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMenuOpen((open) => !open)}
          className="order-1 rounded-np-md p-2 text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] lg:hidden"
        >
          <Menu size={21} aria-hidden="true" />
        </button>

        <Link
          to="/"
          aria-label="Ngepas"
          className={`relative order-2 flex h-10 shrink-0 items-center justify-center text-xl font-extrabold tracking-tight text-[var(--np-color-green-700)] transition-[width,transform] duration-np-normal ease-np-standard motion-reduce:transition-none lg:order-none lg:mx-0 lg:h-auto lg:w-auto lg:text-2xl ${searchOpen ? "mx-0 w-10" : "mx-auto w-auto"}`}
        >
          <span className={`transition-[transform,opacity] duration-np-normal ease-np-standard motion-reduce:transition-none ${searchOpen ? "scale-[var(--np-motion-scale-pressed)] opacity-0 lg:scale-100 lg:opacity-100" : "scale-100 opacity-100"}`}>
            Ngepas<span className="text-amber-400">.</span>
          </span>
          <img
            src="/favicon.svg"
            alt=""
            aria-hidden="true"
            className={`absolute h-7 w-7 object-contain transition-[transform,opacity] duration-np-normal ease-np-standard motion-reduce:transition-none lg:hidden ${searchOpen ? "scale-100 opacity-100" : "pointer-events-none scale-[var(--np-motion-scale-pressed)] opacity-0"}`}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          <Link className="rounded-lg px-2.5 py-2 text-sm font-semibold text-emerald-800" to="/">Discover</Link>
          <Link className="rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-800" to="/category">Kategori</Link>
          <Link className="rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-emerald-800" to="/#why-ngepas">Why Ngepas</Link>
        </nav>

        <div className="order-3 ml-auto flex items-center lg:order-none lg:ml-0 lg:min-w-0 lg:flex-1">
          <div className="relative h-10 w-10 lg:hidden">
            <button
              type="button"
              aria-label="Buka pencarian"
              aria-expanded={searchOpen}
              aria-controls="mobile-discover-search"
              onClick={() => setSearchOpen(true)}
              className={`absolute inset-0 rounded-np-md p-2 text-[var(--np-color-ink)] transition-[transform,opacity,background-color] duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none ${searchOpen ? "pointer-events-none scale-[var(--np-motion-scale-pressed)] opacity-0" : "scale-100 opacity-100"}`}
            >
              <Search size={21} aria-hidden="true" />
            </button>
            <form
              id="mobile-discover-search"
              onSubmit={handleSubmit}
              className={`absolute right-0 top-0 flex h-10 w-[min(64vw,18rem)] origin-right items-center rounded-np-md border border-[var(--np-color-border)] bg-[var(--np-color-white)] shadow-[var(--np-shadow-sm)] transition-[transform,opacity] duration-np-normal ease-np-standard motion-reduce:transition-none ${searchOpen ? "translate-x-0 scale-100 opacity-100" : "pointer-events-none translate-x-2 scale-[var(--np-motion-scale-pressed)] opacity-0"}`}
            >
              <Search className="pointer-events-none ml-3 shrink-0 text-[var(--np-color-muted)]" size={17} aria-hidden="true" />
              <input
                ref={searchInputRef}
                id="discover-search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Cari produk..."
                aria-label="Cari produk terbaik, kategori, atau merek"
                className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm text-[var(--np-color-ink)] outline-none placeholder:text-[var(--np-color-muted)]"
              />
              <button
                type="button"
                aria-label="Tutup pencarian"
                onClick={() => setSearchOpen(false)}
                className="mr-1 rounded-np-md p-2 text-[var(--np-color-muted)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] hover:text-[var(--np-color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </form>
          </div>
          <form onSubmit={handleSubmit} className="hidden w-full lg:block">
            <div className="relative mx-auto max-w-2xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--np-color-muted)]" size={18} aria-hidden="true" />
              <input
                id="discover-search-desktop"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Cari produk terbaik, kategori, atau merek..."
                aria-label="Cari produk terbaik, kategori, atau merek"
                className="h-10 w-full rounded-np-md border border-[var(--np-color-border)] bg-[var(--np-color-white)] pl-10 pr-11 text-sm text-[var(--np-color-ink)] outline-none transition-[border-color,box-shadow] duration-np-fast ease-np-standard placeholder:text-[var(--np-color-muted)] focus:border-[var(--np-color-green-700)] focus:ring-4 focus:ring-[var(--np-color-green-100)] motion-reduce:transition-none"
              />
              <button
                type="button"
                aria-label="Buka filter"
                onClick={onFilter}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-np-md p-1.5 text-[var(--np-color-muted)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-green-100)] hover:text-[var(--np-color-green-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
              >
                <SlidersHorizontal size={17} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

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

      <MobileNavDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={menuButtonRef}
      />
    </header>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default DiscoverHeader;
