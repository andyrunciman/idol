var { mongoose } = require('../db/mongoose'); //our instance of mongoose.
var { User } = require('../models/user');

module.exports = app => {
  app.get('/api/auth', (req, res) => {
    res.send(200);
  });
};
