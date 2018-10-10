var mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true //Stops the depreciation warning....
  }
);
module.exports = { mongoose };
