const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const productById = async (id) => {
  const product = await productModel.productById(id);

  if (!product) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }
  return product;
};

const productRegister = async (name, quantity) => {
  const productExists = await productModel.productByName(name);
  if (productExists) {
    const error = { status: 409, message: 'Product already exists' };
    throw error;
  }
  const product = await productModel.productRegister(name, quantity);

  return product;
};

const productUpdate = async (name, quantity, id) => {
  const productExists = await productModel.productById(id);

  if (!productExists) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }
  const product = await productModel.productUpdate(name, quantity, id);
  return product;
};

const productDelete = async (id) => {
  const product = await productModel.productDelete(id);

  if (!product.affectedRows) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }

  return product;
};

module.exports = {
  getAll,
  productById,
  productRegister,
  productUpdate,
  productDelete,
};