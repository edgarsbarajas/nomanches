const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  upvote: {
    type: Boolean,
    required: true,
    select: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  word: {
    type: mongoose.Schema.ObjectId,
    ref: 'Word',
    required: true,
    select: false
  }
});

module.exports = mongoose.model('Vote', voteSchema);
