const productService = require('../services/productService');

const getAllProducts = async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const productById = async (req, res, next) => {
  try {
    const { id } = await req.params;
    const product = await productService.productById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const productRegister = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await productService.productRegister(name, quantity);
    return res.status(201).json(product);
  } catch (error) {
    console.log('productRegister Controller error', error.message);
    next(error);
  }
};

const productUpdate = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const product = await productService.productUpdate(name, quantity, id);
    res.status(200).json(product);
  } catch (error) {
    console.log('productUpdate Controller error', error.message);
    next(error);
  }
};

module.exports = {
  getAllProducts,
  productById,
  productRegister,
  productUpdate,
};
