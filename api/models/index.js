const mongoose = require('mongoose');
const Customer = require('./Customer');
const Order = require('./Order');

const connectDb = () => mongoose.connect('mongodb://localhost:27017/delivery');


const models = { Customer, Order };

module.exports = connectDb;
module.exports.default = models;
