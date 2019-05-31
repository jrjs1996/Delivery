const mongoose = require('mongoose');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
});

module.exports = mongoose.model('Customer', CustomerSchema);
