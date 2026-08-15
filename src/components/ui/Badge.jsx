/*==================================================
 NGEPAS REBORN
 File    : Badge.jsx
 Module  : UI Foundation
==================================================*/

const variantClasses = {
  primary:
    "bg-[var(--np-color-green-100)] text-[var(--np-color-green-700)]",
  accent:
    "bg-[var(--np-color-yellow-100)] text-[var(--np-color-yellow-700)]",
  neutral:
    "bg-[var(--np-color-neutral-100)] text-[var(--np-color-muted)]",
  danger: "bg-red-50 text-red-700",
};

function Badge({ children, variant = "primary", className = "" }) {
  return (
    <span
      className={`inline-flex min-h-[var(--np-control-height-sm)] items-center rounded-np-pill px-[var(--np-space-2)] text-[var(--np-text-caption)] font-medium ${variantClasses[variant] || variantClasses.primary} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
