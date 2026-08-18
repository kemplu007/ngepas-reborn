// KEM-34 contract harness: static route/link assertions, read-only, tanpa browser atau network.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const serverDir = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(serverDir, "..");

const appSource = readFileSync(resolve(rootDir, "src/App.tsx"), "utf8");
const productCardSource = readFileSync(
  resolve(rootDir, "src/components/discover/ProductCard.jsx"),
  "utf8",
);
const discoverSource = readFileSync(resolve(rootDir, "src/pages/public/Discover.jsx"), "utf8");

assert.match(
  appSource,
  /function LegacyDiscoverDetailRedirect\(\)[\s\S]*?const \{ slug \} = useParams\(\);[\s\S]*?<Navigate replace to=\{slug \? `\/product\/\$\{slug\}` : "\/discover"\} \/>/,
  "Deep link legacy harus melakukan redirect replace ke detail canonical.",
);
assert.match(
  appSource,
  /<Route path="\/product\/:slug" element=\{<ProductDetail \/>\} \/>/,
  "Route detail canonical harus tetap dimiliki ProductDetail.",
);
assert.match(
  appSource,
  /<Route path="\/discover\/:slug" element=\{<LegacyDiscoverDetailRedirect \/>\} \/>/,
  "Route detail legacy harus tetap menjadi adapter redirect tipis.",
);
assert.match(
  productCardSource,
  /const productHref = href \|\| `\/product\/\$\{product\.slug\}`;/,
  "ProductCard tanpa href eksplisit harus menggunakan tujuan canonical.",
);
assert.doesNotMatch(
  discoverSource,
  /\bDiscoverDetail\b/,
  "Discover tidak boleh menghidupkan kembali detail inline legacy.",
);

console.log("KEM-34 canonical route harness: 5 assertions passed (read-only, tanpa network).");
