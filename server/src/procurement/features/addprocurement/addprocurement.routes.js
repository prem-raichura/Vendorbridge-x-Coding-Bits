const express = require('express');
const router = express.Router();
const { addProcurementUser } = require('./addprocurement.controller');
const { protect, authorize } = require('../../../shared/gateway/apiGateway.middleware');

// Route to add a procurement user. 
// Uses the protect middleware to ensure the user is logged in,
// and authorize('ADMIN') to ensure only an admin can create procurement users.
// (Adjust the authorize roles if another role should be able to create them)
router.post('/add', protect, authorize('ADMIN'), addProcurementUser);

module.exports = router;
