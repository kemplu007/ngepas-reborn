/*==================================================
 NGEPAS REBORN
 File    : SectionHeading.jsx
 Module  : UI Foundation
==================================================*/

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "between",
  className = "",
}) {
  const alignmentClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div
      className={`mb-[var(--np-space-5)] flex gap-[var(--np-space-4)] ${
        align === "center"
          ? "flex-col items-center"
          : "items-end justify-between"
      } ${className}`}
    >
      <div className={alignmentClass}>
        {eyebrow && (
          <p className="mb-1 text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--np-color-green-700)]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-[var(--np-text-h2)] font-semibold tracking-[-0.02em] text-[var(--np-color-ink)]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 max-w-2xl text-[var(--np-text-small)] leading-relaxed text-[var(--np-color-muted)]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default SectionHeading;
