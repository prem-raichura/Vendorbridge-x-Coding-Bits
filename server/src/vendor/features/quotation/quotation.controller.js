const prisma = require('../../../config/db');

// @desc    Get all RFQs assigned to the logged-in vendor
// @route   GET /api/vendor/quotation/assigned-rfqs
// @access  Private (vendor)
const getAssignedRfqs = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.id;

    // First get the vendor_id from vendorDetails using user_id
    const vendorDetails = await prisma.vendorDetails.findUnique({
      where: { user_id: userId }
    });

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

// @desc    Get a single RFQ detail (for vendor view)
// @route   GET /api/vendor/quotation/rfq/:rfq_id
// @access  Private (vendor)
const getRfqById = async (req, res) => {
  try {
    const rfqId = parseInt(req.params.rfq_id, 10);
    if (Number.isNaN(rfqId)) {
      return res.status(400).json({ message: 'Invalid RFQ ID' });
    }

    const rfq = await prisma.rfq.findUnique({
      where: { rfq_id: rfqId },
      include: {
        user: {
          select: { first_name: true, last_name: true, email: true }
        }
      }
    });

    if (!rfq) {
      return res.status(404).json({ message: 'RFQ not found' });
    }

    res.json({ data: rfq });
  } catch (error) {
    console.error('Error fetching RFQ:', error);
    res.status(500).json({ message: 'Server error while fetching RFQ' });
  }
};

// @desc    Submit a quotation for an RFQ
// @route   POST /api/vendor/quotation/rfq/:rfq_id/quote
// @access  Private (vendor)
const submitQuotation = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.id;
    const rfqId = parseInt(req.params.rfq_id, 10);

    if (Number.isNaN(rfqId)) {
      return res.status(400).json({ message: 'Invalid RFQ ID' });
    }

    // Get vendor details to find vendor_id
    const vendorDetails = await prisma.vendorDetails.findUnique({
      where: { user_id: userId }
    });

    if (!vendorDetails) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    // Check RFQ exists
    const rfq = await prisma.rfq.findUnique({ where: { rfq_id: rfqId } });
    if (!rfq) {
      return res.status(404).json({ message: 'RFQ not found' });
    }

    const { total_amount, notes, items, delivery_days } = req.body;

    if (!total_amount) {
      return res.status(400).json({ message: 'Please provide total_amount' });
    }

    const quotation = await prisma.quotation.create({
      data: {
        rfq_id: rfqId,
        vendor_id: vendorDetails.vendor_id,
        total_amount: parseFloat(total_amount),
        notes: notes || null,
        items: items || null,
        delivery_days: delivery_days ? parseInt(delivery_days, 10) : null,
        status: 'pending'
      }
    });

    res.status(201).json({
      message: 'Quotation submitted successfully',
      quotation
    });
  } catch (error) {
    console.error('Error submitting quotation:', error);
    res.status(500).json({ message: 'Server error while submitting quotation' });
  }
};

module.exports = {
  getAssignedRfqs,
  getRfqById,
  submitQuotation
};
