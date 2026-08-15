/*==================================================
 NGEPAS REBORN
 File    : FilterPanel.jsx
 Module  : Discover Components
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
  if (!open) return null;

  return (
    <div className="mb-[var(--np-space-5)] grid gap-[var(--np-space-3)] rounded-np-lg border border-[var(--np-color-green-200)] bg-[var(--np-color-green-100)]/60 p-[var(--np-space-4)] sm:grid-cols-3">
      <label className="text-[var(--np-text-caption)] font-semibold text-[var(--np-color-ink-soft)]">
        Kategori
        <select
          value={category}
          onChange={(event) => onCategoryChange?.(event.target.value)}
          className="mt-2 h-[var(--np-control-height-md)] w-full rounded-np-md border border-[var(--np-color-border)] bg-[var(--np-color-white)] px-[var(--np-space-3)] text-[var(--np-text-small)] font-normal text-[var(--np-color-ink)] outline-none focus:border-[var(--np-color-green-500)] focus:ring-4 focus:ring-[var(--np-color-green-100)]"
        >
          <option value="">Semua kategori</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="text-[var(--np-text-caption)] font-semibold text-[var(--np-color-ink-soft)]">
        Rating minimum
        <select
          value={rating}
          onChange={(event) => onRatingChange?.(event.target.value)}
          className="mt-2 h-[var(--np-control-height-md)] w-full rounded-np-md border border-[var(--np-color-border)] bg-[var(--np-color-white)] px-[var(--np-space-3)] text-[var(--np-text-small)] font-normal text-[var(--np-color-ink)] outline-none focus:border-[var(--np-color-green-500)] focus:ring-4 focus:ring-[var(--np-color-green-100)]"
        >
          <option value="">Semua rating</option>
          <option value="4">4 ke atas</option>
          <option value="4.5">4.5 ke atas</option>
        </select>
      </label>

      <button
        type="button"
        onClick={onReset}
        className="self-end rounded-np-md border border-[var(--np-color-border)] bg-[var(--np-color-white)] px-[var(--np-space-3)] py-2 text-[var(--np-text-small)] font-semibold text-[var(--np-color-ink-soft)] hover:border-[var(--np-color-green-300)] hover:text-[var(--np-color-green-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-500)] focus-visible:ring-offset-2"
      >
        Reset filter
      </button>
    </div>
  );
}

export default FilterPanel;
