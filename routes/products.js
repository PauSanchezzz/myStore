import express from 'express';
import ProductsService from './../services/product.js';
import boom from '@hapi/boom';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from './../schemas/products.js';
import validatorHandler from '../middlewares/validator.js';

const router = express.Router();
const service = new ProductsService();

//Consultar Producto
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//consultar por id
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Crear Producto
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

//Actualizar Producto
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
//Eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const ans = await service.delete(id);
  res.json(ans);
});

//module.exports = router;
export default router;
