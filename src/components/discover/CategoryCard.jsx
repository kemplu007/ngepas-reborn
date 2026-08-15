/*==================================================
 NGEPAS REBORN
 File    : CategoryCard.jsx
 Module  : Discover Components
==================================================*/

function CategoryCard({
  name,
  icon,
  active = false,
  onSelect,
  disabled = false,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      onClick={() => onSelect?.(name)}
      className={`min-w-[5.75rem] rounded-np-lg border px-[var(--np-space-3)] py-[var(--np-space-4)] text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-500)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-0 ${
        active
          ? "border-[var(--np-color-green-500)] bg-[var(--np-color-green-100)] text-[var(--np-color-green-700)] shadow-[var(--np-shadow-sm)]"
          : "border-[var(--np-color-border)] bg-[var(--np-color-white)] text-[var(--np-color-muted)] hover:border-[var(--np-color-green-300)] hover:text-[var(--np-color-green-700)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mx-auto flex h-9 w-9 items-center justify-center rounded-np-md text-lg ${
          active
            ? "bg-[var(--np-color-white)]"
            : "bg-[var(--np-color-surface-muted)]"
        }`}
      >
        {icon}
      </span>
      <span className="mt-2 block truncate text-[var(--np-text-caption)] font-medium">
        {name}
      </span>
    </button>
  );
}

export default CategoryCard;
