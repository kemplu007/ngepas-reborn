
/*==================================================
 NGEPAS REBORN
 File   : categoryController.js
 Module : Categories Controller
==================================================*/

const db = require("../database/db");

const validateCategory = require("../helpers/validators/categoryValidator");

const {
  success,
  error,
} = require("../utils/response");

/*==================================================
 GET ALL CATEGORIES
==================================================*/

function getCategories(req, res) {
  const categories = db
    .prepare(`
      SELECT *
      FROM categories
      ORDER BY sortOrder ASC, id ASC
    `)
    .all();

  success(
  res,
  categories,
  "Categories berhasil diambil."
);
}
/*==================================================
 CREATE CATEGORY
==================================================*/

function createCategory(req, res) {

  const validationError = validateCategory(req.body);

if (validationError) {
  return error(
    res,
    validationError,
    400
  );
}

  const {
    name,
    slug,
    room,
    icon,
    status,
    sortOrder,
  } = req.body;

  const result = db.prepare(`
    INSERT INTO categories
    (
      name,
      slug,
      room,
      icon,
      status,
      sortOrder
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    name,
    slug,
    room,
    icon || "",
    status ?? 1,
    sortOrder ?? 0
  );

  success(
  res,
  {
    id: result.lastInsertRowid,
  },
  "Category berhasil dibuat.",
  201
);

}

/*==================================================
 UPDATE CATEGORY
==================================================*/

function updateCategory(req, res) {

  const validationError = validateCategory(req.body);

if (validationError) {
  return error(
    res,
    validationError,
    400
  );
}

  const {
    name,
    slug,
    room,
    icon,
    status,
    sortOrder,
  } = req.body;

  const result = db.prepare(`
    UPDATE categories
    SET
      name = ?,
      slug = ?,
      room = ?,
      icon = ?,
      status = ?,
      sortOrder = ?
    WHERE id = ?
  `).run(
    name,
    slug,
    room,
    icon || "",
    status ?? 1,
    sortOrder ?? 0,
    req.params.id
  );

  if (result.changes === 0) {
  return error(
    res,
    "Category tidak ditemukan.",
    404
  );
}

  success(
   res,
   null,
   "Category berhasil diupdate."
);

}

/*==================================================
 DELETE CATEGORY
==================================================*/

function deleteCategory(req, res) {

  const result = db.prepare(`
    DELETE FROM categories
    WHERE id = ?
  `).run(req.params.id);

  if (result.changes === 0) {
    return error(
   res,
   "Category tidak ditemukan.",
   404
);
  }

  success(
   res,
   null,
   "Category berhasil dihapus."
);

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