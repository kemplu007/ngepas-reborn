/*==================================================
 NGEPAS REBORN
 File    : Card.jsx
 Module  : UI Foundation
==================================================*/

import { forwardRef } from "react";

/*==================================================
 VARIANT CONTRACT
==================================================*/

const variantClasses = {
  default: "border-[var(--np-color-border)] bg-[var(--np-color-surface)]",
  muted: "border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)]",
  elevated:
    "border-[var(--np-color-border)] bg-[var(--np-color-surface)] shadow-np-sm",
};

/*==================================================
 COMPONENT
==================================================*/

const Card = forwardRef(function Card(
  {
    as: Element = "div",
    variant = "default",
    className = "",
    children,
    ...props
  },
  ref,
) {
  return (
    <Element
      ref={ref}
      className={`rounded-np-md border p-[var(--np-space-4)] ${variantClasses[variant] || variantClasses.default} ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
});

Card.displayName = "Card";

/*==================================================
 EXPORT
==================================================*/

export default Card;
