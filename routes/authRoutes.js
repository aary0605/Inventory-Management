const express = require('express');

const router = express.Router();

const {
  home,
  loginPage,
  dashboard,
  signup,
  login
} = require('../contollers/authController');

const validate = require('../contollers/dashboardController');
router.get('/',home);
router.get('/login',loginPage);

router.get('/dashboard',dashboard);

router.post('/signup',signup);

router.post('/login',login);

module.exports = router;
