const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', OrderSchema);
