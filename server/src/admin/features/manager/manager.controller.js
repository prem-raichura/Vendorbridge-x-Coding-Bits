const prisma = require('../../../config/db');
const bcrypt = require('bcryptjs');

const sanitizeUsername = (value) => String(value || '')
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '');

const buildUniqueUsername = async (baseUsername) => {
  let username = baseUsername;
  let usernameExists = await prisma.user.findUnique({
    where: { username }
  });

  while (usernameExists) {
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    username = `${baseUsername}${randomSuffix}`;
    usernameExists = await prisma.user.findUnique({
      where: { username }
    });
  }

  return username;
};

const normalizeJsonInput = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return value;
  }

  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      return value;
    }
  }

  return value;
};

const formatManager = (user) => ({
  user_id: user.user_id,
  first_name: user.first_name,
  last_name: user.last_name,
  phone_no: user.phone_no,
  country: user.country,
  avatar: user.avatar,
  email: user.email,
  bio: user.bio,
  created_at: user.created_at,
  last_login: user.last_login,
  role: user.role,
  username: user.username
});

// @desc    Create a manager
// @route   POST /api/admin/manager
// @access  Admin
const createManager = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_no,
      country,
      avatar,
      email,
      bio,
      password,
      username
    } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide first_name, last_name, email, and password'
      });
    }

    const emailExists = await prisma.user.findUnique({
      where: { email }
    });

    if (emailExists) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    const requestedUsername = sanitizeUsername(username || `${first_name}${last_name}`);
    if (!requestedUsername) {
      return res.status(400).json({ message: 'Please provide a valid username or name fields' });
    }

    const uniqueUsername = await buildUniqueUsername(requestedUsername);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const manager = await prisma.user.create({
      data: {
        first_name,
        last_name,
        phone_no,
        country,
        avatar: normalizeJsonInput(avatar),
        email,
        bio,
        password: hashedPassword,
        username: uniqueUsername,
        role: 'manager'
      }
    });

    return res.status(201).json({
      message: 'Manager created successfully',
      manager: formatManager(manager)
    });
  } catch (error) {
    console.error('Create manager error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a manager and dependent records
// @route   DELETE /api/admin/manager/:user_id
// @access  Admin
const deleteManager = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id, 10);

    if (Number.isNaN(userId)) {
      return res.status(400).json({ message: 'Please provide a valid user_id' });
    }

    const manager = await prisma.user.findUnique({
      where: { user_id: userId }
    });

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    if (manager.role !== 'manager') {
      return res.status(400).json({ message: 'The selected user is not a manager' });
    }

    const [rfqs, vendorDetails, directPurchaseOrders] = await Promise.all([
      prisma.rfq.findMany({
        where: { user_id: userId },
        select: { rfq_id: true }
      }),
      prisma.vendorDetails.findMany({
        where: { user_id: userId },
        select: { vendor_id: true }
      }),
      prisma.purchaseOrder.findMany({
        where: { user_id: userId },
        select: { po_id: true }
      })
    ]);

    const rfqIds = rfqs.map((rfq) => rfq.rfq_id);
    const vendorIds = vendorDetails.map((vendor) => vendor.vendor_id);
    const directPurchaseOrderIds = directPurchaseOrders.map((purchaseOrder) => purchaseOrder.po_id);

    const quotations = await prisma.quotation.findMany({
      where: {
        OR: [
          { rfq_id: { in: rfqIds } },
          { vendor_id: { in: vendorIds } }
        ]
      },
      select: { q_id: true }
    });

    const quotationIds = quotations.map((quotation) => quotation.q_id);

    const nestedPurchaseOrders = await prisma.purchaseOrder.findMany({
      where: {
        q_id: { in: quotationIds }
      },
      select: { po_id: true }
    });

    const purchaseOrderIds = [
      ...new Set([
        ...directPurchaseOrderIds,
        ...nestedPurchaseOrders.map((purchaseOrder) => purchaseOrder.po_id)
      ])
    ];

    await prisma.$transaction([
      prisma.invoice.deleteMany({
        where: {
          po_id: { in: purchaseOrderIds }
        }
      }),
      prisma.purchaseOrder.deleteMany({
        where: {
          OR: [
            { po_id: { in: purchaseOrderIds } },
            { q_id: { in: quotationIds } }
          ]
        }
      }),
      prisma.approval.deleteMany({
        where: {
          OR: [
            { user_id: userId },
            { q_id: { in: quotationIds } }
          ]
        }
      }),
      prisma.quotation.deleteMany({
        where: {
          q_id: { in: quotationIds }
        }
      }),
      prisma.rfq.deleteMany({
        where: {
          user_id: userId
        }
      }),
      prisma.vendorDetails.deleteMany({
        where: {
          user_id: userId
        }
      }),
      prisma.activity.deleteMany({
        where: {
          user_id: userId
        }
      }),
      prisma.user.delete({
        where: { user_id: userId }
      })
    ]);

    return res.json({
      message: 'Manager deleted successfully',
      user_id: userId
    });
  } catch (error) {
    console.error('Delete manager error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createManager,
  deleteManager
};
