/*==================================================
 NGEPAS REBORN
 File   : productParser.js
 Module : Product Parser
==================================================*/

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function parseArray(value) {
  const parsed = parseJson(value, []);
  return Array.isArray(parsed) ? parsed : [];
}

function parseProduct(product) {
  const status = ["published", "draft"].includes(product.status)
    ? product.status
    : "published";

  return {
    ...product,
    status,
    tags: parseArray(product.tags),
    features: parseArray(product.features),
    specifications: parseJson(product.specifications, {}),
    whyWeRecommend: parseArray(product.whyWeRecommend),
    bestFor: parseArray(product.bestFor),
    considerations: parseArray(product.considerations),
  };
}

module.exports = parseProduct;

/*==================================================
 END OF FILE
==================================================*/
