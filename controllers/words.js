const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const { authorizeUser } = require('../helpers');
const Word = require('../models/Word');
const User = require('../models/User');

// Create word
router.post('/', authorizeUser, (req, res) => {
  // Add the current user's id as the user reference
  new Word({...req.body, value: req.body.value, user: req.current_user.id, approved: false})
    .save()
    .then(word => {
      // Send email saying you've successfully added the word
      // using Twilio SendGrid's v3 Node.js Library
      // https://github.com/sendgrid/sendgrid-nodejs
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // const msg = {
      //   to: 'alexisbratton@gmail.com',
      //   from: 'edgarsbarajas@me.com',
      //   subject: 'nomanches.io word confirmation',
      //   text: 'you\'ve submitted a word',
      //   html: '<strong>BABY CAKES</strong> i love you',
      // };
      // sgMail.send(msg);

      // Retun the newly added word
      return res.json(word);
    })
    .catch(error => res.status(400).json(error));
});

// Read words - 5 options
// Option 0: Return words that match what the user is typing in the search bar
router.get('/', (req, res) => {
  if(req.query.potential_search) {
    // Find the user document using the username parameter
    Word.find({ approved: true, value: new RegExp(req.query.potential_search, 'i') }, '-_id value')
      .limit(8)
      .then(words => {
        if(!words) return res.status(404).json({ Words: 'No words that match your term match.' });

        // remove any duplicates
        let uniqueWordsMap = {};
        let uniqueWords = [];
        for(let word of words) {
          if(!uniqueWordsMap[word.value]) {
            uniqueWordsMap[word.value] = word.value;
            uniqueWords.push(word.value);
          }
        }

        // sort unique words in alphatical/descending order
        uniqueWords = uniqueWords.sort();

        return res.json(uniqueWords);
      })
      .catch(error => res.status(400).json(error));
  }
})

// Option 1: return one word according to a an ID - used to edit the word (eventually to have a dynamic share page) /words/:id
// Currently not in use
router.get('/:id', (req, res) => {
  Word.findOne({ _id: req.params.id })
    .populate('user')
    .then(word => {
      if(!word) return res.status(404).json({ Word: 'Word not found.' });

      return res.json(word);
    })
    .catch(error => res.status(400).json(error));
});

// Option 2: return all words in pagination form (feed) words/feed/:page
router.get('/feed/:page', (req, res) => {
  console.log('reuqesting feed!');
  const wordsPerPage = 6;
  Word.find({approved: true})
    .lean()
    .populate('user', 'username')
    .populate('votes.up', 'user')
    .populate('votes.down', 'user')
    .skip((req.params.page - 1) * wordsPerPage)
    .limit(wordsPerPage)
    .sort({'createdAt': 'desc'})
    .then(async words => {
      console.log('respinse from server', words);
      // Get the total word count
      const totalWordCount = await Word.countDocuments({ approved: true });

      console.log('WORDS', words);

      return res.json({words, totalWordCount, lastPage: Math.ceil(totalWordCount / wordsPerPage)});
    })
    .catch(error => res.status(400).json(error));
});

// Option 3: return defintions for all words with the sane term /words/value/:value
router.get('/value/:value', (req, res) => {
  Word.find({ approved: true, value: req.params.value.toLowerCase() })
    .populate('user')
    .then(words => res.json(words))
    .catch(error => res.status(400).json(error));
});

// Option 3.5: return defintions for all words with the sane term /words/value/:value/page/:page
router.get('/value/:value/page/:page', (req, res) => {
  const wordsPerPage = 6;
  Word.find({ approved: true, value: req.params.value.toLowerCase() })
    .lean()
    .populate('user', 'username')
    .populate('votes.up', 'user')
    .populate('votes.down', 'user')
    .skip((req.params.page - 1) * wordsPerPage)
    .limit(wordsPerPage)
    .then(words => {
      const count = words.length;
      return res.json({ words, totalWordCount: count, lastPage: Math.ceil(count / wordsPerPage) })
    })
    .catch(error => res.status(400).json(error));
});

// Option 4: return all word by a specific user /words/user/:username
router.get('/user/:username/:page', (req, res) => {
  // Find the user document using the username parameter
  User.findOne({ username: req.params.username })
    .then(user => {
      if(!user) return res.status(404).json({ User: 'No user with that username found.' });

      // Find words with the user's id
      const wordsPerPage = 6;
      return Word.find({ user: user.id })
        .lean()
        .populate('user', 'username')
        .populate('votes.up', 'user')
        .populate('votes.down', 'user')
        .skip((req.params.page - 1) * wordsPerPage)
        .limit(wordsPerPage)
        .then(words => {
          return Word.countDocuments({ user: user.id })
            .then(count => {
              return res.json({ words, totalWordCount: count, lastPage: Math.ceil(count / wordsPerPage) })
            })
        })
    })
    .catch(error => res.status(400).json(error));
})

// Update word
router.put('/:id', authorizeUser, (req, res) => {
  Word.findOne({ _id: req.params.id })
    .then(word => {
      if(!word) return res.status(404).json({ Word: 'No word found.' });
      // Boot the user if they did not author the word
      if(word.user != req.current_user.id) return res.status(403).json({ Forbidden: 'You do not have access to update this word.' });

      return Word.updateOne(
        { _id: word.id },
        { '$set': {...req.body, updatedAt: new Date }, '$inc': { __v: 1 } },
        { runValidators: true, context: 'query' }
      )
        .then(confirmation => res.json({ Success: 'Word updated successfully.' }))
    })
    .catch(error => res.status(400).json(error));
});

// Delete word
router.delete('/:id', authorizeUser, (req, res) => {
  // Only allow to the user to delete the word if they defined the word
  Word.findOne({ _id: req.params.id })
    .then(word => {
      if(!word) return res.status(404).json({ Word: 'No word found.' });
      // Boot the user if they did not author the word
      if(word.user != req.current_user.id) return res.status(403).json({ Forbidden: 'You do not have access to delete this word.' });

      return Word.deleteOne({ _id: word.id })
        .then(confirmation => res.json({ Success: 'Word deleted successfully.' }))
    })
    .catch(error => res.status(400).json(error));
});

module.exports = router;
