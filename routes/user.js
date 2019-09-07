const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const { generateAuthToken, authorizeUser } = require('../helpers');

// Create user
router.post('/', (req, res) => {
  console.log('here 1!!!!!!!');
  // Attempt to save the user to the db
  const user = new User(req.body);
  const errors = user.validateSync();

  // if there are validation errors, return them
  if(errors) return res.status(400).json(errors);

  // hash password if all seems to be ok
  user.password = bcrypt.hashSync(user.password, 10);

  user.save()
    .then(user => generateAuthToken(req, res, user))
    .catch(error => res.status(400).json(error));
})

// Read user
router.get('/', authorizeUser, (req, res) => {
  // Return the user's details if
  User.findOne({ id: req.current_user.id })
    .then(user => {
      if(!user) return res.status(404).json({ user: 'No user found.'});

      // Only send what is neccessary to Update
      // Password is not being sent bc we need another way of changing password
      return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
      });
    })
    .catch(error => res.status(400).json(error));
});

// Update user
router.put('/', authorizeUser, (req, res) => {
  console.log('here 3!!!!!!!');
  // do not allow the user to update id or password
  const updates = req.body;
  delete req.body.id;
  delete req.body._id;
  delete req.body.password;

  User.updateOne(
    { id: req.current_user.id },
    { '$set': updates, '$inc': { __v: 1 } },
    { runValidators: true, context: 'query' }
  )
    .then(confirmation => res.json(confirmation))
    .catch(error => res.status(400).json(error));
});

// Delete user
router.delete('/', authorizeUser, (req, res) => {
  console.log('here 4!!!!!!!');

  User.deleteOne({ id: req.current_user.id })
    .then(deletedUser => res.json(deletedUser))
    .catch(error => res.status(400).json(error));
});

module.exports = router;
