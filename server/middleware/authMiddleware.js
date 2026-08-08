/*==================================================
 NGEPAS REBORN
 File    : authMiddleware.js
 Module  : Middleware
 Author  : Tim Ngepas
==================================================*/

/*==================================================
 IMPORT
==================================================*/

const jwt = require("jsonwebtoken");

/* Response */

const { error } = require("../utils/response");

/*==================================================
 HANDLERS
==================================================*/

/* Auth */

function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization;

  /*================================================
   JWT AUTH
  ================================================*/

  if (authHeader && authHeader.startsWith("Bearer ")) {

    const token = authHeader.split(" ")[1];

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return error(res, "Server configuration error.", 500);
    }

    try {

      const decoded = jwt.verify(token, jwtSecret);

      req.user = decoded;

      return next();

    } catch (err) {

      return error(res, "Unauthorized.", 401);

    }
  }

  /*================================================
   LEGACY API KEY AUTH
  ================================================*/

  const apiKey = req.headers["x-api-key"];
  const adminApiKey = process.env.ADMIN_API_KEY;

  if (!adminApiKey) {
    return error(res, "Server configuration error.", 500);
  }

  if (!apiKey || apiKey !== adminApiKey) {
    return error(res, "Unauthorized.", 401);
  }

  return next();
}

/*==================================================
 EXPORT
==================================================*/

module.exports = authMiddleware;