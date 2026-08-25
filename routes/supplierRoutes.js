const app = require('express');
const router = app.Router();

const {supplier,supplierHistory} = require('../contollers/supplierController');


router.get('/supplier/history', supplierHistory);

router.post('/supplier/add',supplier);
module.exports = router;