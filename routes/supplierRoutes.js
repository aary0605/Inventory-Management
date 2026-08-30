const app = require('express');
const router = app.Router();

const {supplier,supplierHistory,editSupplier, supplierDelete} = require('../contollers/supplierController');


router.get('/supplier/history', supplierHistory);
router.delete('/supplier/delete',supplierDelete);
router.patch('supplier/data',editSupplier);

router.post('/supplier/add',supplier);
module.exports = router;