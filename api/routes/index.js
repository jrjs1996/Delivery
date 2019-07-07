const express = require('express');

const router = express.Router();
const customersRouter = require('./customers');
const adminsRouter = require('./admins');
const ordersRouter = require('./orders');
const menuItemsRouter = require('./menuItems');

router.use('/admins', adminsRouter);
router.use('/customers', customersRouter);
router.use('/orders', ordersRouter);
router.use('/menuitems', menuItemsRouter);
module.exports = router;
