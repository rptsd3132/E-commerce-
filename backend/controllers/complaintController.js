const pool = require('../db');

async function createComplaint(req, res) {
  try {
    const userId = req.user.id;
    const { subject, message, order_id } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Subject and message are required.' });
    }

    const result = await pool.query(
      'INSERT INTO complaints (user_id, order_id, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, order_id || null, subject, message]
    );

    res.status(201).json({ message: 'Complaint submitted', complaint: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMyComplaints(req, res) {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT * FROM complaints WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createComplaint, getMyComplaints };
