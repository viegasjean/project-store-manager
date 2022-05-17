const saleService = require('../services/saleService');

const getAllSales = async (_req, res) => {
  const sales = await saleService.getAll();
  return res.status(200).json(sales);
};

const findSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.findSale(id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const saleRegister = async (req, res) => {
  const sale = req.body;
  const sold = await saleService.saleRegister(sale);
  return res.status(201).json(sold);
};

const saleUpdate = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  console.log(req.body);
  const sold = await saleService.saleUpdate(id, productId, quantity);
  return res.status(200).json(sold);
};

const saleDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.saleDelete(id);
    res.status(204).json(sale);
  } catch (error) {
    console.log('saleDelete error', error.message);
    next(error);
  }
};

module.exports = {
  getAllSales,
  findSale,
  saleRegister,
  saleUpdate,
  saleDelete,
};
