/** Serves the user routes
 * @module userRoutes
 * @requires models/user
 */

var User = require('../models/user');

module.exports = app => {
  // @route           POST api/user
  // @description     Creates a user and token
  // @access          public
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
