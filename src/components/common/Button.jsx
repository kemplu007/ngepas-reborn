/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Button.jsx
 Module  : Common Compatibility Wrapper
 Version : 1.0
 Author  : Tim Ngepas
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import BaseButton from "../ui/Button";

/*==================================================
 COMPONENT
==================================================*/

/*
 * Compatibility wrapper untuk pemakai legacy.
 * Authority visual tetap berada di components/ui/Button.
 */
function Button({ children, ...props }) {
  return <BaseButton {...props}>{children}</BaseButton>;
}

/*==================================================
 EXPORT
==================================================*/

export default Button;
