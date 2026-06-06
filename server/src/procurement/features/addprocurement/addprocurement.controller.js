const prisma = require('../../../config/db');
const bcrypt = require('bcryptjs');

// @desc    Add a procurement user
// @route   POST /api/procurement/add
// @access  Private
const addProcurementUser = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name, phone_no, country, bio } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    // Check if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (userExists) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create procurement user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        phone_no,
        country,
        bio,
        role: 'PROCUREMENT' // Setting the role automatically
      }
    });

    res.status(201).json({
      message: 'Procurement user created successfully',
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error adding procurement user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addProcurementUser
};
