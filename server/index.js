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
      .prepare("SELECT * FROM products")
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
      price,
    } = req.body;

    const result = db
      .prepare(`
        INSERT INTO products (name, room, category, price)
        VALUES (?, ?, ?, ?)
      `)
      .run(name, room, category, price);

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

    db.prepare("DELETE FROM products WHERE id = ?")
      .run(productId);

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

    const updatedProduct = {
      ...existingProduct,
      ...req.body,
      id: productId,
    };

    db.prepare(`
      UPDATE products
      SET
        name = ?,
        room = ?,
        category = ?,
        price = ?,
        image = ?,
        rating = ?,
        sold = ?,
        affiliateLink = ?
      WHERE id = ?
    `).run(
      updatedProduct.name,
      updatedProduct.room,
      updatedProduct.category,
      updatedProduct.price,
      updatedProduct.image ?? null,
      updatedProduct.rating ?? 0,
      updatedProduct.sold ?? 0,
      updatedProduct.affiliateLink ?? null,
      productId
    );

    const savedProduct = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(productId);

    res.json(savedProduct);
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
