const prisma = require('../../../config/db');

// @desc    Add a new RFQ (Request for Quotation)
// @route   POST /api/procurement/rfq/add
// @access  Private (procurement role)
const addRfq = async (req, res) => {
  try {
    const user_id = req.user.user_id || req.user.id;

    const { 
      rfq_title, 
      rfq_category, 
      rfq_deadline, 
      rfq_description, 
      attachment, 
      items, 
      assign_vendors, 
      rfq_status 
    } = req.body;

    if (!rfq_title || !rfq_category || !rfq_deadline) {
      return res.status(400).json({ message: 'Please provide rfq_title, rfq_category, and rfq_deadline' });
    }

    const newRfq = await prisma.rfq.create({
      data: {
        user_id,
        rfq_title,
        rfq_category,
        rfq_deadline: new Date(rfq_deadline),
        rfq_description: rfq_description || null,
        attachment: attachment || null,
        items: items || null,
        assign_vendors: assign_vendors || null,
        rfq_status: rfq_status || 'PENDING',
        flag: false
      }
    });

    res.status(201).json({
      message: 'RFQ created successfully',
      rfq: newRfq
    });
  } catch (error) {
    console.error('Error creating RFQ:', error);
    res.status(500).json({ message: 'Server error while creating RFQ' });
  }
};

// @desc    Get all RFQs created by the logged-in procurement officer
// @route   GET /api/procurement/rfq/
// @access  Private (procurement role)
const getRfqs = async (req, res) => {
  try {
    const user_id = req.user.user_id || req.user.id;

    const rfqs = await prisma.rfq.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' }
    });

    res.json({
      message: 'RFQs retrieved successfully',
      count: rfqs.length,
      data: rfqs
    });
  } catch (error) {
    console.error('Error fetching RFQs:', error);
    res.status(500).json({ message: 'Server error while fetching RFQs' });
  }
};

// @desc    Get a single RFQ by ID
// @route   GET /api/procurement/rfq/:rfq_id
// @access  Private (procurement role)
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

module.exports = {
  addRfq,
  getRfqs,
  getRfqById
};
