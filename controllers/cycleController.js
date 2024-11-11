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
