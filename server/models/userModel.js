
/*==================================================
 NGEPAS REBORN
 File   : userModel.js
 Module : User Model
==================================================*/

const db = require("../database/db");

/*==================================================
 GET USER BY EMAIL
==================================================*/

function getUserByEmail(email) {
  return db
    .prepare(
      `
    SELECT *
    FROM users
    WHERE email = ?
  `,
    )
    .get(email);
}

module.exports = {
  getUserByEmail,
};