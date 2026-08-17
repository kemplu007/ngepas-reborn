/*==================================================
 NGEPAS REBORN
 File   : productValidator.js
 Module : Product Validator
==================================================*/

const PRODUCT_STATUSES = ["published", "draft"];
const PRODUCT_TAG_LIMIT = 12;
const PRODUCT_TAG_LENGTH_LIMIT = 40;
const PRODUCT_GALLERY_LIMIT = 8;

function isValidGalleryUrl(url) {
  if (typeof url !== "string" || url.length === 0) return false;

  try {
    const parsedUrl = new URL(url);
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

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

  if (product.gallery !== undefined) {
    if (!Array.isArray(product.gallery)) {
      return "Gallery produk harus berupa array.";
    }

    if (product.gallery.length > PRODUCT_GALLERY_LIMIT) {
      return `Gallery produk maksimal ${PRODUCT_GALLERY_LIMIT} URL.`;
    }

    if (product.gallery.some((url) => !isValidGalleryUrl(url))) {
      return "Setiap URL gallery harus berupa URL http atau https yang valid.";
    }
  }

  return null;
}

module.exports = validateProduct;
module.exports.PRODUCT_STATUSES = PRODUCT_STATUSES;
module.exports.PRODUCT_TAG_LIMIT = PRODUCT_TAG_LIMIT;
module.exports.PRODUCT_TAG_LENGTH_LIMIT = PRODUCT_TAG_LENGTH_LIMIT;
module.exports.PRODUCT_GALLERY_LIMIT = PRODUCT_GALLERY_LIMIT;
module.exports.isValidGalleryUrl = isValidGalleryUrl;

/*==================================================
 END OF FILE
==================================================*/
