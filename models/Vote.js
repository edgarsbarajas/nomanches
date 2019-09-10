const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  upvote: {
    type: Boolean,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  word: {
    type: mongoose.Schema.ObjectId,
    ref: 'Word',
    required: true
  }
});

module.exports = mongoose.model('Vote', voteSchema);
