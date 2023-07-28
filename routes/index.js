import express from 'express';
import productsRouter from './products.js';
import usersRouter from './users.js';
import categoriesRouter from './categories.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

//module.exports = routerApi;
export default routerApi;
