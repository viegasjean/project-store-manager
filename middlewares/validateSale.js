const Joi = require('joi');

const SALE = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const validateSale = (req, _res, next) => {
  console.log('boooodddyyy', req.body);
  const products = req.body;

  products.forEach(({ productId, quantity }) => {
    const { error } = SALE.validate({ productId, quantity });

    if (error && error.message.includes('required')) next({ status: 400, message: error.message });

    if (error) next({ status: 422, message: error.message });
  });

  next();
};

module.exports = validateSale;