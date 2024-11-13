const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const paymentController = require('../controllers/paymentController');

router.put('/complete/:payment_id', authMiddleware, paymentController.completePayment);

module.exports = router;
