/*==================================================
 NGEPAS REBORN
 File    : BottomNavigation.jsx
 Module  : Navigation Components
==================================================*/

import { CircleUserRound, Home, LayoutGrid, Scale, Search } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { key: "home", label: "Home", icon: Home, href: "/" },
  { key: "search", label: "Cari", icon: Search },
  { key: "category", label: "Kategori", icon: LayoutGrid, href: "/category" },
  { key: "compare", label: "Compare", icon: Scale, href: "/#hasil-produk" },
  { key: "account", label: "Akun", icon: CircleUserRound },
];

function BottomNavigation({ active = "home", onSearch, onAccount }) {
  return (
    <nav
      aria-label="Navigasi utama mobile"
      className="fixed bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-np-lg border border-[var(--np-color-border)] bg-white/95 p-1.5 shadow-[var(--np-shadow-lg)] backdrop-blur lg:hidden"
    >
      {items.map(({ key, label, icon: Icon, href }) => {
        const isActive = active === key;
        const className = `flex min-w-14 flex-col items-center gap-1 rounded-np-md px-2 py-1.5 text-[var(--np-text-caption)] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-500)] ${
          isActive
            ? "bg-[var(--np-color-green-100)] text-[var(--np-color-green-700)]"
            : "text-[var(--np-color-muted)] hover:bg-[var(--np-color-surface-muted)]"
        }`;

        if (href) {
          return (
            <Link key={key} to={href} className={className} aria-current={isActive ? "page" : undefined}>
              <Icon size={16} aria-hidden="true" />
              {label}
            </Link>
          );
        }

        return (
          <button
            key={key}
            type="button"
            className={className}
            onClick={key === "search" ? onSearch : onAccount}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
