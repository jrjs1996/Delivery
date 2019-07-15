const express = require('express');

const router = express.Router();
const Admin = require('../models/Admin');

// TODO: List API points should have the ability to
// specify 'from' and 'to' in query strings.

// TODO: Check if the errors were from user specifiction
// or server.
// e.g. They specified a from or to that was out of range
// If to is out of range it should just return less values

// TODO: Test all authentication

/**
 * Retreives all admins.
 * Must be an admin.
 */
router.get('/', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    const admins = await Admin.find(null);
    return res.send(admins);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

/**
 * Creates a new Admin.
 * Must be an admin.
 */
router.post('/', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  if (!(req.body.username && req.body.password)) return res.sendStatus(400);

  try {
    const admin = await Admin.create(req.body);
    const token = admin.newToken();
    return res
      .status(201)
      .send(admin)
      .end();
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send({ username: 'Address is already in use!' })
        .end();
    }
    return res.sendStatus(500);
  }
});

/**
 * Deletes all admins
 * Must be admin.
 */
router.delete('/', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    await Admin.deleteMany(null);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Returns the logged in admins info.
 */
router.get('/login/', (req, res) => {
  if (req.admin == null) return res.sendStatus(401);
  return res.send(req.admin);
});

/**
 * Creates a JWT for the specified admin
 * and returns it.
 */
router.post('/login/', async (req, res) => {
  if (!req.body.username || !req.body.password) return res.status(400).send();

  const admin = await Admin.findOne({ username: req.body.username });

  if (!admin) return res.status(401).send({ username: 'Username not found!' });

  const match = await admin.checkPassword(req.body.password);
  if (!match) return res.status(401).send({ password: 'Password wrong!' });

  const token = admin.newToken();
  return res.status(200).send(token);
});

/**
 * Gets the admin with the given id
 * Must be admin
 */
router.get('/:id', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    const admin = await Admin.findOne({ _id: req.params.id });
    return res.send(admin);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Updates the specified user
 * Must be admin
 */
router.put('/:id', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);
  try {
    if (req.body.password === '') delete req.body.password;
    const newAdmin = await Admin.findOne({ _id: req.params.id });
    Object.assign(newAdmin, req.body);
    newAdmin.save();
    delete newAdmin.password;
    delete newAdmin.__v;
    return res.send(newAdmin);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

/**
 * Deletes the specified admin
 * Muse be admin
 */
router.delete('/:id', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    await Admin.findOneAndDelete({ _id: req.params.id });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
