/*==================================================
 NGEPAS REBORN
 File   : productRoutes.js
 Module : Product Routes
==================================================*/

const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const productController = require("../controllers/productController");

const router = express.Router();

/*==================================================
 PRODUCT ROUTES
==================================================*/

router.get("/", productController.getProducts);
router.get("/admin", authMiddleware, productController.getAdminProducts);
router.get("/:slug", productController.getProductBySlug);

router.post("/", authMiddleware, productController.addProduct);

router.put("/:id", authMiddleware,  productController.updateProduct);

router.delete("/:id", authMiddleware, productController.deleteProduct);

/*==================================================
 EXPORT ROUTER
==================================================*/

module.exports = router;
