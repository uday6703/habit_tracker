const express = require('express');
const { body } = require('express-validator');
const { createChallenge, joinChallenge, getChallenges } = require('../controllers/challengeController');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getChallenges);
router.post('/', protect, [
  body('name').notEmpty(),
], validate, createChallenge);

router.post('/:id/join', protect, joinChallenge);

module.exports = router;
