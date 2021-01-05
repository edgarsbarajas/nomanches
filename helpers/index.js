const jwt = require('jsonwebtoken');

const generateAuthToken = (req, res, payload) => {
  jwt.sign(
    { payload },
    process.env['JWT_SECRET'],
    { expiresIn: '1d' },
    (error, token) => {
      if(error) return res.status(400).json(error);
      return res.json({...payload, token});
  });
};

const authorizeUser = (req, res, next) => {
  if(req.headers['authorization']) {
    // Remove 'Bearer' from the token value
    let token = req.headers['authorization'].split(' ');
    token = token[token.length - 1];

    // check to see if the token is valid
    jwt.verify(token, process.env['JWT_SECRET'], (error, decoded) => {
      const {id, username} = decoded.payload;

      if(error) return res.status(403).json({ token: 'token is broken' });

      // if it is, attach the decoded to the req
      req.current_user = {id, username};
      next();
    });
  } else {
    return res.status(404).json({ token: 'No valid auth token available.' })
  }
}

module.exports = { generateAuthToken, authorizeUser };
