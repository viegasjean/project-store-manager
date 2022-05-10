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

const saleRegister = async (sale) => {
  const [{ insertId: soldId }] = await connection
  .execute('INSERT INTO sales (date) values (now())');

  const sold = sale.map(({ productId, quantity }) => [soldId, productId, quantity]);

  await connection.query(`
    INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES ?`, [sold]);

  return soldId;
};

const saleUpdate = async (id, productId, quantity) => {
  const [result] = await connection.query(`
    UPDATE sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?
  `, [productId, quantity, id]);

  return result;
};

module.exports = {
  getAll,
  findSale,
  saleRegister,
  saleUpdate,
};
