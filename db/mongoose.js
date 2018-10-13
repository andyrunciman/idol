var mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);
/*
* Mongoose connection
* @module db/mongoose.js
* @decription sets the inital connection string. Note UseCreateIndex has been specified due to depreciation of old index.
*/
module.exports = { mongoose };
