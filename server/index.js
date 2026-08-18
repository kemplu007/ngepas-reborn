/*==================================================
 NGEPAS REBORN
 File   : index.js
 Module : Backend Server
==================================================*/
require("dotenv").config();

require("./database/init");

const express = require("express");

const cors = require("cors");

const {
  createApiRateLimiter,
  createCorsOptions,
} = require("./config/security");

const productRoutes = require("./routes/productRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");

const categoryRoutes = require("./routes/categoryRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

/*==================================================
 MIDDLEWARE
==================================================*/

app.disable("x-powered-by");
app.use(cors(createCorsOptions()));
app.use(express.json());
app.use(createApiRateLimiter());

/*==================================================
 TEST ROUTE
==================================================*/

app.get("/", (req, res) => {
  res.json({
    message: "Ngepas API is running 🚀",
  });
});
/*==================================================
 PRODUCT ROUTES
==================================================*/

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/auth", authRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

/*==================================================
 START SERVER
==================================================*/

app.listen(PORT, () => {
  console.log(`Ngepas API running on port ${PORT}`);
});
