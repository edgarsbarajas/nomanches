const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../helpers');
const Comment = require('../models/Comment');
const { update } = require('../models/Word');
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
      parent.commentCount = parent.commentCount + 1;

      return parent.save()
        .then(() => {
          return res.json(comment);
        })
    })
  })
  .catch(error => {
    return res.status(400).json({error});
  })
});

// Read Comment
// Option 1 - all comments for a Word 6 at a time
router.get('/parent/:parent_id/page/:page', (req, res) => {
  const commentsPerPage = 6;
  Comment.find({parent: req.params.parent_id})
    .lean()
    .populate('user', 'username')
    .skip((req.params.page - 1) * commentsPerPage)
    .limit(commentsPerPage)
    .then(async (comments) => {
        const count = await Comment.countDocuments({ parent: req.params.parent_id });
        
        return res.json({ comments, lastPage: Math.ceil(count / commentsPerPage) });
      })
    .catch(error => res.status(400).json(error));
});

// Update Comment

// Delete Comment

module.exports = router;