const prisma = require('../../../config/db');
const bcrypt = require('bcryptjs');

const sanitizeUsername = (value) => String(value || '')
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '');

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

const formatVendor = (user, vendorDetails) => ({
  user_id: user.user_id,
  vendor_id: vendorDetails.vendor_id,
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
  username: user.username,
  organisation_name: vendorDetails.organisation_name,
  gst_id: vendorDetails.gst_id,
  address: vendorDetails.address,
  status: vendorDetails.status
});

// @desc    Create a vendor
// @route   POST /api/admin/vendor
// @access  Admin
const createVendor = async (req, res) => {
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
      username,
      organisation_name,
      gst_id,
      address,
      status
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !organisation_name
    ) {
      return res.status(400).json({
        message: 'Please provide first_name, last_name, email, password, and organisation_name'
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

    const user = await prisma.user.create({
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
        role: 'vendor'
      }
    });

    const vendorDetails = await prisma.vendorDetails.create({
      data: {
        user_id: user.user_id,
        organisation_name,
        gst_id,
        address,
        status
      }
    });

    return res.status(201).json({
      message: 'Vendor created successfully',
      vendor: formatVendor(user, vendorDetails)
    });
  } catch (error) {
    console.error('Create vendor error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a vendor and dependent records
// @route   DELETE /api/admin/vendor/:vendor_id
// @access  Admin
const deleteVendor = async (req, res) => {
  try {
    const vendorId = parseInt(req.params.vendor_id, 10);

    if (Number.isNaN(vendorId)) {
      return res.status(400).json({ message: 'Please provide a valid vendor_id' });
    }

    const vendorDetails = await prisma.vendorDetails.findUnique({
      where: { vendor_id: vendorId }
    });

    if (!vendorDetails) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const user = await prisma.user.findUnique({
      where: { user_id: vendorDetails.user_id }
    });

    if (!user) {
      return res.status(404).json({ message: 'Linked user not found' });
    }

    if (user.role !== 'vendor') {
      return res.status(400).json({ message: 'The selected user is not a vendor' });
    }

    const quotations = await prisma.quotation.findMany({
      where: { vendor_id: vendorId },
      select: { q_id: true }
    });

    const quotationIds = quotations.map((quotation) => quotation.q_id);

    const purchaseOrders = await prisma.purchaseOrder.findMany({
      where: {
        q_id: { in: quotationIds }
      },
      select: { po_id: true }
    });

    const purchaseOrderIds = purchaseOrders.map((purchaseOrder) => purchaseOrder.po_id);

    await prisma.$transaction([
      prisma.invoice.deleteMany({
        where: {
          po_id: { in: purchaseOrderIds }
        }
      }),
      prisma.purchaseOrder.deleteMany({
        where: {
          q_id: { in: quotationIds }
        }
      }),
      prisma.approval.deleteMany({
        where: {
          q_id: { in: quotationIds }
        }
      }),
      prisma.quotation.deleteMany({
        where: {
          vendor_id: vendorId
        }
      }),
      prisma.vendorDetails.delete({
        where: { vendor_id: vendorId }
      }),
      prisma.activity.deleteMany({
        where: {
          user_id: user.user_id
        }
      }),
      prisma.user.delete({
        where: { user_id: user.user_id }
      })
    ]);

    return res.json({
      message: 'Vendor deleted successfully',
      vendor_id: vendorId,
      user_id: user.user_id
    });
  } catch (error) {
    console.error('Delete vendor error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createVendor,
  deleteVendor
};
