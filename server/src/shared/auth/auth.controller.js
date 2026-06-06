const prisma = require('../../config/db');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');


// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Check for user by username
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      // Update last_login
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { last_login: new Date() }
      });

      const userPayload = {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      };

      res.json({
        ...userPayload,
        token: generateToken(userPayload)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error'.error });
  }
};

module.exports = {
  loginUser
};
