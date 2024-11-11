// models/Station.js
const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

stationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Station', stationSchema);
