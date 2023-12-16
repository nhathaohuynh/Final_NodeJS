const express = require('express')
const router = express.Router()
const CustomerController = require('../../controller/customer.controller')
const asyncHandler = require('express-async-handler')
const { verifyToken } = require('../middleware/verifyToken')

router.use(verifyToken)

router.get('/:cid', asyncHandler(CustomerController.getCustomerHandler))

router.post('/', asyncHandler(CustomerController.insertCustomerHandler))

router.post(
	'/by-phone',
	asyncHandler(CustomerController.getCustomerByPhoneHandler),
)

router.put('/:cid', asyncHandler(CustomerController.updateCustomerHandler))

module.exports = router
