// models/Cycle.js
const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  cycleType: { type: String },
  status: { type: String, enum: ['Available', 'Rented', 'Maintenance'] },
  pricePerHour: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cycle', cycleSchema);
