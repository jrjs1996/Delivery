const express = require('express');

const router = express.Router();
const Customer = require('../models/Customer');

// TODO: List API points should have the ability to
// specify 'from' and 'to' in query strings.

// TODO: Check if the errors were from user specifiction
// or server.
// e.g. They specified a from or to that was out of range
// If to is out of range it should just return less values

// TODO: Test all authentication

/**
 * Checks if the user is admin or the user is the customer
 * with the specified id.
 * @param {*} req The request to check.
 */
const adminOrSpecifiedCustomer = req => req.admin != null || (req.customer != null && req.customer.id === req.params.id);

/**
 * Retreives all customers.
 * Must be an admin.
 */
router.get('/', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    const customers = await Customer.find(null, null, { sort: { firstName: 1 } });
    console.log(customers)
    return res.send(customers);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Creates a new customer.
 */
router.post('/', async (req, res) => {
  if (
    !(
      req.body.firstName
      && req.body.lastName
      && req.body.addresses
      && req.body.email
      && req.body.password
    )
  ) return res.sendStatus(400);

  try {
    const user = await Customer.create(req.body);
    return res
      .status(201)
      .send(user)
      .end();
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send({ email: 'Address is already in use!' })
        .end();
    }
    console.log(error);
    return res.sendStatus(500);
  }
});

/**
 * Deletes all customers
 * Must be admin.
 */
router.delete('/', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    await Customer.deleteMany(null);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Gets the customer with the given id
 * Must be specified customer or admin
 */
router.get('/:id', async (req, res) => {
  if (!adminOrSpecifiedCustomer(req)) return res.sendStatus(401);

  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    return res.send(customer);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Updates the specified user
 * Must be specified customer or admin
 */
router.put('/:id', async (req, res) => {
  console.log(req.body);
  if (!adminOrSpecifiedCustomer(req)) return res.sendStatus(401);

  try {
    await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

/**
 * Deletes the specified customer
 * Muse be specified customer or admin
 */
router.delete('/:id', async (req, res) => {
  if (!adminOrSpecifiedCustomer(req)) return res.sendStatus(401);

  try {
    await Customer.findOneAndDelete({ _id: req.params.id });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Creates a JWT for the specified user
 * and returns it.
 */
router.post('/login/', async (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(400).send();

  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer) return res.status(401).send({ email: 'Email not found!' });

  const match = await customer.checkPassword(req.body.password);
  if (!match) return res.status(401).send({ password: 'Password wrong!' });

  const token = customer.newToken();
  return res.status(200).send(token);
});

module.exports = router;
