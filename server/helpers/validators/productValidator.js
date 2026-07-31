/*==================================================
 NGEPAS REBORN
 File   : validator.js
 Module : Product Validator
==================================================*/

function validateProduct(product) {
  if (
    !product.name ||
    !product.room ||
    !product.category ||
    !product.price ||
    !product.image ||
    !product.affiliateLink
  ) {
    return "Field wajib belum lengkap.";
  }

  return null;
}

module.exports = validateProduct;
