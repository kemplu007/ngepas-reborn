/*==================================================
 NGEPAS REBORN
 File    : CategoryCard.jsx
 Module  : Discover Components
==================================================*/

/*==================================================
 COMPONENT
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
      className={`min-w-[5.5rem] rounded-np-md border px-[var(--np-space-2)] py-[var(--np-space-3)] text-center transition-[border-color,background-color,color,box-shadow,transform] duration-np-fast ease-np-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-500)] focus-visible:ring-offset-2 active:scale-[var(--np-motion-scale-pressed)] disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-0 ${
        active
          ? "border-[var(--np-color-green-500)] bg-[var(--np-color-green-100)] text-[var(--np-color-green-700)] shadow-[var(--np-shadow-sm)]"
          : "border-[var(--np-color-border)] bg-[var(--np-color-white)] text-[var(--np-color-muted)] hover:border-[var(--np-color-green-300)] hover:bg-[var(--np-color-canvas)] hover:text-[var(--np-color-green-700)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mx-auto flex h-8 w-8 items-center justify-center rounded-np-sm ${
          active
            ? "bg-[var(--np-color-white)]"
            : "bg-[var(--np-color-surface-muted)]"
        }`}
      >
        {icon}
      </span>
      <span className="mt-1.5 block truncate text-[var(--np-text-caption)] font-medium">
        {name}
      </span>
    </button>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default CategoryCard;

/*==================================================
 END OF FILE
==================================================*/
