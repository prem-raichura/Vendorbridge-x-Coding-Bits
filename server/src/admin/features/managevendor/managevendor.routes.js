const express = require('express');
const {
  createVendor,
  deleteVendor
} = require('./managevendor.controller');

const router = express.Router();

router.post('/', createVendor);
router.delete('/:vendor_id', deleteVendor);

module.exports = router;
