const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const productController = require("./product/product.controller");

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/products", productController);

app.listen(PORT, () => {
  console.log(`Express API running on port ${PORT}`);
});
