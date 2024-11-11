// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    cycleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cycle' },
    hours: { type: Number, required: true },
  }],
  totalPrice: { type: Number },
});

module.exports = mongoose.model('Cart', cartSchema);
