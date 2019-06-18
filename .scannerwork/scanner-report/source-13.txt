const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

const { Schema } = mongoose;

function AbstractUserSchema(rest) {
  Schema.apply(this, rest);

  this.add({
    password: {
      type: String,
      required: true,
    },
  });

  /**
   * Whenenver a customer is saved and the password
   * has been modified. Save the password as a hash.
   */
  this.pre('save', function(next) {
    if (this.password && !this.isModified('password')) return next();
    console.log(this)
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      return next();
    });
  });

  this.methods.checkPassword = function(password) {
    const passwordHash = this.password; 
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) return reject(err);
        return resolve(same);
      });
    });
  };
  this.methods.newToken = function() {
    return jwt.sign({ _id: this._id }, 'secret', {
      expiresIn: '3h',
    });
  };
}
util.inherits(AbstractUserSchema, Schema);

module.exports = AbstractUserSchema;
