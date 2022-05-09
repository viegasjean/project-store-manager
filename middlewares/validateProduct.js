const Joi = require('joi');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = PRODUCT.validate({ name, quantity });

  if (error && error.message.includes('required')) next({ status: 400, message: error.message });

  if (error) next({ status: 422, message: error.message });

  next();
};

module.exports = validateProduct;