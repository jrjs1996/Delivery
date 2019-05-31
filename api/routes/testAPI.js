const express = require('express');

const router = express.Router();
const Customer = require('../models/Customer');

router.get('/', (req, res) => {
  Customer.findOne(null, (err, person) => {
    if (err) res.send(err);
    else res.send(person);
  });
});

router.post('/', (req, res) => {
  const customer = new Customer({ firstName: 'James', lastname: 'Scarrow', address: '1234 Rat St.' });
  customer.save(((err, doc, rows) => {
    if (err) res.send(err);
    else res.send(`Rows affected: ${rows}`);
  }));
});

module.exports = router;
