/*==================================================
 NGEPAS REBORN
 File   : index.js
 Module : Backend Server
==================================================*/

const express = require("express");
const cors = require("cors");
const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("ngepas.db");

const app = express();
const PORT = 3000;

/*==================================================
 MIDDLEWARE
==================================================*/

app.use(cors());
app.use(express.json());

/*==================================================
 TEST ROUTE
==================================================*/

app.get("/", (req, res) => {
  res.json({
    message: "Ngepas API is running 🚀",
  });
});
/*==================================================
 PRODUCT ROUTES
==================================================*/

app.get("/api/products", (req, res) => {
  try {
    const products = db
      .prepare("SELECT * FROM products ORDER BY id DESC")
      .all();

    const parsedProducts = products.map((product) => ({
      ...product,
      features: JSON.parse(product.features || "[]"),
      specifications: JSON.parse(product.specifications || "{}"),
      whyWeRecommend: JSON.parse(product.whyWeRecommend || "[]"),
      bestFor: JSON.parse(product.bestFor || "[]"),
      considerations: JSON.parse(product.considerations || "[]"),
    }));

    res.json(parsedProducts);
  } catch (error) {
    console.error("Gagal mengambil produk:", error);

    res.status(500).json({
      message: "Gagal mengambil produk",
    });
  }
});

/*==================================================
 ADD PRODUCT
==================================================*/

app.post("/api/products", (req, res) => {
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
        name,
        room,
        category,
        slug ?? null,
        price,
        originalPrice ?? null,
        discount ?? 0,
        image ?? null,
        badge ?? null,
        reason ?? null,
        rating ?? 0,
        sold ?? 0,
        featured ? 1 : 0,
        stock ?? 0,
        affiliateLink ?? null,
        description ?? null,
        JSON.stringify(features ?? []),
        JSON.stringify(specifications ?? {}),
        JSON.stringify(whyWeRecommend ?? []),
        JSON.stringify(bestFor ?? []),
        JSON.stringify(considerations ?? []),
      );

    const newProduct = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json({
      ...newProduct,
      features: JSON.parse(newProduct.features || "[]"),
      specifications: JSON.parse(newProduct.specifications || "{}"),
      whyWeRecommend: JSON.parse(newProduct.whyWeRecommend || "[]"),
      bestFor: JSON.parse(newProduct.bestFor || "[]"),
      considerations: JSON.parse(newProduct.considerations || "[]"),
    });
  } catch (error) {
    console.error("Gagal menambahkan produk:", error);

    res.status(500).json({
      message: "Gagal menambahkan produk",
    });
  }
});

/*==================================================
 DELETE PRODUCT
==================================================*/

app.delete("/api/products/:id", (req, res) => {
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
});
/*==================================================
 UPDATE PRODUCT
==================================================*/

app.put("/api/products/:id", (req, res) => {
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
      name,
      room,
      category,
      slug ?? null,
      price,
      originalPrice ?? null,
      discount ?? 0,
      image ?? null,
      badge ?? null,
      reason ?? null,
      rating ?? 0,
      sold ?? 0,
      featured ? 1 : 0,
      stock ?? 0,
      affiliateLink ?? null,
      description ?? null,
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

    res.json({
      ...updatedProduct,
      features: JSON.parse(updatedProduct.features || "[]"),
      specifications: JSON.parse(updatedProduct.specifications || "{}"),
      whyWeRecommend: JSON.parse(updatedProduct.whyWeRecommend || "[]"),
      bestFor: JSON.parse(updatedProduct.bestFor || "[]"),
      considerations: JSON.parse(updatedProduct.considerations || "[]"),
    });
  } catch (error) {
    console.error("Gagal memperbarui produk:", error);

    res.status(500).json({
      message: "Gagal memperbarui produk",
    });
  }
});
/*==================================================
 START SERVER
==================================================*/

app.listen(PORT, () => {
  console.log(`Ngepas API running on port ${PORT}`);
});
