require('dotenv').config();
const express = require('express');
const pool = require('./db');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello! My backend is working.');
});

app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected! Time is: ${result.rows[0].now}`);
  } catch (err) {
    res.send(`Database error: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});