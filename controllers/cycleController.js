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
    const availableCycles = await Cycle.find({ status: 'Available' });
    res.json(availableCycles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCycle = async (req, res) => {
  try {
    const { image,name,color,cycle_type, status, price_per_hour,description,latitude,longitude,location,updated_at } = req.body;
    const newCycle = new Cycle({ image,name,color,cycle_type, status, price_per_hour,description,latitude,longitude,location,updated_at });
    const savedCycle = await newCycle.save();
    res.status(201).json(savedCycle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cycles
exports.getAllCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find();
    res.status(200).json(cycles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single cycle by ID
exports.getCycleById = async (req, res) => {
  try {
    const { id } = req.params;
    const cycle = await Cycle.findById(id);
    if (!cycle) return res.status(404).json({ message: 'Cycle not found' });
    res.status(200).json(cycle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a cycle by ID
exports.updateCycle = async (req, res) => {
  try {
    const { id } = req.params;
    const { image,name,color,description,cycle_type, status, price_per_hour,latitude,longitude,location,updated_at } = req.body;
    const updatedCycle = await Cycle.findByIdAndUpdate(
      id,
      { image,name,color,description,cycle_type, status, price_per_hour,updated_at,latitude,longitude,location: Date.now() },
      { new: true }
    );
    if (!updatedCycle) return res.status(404).json({ message: 'Cycle not found' });
    res.status(200).json(updatedCycle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a cycle by ID
exports.deleteCycle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCycle = await Cycle.findByIdAndDelete(id);
    if (!deletedCycle) return res.status(404).json({ message: 'Cycle not found' });
    res.status(200).json({ message: 'Cycle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// exports.rentCycle = async (req, res) => {
//   try {
//     const { id } = req.params; // Cycle ID from the request params

//     // Find the cycle by ID and ensure it's available
//     const cycle = await Cycle.findById(id);
//     if (!cycle) {
//       return res.status(404).json({ error: 'Cycle not found' });
//     }

//     if (cycle.status !== 'Available') {
//       return res.status(400).json({ error: 'Cycle is not available for rent' });
//     }

//     // Update the cycle status to "Rented"
//     cycle.status = 'Rented';
//     await cycle.save();

//     res.status(200).json({ message: 'Cycle rented successfully', cycle });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };
exports.rentCycle = async (req, res) => {
  try {
    const cycleId = req.params.cycle_id;
    const userId = req.user._id; // Get the user ID from the token

    // Find and update the cycle status to "Rented"
    const cycle = await Cycle.findById(cycleId);
    if (!cycle || cycle.status !== 'Available') {
      return res.status(400).json({ error: 'Cycle not available for rent' });
    }

    cycle.status = 'Rented';
    await cycle.save();

    // Create a pending payment record
    const payment = new Payment({
      user_id: userId,
      cycle_id: cycle._id,
      amount: cycle.price_per_hour,  // Or adjust this calculation as needed
      status: 'Pending'
    });
    await payment.save();

    res.status(200).json({
      message: 'Cycle rented successfully. Payment pending.',
      cycle,
      payment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};