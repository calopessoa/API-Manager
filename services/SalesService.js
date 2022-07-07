const SalesModel = require('../models/SalesModel');
const {
  verifyIfProductExists,
  verifyIfSaleIdExists,
} = require('../helpers/salesModelHelper');

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();
  return sales;
};

const registerNewSale = async (order) => {
  const newProduct = await SalesModel.registerNewSale(order);
  return newProduct;
};

const getSalesById = async (id) => {
  const saleById = await SalesModel.getSalesById(id);
  if (!saleById || saleById.length === 0) {
    throw new Error('Sale not found');
  }
  return saleById;
};

const deleteSale = async (id) => {
  await SalesModel.deleteSale(id);
};

const updateSale = async (saleId, salesProducts) => {
  await verifyIfSaleIdExists(saleId);
  await verifyIfProductExists(salesProducts);
  await SalesModel.updateSale(saleId, salesProducts);

  const productData = {
    saleId,
    itemsUpdated: salesProducts,
  };
  return productData;
};

module.exports = {
  getAllSales,
  registerNewSale,
  getSalesById,
  deleteSale,
  updateSale,
};
