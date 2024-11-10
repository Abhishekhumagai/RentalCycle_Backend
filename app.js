const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cartRoutes= require('./routes/cartRoutes')
// const cartRoutes = require('./routes/cartRoutes');

connectDB();

app.use(cors({
  origin: '*',  // Update this to specific origin(s) as needed
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

async function testRawQuery() {
  try {
    const [results, metadata] = await sequelize.query('SELECT * FROM Users');
    console.log('Users:', results);
  } catch (error) {
    console.error('Error executing raw query:', error);
  }
}

console.log('JWT secret key is', process.env.JWT_SECRET);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});

testRawQuery();
