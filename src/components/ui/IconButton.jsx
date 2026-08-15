/*==================================================
 NGEPAS REBORN
 File    : IconButton.jsx
 Module  : UI Foundation
==================================================*/

/*==================================================
 COMPONENT
==================================================*/

function IconButton({
  children,
  label,
  pressed,
  variant = "ghost",
  className = "",
  ...props
}) {
  const variantClass =
    variant === "soft"
      ? "bg-[var(--np-color-surface-accent)] text-[var(--np-color-action-primary)] hover:bg-[var(--np-color-green-200)]"
      : "text-[var(--np-color-text-secondary)] hover:bg-[var(--np-color-surface-accent)] hover:text-[var(--np-color-action-primary)]";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      className={`inline-flex h-[var(--np-touch-target)] w-[var(--np-touch-target)] items-center justify-center rounded-full transition-[background-color,color,opacity,transform] duration-np-fast ease-np-standard active:scale-[var(--np-motion-scale-pressed)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-focus)] focus-visible:ring-offset-2 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default IconButton;
