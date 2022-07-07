const ProductsService = require('../services/ProductsService');

const getAllProducts = async (_request, response) => {
  try {
    const products = await ProductsService.getAllProducts();
    return response.status(200).json(products);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

const getProductById = async (request, response) => {
  try {
    const { id } = request.params;
    const [getProduct] = await ProductsService.getProductById(id);
    return response.status(200).json(getProduct);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

const registerNewProduct = async (request, response) => {
  try {
    const product = request.body;
    const db = await ProductsService.registerNewProduct(product);
    return response.status(201).json(db);
  } catch (error) {
    return response.status(404).json({ message: error.message });
  }
};

const updateProduct = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  try {
    await ProductsService.updateProduct(id, name);
    return response.status(200).json({ id, name });
  } catch (error) {
    return response.status(404).json({ message: error.message });
  }
};

const deleteProduct = async (request, response) => {
  try {
    const { id } = request.params;
    await ProductsService.deleteProduct(id);
    return response.status(204).end();
  } catch (error) {
    return response.status(404).json({ message: error.message });
  }
};

const searchProduct = async (request, response) => {
  try {
    const { q: name } = request.query;
    const result = await ProductsService.searchProduct(name);
    return response.status(200).json(result);
  } catch (error) {
    return response.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
