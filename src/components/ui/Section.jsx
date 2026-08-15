/*==================================================
 NGEPAS REBORN
 File    : Section.jsx
 Module  : UI Foundation
==================================================*/

import Container from "./Container";

function Section({
  as: Element = "section",
  id,
  className = "",
  containerClassName = "",
  surface = "none",
  children,
  ...props
}) {
  const surfaceClass = {
    none: "",
    muted: "bg-[var(--np-color-canvas)]",
    soft: "bg-[var(--np-color-green-100)]/40",
    white: "bg-[var(--np-color-white)]",
  }[surface] || "";

  return (
    <Element
      id={id}
      className={`scroll-mt-24 py-[var(--np-space-10)] sm:py-[var(--np-space-12)] lg:py-[var(--np-space-16)] ${surfaceClass} ${className}`}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </Element>
  );
}

export default Section;
