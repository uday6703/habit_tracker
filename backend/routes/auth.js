const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', [
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], validate, register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], validate, login);

router.get('/me', protect, getMe);

module.exports = router;
