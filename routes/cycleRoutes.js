// routes/cycleRoutes.js
const express = require('express');
const router = express.Router();
const cycleController = require('../controllers/cycleController');
const verifyAdmin = require('../middleware/roleMiddleware'); 

// CRUD routes for cycles
router.post('/addcycle', verifyAdmin, cycleController.createCycle);     //Admin only
router.get('/', cycleController.getAllCycles);                           
router.get('/:id', cycleController.getCycleById);                       
router.put('/:id', verifyAdmin, cycleController.updateCycle);         //  Admin only
router.delete('/:id', verifyAdmin, cycleController.deleteCycle);          // Admin only

module.exports = router;
