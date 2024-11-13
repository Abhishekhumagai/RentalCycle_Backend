const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');  // Adjusted for MongoDB connection
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cycleRoutes = require('./routes/cycleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


// Connect to MongoDB
connectDB();

app.use(cors({
  origin: '*',  // Update this to specific origin(s) as needed
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/cycles', cycleRoutes);
app.use('/api/payments', paymentRoutes);

console.log('JWT secret key is', process.env.JWT_SECRET);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
