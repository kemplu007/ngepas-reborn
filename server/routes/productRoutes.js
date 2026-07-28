/*==================================================
 NGEPAS REBORN
 File   : productRoutes.js
 Module : Product Routes
==================================================*/

const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

/*==================================================
 PRODUCT ROUTES
==================================================*/

router.get("/", productController.getProducts);

router.post("/", productController.addProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

/*==================================================
 EXPORT ROUTER
==================================================*/

module.exports = router;
