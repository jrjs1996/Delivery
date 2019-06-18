/* eslint-disable no-console */
const Admin = require('../models/Admin');
const connectDb = require('../models/index');

const username = process.argv[2];
const password = process.argv[3];

try {
  connectDb().then(async () => {
    const admin = await Admin.create({ username, password });
    const token = admin.newToken();
    console.log('token: ', token);
  });
} catch (error) {
  console.log(error);
}
