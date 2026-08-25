const express = require('express');

const router = express.Router();

const {dashboard,inventory,supplier} = require('../contollers/pageControllers');
const validate = require('../contollers/dashboardController')



router.get('/inventory',inventory);

router.get('/suppliers',supplier);

module.exports =router;