const app = require('express');

const router = app.Router();
const {dataHandling,productsHistory,filterByCategory,filterByPrice,deleteProducts,productId} = require('../contollers/inventoryControllers')

// router.patch('/inventory/edit',)

router.get('/inventory/history',productsHistory)
router.get('/inventory/category',filterByCategory);
router.get('/inventory/price',filterByPrice);
router.delete('/inventory/delete',deleteProducts);
router.get('/inventory/product/data',productId)

router.post('/inventory/product',dataHandling);

module.exports = router;