/*==================================================
 NGEPAS REBORN
 File   : productController.js
 Module : Product Controller
==================================================*/

const db = require("../database/db");
const parseProduct = require("../helpers/parser");
const sanitizeProduct = require("../helpers/sanitizer");
const validateProduct = require("../helpers/validator");

/*==================================================
GET PRODUCTS
==================================================*/

function getProducts(req, res) {
  try {
    const products = db
      .prepare("SELECT * FROM products ORDER BY id DESC")
      .all();

    const parsedProducts = products.map(parseProduct);

    res.json(parsedProducts);
  } catch (error) {
    console.error("Gagal mengambil produk:", error);

    res.status(500).json({
      message: "Gagal mengambil produk",
    });
  }
}

/*==================================================
 ADD PRODUCT
==================================================*/

function addProduct(req, res) {
  try {
    const {
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
      description,
      features,
      specifications,
      whyWeRecommend,
      bestFor,
      considerations,
    } = req.body;

    const cleanProduct = sanitizeProduct(req.body);

    const error = validateProduct(cleanProduct);

    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

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
        description,
        features,
        specifications,
        whyWeRecommend,
        bestFor,
        considerations
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        cleanProduct.name,
        cleanProduct.room,
        cleanProduct.category,
        slug ?? null,
        price,
        originalPrice ?? null,
        discount ?? 0,
        cleanProduct.image,
        badge ?? null,
        reason ?? null,
        rating ?? 0,
        sold ?? 0,
        featured ? 1 : 0,
        stock ?? 0,
        cleanProduct.affiliateLink,
        cleanProduct.description,
        JSON.stringify(features ?? []),
        JSON.stringify(specifications ?? {}),
        JSON.stringify(whyWeRecommend ?? []),
        JSON.stringify(bestFor ?? []),
        JSON.stringify(considerations ?? []),
      );

    const newProduct = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(parseProduct(newProduct));
  } catch (error) {
    console.error("Gagal menambahkan produk:", error);

    res.status(500).json({
      message: "Gagal menambahkan produk",
    });
  }
}

/*==================================================
 DELETE PRODUCT
==================================================*/

function deleteProduct(req, res) {
  try {
    const productId = Number(req.params.id);

    const product = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(productId);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    db.prepare("DELETE FROM products WHERE id = ?").run(productId);

    res.json(product);
  } catch (error) {
    console.error("Gagal menghapus produk:", error);

    res.status(500).json({
      message: "Gagal menghapus produk",
    });
  }
}

/*==================================================
 UPDATE PRODUCT
==================================================*/

function updateProduct(req, res) {
  try {
    const productId = Number(req.params.id);

    const existingProduct = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(productId);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    const {
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
      description,
      features,
      specifications,
      whyWeRecommend,
      bestFor,
      considerations,
    } = req.body;

    const cleanProduct = sanitizeProduct(req.body);

    const error = validateProduct(cleanProduct);

    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    db.prepare(
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
        description = ?,
        features = ?,
        specifications = ?,
        whyWeRecommend = ?,
        bestFor = ?,
        considerations = ?
      WHERE id = ?
    `,
    ).run(
      cleanProduct.name,
      cleanProduct.room,
      cleanProduct.category,
      slug ?? null,
      price,
      originalPrice ?? null,
      discount ?? 0,
      cleanProduct.image,
      badge ?? null,
      reason ?? null,
      rating ?? 0,
      sold ?? 0,
      featured ? 1 : 0,
      stock ?? 0,
      cleanProduct.affiliateLink,
      cleanProduct.description,
      JSON.stringify(features ?? []),
      JSON.stringify(specifications ?? {}),
      JSON.stringify(whyWeRecommend ?? []),
      JSON.stringify(bestFor ?? []),
      JSON.stringify(considerations ?? []),
      productId,
    );

    const updatedProduct = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(productId);

    res.json(parseProduct(updatedProduct));
  } catch (error) {
    console.error("Gagal memperbarui produk:", error);

    res.status(500).json({
      message: "Gagal memperbarui produk",
    });
  }
}

/*==================================================
 EXPORT CONTROLLER
==================================================*/

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
