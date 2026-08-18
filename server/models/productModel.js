/*==================================================
 NGEPAS REBORN
 File   : productModel.js
 Module : Product Model
==================================================*/

const db = require("../database/db");

/*==================================================
 GET ALL PRODUCTS
==================================================*/

function getAllProducts() {
  return db
    .prepare(
      `
    SELECT *
    FROM products
    ORDER BY id DESC
  `,
    )
    .all();
}

/*==================================================
 GET PUBLISHED PRODUCTS
==================================================*/

function getPublishedProducts() {
  return db
    .prepare(
      `
    SELECT *
    FROM products
    WHERE status = 'published'
    ORDER BY id DESC
  `,
    )
    .all();
}

/*==================================================
 GET PRODUCT BY SLUG
==================================================*/

function getProductBySlug(slug) {
  return db
    .prepare(
      `
    SELECT *
    FROM products
    WHERE slug = ?
      AND status = 'published'
    LIMIT 1
  `,
    )
    .get(slug);
}

/*==================================================
 CREATE PRODUCT
==================================================*/

function createProduct(product) {
  const result = db
    .prepare(
      `
    INSERT INTO products (
      name,
      room,
      category,
      slug,
      price,
      originalPrice,
      discount,
      image,
      badge,
      reason,
      rating,
      sold,
      featured,
      stock,
      affiliateLink,
      status,
      tags,
      gallery,
      description,
      features,
      specifications,
      whyWeRecommend,
      bestFor,
      considerations
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    )
    .run(
      product.name,
      product.room,
      product.category,
      product.slug,
      product.price,
      product.originalPrice,
      product.discount,
      product.image,
      product.badge,
      product.reason,
      product.rating,
      product.sold,
      product.featured,
      product.stock,
      product.affiliateLink,
      product.status,
      JSON.stringify(product.tags || []),
      JSON.stringify(product.gallery || []),
      product.description,
      JSON.stringify(product.features),
      JSON.stringify(product.specifications),
      JSON.stringify(product.whyWeRecommend),
      JSON.stringify(product.bestFor),
      JSON.stringify(product.considerations),
    );

  return result;
}

/*==================================================
 UPDATE PRODUCT
==================================================*/

function updateProduct(id, product) {
  return db
    .prepare(
      `
    UPDATE products
    SET
      name = ?,
      room = ?,
      category = ?,
      slug = ?,
      price = ?,
      originalPrice = ?,
      discount = ?,
      image = ?,
      badge = ?,
      reason = ?,
      rating = ?,
      sold = ?,
      featured = ?,
      stock = ?,
      affiliateLink = ?,
      status = ?,
      tags = ?,
      gallery = ?,
      description = ?,
      features = ?,
      specifications = ?,
      whyWeRecommend = ?,
      bestFor = ?,
      considerations = ?
    WHERE id = ?
  `,
    )
    .run(
      product.name,
      product.room,
      product.category,
      product.slug,
      product.price,
      product.originalPrice,
      product.discount,
      product.image,
      product.badge,
      product.reason,
      product.rating,
      product.sold,
      product.featured,
      product.stock,
      product.affiliateLink,
      product.status,
      JSON.stringify(product.tags || []),
      JSON.stringify(product.gallery || []),
      product.description,
      JSON.stringify(product.features),
      JSON.stringify(product.specifications),
      JSON.stringify(product.whyWeRecommend),
      JSON.stringify(product.bestFor),
      JSON.stringify(product.considerations),
      id,
    );
}

/*==================================================
 DELETE PRODUCT
==================================================*/

function deleteProduct(id) {
  return db
    .prepare(
      `
    DELETE FROM products
    WHERE id = ?
  `,
    )
    .run(id);
}

/*==================================================
 GET PRODUCT BY ID
==================================================*/

function getProductById(id) {
  return db
    .prepare(
      `
    SELECT *
    FROM products
    WHERE id = ?
  `,
    )
    .get(id);
}

module.exports = {
  getAllProducts,
  getPublishedProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

/*==================================================
 END OF FILE
==================================================*/
