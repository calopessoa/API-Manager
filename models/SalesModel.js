const connection = require('./connection');

function newFormat(obj) {
  return obj.map((element) => ({
    saleId: element.sale_id,
    date: element.date,
    productId: element.product_id,
    quantity: element.quantity,
  }));
}

const getAllSales = async () => {
  const [products] = await connection
    .execute('SELECT sale_id, date, product_id, quantity FROM sales AS SALES'
      + ' JOIN sales_products AS SALES_PRODUCTS ON'
      + ' SALES_PRODUCTS.sale_id = SALES.id ORDER BY sale_id ASC, product_id ASC');
  return newFormat(products);
};

const getSalesById = async (id) => {
  const [productId] = await connection
    .execute('SELECT date, product_id, quantity FROM sales AS SALES'
      + ' JOIN sales_products AS SALES_PRODUCTS ON'
      + ' SALES_PRODUCTS.sale_id = SALES.id WHERE id = ? ORDER BY product_id ASC', [id]);
  return newFormat(productId);
};

// ***** block that will be responsible for the register of a new sale engine;

const newSaleTemplate = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (CURRENT_TIMESTAMP())');
  return insertId;
};

const productValidation = async (array) => {
  const searchProduct = await Promise.all(array.map(async (element) => {
    const [findings] = await connection
      .execute('SELECT * FROM StoreManager.products WHERE id = ?', [element.productId]);
    return !findings.length;
  }));
  const newError = searchProduct.some((element) => element);
  if (newError) throw new Error('Product not found');
};

const registerNewSale = async (order) => {
  await productValidation(order);
  const productId = await newSaleTemplate();
  const newSale = {
    id: +(productId),
    itemsSold: [...order],
  };
  return newSale;
};

// ***** end of the block;

const deleteSale = async (id) => {
  const [saleRegistered] = await getSalesById(id);
  if (!saleRegistered) throw new Error('Sale not found');
  await connection
    .execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

const updateSale = async (saleId, arraySales) => {
  const query = Promise.all(arraySales.map(async (element) => {
    await connection
      .execute('UPDATE StoreManager.sales_products SET quantity = ?'
        + ' WHERE sale_id = ? AND product_id = ?', [element.quantity, saleId, element.productId]);
  }));
  console.log(query);
  return query;
};

module.exports = {
  newFormat,
  getAllSales,
  registerNewSale,
  getSalesById,
  deleteSale,
  updateSale,
};
