const prisma = require('../../../config/db');

// @desc    Get all RFQs assigned to the logged-in vendor
// @route   GET /api/vendor/quotation/assigned-rfqs
// @access  Private (VENDOR)
const getAssignedRfqs = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.id;

    // Prisma supports querying inside JSON. 
    // `array_contains` checks if the JSON array contains the given value.
    const rfqs = await prisma.rfq.findMany({
      where: {
        assign_vendors: {
          array_contains: userId
        }
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      message: 'Assigned RFQs retrieved successfully',
      count: rfqs.length,
      data: rfqs
    });
  } catch (error) {
    console.error('Error fetching assigned RFQs:', error);
    res.status(500).json({ message: 'Server error while fetching RFQs' });
  }
};

module.exports = {
  getAssignedRfqs
};
