const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  stage: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: true,
  },
  address: { type: String, required: true },
  orderCreated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  orderCompleted: { type: Date },
  delivery: { type: Boolean, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);
