/*==================================================
 NGEPAS REBORN
 File   : categoryController.js
 Module : Categories Controller
==================================================*/

const db = require("../database/db");

const categoryModel = require("../models/categoryModel");

const validateCategory = require("../helpers/validators/categoryValidator");

const { success, error } = require("../utils/response");

/*==================================================
 GET ALL CATEGORIES
==================================================*/

function getCategories(req, res) {
  const categories = categoryModel.getAllCategories();

  success(res, categories, "Categories berhasil diambil.");
}
/*==================================================
 CREATE CATEGORY
==================================================*/

function createCategory(req, res) {
  const validationError = validateCategory(req.body);

  if (validationError) {
    return error(res, validationError, 400);
  }

  const { name, slug, room, icon, status, sortOrder } = req.body;

  const result = categoryModel.createCategory({
    name,
    slug,
    room,
    icon,
    status,
    sortOrder,
  });

  success(
    res,
    {
      id: result.lastInsertRowid,
    },
    "Category berhasil dibuat.",
    201,
  );
}

/*==================================================
 UPDATE CATEGORY
==================================================*/

function updateCategory(req, res) {
  const validationError = validateCategory(req.body);

  if (validationError) {
    return error(res, validationError, 400);
  }

  const { name, slug, room, icon, status, sortOrder } = req.body;

  const result = categoryModel.updateCategory(req.params.id, {
    name,
    slug,
    room,
    icon,
    status,
    sortOrder,
  });

  if (result.changes === 0) {
    return error(res, "Category tidak ditemukan.", 404);
  }

  success(res, null, "Category berhasil diupdate.");
}

/*==================================================
 DELETE CATEGORY
==================================================*/

function deleteCategory(req, res) {
  const result = categoryModel.deleteCategory(req.params.id);

  if (result.changes === 0) {
    return error(res, "Category tidak ditemukan.", 404);
  }

  success(res, null, "Category berhasil dihapus.");
}

/*==================================================
 EXPORTS
==================================================*/

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
