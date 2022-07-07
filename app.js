const express = require('express');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');
const {
  authProduct,
  authProductId } = require('./middlewares/productsMiddleware');
const authSales = require('./middlewares/salesMiddleware');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app
  .get('/products/search', ProductsController.searchProduct)
  .get('/products', ProductsController.getAllProducts)
  .get('/products/:id', ProductsController.getProductById)
  .get('/sales', SalesController.getAllSales)
  .get('/sales/:id', SalesController.getSalesById);

app
  .post('/products', authProduct, ProductsController.registerNewProduct)
  .post('/sales', authSales, SalesController.registerNewSale);

app
  .put('/products/:id', authProductId, authProduct, ProductsController.updateProduct)
  .put('/sales/:id', authSales, SalesController.updateSale);

app
  .delete('/products/:id', ProductsController.deleteProduct)
  .delete('/sales/:id', SalesController.deleteSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

// docker exec -it store_manager bash
// use it to run in docker.

// npm run test:mocha-html-coverage
// abrir no navegador coverage/index.html
// use it to show full log of tests.