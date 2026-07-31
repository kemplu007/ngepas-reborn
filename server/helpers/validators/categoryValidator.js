
/*==================================================
 NGEPAS REBORN
 File   : categoryValidator.js
 Module : Category Validator
==================================================*/

function validateCategory(category) {
  if (
    !category.name ||
    !category.slug ||
    !category.room
  ) {
    return "Field wajib belum lengkap.";
  }

  return null;
}

module.exports = validateCategory;