const express = require('express');

const router = express.Router();
const Order = require('../models/Order');

router.get('/', (req, res) => {
  Order.find()
    .populate('customer')
    .exec((err, orders) => {
      if (err) res.send(err);
      else res.send(orders);
    });
});

router.post('/', (req, res) => {
  const order = new Order({
    customer: req.body.customer,
  });
  order.save(((err, doc) => {
    if (err) res.status(400).send(err);
    else res.send(doc);
  }));
});

router.put('/:orderId', (req, res) => {
  Order.findOneAndUpdate({ _id: req.params.orderId },
    { completed: true },
    (err, doc) => {
      if (err) res.status(400).send(err);
      else {
        const updatedOrder = doc;
        updatedOrder.completed = true;
        res.send(updatedOrder);
      }
    });
});

module.exports = router;
