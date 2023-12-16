const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const { verifyToken } = require('../middleware/verifyToken')
const OrderController = require('../../controller/order.controller')

router.post('/', verifyToken, asyncHandler(OrderController.insertOrderHandler))

router.put(
	'/:oid',
	verifyToken,
	asyncHandler(OrderController.updateOrderHandler),
)

router.delete(
	'/:oid',
	verifyToken,
	asyncHandler(OrderController.deleteOrderHandler),
)

module.exports = router
