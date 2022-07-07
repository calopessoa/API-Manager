const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return products;
};

const getProductById = async (id) => {
  const [productId] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return productId;
};

const registerNewProduct = async (product) => {
  const [alreadyExists] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name = ?', [
      product.name,
    ]);
  if (alreadyExists.length) throw new Error(409, 'Product already exists');

  const [insertProduct] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [
      product.name,
    ]);
  const id = insertProduct.insertId;

  const newProduct = { id, ...product };
  return newProduct;
};

const updateProduct = async (id, name) => {
  await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [
      name,
      id,
    ]);
};

const deleteProduct = async (id) => {
  const [productRegistered] = await getProductById(id);
  if (!productRegistered) throw new Error('Product not found');
  await connection
    .execute('DELETE FROM products WHERE id = ?', [id]);
};

//  Req 18
const searchProduct = async (name) => {
  const formatProductName = `%${name}%`;
  const [search] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name LIKE ?', [formatProductName]);
  return search;
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
