/*==================================================
 NGEPAS REBORN
 File    : FilterPanel.jsx
 Module  : Discover Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { useEffect, useState } from "react";
import { Check, RotateCcw, SlidersHorizontal } from "lucide-react";

/*==================================================
 COMPONENT
==================================================*/

function FilterPanel({
  open,
  category = "",
  categories = [],
  rating = "",
  onCategoryChange,
  onRatingChange,
  onReset,
}) {
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      return undefined;
    }

    const durationValue = getComputedStyle(document.documentElement).getPropertyValue("--np-motion-duration-slow");
    const duration = Number.parseFloat(durationValue) || 420;
    const timeoutId = window.setTimeout(() => setShouldRender(false), duration);

    return () => window.clearTimeout(timeoutId);
  }, [open]);

  if (!shouldRender) return null;

  const hasActiveFilter = Boolean(category || rating);

  return (
    <div
      className={`np-motion-surface mb-[var(--np-space-5)] overflow-hidden rounded-np-md border border-[var(--np-color-border)] bg-[var(--np-color-white)] shadow-[var(--np-shadow-sm)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      data-motion-state={open ? "open" : "closed"}
      aria-hidden={!open}
    >
      {/* Filter header gives the panel a clear entry point without a heavy green block. */}
      <div className="flex items-start justify-between gap-[var(--np-space-3)] border-b border-[var(--np-color-border)] px-[var(--np-space-4)] py-[var(--np-space-4)] sm:px-[var(--np-space-5)]">
        <div className="flex min-w-0 items-start gap-[var(--np-space-3)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-np-sm bg-[var(--np-color-green-100)] text-[var(--np-color-green-700)]">
            <SlidersHorizontal size={17} strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[var(--np-text-caption)] font-bold uppercase tracking-[0.1em] text-[var(--np-color-green-700)]">Filter pilihan</p>
            <h3 className="mt-1 text-[var(--np-text-small)] font-bold leading-tight text-[var(--np-color-ink)]">Sesuaikan yang paling Ngepas</h3>
            <p className="mt-1 text-[var(--np-text-caption)] leading-relaxed text-[var(--np-color-muted)]">Persempit hasil tanpa membuat pilihan terasa rumit.</p>
          </div>
        </div>
        <span className="shrink-0 rounded-np-pill bg-[var(--np-color-canvas)] px-2 py-1 text-[var(--np-text-caption)] font-semibold text-[var(--np-color-muted)]">
          {hasActiveFilter ? "Aktif" : "Opsional"}
        </span>
      </div>

      {/* Controls stay native and accessible while using the custom Ngepas surface. */}
      <div className="grid gap-[var(--np-space-4)] px-[var(--np-space-4)] py-[var(--np-space-4)] sm:grid-cols-2 sm:px-[var(--np-space-5)]">
        <label className="grid gap-2 text-[var(--np-text-caption)] font-semibold text-[var(--np-color-ink-soft)]">
          <span className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--np-color-green-700)] text-[10px] font-bold text-[var(--np-color-white)]">1</span>
            Kategori
          </span>
          <select
            value={category}
            onChange={(event) => onCategoryChange?.(event.target.value)}
            className="h-[var(--np-control-height-md)] w-full rounded-np-sm border border-[var(--np-color-border)] bg-[var(--np-color-canvas)] px-[var(--np-space-3)] text-[var(--np-text-small)] font-medium text-[var(--np-color-ink)] outline-none transition-[border-color,box-shadow] duration-np-fast ease-np-standard focus:border-[var(--np-color-green-500)] focus:ring-4 focus:ring-[var(--np-color-green-100)]"
          >
            <option value="">Semua kategori</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-[var(--np-text-caption)] font-semibold text-[var(--np-color-ink-soft)]">
          <span className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--np-color-green-700)] text-[10px] font-bold text-[var(--np-color-white)]">2</span>
            Rating minimum
          </span>
          <select
            value={rating}
            onChange={(event) => onRatingChange?.(event.target.value)}
            className="h-[var(--np-control-height-md)] w-full rounded-np-sm border border-[var(--np-color-border)] bg-[var(--np-color-canvas)] px-[var(--np-space-3)] text-[var(--np-text-small)] font-medium text-[var(--np-color-ink)] outline-none transition-[border-color,box-shadow] duration-np-fast ease-np-standard focus:border-[var(--np-color-green-500)] focus:ring-4 focus:ring-[var(--np-color-green-100)]"
          >
            <option value="">Semua rating</option>
            <option value="4">4 ke atas</option>
            <option value="4.5">4.5 ke atas</option>
          </select>
        </label>
      </div>

      {/* Reset remains explicit and keeps the filter state understandable. */}
      <div className="flex flex-col gap-3 border-t border-[var(--np-color-border)] px-[var(--np-space-4)] py-[var(--np-space-3)] sm:flex-row sm:items-center sm:justify-between sm:px-[var(--np-space-5)]">
        <p className="flex items-center gap-2 text-[var(--np-text-caption)] leading-relaxed text-[var(--np-color-muted)]">
          <Check size={14} className="shrink-0 text-[var(--np-color-green-700)]" aria-hidden="true" />
          Filter hanya membantu merapikan pilihan.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-[var(--np-touch-target)] items-center justify-center gap-2 self-stretch rounded-np-sm border border-[var(--np-color-border-strong)] bg-[var(--np-color-white)] px-[var(--np-space-3)] py-2 text-[var(--np-text-small)] font-semibold text-[var(--np-color-ink-soft)] transition-[border-color,color,transform] duration-np-fast ease-np-standard hover:border-[var(--np-color-green-300)] hover:text-[var(--np-color-green-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-500)] focus-visible:ring-offset-2 active:scale-[var(--np-motion-scale-pressed)] sm:self-auto"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Reset filter
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;

/*==================================================
 NOTES
==================================================*/

// FilterPanel hanya merender nilai dan mengirim callback; state tetap dikelola oleh page/context.
// Surface mengikuti mockup Search & Filter: putih, berlapis tipis, bernomor, dan tidak memakai blok hijau dominan.

/*==================================================
 END OF FILE
==================================================*/
