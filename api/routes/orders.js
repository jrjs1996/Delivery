const express = require('express');

const router = express.Router();
const Order = require('../models/Order');

router.get('/', (req, res) => {
  Order.find(null, (err, orders) => {
    if (err) res.send(err);
    else res.send(orders);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const order = new Order({
    customer: req.body.customer,
  });
  order.save(((err, doc) => {
    if (err) res.status(400).send(err);
    else res.send(doc);
  }));
});

module.exports = router;
