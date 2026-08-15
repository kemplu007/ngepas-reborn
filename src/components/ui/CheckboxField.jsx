/*==================================================
 NGEPAS REBORN
 File    : CheckboxField.jsx
 Module  : UI Foundation
==================================================*/

/*==================================================
 COMPONENT
==================================================*/

function CheckboxField({
  id,
  label,
  hint,
  className = "",
  ...props
}) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={`flex items-start gap-[var(--np-space-3)] ${className}`}>
      <input
        id={id}
        type="checkbox"
        aria-describedby={hintId}
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--np-color-action-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-focus)] focus-visible:ring-offset-2"
        {...props}
      />

      <div className="space-y-1">
        <label
          htmlFor={id}
          className="block text-[var(--np-text-small)] font-medium text-[var(--np-color-text-primary)]"
        >
          {label}
        </label>

        {hint ? (
          <p id={hintId} className="text-[var(--np-text-caption)] text-[var(--np-color-text-secondary)]">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default CheckboxField;
