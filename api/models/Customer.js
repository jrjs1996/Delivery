const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  password: String,
});

CustomerSchema.methods.generateHash = password => bcrypt.hashSync(password,
  bcrypt.genSaltSync(8), null);

CustomerSchema.methods.validPassword = password => bcrypt.compareSync(password, this.password);


module.exports = mongoose.model('Customer', CustomerSchema);
