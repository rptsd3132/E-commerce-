const express = require('express');
const router = express.Router();
const { getProductReviews, createReview } = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');

router.get('/:productId', getProductReviews);
router.post('/:productId', authenticate, createReview);

module.exports = router;