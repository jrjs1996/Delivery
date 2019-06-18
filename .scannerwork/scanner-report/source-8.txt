const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Customer = mongoose.model('Customer');
const Admin = mongoose.model('Admin');

module.exports = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) return next();

  const token = bearer.split('Bearer ')[1].trim();
  try {
    const payload = await jwt.verify(token, 'secret');
    const customer = await Customer.findById(payload._id).select({ password: 0 });
    if (customer) req.customer = customer.toJSON();
    else {
      const admin = await Admin.findById(payload._id).select({ password: 0 });
      if (admin) req.admin = admin.toJSON();
    }
    return next();
  } catch (error) {
    return next();
  }
};
