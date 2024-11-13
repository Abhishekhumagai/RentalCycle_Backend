const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cycle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cycle', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Complete'], default: 'Pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
