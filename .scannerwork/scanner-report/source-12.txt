/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;


// TODO: Customers will be able to create an order
// with order completed, this not be able to happen
// this should be done somewhere else because admins
// should be able to do this.

const MenuItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  archived: { type: Boolean, required: true, default: false },
  price: { type: Number, required: true },
  created: { type: Date, required: true, default: Date.now() },
  menuNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  revision: { type: Number, required: true, default: 0 },
});


module.exports = mongoose.model('MenuItem', MenuItemSchema);
