// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { addToCart, viewCart, removeFromCart } = require('../controllers/cartController');  // Correct import

// Use the correct function names
router.post('/add', addToCart);       // Create a cycle
router.get('/view', viewCart);        // View cart
router.delete('/remove', removeFromCart);  // Remove an item from cart

module.exports = router;
