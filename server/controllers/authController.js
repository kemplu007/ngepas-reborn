
/*==================================================
 NGEPAS REBORN
 File   : authController.js
 Module : Auth Controller
==================================================*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const { success, error } = require("../utils/response");

/*==================================================
 LOGIN
==================================================*/

function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, "Email dan password wajib diisi", 400);
    }

    const user = userModel.getUserByEmail(email);

    if (!user) {
      return error(res, "Email atau password salah", 401);
    }

    const passwordValid = bcrypt.compareSync(
      password,
      user.password_hash,
    );

    if (!passwordValid) {
      return error(res, "Email atau password salah", 401);
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return error(res, "Server configuration error.", 500);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      },
    );

    return success(
      res,
      {
        token,
      },
      "Login berhasil",
    );
  } catch (error) {
    next(error);
  }
}

/*==================================================
 EXPORT CONTROLLER
==================================================*/

module.exports = {
  login,
};