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
  if(req.headers['authorization']) {
    // Remove 'Bearer' from the token value
    const token = req.headers['authorization'].split(' ')[1];

    // check to see if the token is valid
    jwt.verify(token, process.env['JWT_SECRET'], (error, decoded) => {
      if(error) return res.status(403).json(error);

      // if it is, attach the decoded to the req
      req.current_user = { id: decoded.payload };
      next();
    });
  } else {
    return res.status(404).json({ token: 'No valid auth token available.' })
  }
}

module.exports = { generateAuthToken, authorizeUser };
