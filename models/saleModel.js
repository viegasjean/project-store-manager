const connection = require('./connection');
const { productById } = require('./productModel');

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
  const sold = sale.map(({ productId, quantity }) => {
    productById(productId).then(({ quantity: productQuantity }) => {
      connection.query('UPDATE products SET quantity = ? WHERE id = ?',
        [productQuantity - quantity, productId]);
    });

    return [soldId, productId, quantity];
  });

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

const saleDelete = async (id) => {
  const [saleProduct] = await findSale(id);

  if (saleProduct) {
    const product = await productById(saleProduct.productId);
    await connection.execute('UPDATE products SET quantity = ? WHERE id = ?',
      [product.quantity + saleProduct.quantity, saleProduct.productId]);
  }

  const [sale] = await connection.execute(`
  DELETE FROM sales_products
  WHERE sale_id = ?
  `, [id]);

  return sale;
};

module.exports = {
  getAll,
  findSale,
  saleRegister,
  saleUpdate,
  saleDelete,
};
