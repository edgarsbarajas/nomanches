const express = require('express');const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const { generateAuthToken, authorizeUser } = require('../helpers');

router.get('/', (req, res) => {
  return res.json({ users: [] });
})

// Create a new user
router.post('/', (req, res) => {
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

// Edit user details
router.put('/', authorizeUser, (req, res) => {
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

router.delete('/', authorizeUser, (req, res) => {
  User.deleteOne({ id: req.current_user.id })
    .then(deletedUser => res.json(deletedUser))
    .catch(error => res.status(400).json(error));
});

module.exports = router;
