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

    res.json(products);
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
    } = req.body;

    const result = db.prepare(`
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
        specifications
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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
      JSON.stringify(specifications ?? {})
    );

    const newProduct = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(newProduct);
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
  const productId = Number(req.params.id);

  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Produk tidak ditemukan",
    });
  }

  const deletedProduct = products.splice(productIndex, 1);

  res.json(deletedProduct[0]);
});

/*==================================================
 UPDATE PRODUCT
==================================================*/

app.put("/api/products/:id", (req, res) => {
  const productId = Number(req.params.id);

  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Produk tidak ditemukan",
    });
  }

  const updatedProduct = {
    ...products[productIndex],
    ...req.body,
    id: productId,
  };

  products[productIndex] = updatedProduct;

  res.json(updatedProduct);
});
/*==================================================
 START SERVER
==================================================*/

app.listen(PORT, () => {
  console.log(`Ngepas API running on port ${PORT}`);
});
