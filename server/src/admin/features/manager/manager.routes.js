const express = require('express');
const {
  createManager,
  deleteManager
} = require('./manager.controller');
const {
  protect,
  authorize
} = require('../../../shared/gateway/apiGateway.middleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.post('/', createManager);
router.delete('/:user_id', deleteManager);

module.exports = router;
