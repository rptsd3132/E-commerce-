const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct } = require('../controllers/productController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, requireAdmin, createProduct);

module.exports = router;