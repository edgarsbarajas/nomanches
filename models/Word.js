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
  }
});

module.exports = mongoose.model('Word', wordSchema);
