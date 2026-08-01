/*==================================================
 NGEPAS REBORN
 File   : db.js
 Module : Database
==================================================*/

const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('ngepas.db');
module.exports = db;