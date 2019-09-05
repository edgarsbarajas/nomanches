const jwt = require('jsonwebtoken');

const generateAuthToken = (req, res, payload) => {
  jwt.sign(
    { payload },
    process.env['JWT_SECRET'],
    { expiresIn: '1h' },
    (error, token) => {
      if(error) return res.status(400).json(error);
      return res.json({token});
  });
};

module.exports = { generateAuthToken };
