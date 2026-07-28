/*==================================================
 NGEPAS REBORN
 File   : index.js
 Module : Backend Server
==================================================*/
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

/*==================================================
 MIDDLEWARE
==================================================*/

app.use(cors());
app.use(express.json());

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

/*==================================================
 START SERVER
==================================================*/

app.listen(PORT, () => {
  console.log(`Ngepas API running on port ${PORT}`);
});
