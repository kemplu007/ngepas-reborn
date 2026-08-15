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
  CircleUserRound,
  Menu,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import MobileNavDrawer from "../navigation/MobileNavDrawer";

/*==================================================
 SEARCH FIELD
==================================================*/

function DiscoverSearch({ id, query, onQueryChange, onSubmit, onFilter, mobile = false }) {
  return (
    <form onSubmit={onSubmit} className={mobile ? "w-full" : "w-full"}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--np-color-muted)]"
          size={mobile ? 19 : 18}
          aria-hidden="true"
        />
        <input
          id={id}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari produk terbaik, kategori, atau merek..."
          aria-label="Cari produk terbaik, kategori, atau merek"
          className={`h-11 w-full rounded-[var(--np-radius-md)] border border-[var(--np-color-border)] bg-[var(--np-color-white)] pl-10 pr-11 text-sm text-[var(--np-color-ink)] outline-none transition-[border-color,box-shadow] duration-np-fast ease-np-standard placeholder:text-[var(--np-color-muted)] focus:border-[var(--np-color-green-700)] focus:ring-4 focus:ring-[var(--np-color-green-100)] motion-reduce:transition-none ${mobile ? "text-[15px]" : ""}`}
        />
        <button
          type="button"
          aria-label="Buka filter"
          onClick={onFilter}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[var(--np-radius-sm)] p-2 text-[var(--np-color-muted)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] hover:text-[var(--np-color-green-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
        >
          <SlidersHorizontal size={17} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

/*==================================================
 COMPONENT
==================================================*/

function DiscoverHeader({ query, onQueryChange, onSubmit, onFilter }) {
  const menuButtonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--np-color-border)] bg-[var(--np-color-white)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/*============================================
          MOBILE / DESKTOP IDENTITY ROW
        ============================================*/}
        <div className="flex min-h-[4.5rem] items-center gap-3 lg:gap-6">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-[var(--np-radius-md)] p-2 text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none lg:hidden"
          >
            <Menu size={22} aria-hidden="true" />
          </button>

          <Link
            to="/"
            aria-label="Ngepas"
            className="mx-auto shrink-0 text-[1.45rem] font-extrabold tracking-tight text-[var(--np-color-green-700)] lg:mx-0 lg:text-2xl"
          >
            Ngepas<span className="text-amber-400">.</span>
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <DiscoverSearch
              id="discover-search-desktop"
              query={query}
              onQueryChange={onQueryChange}
              onSubmit={handleSearchSubmit}
              onFilter={onFilter}
            />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Link
              to="/#hasil-produk"
              className="hidden min-w-[4.5rem] rounded-[var(--np-radius-md)] px-2 py-1.5 text-center text-[11px] font-semibold text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] motion-reduce:transition-none lg:block"
            >
              <span className="block text-base leading-none" aria-hidden="true">⚖</span>
              Bandingkan
            </Link>

            <div className="relative">
              <button
                type="button"
                aria-label="Buka notifikasi"
                aria-expanded={notificationOpen}
                onClick={() => setNotificationOpen((open) => !open)}
                className="relative rounded-[var(--np-radius-md)] p-2.5 text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
              >
                <Bell size={21} aria-hidden="true" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-400" aria-label="Notifikasi baru" />
              </button>
              {notificationOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-[var(--np-radius-md)] border border-[var(--np-color-border)] bg-white p-4 shadow-[var(--np-shadow-md)]">
                  <p className="text-sm font-bold text-[var(--np-color-ink)]">Notifikasi</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--np-color-muted)]">Update kurasi dan informasi produk akan muncul di sini.</p>
                </div>
              )}
            </div>

            <div className="relative hidden lg:block">
              <button
                type="button"
                aria-label="Buka akun"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((open) => !open)}
                className="rounded-[var(--np-radius-md)] p-2.5 text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
              >
                <CircleUserRound size={22} aria-hidden="true" />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-12 z-50 w-48 rounded-[var(--np-radius-md)] border border-[var(--np-color-border)] bg-white p-3 shadow-[var(--np-shadow-md)]">
                  <p className="px-2 py-2 text-sm font-bold text-[var(--np-color-ink)]">Akun</p>
                  <p className="px-2 pb-2 text-xs leading-relaxed text-[var(--np-color-muted)]">Akun publik belum menjadi bagian dari scope Ngepas v1.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*============================================
          MOBILE SEARCH ROW
        ============================================*/}
        <div className="border-t border-[var(--np-color-border)] py-2.5 lg:hidden">
          <DiscoverSearch
            id="discover-search"
            query={query}
            onQueryChange={onQueryChange}
            onSubmit={handleSearchSubmit}
            onFilter={onFilter}
            mobile
          />
        </div>
      </div>

      {notificationOpen && (
        <div className="border-t border-[var(--np-color-border)] bg-[var(--np-color-white)] px-4 py-3 lg:hidden">
          <div className="mx-auto max-w-7xl rounded-[var(--np-radius-md)] bg-emerald-50/70 p-4">
            <p className="text-sm font-bold text-[var(--np-color-ink)]">Notifikasi</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--np-color-muted)]">Update kurasi dan informasi produk akan muncul di sini.</p>
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
