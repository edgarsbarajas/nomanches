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

const authorizeUser = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];

  // if there is a token available on the headers
  if(token) {
    // check to see if its validate
    jwt.verify(token, process.env['JWT_SECRET'], (error, decoded) => {
      if(error) return res.status(403).json(error);

      // if it is, attach the decoded to the req
      req.current_user = decoded.payload;
      next();
    });
  } else {
    // return error if there is no token available
    return res.status(400).json({ error: 'No token provided.' })
  }
}

module.exports = { generateAuthToken, authorizeUser };
