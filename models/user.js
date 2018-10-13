/** User Model
 * @module models/user
 * @requires mongoose
 * @requires config/keys
 * @requires jwt
 * @requires validator
 * @requires bcryptjs
 */
const mongoose = require('mongoose');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
    validation: {
      validiator: validator.isEmail,
      message: 'Email address must be valid'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: [6, 'Password should be a minimum of 6 characters']
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

/**
 * Converts an user instance to a JSON object
 */
UserSchema.methods.toJSON = function() {
  //Note - do not change to arrow as the this context will be bound to the wrong context!!
  const user = this;
  const { _id, username } = user.toObject();
  //destructure the user object so that we dont send back the token/password
  return { _id, username };
};

/**
 * Generates an auth token for a given instance of a user.
 * @returns token
 */
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign(
    { _id: this._id.toHexString(), access },
    keys.jwtSecret
  );
  user.tokens.push({ token, access });
  return user.save().then(() => {
    return token;
  });
};

/**
 * Removes a token with a given id
 * @param {String} token
 */
UserSchema.methods.removeToken = function(token) {
  const user = this;
  return user.updateOne({ $pull: { tokens: { token } } });
};

/**
 * Retrieves a user object for a given JSON token
 * @param {String} token
 * @returns user
 */
UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, keys.jwtSecret);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

/**
 * Checks that a user is valid based on email and password
 * @param {String} token
 * @returns user
 */
UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

/**
 * Hashes a password when a user instance is saved
 */
UserSchema.pre('save', function(next) {
  //This is called on every save (even after an update which will contain a hashed version of the password!) - if we simply hash the
  //password each time - we wish hash the current hash.

  //interesting - if we return next() rather than use the IF..ESLE
  //the record isnt saved??
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    //returns true if modified
    next();
  }
});

//TODO: Make sure if we update - we dont allow the email to be updated
//without again checking for duplicates!!

module.exports = mongoose.model('users', UserSchema);
