/*==================================================
 NGEPAS REBORN
 File   : index.js
 Module : Backend Server
==================================================*/

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

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
 START SERVER
==================================================*/

app.listen(PORT, () => {
  console.log(`Ngepas API running on port ${PORT}`);
});
