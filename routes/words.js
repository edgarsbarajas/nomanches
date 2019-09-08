const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../helpers');
const Word = require('../models/Word');
const User = require('../models/User');

// Create word
router.post('/', authorizeUser, (req, res) => {
  // Find the current user's document so we can push to their words array
  User.findOne({ id: req.current_user.id })
    .then(user => {
      // return an error if there is no user found
      if(!user) return res.status(404).json({ user: 'No user found.' });

      // Now that we have the user, create a new Word document
      return new Word(req.body)
        .save()
        .then(word => {
          // Add the new word document to the user's words array
          user.words.push(word.id);

          // resave the user to store the word within the user's words array
          return user.save()
            .then(user => res.json(word)) // return the new word for now, possibly respond with the user's updated word collection
        })
    })
    .catch(error => res.status(400).json(error));
});

// Read word - not sure what to do here
  // Option 1: return one word according to a an ID
  // Option 2: return all words in pagination form (feed)
  // Option 3: return defintiions for all words with the sane term

// Update word
router.put('/:word_id', (req, res) => {
  // only allow to the user to edit the word if they defined the word
});

// Delete word

module.exports = router;
