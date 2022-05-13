const express = require('express');
const {
  getAllProducts,
  productById,
  productRegister,
  productUpdate,
  productDelete } = require('./controllers/productController');
const { findSale, getAllSales, saleRegister, saleUpdate } = require('./controllers/saleController');
const validateProduct = require('./middlewares/validateProduct');
const validateSale = require('./middlewares/validateSale');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAllProducts);
app.get('/products/:id', productById);
app.post('/products', validateProduct, productRegister);
app.put('/products/:id', validateProduct, productUpdate);
app.delete('/products/:id', productDelete);

app.get('/sales', getAllSales);
app.get('/sales/:id', findSale);
app.post('/sales', validateSale, saleRegister);
app.put('/sales/:id', validateSale, saleUpdate);

app.use((err, req, res, _next) => {
  // console.log('Internal Error: ', err.message);
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: 'Internal Server Error' });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
