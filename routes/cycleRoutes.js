// routes/cycleRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAvailableCycles } = require('../controllers/cycleController');

router.get('/available', authMiddleware, getAvailableCycles);

module.exports = router;
