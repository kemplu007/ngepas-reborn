/*==================================================
 NGEPAS REBORN
 File    : Button.jsx
 Module  : UI Foundation
==================================================*/

/*==================================================
 VARIANT CONTRACT
==================================================*/

const variantClasses = {
  primary:
    "bg-[var(--np-color-action-primary)] text-[var(--np-color-action-primary-contrast)] hover:bg-[var(--np-color-action-primary-hover)]",
  secondary:
    "border border-[var(--np-color-border)] bg-[var(--np-color-surface)] text-[var(--np-color-text-primary)] hover:border-[var(--np-color-action-primary)] hover:text-[var(--np-color-action-primary)]",
  ghost:
    "text-[var(--np-color-text-secondary)] hover:bg-[var(--np-color-surface-accent)] hover:text-[var(--np-color-action-primary)]",
  danger:
    "bg-[var(--np-color-danger)] text-[var(--np-color-white)] hover:opacity-90",
};

/*==================================================
 SIZE CONTRACT
==================================================*/

const sizeClasses = {
  sm: "min-h-[var(--np-control-height-sm)] px-[var(--np-space-3)] text-[var(--np-text-small)]",
  md: "min-h-[var(--np-control-height-md)] px-[var(--np-space-4)] text-[var(--np-text-small)]",
  lg: "min-h-[var(--np-control-height-lg)] px-[var(--np-space-5)] text-[var(--np-text-body)]",
};

/*==================================================
 COMPONENT
==================================================*/

function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex min-w-0 items-center justify-center gap-2 rounded-np-md font-medium transition-[background-color,border-color,color,opacity,transform] duration-np-fast ease-np-standard active:scale-[var(--np-motion-scale-pressed)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Button;
