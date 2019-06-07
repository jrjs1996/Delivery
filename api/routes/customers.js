const express = require('express');

const router = express.Router();
const Customer = require('../models/Customer');

// TODO: List API points should have the ability to
// specify 'from' and 'to' in query strings.

// TODO: Check if the errors were from user specifiction
// or server.
// e.g. They specified a from or to that was out of range
// If to is out of range it should just return less values

/**
 * Retreives all customers.
 * Must be an admin.
 */
router.get('/', async (req, res) => {
  //if (req.admin == null) return res.sendStatus(401);

  try {
    const customers = await Customer.find(null);
    return res.send(customers);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Creates a new customer.
 */
router.post('/', async (req, res) => {
  if (!(req.body.firstName
    && req.body.lastName
    && req.body.address
    && req.body.email
    && req.body.password)) return res.sendStatus(400);

  try {
    const user = await Customer.create(req.body);
    const token = user.newToken();
    return res.status(201).send(token).end();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ email: 'Address is already in use!' }).end();
    }
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
  } catch(error) {
    return res.sendStatus(500);
  }
});

router.post('/signin/', async (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(400).send();

  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer) return res.status(401).send({ email: 'Email not found!' });

  const match = await customer.checkPassword(req.body.password);
  if (!match) return res.status(401).send({ password: 'Password wrong!'});

  const token = customer.newToken();
  return res.status(200).send(token);
});

router.get('/info/', async (req, res) => {
  return res.status(200).send(req.customer);
});

module.exports = router;
