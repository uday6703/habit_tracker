const express = require('express');
const { body } = require('express-validator');
const { checkIn, getLogs } = require('../controllers/habitLogController');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/checkin', protect, [
  body('habitId').notEmpty(),
  body('date').isISO8601(),
], validate, checkIn);

router.get('/:habitId', protect, getLogs);

module.exports = router;
