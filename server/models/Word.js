const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 120
  },
  definition: {
    type: String,
    minlength: 6,
    maxlength: 120
  },
  example: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 120
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  votes: {
    up: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Vote'
    }],
    down: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Vote'
    }]
  }
});

module.exports = mongoose.model('Word', wordSchema);
