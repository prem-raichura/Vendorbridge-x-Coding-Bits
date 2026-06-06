const express = require('express');
const router = express.Router();
const { addProcurementUser } = require('./addprocurement.controller');
const { protect, authorize } = require('../../../shared/gateway/apiGateway.middleware');

// Route to add a procurement user. 
// Uses the protect middleware to ensure the user is logged in,
// and authorize to ensure only admin or manager can create procurement officers.
router.post('/add', protect, authorize('admin', 'manager'), addProcurementUser);

module.exports = router;
