const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const findProduct = async (id) => {
  const product = await productModel.findProduct(id);

  if (!product) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }

  return product;
};

module.exports = {
  getAll,
  findProduct,
};