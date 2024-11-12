// models/Cycle.js
const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
  cycle_type: { type: String, required: true },
  name: { type: String},
  color: { type: String},
  status: { type: String, enum: ['Available', 'Rented', 'Maintenance'], default: 'Available' },
  price_per_hour: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  image: { type: String},
  description:{type:String},
  latitude:{type:String},
  longitude:{type:String},
  location:{type:String}
});

module.exports = mongoose.model('Cycle', cycleSchema);
