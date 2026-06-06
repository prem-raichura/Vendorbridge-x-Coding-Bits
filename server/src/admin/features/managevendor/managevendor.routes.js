const express = require('express');
const {
  createVendor,
  deleteVendor,
  approveVendor,
  rejectVendor
} = require('./managevendor.controller');

const router = express.Router();

router.post('/', createVendor);
router.delete('/:vendor_id', deleteVendor);
router.patch('/:vendor_id/approve', approveVendor);
router.patch('/:vendor_id/reject', rejectVendor);

module.exports = router;
