//* handle business logic, supaya functions-nya reusable

const {
  findProducts,
  findProductById,
  insertProduct,
  findProductByName,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = findProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);

  if (findProduct) {
    throw new Error("Product name is already exist");
  }

  const product = await insertProduct(newProductData);

  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await deleteProductById(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  const product = await editProduct(id, productData);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
