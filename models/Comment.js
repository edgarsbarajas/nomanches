const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, 'comment value is required'],
    minlength: [1, 'word must be at least 1 character'],
    maxlength: [160, 'word can not be over 120 characters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Word',
    required: true
  },
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  }],
  createdAt: {
    type: Date,
    required: true,
    default: new Date
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date
  }
});

module.exports = mongoose.model('Comment', commentSchema);
