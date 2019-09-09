const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    select: false
  },
  lastName: {
    type: String,
    required: true,
    select: false
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
    unique: true,
    select: false
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  }
});

userSchema.plugin(uniqueValidator);

module.exports = new mongoose.model('User', userSchema);
