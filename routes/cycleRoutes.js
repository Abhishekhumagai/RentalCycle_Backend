// routes/cycleRoutes.js
const express = require('express');
const router = express.Router();
const cycleController = require('../controllers/cycleController'); // Ensure the path is correct

// CRUD routes for cycles
router.post('/addcycle', cycleController.createCycle);       // Create a cycle
router.get('/', cycleController.getAllCycles);               // Get all cycles
router.get('/:id', cycleController.getCycleById);            // Get a single cycle by ID
router.put('/:id', cycleController.updateCycle);             // Update a cycle by ID
router.delete('/:id', cycleController.deleteCycle);          // Delete a cycle by ID

module.exports = router;
