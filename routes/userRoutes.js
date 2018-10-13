/** Serves the user routes
 * @module userRoutes
 * @requires models/user
 */

var User = require('../models/user');
var authenticate = require('../middleware/authenticate');

module.exports = app => {
  /**
   * Login a user
   * @route           POST api/login
   * @access          public
   * @param {String} email
   * @param {string} password
   */
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(401).send({ error: 'Invalid login' });
        }
        return user.findByCredentials(email, password);
      })
      .then(user => user.generateAuthToken())
      .then(token => res.header('x-auth', token).send(user))
      .catch(err => {
        res.status(401).send({ error: 'Invalid login' });
      });
  });

  /**
   * Logout a user and revoke token
   * @route           GET api/login
   * @access          private
   */
  app.get('/api/logout', authenticate, (req, res) => {
    //cant call logout unless authenticated
    const user = req.user;
    const token = req.token;
    user
      .removeToken(token)
      .then(() => {
        //remove header??
        res.status(200).send({ message: 'logout success' });
      })
      .catch(err => {
        res.status(400).send({ message: 'logout unsuccessful' });
      });
  });

  /**
   * Create a new user
   * @route           POST api/user
   * @access          public
   * @param {String} email
   * @param {string} password
   */
  app.post('/api/user', (req, res) => {
    var { email = null, password = null } = req.body;
    var user = new User({ email, password });
    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        return res.header('x-auth', token).send(user);
      })
      .catch(err => {
        console.log(err);
        //TODO - switch statement handle all erorrs
        if (err.code === 11000 || err.code === 11001) {
          //ERR CODES 11000 and 11001 are Mongoose duplicate codes.
          return res
            .status(400)
            .send({ error: 'This email address is already taken' });
        } else {
          return res
            .status(400)
            .send({ error: 'Your account cannot be created at this time' });
        }
      });
  });
};
