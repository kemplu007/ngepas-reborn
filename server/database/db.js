/*==================================================
 NGEPAS REBORN
 File   : db.js
 Module : Database
==================================================*/

const Database = require("better-sqlite3");
const path = require("path");

const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "ngepas.db");
const db = new Database(dbPath);

module.exports = db;