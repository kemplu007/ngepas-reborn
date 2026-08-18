import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const serverDir = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(serverDir, "..");

const productModel = readFileSync(
  resolve(rootDir, "server/models/productModel.js"),
  "utf8",
);
const discoverPage = readFileSync(
  resolve(rootDir, "src/pages/public/Discover.jsx"),
  "utf8",
);
const productDetailPage = readFileSync(
  resolve(rootDir, "src/pages/public/ProductDetail.jsx"),
  "utf8",
);

assert.match(
  productModel,
  /WHERE slug = \?\s+AND status = 'published'\s+LIMIT 1/,
  "Lookup slug publik harus membatasi SQL ke status published.",
);
assert.match(
  discoverPage,
  /\.filter\(\(product\) => product\.status !== "draft"\)\s+\.map\(normalizeProduct\)/,
  "Katalog Discover publik harus mengecualikan Draft sebelum lookup slug.",
);
assert.match(
  productDetailPage,
  /item\.category === product\.category &&\s+item\.status !== "draft"/,
  "Produk terkait publik harus mengecualikan Draft.",
);

console.log("KEM-30 static visibility harness: 3 assertions passed");
