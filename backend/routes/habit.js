const express = require('express');
const { body } = require('express-validator');
const { createHabit, getHabits, getHabit, updateHabit, deleteHabit } = require('../controllers/habitController');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getHabits);
router.post('/', protect, [
  body('title').notEmpty(),
  body('category').notEmpty(),
  body('frequency').isIn(['daily', 'weekly', 'monthly']),
  body('priority').isIn(['low', 'medium', 'high']),
], validate, createHabit);

router.get('/:id', protect, getHabit);
router.put('/:id', protect, validate, updateHabit);
router.delete('/:id', protect, deleteHabit);

module.exports = router;
