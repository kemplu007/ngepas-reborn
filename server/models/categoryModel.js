
/*==================================================
 NGEPAS REBORN
 File   : categoryModel.js
 Module : Category Model
==================================================*/

const db = require("../database/db");

/*==================================================
 GET ALL CATEGORIES
==================================================*/

function getAllCategories() {
  return db.prepare(`
    SELECT *
    FROM categories
    ORDER BY sortOrder ASC, id ASC
  `).all();
}

/*==================================================
 CREATE CATEGORY
==================================================*/

function createCategory(category) {
  return db.prepare(`
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
    category.name,
    category.slug,
    category.room,
    category.icon || "",
    category.status ?? 1,
    category.sortOrder ?? 0
  );
}

/*==================================================
 UPDATE CATEGORY
==================================================*/

function updateCategory(id, category) {
  return db.prepare(`
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
    category.name,
    category.slug,
    category.room,
    category.icon || "",
    category.status ?? 1,
    category.sortOrder ?? 0,
    id
  );
}

/*==================================================
 DELETE CATEGORY
==================================================*/

function deleteCategory(id) {
  return db.prepare(`
    DELETE FROM categories
    WHERE id = ?
  `).run(id);
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};