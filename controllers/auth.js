const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { generateAuthToken } = require('../helpers');

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      // check if a user if found
      if(!user) {
        return res.status(404).json({ login: 'Username or password is incorrect' });
      }

      // check if the password entered is correct
      if(!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json({ login: 'Username or password is incorrect' });
      }

      // if all passes, generate a token for the user
      return generateAuthToken(req, res, {
        id: user.id,
        username: user.username
      });
    })
    .catch(error => res.status(400).json(error));
});

module.exports = router;
