//* handle request & response, validasi body

const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  patchProductById,
  editProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  return res
    .status(200)
    .json({ message: "Products retrieved successfully", data: products });
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);

    return res
      .status(200)
      .json({ message: "Product retrieved successfully", data: product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    return res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    await deleteProductById(productId);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.price &&
      productData.image &&
      productData.description
    )
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = await editProductById(productId, productData);

  return res
    .status(200)
    .json({ message: "Product updated successfully", data: product });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    const product = await editProductById(productId, productData);

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
