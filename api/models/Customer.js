const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Whenenver a customer is saved and the password
 * has been modified. Save the password as a hash.
 */
CustomerSchema.pre('save', function(next) {

  if (this.password && !this.isModified('password')) return next();
  console.log(this)
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

CustomerSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) return reject(err);
      return resolve(same);
    });
  });
};

CustomerSchema.methods.newToken = function() {
  return jwt.sign({ _id: this._id }, 'secret', {
    expiresIn: '3h',
  });
};

module.exports = mongoose.model('Customer', CustomerSchema);
