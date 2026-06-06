const prisma = require('../../config/db');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: 'Please provide first_name, last_name, email, and password' });
    }

    // Check if email exists
    const emailExists = await prisma.user.findUnique({
      where: { email }
    });

    if (emailExists) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    let baseUsername = `${first_name.toLowerCase()}${last_name.toLowerCase()}`.replace(/[^a-z0-9]/g, '');
    let username = baseUsername;

    // Check if username exists and add random 2 digits if it does
    let usernameExists = await prisma.user.findUnique({
      where: { username }
    });

    while (usernameExists) {
      const randomSuffix = Math.floor(10 + Math.random() * 90); // 10 to 99
      username = `${baseUsername}${randomSuffix}`;
      usernameExists = await prisma.user.findUnique({
        where: { username }
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name
      }
    });

    if (user) {
      res.status(201).json({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        token: generateToken(user.user_id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

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

      res.json({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        token: generateToken(user.user_id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
