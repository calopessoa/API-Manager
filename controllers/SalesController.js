const SalesService = require('../services/SalesService');

const getAllSales = async (_request, response) => {
  try {
    const sales = await SalesService.getAllSales();
    return response.status(200).json(sales);
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    });
  }
};

const registerNewSale = async (request, response) => {
  try {
    const { body } = request;
    const order = body;
    const db = await SalesService.registerNewSale(order);
    return response.status(201).json(db);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

const getSalesById = async (request, response) => {
  try {
    const { id } = request.params;
    const db = await SalesService.getSalesById(id);
    return response.status(200).json(db);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

const deleteSale = async (request, response) => {
  try {
    const { id } = request.params;
    await SalesService.deleteSale(id);
    return response.status(204).end();
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

const updateSale = async (request, response) => {
  try {
    const { id } = request.params;
    const salesProducts = request.body;
    const updatedSales = await SalesService
      .updateSale(Number(id), salesProducts);
    return response.status(200).json(updatedSales);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllSales,
  registerNewSale,
  getSalesById,
  deleteSale,
  updateSale,
};
