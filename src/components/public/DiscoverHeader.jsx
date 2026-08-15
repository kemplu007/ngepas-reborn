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
  Scale,
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
    <form onSubmit={onSubmit} className="w-full">
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
          placeholder={mobile ? "Cari produk..." : "Cari produk, kategori, atau merek..."}
          aria-label="Cari produk terbaik, kategori, atau merek"
          className="h-[var(--np-control-height-lg)] w-full rounded-[var(--np-radius-md)] border border-[var(--np-color-border)] bg-[var(--np-color-white)] pl-10 pr-11 text-sm text-[var(--np-color-ink)] outline-none transition-[border-color,box-shadow] duration-np-fast ease-np-standard placeholder:text-[var(--np-color-muted)] focus:border-[var(--np-color-green-700)] focus:ring-4 focus:ring-[var(--np-color-green-100)] motion-reduce:transition-none"
        />
        <button
          type="button"
          aria-label="Buka filter"
          onClick={onFilter}
          className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[var(--np-radius-sm)] p-2 text-[var(--np-color-muted)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] hover:text-[var(--np-color-green-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
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
      <div className="mx-auto max-w-[var(--np-container-max)] px-[var(--np-gutter-mobile)] sm:px-[var(--np-gutter-tablet)] lg:px-[var(--np-gutter-desktop)]">
        {/*============================================
          MOBILE IDENTITY ROW
        ============================================*/}
        <div className="grid h-14 grid-cols-[var(--np-touch-target)_1fr_var(--np-touch-target)] items-center gap-2 lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-[var(--np-touch-target)] w-[var(--np-touch-target)] items-center justify-center rounded-[var(--np-radius-sm)] text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
          >
            <Menu size={22} aria-hidden="true" />
          </button>

          <Link
            to="/"
            aria-label="Ngepas"
            className="justify-self-center text-[1.35rem] font-extrabold tracking-tight text-[var(--np-color-green-700)]"
          >
            Ngepas<span className="text-[var(--np-color-yellow-500)]">.</span>
          </Link>

          <div className="relative justify-self-end">
            <button
              type="button"
              aria-label="Buka notifikasi"
              aria-expanded={notificationOpen}
              onClick={() => setNotificationOpen((open) => !open)}
              className="relative flex h-[var(--np-touch-target)] w-[var(--np-touch-target)] items-center justify-center rounded-[var(--np-radius-sm)] text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
            >
              <Bell size={21} aria-hidden="true" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--np-color-yellow-500)]" aria-label="Notifikasi baru" />
            </button>
          </div>
        </div>

        {/*============================================
          MOBILE SEARCH ROW
        ============================================*/}
        <div className="border-t border-[var(--np-color-border)] py-2 lg:hidden">
          <DiscoverSearch
            id="discover-search"
            query={query}
            onQueryChange={onQueryChange}
            onSubmit={handleSearchSubmit}
            onFilter={onFilter}
            mobile
          />
        </div>

        {/*============================================
          DESKTOP IDENTITY AND SEARCH ROW
        ============================================*/}
        <div className="hidden h-[var(--np-header-desktop-height)] items-center gap-6 lg:flex">
          <Link to="/" aria-label="Ngepas" className="shrink-0 text-2xl font-extrabold tracking-tight text-[var(--np-color-green-700)]">
            Ngepas<span className="text-[var(--np-color-yellow-500)]">.</span>
          </Link>

          <nav className="flex items-center gap-1" aria-label="Navigasi utama">
            <Link to="/" className="rounded-[var(--np-radius-sm)] px-3 py-2 text-sm font-semibold text-[var(--np-color-green-700)]">Discover</Link>
            <Link to="/category" className="rounded-[var(--np-radius-sm)] px-3 py-2 text-sm font-medium text-[var(--np-color-muted)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] hover:text-[var(--np-color-green-700)]">Kategori</Link>
            <Link to="/#why-ngepas" className="rounded-[var(--np-radius-sm)] px-3 py-2 text-sm font-medium text-[var(--np-color-muted)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] hover:text-[var(--np-color-green-700)]">Why Ngepas</Link>
          </nav>

          <div className="min-w-0 flex-1">
            <DiscoverSearch
              id="discover-search-desktop"
              query={query}
              onQueryChange={onQueryChange}
              onSubmit={handleSearchSubmit}
              onFilter={onFilter}
            />
          </div>

          <div className="relative flex items-center gap-1">
            <Link to="/#hasil-produk" aria-label="Bandingkan pilihan" className="rounded-[var(--np-radius-sm)] p-2.5 text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none">
              <Scale size={22} aria-hidden="true" />
            </Link>
            <button
              type="button"
              aria-label="Buka akun"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((open) => !open)}
              className="rounded-[var(--np-radius-sm)] p-2.5 text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
            >
              <CircleUserRound size={22} aria-hidden="true" />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-12 z-50 w-48 rounded-[var(--np-radius-md)] border border-[var(--np-color-border)] bg-[var(--np-color-white)] p-3 shadow-[var(--np-shadow-md)]">
                <p className="px-2 py-2 text-sm font-bold text-[var(--np-color-ink)]">Akun</p>
                <p className="px-2 pb-2 text-xs leading-relaxed text-[var(--np-color-muted)]">Akun publik belum menjadi bagian dari scope Ngepas v1.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {notificationOpen && (
        <div className="border-t border-[var(--np-color-border)] bg-[var(--np-color-white)] px-[var(--np-gutter-mobile)] py-3 lg:hidden">
          <div className="mx-auto max-w-[var(--np-container-max)] rounded-[var(--np-radius-md)] bg-[var(--np-color-surface-muted)] p-4">
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
