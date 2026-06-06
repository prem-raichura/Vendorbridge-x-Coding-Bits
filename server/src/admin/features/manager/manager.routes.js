const express = require('express');
const {
  createManager,
  deleteManager
} = require('./manager.controller');

const router = express.Router();

router.post('/', createManager);
router.delete('/:user_id', deleteManager);

module.exports = router;
