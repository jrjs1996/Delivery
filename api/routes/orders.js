const express = require('express');

const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const OrderItem = require('../models/OrderItem');

// TODO: List API points should have the ability to
// specify 'from' and 'to' in query strings.

// TODO: Check if the errors were from user specifiction
// or server.
// e.g. They specified a from or to that was out of range
// If to is out of range it should just return less values

// TODO: Test all authentication

const getStageQuery = (req) => {
  let stageQuery = null;
  const { query } = req;
  if (query.fromStage || query.toStage) {
    stageQuery = {};
    if (query.fromStage) stageQuery.$gte = query.fromStage;
    if (query.toStage) stageQuery.$lte = query.toStage;
  }
  return stageQuery;
};

const getDateQuery = (req) => {
  let dateQuery = null;
  const { query } = req;
  if (query.fromDate || query.toDate) {
    dateQuery = {};
    if (query.fromDate) dateQuery.$gte = new Date(parseInt(query.fromDate, 10));
    if (query.toDate) dateQuery.$lte = new Date(parseInt(query.toDate, 10));
  }
  return dateQuery;
};

/**
 * Gets list of all orders.
 */
router.get('/', async (req, res) => {
  if (req.admin == null && req.customer == null) return res.sendStatus(401);
  const dateQuery = getDateQuery(req);
  const stageQuery = getStageQuery(req);
  const query = {};
  if (req.customer) query.customer = req.customer._id;
  if (dateQuery) query.orderCreated = dateQuery;
  if (stageQuery) query.stage = stageQuery;
  try {
    const orders = await Order.find(query, null, { sort: { orderCreated: -1 } })
      .populate('customer')
      .populate({
        path: 'items',
        populate: {
          path: 'item',
        },
      })
      .exec();
    const responseData = [];
    orders.forEach((order) => {
      const items = {};
      order.items.forEach((item) => {
        items[item.item.menuNumber] = item;
      });
      order = order.toObject();
      order.items = items;
      responseData.push(order)
    });

    return res.send(responseData);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// TODO: Allow admins to make orders for
// customers or without customers. Admins
// Should be able to specify a customer but not
// Customers. Their id should come from auth.

/**
 * Adds the specified order.
 */
router.post('/', async (req, res) => {
  try {
    const orderParams = req.body;
    const itemsToFind = Object.keys(orderParams.items);
    // TODO: Does what if it doesn't find all items
    const menuItems = await MenuItem.find({
      menuNumber: {
        $in: itemsToFind,
      },
      archived: false,
    }).exec();
    orderParams.items = await OrderItem.create(menuItems.map(m => ({ item: m, count: orderParams.items[m.menuNumber] })));
    const order = new Order(orderParams);
    const result = order.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/**
 * Deletes all orders.
 * Must be admin.
 */
router.delete('/', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    await Order.deleteMany(null);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Gets the specified order
 * Must be admin or customer that
 * made the order.
 */
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId });

    // If the user is an admin or the customer who has made the order
    if (
      res.admin
      || (req.customer
        && order.customer
        && order.customer._id.toString() === req.customer._id.toString())
    ) {
      return res.send(order);
    }
    return res.sendStatus(401);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.put('/:orderId', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);
  try {
    let order = await Order.findOne({ _id: req.params.orderId });
    order = Object.assign(order, req.body);
    order.save();
    return res.send(200, order);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
});

module.exports = router;
