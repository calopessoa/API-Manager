const { productSchema } = require('../schemas/productSchema');
const { getProductById } = require('../models/ProductsModel');

const authProduct = (request, response, next) => {
  const { body } = request;

  const { error } = productSchema.validate(body);

  if (!error) return next();

  if (error.message === '"name" is required') {
    return response.status(400).json({ message: error.message });
  }
  return response.status(422).json({ message: error.message });
};

const authProductId = async (request, response, next) => {
  const { id } = request.params;
  const [getId] = await getProductById(id);

  if (getId === undefined) {
    return response.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  authProduct,
  authProductId,
};
