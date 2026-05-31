const pool = require('../db');

// GET all products
async function getAllProducts(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY id'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET one product by id
async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllProducts, getProductById };