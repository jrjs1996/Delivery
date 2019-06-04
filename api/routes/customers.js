const express = require('express');

const router = express.Router();
const Customer = require('../models/Customer');

router.get('/', (req, res) => {
  Customer.find(null, (err, people) => {
    if (err) res.send(err);
    else res.send(people);
  });
});

router.post('/', (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastname: req.body.lastname,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
  });

  // Make sure everything is good here

  customer.save(((err, doc) => {
    if (err) return res.stauts(500).send(err);
    return res.send({
      success: true,
      message: 'User Created',
    });
  }));
});

module.exports = router;
