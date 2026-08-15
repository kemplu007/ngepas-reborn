/*==================================================
 NGEPAS REBORN
 File    : Container.jsx
 Module  : UI Foundation
==================================================*/

function Container({ as: Element = "div", className = "", children, ...props }) {
  return (
    <Element
      className={`mx-auto w-full max-w-[var(--np-layout-container)] px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}

export default Container;
