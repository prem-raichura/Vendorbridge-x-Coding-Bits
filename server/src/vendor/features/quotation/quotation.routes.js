const express = require('express');
const router = express.Router();
const { getAssignedRfqs, getRfqById, submitQuotation } = require('./quotation.controller');
const { protect, authorize } = require('../../../shared/gateway/apiGateway.middleware');

// All routes protected and vendor-only
router.use(protect, authorize('vendor'));

router.get('/assigned-rfqs', getAssignedRfqs);
router.get('/rfq/:rfq_id', getRfqById);
router.post('/rfq/:rfq_id/quote', submitQuotation);

module.exports = router;
