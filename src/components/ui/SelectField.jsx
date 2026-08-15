/*==================================================
 NGEPAS REBORN
 File    : SelectField.jsx
 Module  : UI Foundation
==================================================*/

/*==================================================
 SELECT FIELD
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
  className = "",
}) {
  const fieldId = id || name;
  const describedBy = [
    helper && `${fieldId}-helper`,
    error && `${fieldId}-error`,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[var(--np-text-small)] font-medium text-[var(--np-color-ink)]"
        >
          {label}
        </label>
      )}
      <select
        id={fieldId}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`h-[var(--np-control-height-lg)] w-full rounded-np-sm border bg-[var(--np-color-white)] px-[var(--np-space-3)] text-[var(--np-text-small)] text-[var(--np-color-ink)] outline-none transition-[border-color,box-shadow,background-color] duration-np-normal ease-np-standard focus:border-[var(--np-color-green-500)] focus:ring-4 focus:ring-[var(--np-color-green-100)] disabled:cursor-not-allowed disabled:bg-[var(--np-color-surface-muted)] motion-reduce:transition-none ${error ? "border-[var(--np-color-danger)] focus:border-[var(--np-color-danger)] focus:ring-[var(--np-color-danger-soft)]" : "border-[var(--np-color-border)]"}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helper && !error && (
        <p id={`${fieldId}-helper`} className="text-[var(--np-text-caption)] text-[var(--np-color-muted)]">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${fieldId}-error`} className="text-[var(--np-text-caption)] text-[var(--np-color-danger)]">
          {error}
        </p>
      )}
    </div>
  );
}

export default SelectField;
