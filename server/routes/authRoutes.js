/*==================================================
 NGEPAS REBORN
 File   : authRoutes.js
 Module : Auth Routes
==================================================*/

const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

/*==================================================
 AUTH ROUTES
==================================================*/

router.post("/login", authController.login);

/*==================================================
 EXPORT ROUTER
==================================================*/

module.exports = router;