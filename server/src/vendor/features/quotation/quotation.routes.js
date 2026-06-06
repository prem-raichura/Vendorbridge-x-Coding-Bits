const express = require('express');
const router = express.Router();
const { getAssignedRfqs } = require('./quotation.controller');
const { protect, authorize } = require('../../../shared/gateway/apiGateway.middleware');

// Protect route and authorize VENDOR roles
// (Update role string here to match exactly what you store in the DB for vendors, e.g., 'VENDOR' or 'vendor')
router.get('/assigned-rfqs', protect, authorize('VENDOR', 'vendor'), getAssignedRfqs);

module.exports = router;
