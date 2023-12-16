const express = require('express')
const router = express.Router()
const ProductController = require('../../controller/product.controller')
const asyncHandler = require('express-async-handler')
const { verifyToken } = require('../middleware/verifyToken')
const isAdmin = require('../middleware/isAdmin')
const uploadCloud = require('../../config/uploadCloud')

router.get('/:pid', verifyToken, asyncHandler(ProductController.getProduct))

router.get('/', verifyToken, asyncHandler(ProductController.getProducts))

router.post(
	'/',
	verifyToken,
	isAdmin,
	uploadCloud.single('thumnail'),
	asyncHandler(ProductController.createProduct),
)

router.post('/products', asyncHandler(ProductController.createManyProduct))

router.put(
	'/:pid',
	verifyToken,
	isAdmin,
	uploadCloud.single('thumnail'),
	asyncHandler(ProductController.updateProduct),
)

router.delete(
	'/:pid',
	verifyToken,
	isAdmin,
	asyncHandler(ProductController.removeProduct),
)

module.exports = router
