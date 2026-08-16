/*==================================================
 NGEPAS REBORN
 File   : productSanitizer.js
 Module : Product Sanitizer
==================================================*/

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return tags;

  const seen = new Set();

  return tags
    .map((tag) => (typeof tag === "string" ? tag.trim() : tag))
    .filter((tag) => typeof tag === "string" && tag.length > 0)
    .filter((tag) => {
      const key = tag.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

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
    tags: normalizeTags(product.tags),
  };
}

module.exports = sanitizeProduct;
module.exports.normalizeTags = normalizeTags;

/*==================================================
 END OF FILE
==================================================*/
