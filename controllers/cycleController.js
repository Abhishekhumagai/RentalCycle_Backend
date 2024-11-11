// const Cycle = require('./models/Cycle');
// const RentalStation = require('./models/RentalStation');
// const haversine = require('./utils/haversine')

// const { RentalStation, Cycle } = require('../models');
// const haversine = require('../utils/haversine');

// exports.getNearbyStations = async (req, res) => {
//   const { latitude, longitude } = req.query;
//   const stations = await RentalStation.findAll();

//   const stationsWithDistance = stations.map(station => {
//     const distance = haversine(latitude, longitude, station.latitude, station.longitude);
//     return { ...station.toJSON(), distance };
//   }).sort((a, b) => a.distance - b.distance);

//   res.json(stationsWithDistance);
// };

// const { sequelize } = require('../config/db');

// exports.getAvailableCycles = async (req, res) => {
//   const { stationId } = req.params;
//   const cycles = await Cycle.findAll({ where: { rentalStationId: stationId, status: 'available' } });
//   res.json(cycles);
// };
// controllers/cycleController.js
const Cycle = require('../models/Cycle');
const Station = require('../models/Station');

exports.getAvailableCycles = async (req, res) => {
  try {
    const availableCycles = await Cycle.find({ status: 'Available' }).populate('stationId');
    res.json(availableCycles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCycle = async (req, res) => {
  try { 
    const { status, stationId, cycleType, model, otherProperties } = req.body; 
    if (!status || !stationId || !cycleType || !model) {
      return res.status(400).json({ error: 'Missing required fields: status, stationId, cycleType, and model' });
    }
    const newCycle = new Cycle({
      status,           
      stationId,        
      cycleType,        
      model,            
      otherProperties,  
    });
    await newCycle.save();
    const savedCycle = await Cycle.findById(newCycle._id).populate('stationId');
    res.status(201).json({ message: 'Cycle added successfully', cycle: savedCycle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletCycle = async (req, res) => {
  try {
    const { cycleId } = req.params; 
    const deletedCycle = await Cycle.findByIdAndDelete(cycleId);
    if (!deletedCycle) {
      return res.status(404).json({ error: 'Cycle not found' });
    }
    res.status(200).json({ message: 'Cycle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateCycle = async (req, res) => {
  try {
    const { cycleId } = req.params; 
    const { status, stationId, cycleType, model, otherProperties } = req.body;
    if (!status && !stationId && !cycleType && !model && !otherProperties) {
      return res.status(400).json({ error: 'No fields to update. Please provide at least one field.' });
    }
    const updatedCycle = await Cycle.findByIdAndUpdate(
      cycleId, 
      {
        status,           
        stationId,        
        cycleType,        
        model,            
        otherProperties,  
      },
      { new: true } 
    ).populate(' stationId'); 

    if (!updatedCycle) {
      return res.status(404).json({ error: 'Cycle not found' });
    }
    res.status(200).json({ message: 'Cycle updated successfully', cycle: updatedCycle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};