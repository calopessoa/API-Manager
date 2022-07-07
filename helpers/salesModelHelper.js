// aux functions that will validate if there's a sale. It'll be used in SalesService.

const connection = require('../models/connection');

const verifyIfSaleIdExists = async (id) => {
  const [saleArray] = await connection
    .execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
  const verifySaleArray = saleArray.some((element) => element.id === id);
  if (!verifySaleArray) throw new Error('Sale not found');
};

const verifyIfProductExists = async (productArray) => {
  const response = await Promise.all(productArray.map(async (element) => {
    const [arr] = await connection
      .execute('SELECT * FROM StoreManager.products WHERE id = ?', [element.productId]);
    return arr.length <= 0;
  }));
  const isArrayEmpty = response.some((element) => element);

  if (isArrayEmpty) throw new Error('Product not found');
};

module.exports = {
  verifyIfSaleIdExists,
  verifyIfProductExists,
};
