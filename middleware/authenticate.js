/** Authentication Middlewarte
 * @module middleware/authenticate
 * @requires models/user
 */

const User = require('../models/user');

/**
 * Authenticates a user and stops further routing if not authenticated
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
var authenticate = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return res.status(401).send({ error: 'Unauthorised' });
      }
      //attach the user and token to the request so that it can be
      //used inside of any future requests
      req.user = user;
      req.token = token;
      return next();
    })
    .catch(err => {
      res.status(401).send({ error: 'Unauthorised' });
    });
};

module.exports = authenticate;
