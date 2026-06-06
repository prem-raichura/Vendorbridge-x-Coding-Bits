const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('./dashboard.controller');
const { protect, authorize } = require('../../../shared/gateway/apiGateway.middleware');

router.get('/', protect, authorize('admin'), getDashboardStats);

module.exports = router;
