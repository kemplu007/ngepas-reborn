/*==================================================
 NGEPAS REBORN
 File    : Input.jsx
 Module  : UI Foundation
==================================================*/

/*==================================================
 SIZE CONTRACT
==================================================*/

const sizeClasses = {
  sm: "min-h-[var(--np-control-height-sm)] px-[var(--np-space-2)] text-[var(--np-text-caption)]",
  md: "min-h-[var(--np-control-height-md)] px-[var(--np-space-3)] text-[var(--np-text-small)]",
  lg: "min-h-[var(--np-control-height-lg)] px-[var(--np-space-4)] text-[var(--np-text-body)]",
};

/*==================================================
 COMPONENT
==================================================*/

function Input({
  size = "md",
  invalid = false,
  className = "",
  ...props
}) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`w-full rounded-np-sm border bg-[var(--np-color-surface)] text-[var(--np-color-text-primary)] placeholder:text-[var(--np-color-subtle)] transition-[background-color,border-color,box-shadow,color] duration-np-fast ease-np-standard focus:border-[var(--np-color-action-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--np-color-focus)] disabled:cursor-not-allowed disabled:bg-[var(--np-color-surface-muted)] disabled:text-[var(--np-color-subtle)] ${invalid ? "border-[var(--np-color-danger)]" : "border-[var(--np-color-border)]"} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    />
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Input;
