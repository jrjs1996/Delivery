const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  completed: Boolean,
});

module.exports = mongoose.model('Order', OrderSchema);
