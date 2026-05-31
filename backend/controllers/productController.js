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

// CREATE a product (admin only)
async function createProduct(req, res) {
  try {
    const { name, description, price, stock, image_url, category_id } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required.' });
    }

    const result = await pool.query(
      `INSERT INTO products (name, description, price, stock, image_url, category_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, stock || 0, image_url, category_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllProducts, getProductById, createProduct };