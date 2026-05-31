const pool = require('../db');

async function getProductReviews(req, res) {
  try {
    const { productId } = req.params;
    const result = await pool.query(
      `SELECT reviews.id, reviews.rating, reviews.comment, reviews.created_at, users.name AS user_name
       FROM reviews
       JOIN users ON reviews.user_id = users.id
       WHERE reviews.product_id = $1
       ORDER BY reviews.created_at DESC`,
      [productId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createReview(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const result = await pool.query(
      'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [productId, userId, rating, comment || null]
    );

    res.status(201).json({ message: 'Review added', review: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getProductReviews, createReview };
