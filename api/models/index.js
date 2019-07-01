const mongoose = require('mongoose');
const Customer = require('./Customer');
const Order = require('./Order');
const Admin = require('./Admin');
const MenuItem = require('./MenuItem');

const connectDb = callback => mongoose.connect('mongodb://localhost:27017/delivery', callback);


const models = {
  Customer,
  Order,
  Admin,
  MenuItem,
};

module.exports = connectDb;
module.exports.default = models;
