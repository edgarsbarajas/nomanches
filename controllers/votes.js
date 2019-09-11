const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../helpers');
const Vote = require('../models/Vote');
const Word = require('../models/Word');

// Create vote
router.post('/word/:word_id', authorizeUser, (req, res) => {
  // A user can vote on any word, including their own
  // Find Word document using the req param
  Word.findOne({ _id: req.params.word_id })
    .then(word => {
      if(!word) return res.status(404).json({ Word: 'No word found.'});

      // Now that we have a word doc, create a new Vote doc
      return new Vote({...req.body, word: word.id, user: req.current_user.id })
        .save()
        .then(vote => {
          // push the new vote to the Word doc's votes array depending on its 'upvote' property
          if(vote.upvote) {
            word.votes.up.push(vote);
          } else {
            word.votes.down.push(vote);
          }

          // save the Word doc
          return word.save()
            .then(word => res.json(word))
        })
    })
    .catch(error => res.status(400).json(error));
});

// Read vote

// Update vote
router.put('/:id', authorizeUser, (req, res) => {
  Vote.findOne({ _id: req.params.id })
    .then(vote => {
      if(!vote) return res.status(404).json({ Vote: 'No vote found.' });
      // Boot the user if they did not create this vote
      if(vote.user != req.current_user.id) return res.status(403).json({ Forbidden: 'You do not have access to update this vote.' });

      // Update the Vote document to true or false
      return Vote.findOneAndUpdate(
        { _id: vote.id },
        { '$set': { upvote: !vote.upvote }, '$inc': { __v: 1 } },
        { runValidators: true, context: 'query' }
      )
        .then(unmodifiedVote => {
          // Now that we have the updated vote,
          // we have to update the Word doc so the reference is in the right category (up vs down )
          // Find the word doc first
          return Word.findOne({ _id: unmodifiedVote.word })
            .then(word => {
              if(!word) return res.status(404).json({ Word: 'No word found.' });
              
              // Where do we want to pull from and push to? Whatever the unmodified vote upvote vslue is
              if(unmodifiedVote.upvote) {
                word.votes.up.pull(unmodifiedVote.id);
                word.votes.down.push(unmodifiedVote.id);
              } else {
                word.votes.down.pull(unmodifiedVote.id);
                word.votes.up.push(unmodifiedVote.id);
              }

              // Save the Word doc
              return word.save()
                .then(word => res.json(word))
            })
        })
    })
    .catch(error => res.status(400).json(error));
});

// Delete vote
router.delete('/:id', authorizeUser, (req, res) => {
  Vote.findOneAndRemove({ _id: req.params.id })
    .then(deletedVote => {
      // One we delete the word, delete it's reference from the words array
      // Find the word document
      return Word.findOne({ _id: deletedVote.word })
        .then(word => {
          if(!word) return res.status(404).json({ Word: 'No word found.'});

          // Remove from the up or down array depending on the deleted vote's upvote value
          if(deletedVote.upvote) {
            word.votes.up.pull(deletedVote.id);
          } else {
            word.votes.down.pull(deletedVote.id);
          }

          // save the Word doc
          return word.save()
            .then(word => res.json(word))
        })
    })
    .catch(error => res.status(400).json({ Vote: 'Error removing vote.' }));
});

module.exports = router;
