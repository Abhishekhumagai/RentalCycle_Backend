// routes/cycleRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAvailableCycles, addCycle ,deletCycle,updateCycle} = require('../controllers/cycleController');

router.get('/available', getAvailableCycles);
router.post('/addcycle',addCycle);
router.post('/deleteCycle',deletCycle);
router.get('/updateCycle',updateCycle);

module.exports = router;
