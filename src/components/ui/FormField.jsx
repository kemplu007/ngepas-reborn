/*==================================================
 NGEPAS REBORN
 File    : FormField.jsx
 Module  : UI Foundation
==================================================*/

/*==================================================
 COMPONENT
==================================================*/

function FormField({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  children,
  className = "",
}) {
  const messageId = error ? `${htmlFor}-error` : hint ? `${htmlFor}-hint` : undefined;

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="block text-[var(--np-text-small)] font-medium text-[var(--np-color-text-primary)]"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[var(--np-color-danger)]">
            *
          </span>
        )}
      </label>

      {children}

      {error ? (
        <p id={messageId} role="alert" className="text-[var(--np-text-caption)] text-[var(--np-color-danger)]">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="text-[var(--np-text-caption)] text-[var(--np-color-text-secondary)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default FormField;
