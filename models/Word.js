const mongoose = require('mongoose');

let wordValue;

const wordSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, 'word is required'],
    minlength: [2, 'word must be at least 2 characters'],
    maxlength: [120, 'word can not be over 120 characters'],
    validate: {
      validator: (value) => {wordValue = value},
      message: ''
    }
  },
  definition: {
    type: String,
    required: [true, 'definition is required'],
    minlength: [6, 'definition must be at least 6 characters'],
    maxlength: [120, 'definition can not be over 120 characters']
  },
  example: {
    type: String,
    required: [true, 'example is required'],
    minlength: [6, 'example must be at least 6 characters'],
    maxlength: [120, 'example can not be over 120 characters'],
    validate: {
      validator: (example) => example.includes(wordValue),
      message: () => `Your example must include the word you are defining: ${wordValue}`
    }
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
  },
  commentCount: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date
  },
  approved: {
    type: Boolean,
    required: false // No default value because when updating, the default value is readded
  }
});

module.exports = mongoose.model('Word', wordSchema);
