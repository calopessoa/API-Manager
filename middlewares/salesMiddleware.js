const { salesSchema } = require('../schemas/salesSchema');
// const { getSalesById } = require('../controllers/SalesController');

const authSales = (request, response, next) => {
  const { body } = request;

  const { error } = salesSchema.validate(body);

  if (!error) return next();

  const { message } = error;

  const productIdRequired = '"productId" is required';
  const quantityRequired = '"quantity" is required';
  if (message === productIdRequired || message === quantityRequired) {
    return response.status(400).json({ message });
  }
  return response.status(422).json({ message });
};

// const validateSale = async (request, response, next) => {
//   const { productId } = request.params;
//   const [getId] = await getSalesById(productId);

//   if (getId === undefined) {
//     return response.status(404).json({
//       message: 'Sale not found'
//     });
//   };
//   next();
// };

module.exports = authSales;
