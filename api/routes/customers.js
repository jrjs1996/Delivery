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
  });
  customer.save(((err, doc) => {
    if (err) res.send(err);
    else res.send(doc);
  }));
});

module.exports = router;
