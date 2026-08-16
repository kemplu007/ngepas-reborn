/*==================================================
  NGEPAS REBORN
  File    : TextareaField.jsx
  Module  : UI Foundation
==================================================*/

/*==================================================
  SIZE CONTRACT
==================================================*/

const sizeClasses = {
  sm: "min-h-[7rem] px-[var(--np-space-2)] py-[var(--np-space-2)] text-[var(--np-text-caption)]",
  md: "min-h-[9rem] px-[var(--np-space-3)] py-[var(--np-space-3)] text-[var(--np-text-small)]",
  lg: "min-h-[12rem] px-[var(--np-space-4)] py-[var(--np-space-4)] text-[var(--np-text-body)]",
};

/*==================================================
  COMPONENT
==================================================*/

function TextareaField({
  id,
  label,
  hint,
  error,
  required = false,
  invalid = false,
  size = "md",
  className = "",
  ...props
}) {
  const describedBy = [
    hint && `${id}-hint`,
    error && `${id}-error`,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const hasError = Boolean(error || invalid);

  return (
    <div className="space-y-[var(--np-space-2)]">
      {label && (
        <label
          htmlFor={id}
          className="block text-[var(--np-text-small)] font-medium text-[var(--np-color-text-primary)]"
        >
          {label}
          {required && (
            <span className="ml-1 text-[var(--np-color-danger)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <textarea
        id={id}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={`w-full resize-y rounded-np-sm border bg-[var(--np-color-surface)] text-[var(--np-color-text-primary)] placeholder:text-[var(--np-color-subtle)] transition-[background-color,border-color,box-shadow,color] duration-np-fast ease-np-standard focus:border-[var(--np-color-action-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--np-color-focus)] disabled:cursor-not-allowed disabled:bg-[var(--np-color-surface-muted)] disabled:text-[var(--np-color-subtle)] motion-reduce:transition-none ${hasError ? "border-[var(--np-color-danger)]" : "border-[var(--np-color-border)]"} ${sizeClasses[size] || sizeClasses.md} ${className}`}
        {...props}
      />

      {hint && !error && (
        <p
          id={`${id}-hint`}
          className="text-[var(--np-text-caption)] text-[var(--np-color-text-secondary)]"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="text-[var(--np-text-caption)] text-[var(--np-color-danger)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/*==================================================
  EXPORT
==================================================*/

export default TextareaField;
