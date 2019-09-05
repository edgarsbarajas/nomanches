const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const { generateAuthToken } = require('../helpers');

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

module.exports = router;
