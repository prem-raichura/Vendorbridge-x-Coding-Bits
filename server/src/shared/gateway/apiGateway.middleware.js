const jwt = require('jsonwebtoken');
const prisma = require('../../config/db');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

      // Set user directly from the token payload (no db query needed)
      req.user = decoded;

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    // Convert roles to lowercase for case-insensitive comparison
    const lowerCaseRoles = roles.map(role => role.toLowerCase());
    const userRole = req.user && req.user.role ? req.user.role.toLowerCase() : '';

    if (!req.user || !lowerCaseRoles.includes(userRole)) {
      return res.status(403).json({ 
        message: `User role '${req.user ? req.user.role : 'Unknown'}' is not authorized to access this route` 
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
