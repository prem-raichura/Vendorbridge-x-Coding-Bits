const jwt = require('jsonwebtoken');

const generateToken = (userPayload) => {
  return jwt.sign(userPayload, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
