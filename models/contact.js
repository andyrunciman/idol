const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  forename: {
    type: String
  }
});

module.exports = mongoose.model('contacts', ContactSchema);
