const express = require('express');
const { processPayment } = require('../controllers/paymentController');
const authMiddleware = require('./middleware/authMiddleware'); // Middleware to protect routes
const router = express.Router();

// Route to initiate payment using Khalti
router.post('/', authMiddleware, processPayment);
router.post('/payment',payment );

module.exports = router;