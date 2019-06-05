const express = require('express');

const router = express.Router();
const Customer = require('../models/Customer');
const protect = require('../middleware/protect');

router.get('/', (req, res) => {
  Customer.find(null, (err, people) => {
    if (err) res.send(err);
    else res.send(people);
  });
});

router.post('/', async (req, res) => {
  console.log(req.body)
  if (!(req.body.firstName
    && req.body.lastName
    && req.body.address
    && req.body.email
    && req.body.password)) return res.sendStatus(400);
  console.log('here');
  try {
    const user = await Customer.create(req.body);
    const token = user.newToken();
    console.log('token', token)
    return res.status(200).send(token).end();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ email: 'Address is already in use!' }).end();
    }
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

router.get('/info/', protect, async (req, res) => {
  return res.status(200).send(req.customer);
});

module.exports = router;
