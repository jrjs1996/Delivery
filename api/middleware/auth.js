const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Customer = mongoose.model('Customer');

module.exports = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) return next();

  const token = bearer.split('Bearer ')[1].trim();
  try {
    const payload = await jwt.verify(token, 'secret');
    const customer = await Customer.findById(payload._id).select({ password: 0 });
    req.customer = customer.toJSON();
    return next();
  } catch (error) {
    return next();
  }
  return next();
};
