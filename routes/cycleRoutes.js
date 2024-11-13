// routes/cycleRoutes.js
const express = require('express');
const router = express.Router();
const cycleController = require('../controllers/cycleController');
const verifyAdmin = require('../middleware/roleMiddleware'); 
const authMiddleware = require('../middleware/authMiddleware');

// CRUD routes for cycles
router.post('/addcycle',authMiddleware, verifyAdmin,  cycleController.createCycle);     //Admin only verifyAdmin
router.get('/', cycleController.getAllCycles);                           
router.get('/:id', cycleController.getCycleById);                       
router.put('/:id',authMiddleware, verifyAdmin, cycleController.updateCycle);         //  Admin only
router.delete('/:id',authMiddleware, verifyAdmin, cycleController.deleteCycle);          // Admin only
router.put('/rent/:id', authMiddleware, cycleController.rentCycle);
module.exports = router;

