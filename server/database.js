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

console.log("Ngepas Database connected 🗄️");

/*==================================================
 EXPORT
==================================================*/

module.exports = db;
