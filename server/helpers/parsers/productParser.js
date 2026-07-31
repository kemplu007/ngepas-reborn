/*==================================================
 NGEPAS REBORN
 File   : parser.js
 Module : Product Parser
==================================================*/

function parseProduct(product) {
  return {
    ...product,
    features: JSON.parse(product.features || "[]"),
    specifications: JSON.parse(product.specifications || "{}"),
    whyWeRecommend: JSON.parse(product.whyWeRecommend || "[]"),
    bestFor: JSON.parse(product.bestFor || "[]"),
    considerations: JSON.parse(product.considerations || "[]"),
  };
}

module.exports = parseProduct;
