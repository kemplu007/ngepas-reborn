/*==================================================
 NGEPAS REBORN
 File   : validator.js
 Module : Product Validator
==================================================*/

const PRODUCT_STATUSES = ["published", "draft"];

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

  if (product.status && !PRODUCT_STATUSES.includes(product.status)) {
    return "Status produk tidak valid.";
  }

  return null;
}

module.exports = validateProduct;
module.exports.PRODUCT_STATUSES = PRODUCT_STATUSES;

/*==================================================
 END OF FILE
==================================================*/
