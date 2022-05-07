const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection
    .execute(`
    SELECT
      sa.id saleId,
      sa.date,
      sp.product_id productId,
      sp.quantity
    FROM
      sales sa
    JOIN
      sales_products sp ON sa.id = sp.sale_id`);
  return sales;
};

const findSale = async (id) => {
  const [sale] = await connection
    .execute(`
    SELECT
      sa.date,
      sp.product_id productId,
      sp.quantity
    FROM sales sa
    JOIN
      sales_products sp ON sa.id = sp.sale_id
    WHERE sa.id =?
    `, [id]);
  return sale;
};

module.exports = {
  getAll,
  findSale,
};
