/** Contact Router
 * @module routes/contactRoutes
 * @requires mongoose
 * @requires models/contact
 * @requires models/user
 */

var Contact = require('../models/contact');

const { ObjectID } = require('mongodb');

//Authentication middleware
const authenticate = require('../middleware/authenticate');

module.exports = app => {
  app.get('/api/contacts', authenticate, (req, res) => {
    const user = req.user;
    Contact.find({ _creator: user._id })
      .then(contacts => {
        res.status(200).send(contacts);
      })
      .catch(err => {
        res.status(500).send({ error: 'something went wrong' });
      });
  });

  /**
   * @route           GET api/contact
   * @description     Gets a list of contacts for the given user
   * @access          private
   */
  app.post('/api/contact', authenticate, (req, res) => {
    const user = req.user;
    //no need to clean req.body as schema will strip
    //even if the user passes in their own _creator - it will be overwritten
    const contact = new Contact({ ...req.body, _creator: user._id });
    contact
      .save()
      .then(contact => {
        res.status(200).send(contact);
      })
      .catch(err => {
        const errors = {};
        for (key of Object.keys(err.errors)) {
          errors[key] = err.errors[key].message;
        }

        res.status(400).send({ errors });
      });
  });

  /**
   * Finds a contact for the given ID
   * @route           GET api/contact/:id
   * @param           {String} id
   * @description     finds a contact with a specified id
   * @access          private
   * @returns         Contact or Null
   */
  app.get('/api/contact/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const user = req.user;
    //TODO: check contact belongs to authenticated user.
    if (!ObjectID.isValid(id))
      return res.status(400).send({ error: 'Invalid id' });

    Contact.findOne({ _id: id, _creator: user._id })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({ error: 'Contact could not be found' });
        }
        res.status(200).send(contact);
      })
      .catch(err => {
        res.status(404).send({ error: 'Contact could not be found' });
      });
  });

  /**
   * Deletes a contact for the given ID
   * @route           DELETE api/contact/:id
   * @param           {String} id
   * @description     Deletes a contact with a specified id
   * @access          private
   * @returns         Deleted Contact or Null
   */
  app.delete('/api/contact/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const user = req.user;
    if (!ObjectID.isValid(id)) {
      return res.status(400).send({ error: 'Invalid ID' });
    }
    //Note:Dont use findOne as it doesnt return the deleted record.
    Contact.findOneAndDelete({ _id: id, _creator: user._id })
      .then(contact => {
        if (!contact) {
          return res.status(400).send({ error: 'Contact cannot be deleted' });
        }
        res.status(200).send(contact);
      })
      .catch(err => {
        res.send.status(400).send({ error: 'Contact cannot be deleted' });
      });
  });

  /**
   * Updates a contact for the given ID
   * @route           PATCH api/contact/:id
   * @param           {String} id
   * @description     Updates a contact with a specified id
   * @access          private
   * @returns         Updated Contact or null
   */
  app.patch('/api/contact/:id', authenticate, (req, res) => {
    const user = req.user;
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(400).send({ error: 'Invalid ID' });
    }

    Contact.findOneAndUpdate(
      { _id: id, _creator: user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then(contact => {
        if (!contact) {
          return res.status(400).send({ error: 'Contact can not be updated' });
        }
        return res.status(200).send(contact);
      })
      .catch(err => {
        const errors = {};
        for (key of Object.keys(err.errors)) {
          errors[key] = err.errors[key].message;
        }
        res.status(400).send({ errors });
      });
  });
};
