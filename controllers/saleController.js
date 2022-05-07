const saleService = require('../services/saleService');

const getAllSales = async (_req, res) => {
  const sales = await saleService.getAll();
  res.status(200).json(sales);
};

const findSale = async (req, res, next) => {
  try {
    const { id } = await req.params;
    const sale = await saleService.findSale(id);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSales,
  findSale,
};
