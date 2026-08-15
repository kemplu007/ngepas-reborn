/*==================================================
 NGEPAS REBORN
 File    : IconButton.jsx
 Module  : UI Foundation
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
      ? "bg-[var(--np-color-green-100)] text-[var(--np-color-green-700)] hover:bg-[var(--np-color-green-200)]"
      : "text-[var(--np-color-muted)] hover:bg-[var(--np-color-green-100)] hover:text-[var(--np-color-green-700)]";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      className={`inline-flex h-[var(--np-touch-target)] w-[var(--np-touch-target)] items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-500)] focus-visible:ring-offset-2 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
