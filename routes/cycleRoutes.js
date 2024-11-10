const express = require('express');
const { getNearbyStations, getAvailableCycles } = require('../controllers/cycleController');
const authMiddleware = require('./middleware/authMiddleware'); // Middleware to protect routes
const router = express.Router();

// Get nearby rental stations based on user location (latitude and longitude)
router.get('/nearby', authMiddleware, getNearbyStations);

// Get available cycles at a specific rental station
router.get('/available/:stationId', authMiddleware, getAvailableCycles);

module.exports = router;