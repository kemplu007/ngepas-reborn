/*==================================================
 NGEPAS REBORN
 File   : sanitizer.js
 Module : Product Sanitizer
==================================================*/

function sanitizeProduct(product) {
  return {
    ...product,
    name: product.name?.trim(),
    room: product.room?.trim(),
    category: product.category?.trim(),
    image: product.image?.trim(),
    affiliateLink: product.affiliateLink?.trim(),
    description: product.description?.trim(),
    status: product.status?.trim().toLowerCase(),
  };
}

module.exports = sanitizeProduct;
