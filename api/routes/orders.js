const express = require('express');

const router = express.Router();
const Order = require('../models/Order');

// TODO: List API points should have the ability to
// specify 'from' and 'to' in query strings.

// TODO: Check if the errors were from user specifiction
// or server.
// e.g. They specified a from or to that was out of range
// If to is out of range it should just return less values

// TODO: Test all authentication

/**
 * Gets list of all orders.
 */
router.get('/', async (req, res) => {
  // if (req.admin == null) return res.sendStatus(401);

  try {
    const orders = await Order.find().populate('customer').exec();
    return res.send(orders);
  } catch (error) {
    return res.sendStatus(500);
  }
});

// TODO: Allow admins to make orders for
// customers or without customers.

/**
 * Adds the specified order.
 * Must be customer
 */
router.post('/', async (req, res) => {
  const orderParams = req.body;
  orderParams.customer = req.customer._id;
  try {
    const order = new Order(orderParams);
    const result = order.save();
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete('/', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    await Order.deleteMany(null);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
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
