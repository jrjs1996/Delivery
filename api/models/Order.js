/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const Customer = require('./Customer');
// TODO: Customers will be able to create an order
// with order completed, this not be able to happen

const minItems = val => val.length >= 1;

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: false },
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
  customerName: { type: String, required: true },
  items: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
    }],
    validate: [minItems, 'Orders must have at least one item'],
  },
});

OrderSchema.pre('validate', async function (next) {
  if (!this.customer) return next();
  if (this.customerName) {
    throw Error('cannot create order with both customer and customer name.'
    + 'If a customer is provided their current name will be used.');
  }
  const customer = await Customer.findOne(this.customer);
  this.customerName = `${customer.firstName} ${customer.lastName}`;
  return next();
});

module.exports = mongoose.model('Order', OrderSchema);
