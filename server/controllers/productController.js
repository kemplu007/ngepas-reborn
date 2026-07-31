/*==================================================
 NGEPAS REBORN
 File   : productController.js
 Module : Product Controller
==================================================*/

const productModel = require("../models/productModel");
const parseProduct = require("../helpers/parsers/productParser");
const sanitizeProduct = require("../helpers/sanitizers/productSanitizer");
const validateProduct = require("../helpers/validators/productValidator");
const { success, error } = require("../utils/response");

/*==================================================
GET PRODUCTS
==================================================*/

function getProducts(req, res, next) {
  try {
    const products = productModel.getAllProducts();

    const parsedProducts = products.map(parseProduct);

    return success(
  res,
  parsedProducts,
  "Berhasil mengambil data produk"
);
  } catch (error) {
    next(error);
  }
}

/*==================================================
 ADD PRODUCT
==================================================*/

function addProduct(req, res, next) {
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

    const validationError = validateProduct(cleanProduct);

    if (validationError) {
    return error(
        res,
        validationError,
        400
    );
}

    const result = productModel.createProduct({
  name: cleanProduct.name,
  room: cleanProduct.room,
  category: cleanProduct.category,
  slug: slug ?? null,
  price,
  originalPrice: originalPrice ?? null,
  discount: discount ?? 0,
  image: cleanProduct.image,
  badge: badge ?? null,
  reason: reason ?? null,
  rating: rating ?? 0,
  sold: sold ?? 0,
  featured: featured ? 1 : 0,
  stock: stock ?? 0,
  affiliateLink: cleanProduct.affiliateLink,
  description: cleanProduct.description,
  features: features ?? [],
  specifications: specifications ?? {},
  whyWeRecommend: whyWeRecommend ?? [],
  bestFor: bestFor ?? [],
  considerations: considerations ?? [],
});

    const newProduct = productModel.getProductById(result.lastInsertRowid);

    return success(
  res,
  parseProduct(newProduct),
  "Produk berhasil ditambahkan",
  201
);
  } catch (error) {
    next(error);
  }
}

/*==================================================
 DELETE PRODUCT
==================================================*/

function deleteProduct(req, res, next) {
  try {
    const productId = Number(req.params.id);

    const product = productModel.getProductById(productId);
    
    if (!product) {
      return error(
  res,
  "Produk tidak ditemukan",
  404
);
    }

 productModel.deleteProduct(productId);

    return success(
  res,
  parseProduct(product),
  "Produk berhasil dihapus"
);
  } catch (error) {
    next(error);
  }
}

/*==================================================
 UPDATE PRODUCT
==================================================*/

function updateProduct(req, res, next) {
  try {
    const productId = Number(req.params.id);

    const existingProduct = productModel.getProductById(productId);
    
    if (!existingProduct) {
  return error(
    res,
    "Produk tidak ditemukan",
    404
  );
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

    const validationError = validateProduct(cleanProduct);

if (validationError) {
  return error(
    res,
    validationError,
    400
  );
}

    productModel.updateProduct(productId, {
  name: cleanProduct.name,
  room: cleanProduct.room,
  category: cleanProduct.category,
  slug: slug ?? null,
  price,
  originalPrice: originalPrice ?? null,
  discount: discount ?? 0,
  image: cleanProduct.image,
  badge: badge ?? null,
  reason: reason ?? null,
  rating: rating ?? 0,
  sold: sold ?? 0,
  featured: featured ? 1 : 0,
  stock: stock ?? 0,
  affiliateLink: cleanProduct.affiliateLink,
  description: cleanProduct.description,
  features: features ?? [],
  specifications: specifications ?? {},
  whyWeRecommend: whyWeRecommend ?? [],
  bestFor: bestFor ?? [],
  considerations: considerations ?? [],
});

    const updatedProduct = productModel.getProductById(productId);

    return success(
  res,
  parseProduct(updatedProduct),
  "Produk berhasil diperbarui"
);
  } catch (error) {
    next(error);
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
