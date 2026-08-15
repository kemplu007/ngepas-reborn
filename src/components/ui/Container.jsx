/*==================================================
 NGEPAS REBORN
 File    : Container.jsx
 Module  : UI Foundation
==================================================*/

/*==================================================
 COMPONENT
==================================================*/

function Container({ as: Element = "div", className = "", children, ...props }) {
  return (
    <Element
      className={`mx-auto w-full max-w-[var(--np-layout-container)] px-[var(--np-gutter-mobile)] sm:px-[var(--np-gutter-tablet)] lg:px-[var(--np-gutter-desktop)] ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Container;
