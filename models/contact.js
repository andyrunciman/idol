/** Contact Model
 * @module models/contact
 * @requires mongoose
 * @requires validator
 * @exports Schema
 */

const mongoose = require('mongoose');
const validate = require('validator');

/**
 * Creates an new Model for the specified schema
 */
const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You must provide an email address!'],
    validate: {
      validator: validate.isEmail,
      message: 'Please enter a valid email address'
    }
  },
  name: {
    type: String,
    required: [true, 'You must include a name for the contact'],
    minlength: [1, 'Name must be between 1 and 40 characters'],
    maxlength: [40, 'Name must be between 1 and 40 characters']
  },
  address: {
    type: String,
    minlength: [1, 'Address must be between 1 and 40 characters'],
    maxlength: [40, 'Address must be between 1 and 40 characters']
  },
  postcode: {
    type: String,
    validate: {
      validator: val => validate.isPostalCode(val, 'GB'),
      message: 'Postcode must be a valid UK Postcode'
    }
  },
  phonenumber: {
    type: String,
    minlength: [6, 'Phone numbers must be between 6-12 digits long'],
    maxlength: [12, 'Phone numbers must be between 6-12 digits long'],
    validate: {
      validator: val => /^[0-9]*$/.test(val),
      message:
        'Phone numbers cannot contain spaces special characters e.g () or -'
    }
    //TODO add some sort of validation - maybe all numbers?? Min/Max
  },
  dob: {
    type: Date
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('contacts', ContactSchema);
