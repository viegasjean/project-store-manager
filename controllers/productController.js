const productService = require('../services/productService');

const getAllProducts = async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const findProduct = async (req, res, next) => {
  try {
    const { id } = await req.params;
    const product = await productService.findProduct(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  findProduct,
};
