const mongoose = require('mongoose');
const AbstractUserSchema = require('./User');

const AdminSchema = new AbstractUserSchema();
AdminSchema.add({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
