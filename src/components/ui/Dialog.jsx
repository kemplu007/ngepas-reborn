/*==================================================
 NGEPAS REBORN
 File    : Dialog.jsx
 Module  : UI Foundation
==================================================*/

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Card from "./Card";

/*==================================================
 COMPONENT
==================================================*/

function Dialog({
  open = false,
  title,
  description,
  onClose,
  children,
  className = "",
}) {
  const dialogRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const titleId = title ? "np-dialog-title" : undefined;
  const descriptionId = description ? "np-dialog-description" : undefined;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[var(--np-space-4)]">
      <button
        type="button"
        aria-label="Tutup dialog"
        className="np-motion-surface absolute inset-0 h-full w-full cursor-default bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <Card
        ref={dialogRef}
        variant="elevated"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={`np-motion-surface relative w-full max-w-md p-[var(--np-space-6)] outline-none ${className}`}
      >
        {title && (
          <h2
            id={titleId}
            className="text-[var(--np-text-h3)] font-semibold leading-[var(--np-leading-heading)] text-[var(--np-color-text-primary)]"
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            id={descriptionId}
            className="mt-[var(--np-space-2)] text-[var(--np-text-small)] leading-[var(--np-leading-body)] text-[var(--np-color-text-secondary)]"
          >
            {description}
          </p>
        )}
        <div className={title || description ? "mt-[var(--np-space-6)]" : ""}>
          {children}
        </div>
      </Card>
    </div>,
    document.body,
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Dialog;
