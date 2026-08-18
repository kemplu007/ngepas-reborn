// KEM-17 contract harness: validator murni, read-only, tanpa database.
import assert from "node:assert/strict";

const validator = await import("./helpers/validators/productValidator.js");

const validPublished = {
  status: "published",
  whyWeRecommend: ["Alasan kurasi yang cukup panjang untuk lolos"],
  bestFor: ["Pembeli yang butuh solusi dapur ringkas"],
};

assert.equal(
  validator.validateCurationFields({ status: "published", whyWeRecommend: [], bestFor: ["a"] }),
  "Alasan rekomendasi kurasi wajib diisi agar produk layak ditampilkan.",
);

assert.equal(
  validator.validateCurationFields({
    status: "published",
    whyWeRecommend: ["pendek"],
    bestFor: ["a"],
  }),
  `Setiap alasan rekomendasi kurasi minimal ${validator.PRODUCT_CURATED_REASON_MIN_LENGTH} karakter.`,
);

assert.equal(
  validator.validateCurationFields({
    status: "published",
    whyWeRecommend: ["Alasan kurasi yang cukup panjang untuk lolos"],
    bestFor: [],
  }),
  "Field cocok untuk wajib diisi agar produk layak ditampilkan.",
);

assert.equal(validator.validateCurationFields(validPublished), null);
assert.equal(validator.validateCurationFields({ status: "draft", whyWeRecommend: [], bestFor: [] }), null);
assert.equal(
  validator.validateCurationFields({
    status: undefined,
    whyWeRecommend: ["Alasan kurasi yang cukup panjang"],
    bestFor: ["a"],
  }),
  null,
);
assert.equal(
  validator.validateCurationFields({ status: "published", whyWeRecommend: "string", bestFor: ["a"] }),
  "Alasan rekomendasi kurasi wajib diisi agar produk layak ditampilkan.",
);

console.log("KEM-17 validator harness: 7 assertions passed (read-only, tanpa database).");
