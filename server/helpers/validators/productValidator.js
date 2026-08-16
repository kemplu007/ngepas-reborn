/*==================================================
 NGEPAS REBORN
 File   : productValidator.js
 Module : Product Validator
==================================================*/

const PRODUCT_STATUSES = ["published", "draft"];
const PRODUCT_TAG_LIMIT = 12;
const PRODUCT_TAG_LENGTH_LIMIT = 40;

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

  if (product.tags !== undefined) {
    if (!Array.isArray(product.tags)) {
      return "Tags produk harus berupa array.";
    }

    if (product.tags.length > PRODUCT_TAG_LIMIT) {
      return `Tags produk maksimal ${PRODUCT_TAG_LIMIT} item.`;
    }

    if (product.tags.some((tag) => tag.length > PRODUCT_TAG_LENGTH_LIMIT)) {
      return `Setiap tag maksimal ${PRODUCT_TAG_LENGTH_LIMIT} karakter.`;
    }
  }

  return null;
}

module.exports = validateProduct;
module.exports.PRODUCT_STATUSES = PRODUCT_STATUSES;
module.exports.PRODUCT_TAG_LIMIT = PRODUCT_TAG_LIMIT;
module.exports.PRODUCT_TAG_LENGTH_LIMIT = PRODUCT_TAG_LENGTH_LIMIT;

/*==================================================
 END OF FILE
==================================================*/
