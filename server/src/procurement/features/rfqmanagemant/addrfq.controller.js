const prisma = require('../../../config/db');

// @desc    Add a new RFQ (Request for Quotation)
// @route   POST /api/procurement/rfq/add
// @access  Private (PROCUREMENT role)
const addRfq = async (req, res) => {
  try {
    // The user_id comes from the decoded JWT token set by the `protect` middleware
    const user_id = req.user.user_id || req.user.id;

    // Destructure fields from the request body based on the Prisma schema
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

    // Create the RFQ in the database
    const newRfq = await prisma.rfq.create({
      data: {
        user_id,
        rfq_title,
        rfq_category,
        rfq_deadline: new Date(rfq_deadline), // Ensure it's a valid DateTime
        rfq_description: rfq_description || null,
        attachment: attachment || null, // expects JSON
        items: items || null,           // expects JSON
        assign_vendors: assign_vendors || null, // expects JSON
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

module.exports = {
  addRfq
};
