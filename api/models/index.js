const mongoose = require('mongoose');
const Customer = require('./Customer');
const Order = require('./Order');
const Admin = require('./Admin');

const connectDb = () => mongoose.connect('mongodb://localhost:27017/delivery');


const models = { Customer, Order, Admin };

module.exports = connectDb;
module.exports.default = models;
