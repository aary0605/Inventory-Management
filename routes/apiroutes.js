const express = require('express');

const router = express.Router();

const {validation,orderHistory,getStock} = require('../contollers/dashboardController');

router.get('/api/dashboard',validation);
router.get('/api/orders',orderHistory);
router.get('/api/lowStock',getStock);


module.exports = router;