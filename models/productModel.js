const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const productById = async (id) => {
  const [[product]] = await connection
    .execute('SELECT * FROM products WHERE id =?', [id]);
  return product;
};

const productByName = async (name) => {
  const [[product]] = await connection.execute(`
    SELECT name FROM products WHERE name = ?
  `, [name]);
  return product;
};

const productRegister = async (name, quantity) => {
  const [product] = await connection.execute(`
    INSERT INTO products (name, quantity)
    VALUES (?, ?)
  `, [name, quantity]);
  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const productUpdate = async (name, quantity, id) => {
  const [product] = await connection.execute(`
  UPDATE products
  SET name = ?, quantity = ?
  WHERE id = ?
  `, [name, quantity, id]);
  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const productDelete = async (id) => {
  const [product] = await connection.execute(`
  DELETE FROM products
  WHERE id = ?
  `, [id]);
  return product;
};

module.exports = {
  getAll,
  productById,
  productRegister,
  productUpdate,
  productByName,
  productDelete,
};
