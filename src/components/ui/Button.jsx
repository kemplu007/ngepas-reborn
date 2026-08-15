/*==================================================
 NGEPAS REBORN
 File    : Button.jsx
 Module  : UI Foundation
==================================================*/

const variantClasses = {
  primary:
    "bg-[var(--np-color-green-700)] text-white hover:bg-[var(--np-color-green-800)]",
  secondary:
    "border border-[var(--np-color-border)] bg-[var(--np-color-white)] text-[var(--np-color-ink)] hover:border-[var(--np-color-green-700)] hover:text-[var(--np-color-green-700)]",
  ghost:
    "text-[var(--np-color-muted)] hover:bg-[var(--np-color-green-100)] hover:text-[var(--np-color-green-700)]",
  danger:
    "bg-[var(--np-color-danger)] text-white hover:bg-red-700",
};

const sizeClasses = {
  sm: "min-h-[var(--np-control-height-sm)] px-[var(--np-space-3)] text-[var(--np-text-small)]",
  md: "min-h-[var(--np-control-height-md)] px-[var(--np-space-4)] text-[var(--np-text-small)]",
  lg: "min-h-[var(--np-control-height-lg)] px-[var(--np-space-5)] text-[var(--np-text-body)]",
};

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
      className={`inline-flex min-w-0 items-center justify-center gap-2 rounded-np-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-500)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
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

export default Button;
