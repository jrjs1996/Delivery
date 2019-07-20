/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderItemSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);
