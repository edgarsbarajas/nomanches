const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../helpers');
const Comment = require('../models/Comment');
const Word = require('../models/Word');

// Create Comment on Word
router.post('/:parent_id', authorizeUser, async (req, res) => {
  const {parentType} = req.body;

  new Promise((resolve, reject) => {
    switch (parentType) {
      case "Word":
        resolve(Word);
        break;
      case "Comment":
        resolve(Comment);
        break;
      default:
        reject('Invalid parentType property in the request body');
        break;
    }
  })
  .then(parentModel => {
    return parentModel.findById(req.params.parent_id)
  })
  .then(parent => {
    if(!parent) return res.status(404).json({error: `No ${parentType} document found`});

    return new Comment({
      user: req.current_user.id,
      value: req.body.value,
      parent: parent.id
    })
    .save()
    .then(comment => {
      parent.comments.push(comment.id);

      return parent.save();
    })
    .then(updatedParent => {
      return res.json(updatedParent);
    })
  })
  .catch(error => {
    return res.status(400).json({error});
  })


  // Comment.findById(req.params.word_id)
  //   .then(word => {
  //     if(!word) return res.status(404).json({ Word: 'No word found.'});

  //     // If the word exists, create the new comment
  //     return new Comment({
  //       user: req.current_user.id,
  //       value: req.body.value,
  //       parent: word.id
  //     })
  //     .save()
  //     .then(newComment => {
  //       return res.json(newComment);
  //     })
  //     .catch(error => {
  //       return res.status(400).json({error});
  //     })

  //   })
});

// Read Update

// Update Comment

// Delete Comment

module.exports = router;