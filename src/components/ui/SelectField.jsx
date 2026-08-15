/*==================================================
 NGEPAS REBORN
 File    : SelectField.jsx
 Module  : UI Foundation
==================================================*/

/*==================================================
 SIZE CONTRACT
==================================================*/

const sizeClasses = {
  sm: "min-h-[var(--np-control-height-sm)] px-[var(--np-space-2)] text-[var(--np-text-caption)]",
  md: "min-h-[var(--np-control-height-md)] px-[var(--np-space-3)] text-[var(--np-text-small)]",
  lg: "min-h-[var(--np-control-height-lg)] px-[var(--np-space-3)] text-[var(--np-text-small)]",
};

/*==================================================
 COMPONENT
==================================================*/

function SelectField({
  label,
  value = "",
  onChange,
  options = [],
  id,
  name,
  error,
  helper,
  disabled = false,
  required = false,
  invalid = false,
  size = "lg",
  className = "",
  ...props
}) {
  const fieldId = id || name;
  const hasError = Boolean(error || invalid);
  const describedBy = [
    helper && `${fieldId}-helper`,
    error && `${fieldId}-error`,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  /*==================================================
   RENDER
  ==================================================*/

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[var(--np-text-small)] font-medium text-[var(--np-color-text-primary)]"
        >
          {label}
        </label>
      )}

      <select
        {...props}
        id={fieldId}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        onChange={onChange}
        aria-invalid={hasError || undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        className={`w-full rounded-np-sm border bg-[var(--np-color-surface)] text-[var(--np-color-text-primary)] outline-none transition-[background-color,border-color,box-shadow,color] duration-np-normal ease-np-standard focus:border-[var(--np-color-action-primary)] focus:ring-2 focus:ring-[var(--np-color-focus)] disabled:cursor-not-allowed disabled:bg-[var(--np-color-surface-muted)] disabled:text-[var(--np-color-subtle)] motion-reduce:transition-none ${hasError ? "border-[var(--np-color-danger)] focus:border-[var(--np-color-danger)]" : "border-[var(--np-color-border)]"} ${sizeClasses[size] || sizeClasses.lg}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {helper && !error && (
        <p
          id={`${fieldId}-helper`}
          className="text-[var(--np-text-caption)] text-[var(--np-color-text-secondary)]"
        >
          {helper}
        </p>
      )}

      {error && (
        <p
          id={`${fieldId}-error`}
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

export default SelectField;
