const saleModel = require('../models/saleModel');

const getAll = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const findSale = async (id) => {
  const sale = await saleModel.findSale(id);
  console.log('saleeee', sale);

  if (sale.length === 0) {
    const error = { status: 404, message: 'Sale not found' };
    throw error;
  }

  return sale;
};

const saleRegister = async (sale) => {
  const soldId = await saleModel.saleRegister(sale);

  return {
    id: soldId,
    itemsSold: sale,
  };
};

const saleUpdate = async (id, productId, quantity) => {
  const result = saleModel.saleUpdate(id, productId, quantity);
  if (result) {
    return {
      saleId: id,
      itemUpdated: [{
        productId, quantity,
      }],
    };
  }
};

module.exports = {
  getAll,
  findSale,
  saleRegister,
  saleUpdate,
};