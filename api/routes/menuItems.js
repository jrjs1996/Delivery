const express = require('express');
const multer = require('multer');

const router = express.Router();
const MenuItems = require('../models/MenuItem')
const getUpload = require('../bin/www');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    console.log(req.body.id);
    cb(null, req.body.id);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({ storage, fileFilter });
// TODO: List API points should have the ability to
// specify 'from' and 'to' in query strings.

// TODO: Check if the errors were from user specifiction
// or server.
// e.g. They specified a from or to that was out of range
// If to is out of range it should just return less values

// TODO: Test all authentication

/**
 * Gets list of all menu items.
 */
router.get('/', async (req, res) => {
  try {
    const items = await MenuItems.find({ archived: false }, null, { sort: { menuNumber: 1 } });
    return res.send(items);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


const findLowestAvailableMenuNum = async () => {
  const orderNums = await MenuItems.find({ archived: false },
    { menuNumber: 1 }, { sort: { menuNumber: 1 } }).exec();
  console.log(orderNums);
  // Give a number automatically
  for (let i = 0; i < orderNums.length - 1; i += 1) {
    if ((orderNums[i + 1].menuNumber - orderNums[i].menuNumber) > 1) {
      return orderNums[i].menuNumber + 1;
    }
  }
  if (orderNums.length === 0) return 1;
  return orderNums[orderNums.length - 1].menuNumber + 1;
};

/**
 * Adds the specified menuItem
 */
router.post('/', async (req, res) => {
  //if (req.admin == null) return res.sendStatus(401);

  const params = req.body;
  try {
    // If the specified menu item doesn't have a menu num
    // give it one
    if (!params.menuNumber) params.menuNumber = await findLowestAvailableMenuNum();

    const item = new MenuItems(params);
    const result = await item.save();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Deletes all menu items.
 * Must be admin.
 */
router.delete('/', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);

  try {
    await MenuItems.updateMany(null, { archived: true });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * Gets the specified menu item.
 */
router.get('/:itemId', async (req, res) => {
  try {
    const item = await MenuItems.findOne({ _id: req.params.itemId });
    console.log(item);
    return res.send(item);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.put('/:menuNumber', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);
  try {
    const oldItem = await MenuItems.findOneAndUpdate(
      { menuNumber: req.params.menuNumber, archived: false }, req.body,
    );
    let newItem = oldItem.toObject();
    oldItem.archived = true;
    await oldItem.save();
    newItem.revision += 1;
    newItem = Object.assign(newItem, req.body);
    delete newItem._id;
    newItem.archived = false;
    const resData = await MenuItems.create(newItem);
    return res.send(resData);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

/**
 * Deletes the specified menu item.
 * Must be admin.
 */
router.delete('/:menuNumber', async (req, res) => {
  if (req.admin == null) return res.sendStatus(401);
  try {
    await MenuItems.updateOne({
      archived: false,
      menuNumber: req.params.menuNumber,
    }, { archived: true });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.post('/image/', upload.single('image'), async (req, res) => {
  const item = await MenuItems.findOneAndUpdate(
    { archived: false, _id: req.body.id },
    { image: true },
  );
  item.image = true;
  return res.send(item);
});

module.exports = router;
