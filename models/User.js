const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required']
  },
  lastName: {
    type: String,
    required: [true, 'last name is required']
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: [true, 'username is taken'],
    validate: {
      validator: username => /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g.test(username),
      message: () => 'no special characters allowed (ex. !@$*)'
    }
  },
  email: {
    type: String,
    required: [true, 'e-mail is required'],
    validate: {
      validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: () => 'Email is not valid'
    },
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'password must be at least 6 characters']
  }
});

userSchema.plugin(uniqueValidator);

module.exports = new mongoose.model('User', userSchema);
