const express = require('express');
const router = express.Router();
const { addRfq, getRfqs, getRfqById } = require('./addrfq.controller');
const { protect, authorize } = require('../../../shared/gateway/apiGateway.middleware');

// All routes require authentication and procurement role
router.use(protect, authorize('procurement'));

router.get('/', getRfqs);
router.get('/:rfq_id', getRfqById);
router.post('/add', addRfq);

module.exports = router;
