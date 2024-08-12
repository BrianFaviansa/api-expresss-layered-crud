const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const PORT = process.env.PORT;
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res
    .status(200)
    .json({ message: "Products retrieved successfully", data: products });
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res
    .status(200)
    .json({ message: "Product retrieved successfully", data: product });
});

app.post("/products", async (req, res) => {
  const newProductData = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });
  return res
    .status(201)
    .json({ message: "Product created successfully", data: product });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  return res.status(200).json({ message: "Product deleted successfully" });
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
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

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  return res
    .status(200)
    .json({ message: "Product updated successfully", data: product });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  return res
    .status(200)
    .json({ message: "Product updated successfully", data: product });
});

app.listen(PORT, () => {
  console.log(`Express API running on port ${PORT}`);
});
