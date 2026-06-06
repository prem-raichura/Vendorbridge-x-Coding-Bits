const express = require('express');
const {
  createManager,
  deleteManager,
  getManagers,
  getProcurementOfficers
} = require('./manager.controller');
const {
  protect,
  authorize
} = require('../../../shared/gateway/apiGateway.middleware');

const router = express.Router();

// Admin-only routes (create/delete managers)
router.get('/', protect, authorize('admin'), getManagers);
router.post('/', protect, authorize('admin'), createManager);
router.delete('/:user_id', protect, authorize('admin'), deleteManager);

// Manager + Admin can list procurement officers
router.get('/procurement-officers', protect, authorize('admin', 'manager'), getProcurementOfficers);

module.exports = router;
