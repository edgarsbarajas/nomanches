const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: username => /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g.test(username),
      message: () => 'No special characters (ex. !@$*)'
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: () => 'Email is not valid'
    },
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

userSchema.plugin(uniqueValidator);

module.exports = new mongoose.model('User', userSchema);
