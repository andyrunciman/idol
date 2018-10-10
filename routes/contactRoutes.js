var { mongoose } = require('../db/mongoose');
var Contact = require('../models/contact');
var User = require('../models/user');

//export a function will will takes app from express.
module.exports = app => {
  app.get('/api/contacts', (req, res) => {
    console.log(req);
    res.status(200).send();
  });
  app.post('/api/contact', (req, res) => {
    //strip the request body
    //validate and create user
    //strip other fields via destructuring
    console.log(req.body);
    const { email, surname } = req.body;
    const contact = new Contact({ email, surname });
    contact
      .save()
      .then(user => {
        //TODO: do not post back entire user
        res.status(200).send(user);
      })
      .catch(err => {
        //TODO: clean and send back appropriate validaiton
        res.status(400).send(err);
      });
  });
  app.get('/api/contact/:id', (req, res) => {
    res.status(200).send();
  });
  app.delete('/api/contact/:id', (req, res) => {
    res.status(200).send();
  });
  app.patch('/api/contact/:id', (req, res) => {
    res.status(200).send();
  });
};
