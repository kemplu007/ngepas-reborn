/*==================================================
 NGEPAS REBORN
 File    : MobileNavDrawer.jsx
 Module  : Navigation Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { ArrowRight, House, LayoutGrid, Scale, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

/*==================================================
 DATA
==================================================*/

const navigationItems = [
  { key: "home", label: "Discover", description: "Temukan pilihan yang lebih pas", icon: House, href: "/" },
  { key: "category", label: "Kategori", description: "Jelajahi kebutuhan berdasarkan kategori", icon: LayoutGrid, href: "/category" },
  { key: "compare", label: "Bandingkan pilihan", description: "Lihat produk yang sedang kamu pertimbangkan", icon: Scale, href: "/#hasil-produk" },
  { key: "why", label: "Why Ngepas", description: "Kenali cara Ngepas membantu keputusanmu", icon: ArrowRight, href: "/#why-ngepas" },
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
        className={`absolute inset-0 bg-[var(--np-color-ink)]/20 transition-opacity duration-np-normal ease-np-standard ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Drawer surface stays calm after entering and remains keyboard reachable. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi mobile"
        className={`relative flex h-full max-h-[100dvh] w-[min(86vw,360px)] flex-col overflow-y-auto overscroll-contain border-r border-[var(--np-color-border)] bg-[var(--np-color-white)] px-4 pb-6 pt-4 shadow-[var(--np-shadow-lg)] transition-transform duration-np-normal ease-np-emphasized ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[var(--np-color-border)] pb-4">
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
            className="min-h-[var(--np-touch-target)] min-w-[var(--np-touch-target)] rounded-np-md p-2 text-[var(--np-color-ink)] transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 py-5" aria-label="Menu navigasi mobile">
          {navigationItems.map(({ key, label, description, icon: Icon, href }) => (
            <Link
              key={key}
              to={href}
              onClick={onClose}
              className="group flex min-h-[var(--np-touch-target)] items-center gap-3 rounded-np-lg px-3 py-3 text-[var(--np-color-ink)] transition-[transform,background-color,color] duration-np-fast ease-np-standard hover:bg-[var(--np-color-green-100)] hover:text-[var(--np-color-green-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-np-md bg-[var(--np-color-canvas)] text-[var(--np-color-green-700)] transition-colors duration-np-fast ease-np-standard group-hover:bg-[var(--np-color-white)]">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{label}</span>
                <span className="mt-0.5 block truncate text-xs text-[var(--np-color-muted)]">{description}</span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-[var(--np-color-border)] pt-4 text-xs leading-relaxed text-[var(--np-color-muted)]">
          <p>Belum ada akun publik. Kamu tetap bisa mulai dari pencarian dan pilihan kurasi.</p>
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
