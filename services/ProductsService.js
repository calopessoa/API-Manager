const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const productId = await ProductsModel.getProductById(id);
  if (!productId || productId.length === 0) {
    throw new Error('Product not found');
  }
  return productId;
};

const registerNewProduct = async (product) => {
  const newProduct = await ProductsModel.registerNewProduct(product);
  return newProduct;
};

const updateProduct = async (id, name) => {
  await ProductsModel.updateProduct(id, name);
};

const deleteProduct = async (id) => {
  await ProductsModel.deleteProduct(id);
};

const searchProduct = async (name) => {
  const query = await ProductsModel.searchProduct(name);
  if (query.length === 0) {
    throw new Error('Product not found');
  }
  return query;
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
