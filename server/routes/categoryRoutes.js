/*==================================================
 NGEPAS REBORN
 File   : categoryRoutes.js
 Module : Categories Routes
==================================================*/

const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

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
router.post("/", authMiddleware, createCategory);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;
