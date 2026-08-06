/*==================================================
 NGEPAS REBORN
 File    : authMiddleware.js
 Module  : Middleware
 Author  : Tim Ngepas
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* Response */

const { error } = require("../utils/response");

/*==================================================
 HANDLERS
==================================================*/

/* Auth */

function authMiddleware(req, res, next) {

  const apiKey = req.headers["x-api-key"];
  const adminApiKey = process.env.ADMIN_API_KEY;
  
  if (!adminApiKey) {
  return error(res, "Server configuration error.", 500);
}
  if (!apiKey || apiKey !== adminApiKey) {
  return error(res, "Unauthorized.", 401);
}
next();
}
/*==================================================
 EXPORT
==================================================*/

module.exports = authMiddleware;