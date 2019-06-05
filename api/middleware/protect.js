const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Customer = mongoose.model('Customer');

module.exports = async (req, res, next) => {
  console.log(req.headers);
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) return res.status(401);

  const token = bearer.split('Bearer ')[1].trim();
  try {
    const payload = await jwt.verify(token, 'secret');
    console.log(payload);
    const customer = await Customer.findById(payload._id).select({ password: 0 });
    req.customer = customer.toJSON();
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
  return null;
};
