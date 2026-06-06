const express = require('express');
const router = express.Router();
const { addRfq } = require('./addrfq.controller');
const { protect, authorize } = require('../../../shared/gateway/apiGateway.middleware');

// Route to add an RFQ.
// Protected to ensure user is logged in.
// Authorized to ensure only a 'PROCUREMENT' role can add an RFQ.
router.post('/add', protect, authorize('PROCUREMENT'), addRfq);

module.exports = router;
