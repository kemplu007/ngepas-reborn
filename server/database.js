/*==================================================
 NGEPAS REBORN
 File   : database.js
 Module : Database
==================================================*/

const { DatabaseSync } = require("node:sqlite");

/*==================================================
 DATABASE CONNECTION
==================================================*/

const db = new DatabaseSync("ngepas.db");

/*==================================================
 PRODUCTS TABLE
==================================================*/

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    room TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    rating REAL DEFAULT 0,
    sold INTEGER DEFAULT 0,
    affiliateLink TEXT
  )
`);

/*==================================================
 PRODUCTS TABLE MIGRATION
==================================================*/

const productColumns = [
  ["slug", "TEXT"],
  ["originalPrice", "INTEGER"],
  ["discount", "INTEGER DEFAULT 0"],
  ["badge", "TEXT"],
  ["reason", "TEXT"],
  ["featured", "INTEGER DEFAULT 0"],
  ["stock", "INTEGER DEFAULT 0"],
  ["description", "TEXT"],
  ["features", "TEXT"],
  ["specifications", "TEXT"],
["whyWeRecommend", "TEXT"],
["bestFor", "TEXT"],
["considerations", "TEXT"],
];

const existingColumns = db
  .prepare("PRAGMA table_info(products)")
  .all()
  .map((column) => column.name);

for (const [columnName, columnType] of productColumns) {
  if (!existingColumns.includes(columnName)) {
    db.exec(
      `ALTER TABLE products ADD COLUMN ${columnName} ${columnType}`
    );

    console.log(`Added product column: ${columnName}`);
  }
}

console.log("Ngepas Database connected 🗄️");

/*==================================================
 EXPORT
==================================================*/

module.exports = db;
