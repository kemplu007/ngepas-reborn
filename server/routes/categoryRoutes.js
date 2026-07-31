
/*==================================================
 NGEPAS REBORN
 File   : categoryRoutes.js
 Module : Categories Routes
==================================================*/

const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

/*==================================================
 ROUTES
==================================================*/

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;