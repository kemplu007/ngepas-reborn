import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ngepas-kem33-"));
const dbPath = path.join(tempDirectory, "catalog.db");

process.env.DB_PATH = dbPath;

const db = require("./database/db");
db.exec(`
  CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    status TEXT NOT NULL
  );
  INSERT INTO products (id, name, slug, status) VALUES
    (1, 'Produk Published', 'produk-published', 'published'),
    (2, 'Produk Draft', 'produk-draft', 'draft');
`);

const productModel = require("./models/productModel");
const productRoutesSource = fs.readFileSync(
  new URL("./routes/productRoutes.js", import.meta.url),
  "utf8",
);

assert.deepEqual(
  productModel.getPublishedProducts().map((product) => product.slug),
  ["produk-published"],
  "Katalog publik hanya boleh mengembalikan produk Published",
);
assert.equal(
  productModel.getAllProducts().length,
  2,
  "Katalog admin harus tetap dapat membaca produk Draft dan Published",
);
assert.match(
  productRoutesSource,
  /router\.get\("\/admin", authMiddleware, productController\.getAdminProducts\)/,
  "Route katalog admin harus memakai auth middleware",
);

db.close();
fs.rmSync(tempDirectory, { recursive: true, force: true });

console.log("KEM-33 harness passed: public catalog hides Draft; admin catalog retains Draft.");
