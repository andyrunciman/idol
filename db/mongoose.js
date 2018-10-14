var mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);
/** Mongoose connection
 * @module db/mongoose.js
 */

module.exports = { mongoose };
