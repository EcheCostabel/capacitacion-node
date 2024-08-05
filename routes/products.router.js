const express = require('express');
const ProductsService = require('../services/product.services');
const {validatorHandler} = require('../middlewares/validator.handler');
const { createProductSchema, getProductSchema, updateProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();


router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', async (req, res) => {
  res.send('filter')
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await service.findOne(id)
    res.json(productById);

  } catch (error) {
    next(error)
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const createProduct = await service.create(body)
  res.status(201).json(createProduct)
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const updateProduct = await service.update(id, body);

    res.json(updateProduct)

  } catch (error) {
    next(error)
  }
})


router.delete('/:id',
  async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await service.delete(id)

  res.json(deleteProduct)
})


module.exports = router;
