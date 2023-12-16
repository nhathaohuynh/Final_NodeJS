const express = require('express')
const router = express.Router()
const UserController = require('../../controller/user.controller')
const asyncHandler = require('express-async-handler')
const isAdmin = require('../middleware/isAdmin')
const { verifyToken } = require('../middleware/verifyToken')
const userController = require('../../controller/user.controller')
const uploadCloud = require('../../config/uploadCloud')

router.get('/:id', verifyToken, asyncHandler(UserController.getUser))

router.get('/', verifyToken, isAdmin, asyncHandler(UserController.getUsers))

router.post('/', asyncHandler(userController.createManyUser))

router.put(
	'/:id',
	verifyToken,
	isAdmin,
	uploadCloud.single('avatar'),
	asyncHandler(UserController.updateUser),
)

router.delete(
	'/:id',
	verifyToken,
	isAdmin,
	asyncHandler(UserController.removeUser),
)

router.post(
	'/toggle-lock',
	verifyToken,
	isAdmin,
	asyncHandler(UserController.toggleLockUser),
)

router.post(
	'/resend-email',
	verifyToken,
	isAdmin,
	asyncHandler(UserController.resendEmail),
)

module.exports = router
