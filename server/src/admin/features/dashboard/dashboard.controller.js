const prisma = require('../../../config/db');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Admin
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalManagers,
      totalVendors,
      totalProcurement,
      totalRfqs,
      pendingVendors
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'manager' } }),
      prisma.vendorDetails.count(),
      prisma.user.count({ where: { role: 'procurement' } }),
      prisma.rfq.count(),
      prisma.vendorDetails.count({ where: { valid_status: false, status: 'inactive' } })
    ]);

    res.json({
      message: 'Dashboard stats retrieved successfully',
      data: {
        totalManagers,
        totalVendors,
        totalProcurement,
        totalRfqs,
        pendingVendors
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardStats };
