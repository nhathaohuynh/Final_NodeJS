const express = require('express')
const router = express.Router()

router.use('/access', require('./access/access.api'))
router.use('/user', require('./user/user.api'))
router.use('/category', require('./category/category.api'))
router.use('/product', require('./product/product.api'))
router.use('/order', require('./order/order.api'))
router.use('/customer', require('./customer/customer.api'))
router.use('/invoice', require('./invoice/invoice.api'))
module.exports = router
