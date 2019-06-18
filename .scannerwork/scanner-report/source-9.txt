const mongoose = require('mongoose');
const AbstractUserSchema = require('./User');

const CustomerSchema = new AbstractUserSchema();
CustomerSchema.add({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address: [{
    type: String,
    required: true,
    trim: true,
  }],
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);
