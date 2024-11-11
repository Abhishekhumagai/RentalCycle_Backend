// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addToCart } = require('../controllers/cartController');

router.post('/add', authMiddleware, cartController.addToCart);
router.get('/view', authMiddleware, cartController.viewCart);
router.delete('/remove', authMiddleware, cartController.removeFromCart);

module.exports = router;
