/*==================================================
 NGEPAS REBORN
 File    : MobileNavDrawer.jsx
 Module  : Navigation Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { BookOpen, House, Info, LayoutGrid, Lightbulb, ListChecks, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

/*==================================================
 DATA
==================================================*/

const navigationItems = [
  { key: "discover", label: "Discover", description: "Kembali ke pilihan kurasi utama", icon: House, href: "/" },
  { key: "category", label: "Kategori", description: "Jelajahi kebutuhan berdasarkan kategori", icon: LayoutGrid, href: "/category" },
  { key: "how-it-works", label: "Cara Kerja Ngepas", description: "Lihat langkah dari kebutuhan ke pilihan", icon: ListChecks, href: "/#cara-kerja" },
  { key: "why", label: "Why Ngepas", description: "Kenali prinsip kurasi dan kepercayaan kami", icon: Lightbulb, href: "/#why-ngepas" },
  { key: "articles", label: "Artikel & Tips", description: "Baca panduan sebelum menentukan pilihan", icon: BookOpen, href: "/#artikel-tips" },
];

/*==================================================
 COMPONENT
==================================================*/

function MobileNavDrawer({ open = false, onClose, triggerRef }) {
  const closeButtonRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        triggerRef?.current?.focus();
      }
      wasOpenRef.current = false;
      return undefined;
    }

    wasOpenRef.current = true;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open, triggerRef]);

  return createPortal(
    <div
      id="mobile-nav-drawer"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Overlay closes the drawer without shifting the page layout. */}
      <button
        type="button"
        aria-label="Tutup menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`np-motion-surface absolute inset-0 bg-[var(--np-color-ink)]/20 ${open ? "opacity-100" : "opacity-0"}`}
        data-motion-state={open ? "open" : "closed"}
      />

      {/* Drawer surface stays calm after entering and remains keyboard reachable. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi mobile"
        className={`np-motion-surface relative flex h-full max-h-[100dvh] w-[min(80vw,320px)] flex-col overflow-y-auto overscroll-contain border-r border-[var(--np-color-border)] bg-[var(--np-color-white)] px-3 pb-5 pt-3 shadow-[var(--np-shadow-lg)] ${open ? "translate-x-0" : "-translate-x-full"}`}
        data-motion-state={open ? "open" : "closed"}
      >
        <div className="flex items-center justify-between border-b border-[var(--np-color-border)] pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--np-color-green-700)]">Menu Ngepas</p>
            <p className="mt-1 text-sm text-[var(--np-color-muted)]">Bantu keputusan belanja dengan lebih tenang.</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Tutup menu"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
            className="min-h-[var(--np-touch-target)] min-w-[var(--np-touch-target)] rounded-np-sm p-2 text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 py-4" aria-label="Menu navigasi mobile">
          {navigationItems.map(({ key, label, description, icon: Icon, href }) => (
            <Link
              key={key}
              to={href}
              onClick={onClose}
              className="group flex min-h-[var(--np-touch-target)] items-center gap-2 rounded-np-md px-2 py-2.5 text-[var(--np-color-ink)] transition-[transform,background-color,color] duration-np-fast ease-np-standard hover:bg-[var(--np-color-green-100)] hover:text-[var(--np-color-green-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-np-sm bg-[var(--np-color-canvas)] text-[var(--np-color-green-700)] transition-colors duration-np-fast ease-np-standard group-hover:bg-[var(--np-color-white)]">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{label}</span>
                <span className="mt-0.5 block truncate text-xs text-[var(--np-color-muted)]">{description}</span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-[var(--np-color-border)] pt-3 text-xs leading-relaxed text-[var(--np-color-muted)]">
          <p><Info size={14} className="mr-1 inline-block align-[-2px] text-[var(--np-color-green-700)]" /> Semua menu di sini mengarah ke fitur dan informasi yang sudah tersedia.</p>
        </div>
      </aside>
    </div>,
    document.body,
  );
}

/*==================================================
 EXPORT
==================================================*/

export default MobileNavDrawer;

/*==================================================
 NOTES
==================================================*/

// Motion only uses transform and opacity for the drawer and overlay.
// Navigation items reuse approved routes; no new backend or account flow is introduced.
// Reduced motion is handled globally by the design token layer.

/*==================================================
 END OF FILE
==================================================*/
