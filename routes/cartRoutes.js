const express = require('express');
const { addToCart, viewCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// // Add cycle to cart
router.post('/add', authMiddleware, addToCart);

// // View user's cart
// router.get('/', authMiddleware, viewCart);

// // Remove a cycle from the cart
// router.delete('/:cartId', authMiddleware, removeFromCart);

module.exports = router;