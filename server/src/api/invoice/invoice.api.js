const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const { verifyToken } = require('../middleware/verifyToken')
const InvoiceController = require('../../controller/invoice.controller')
const isAdmin = require('../middleware/isAdmin')

router.post(
	'/',
	verifyToken,
	asyncHandler(InvoiceController.insertInvoiceHandler),
)

router.post(
	'/analytics',
	verifyToken,
	isAdmin,
	asyncHandler(InvoiceController.analyticsInvoiceHandler),
)

router.get(
	'/:id',
	verifyToken,
	asyncHandler(InvoiceController.getInvoiceHandler),
)

router.get(
	'/',
	verifyToken,
	asyncHandler(InvoiceController.getListInvoicesHandler),
)

module.exports = router
