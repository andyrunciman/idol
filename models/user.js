const mongoose = require('mongoose');
//TODO - Add validator

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//Note - do not change to arrow as the this context will be bound to the wrong context!!
UserSchema.methods.toJSON = function() {
  const user = this;
  const { _id, username } = user.toObject();
  //destructure the user object so that we dont send back the token/password
  return { _id, username };
};

//Utility helper TODO: - Move this outside

module.exports = mongoose.model('users', UserSchema);
