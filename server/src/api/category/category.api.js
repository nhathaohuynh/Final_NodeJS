const express = require('express')
const router = express.Router()
const CategoryController = require('../../controller/category.controller')
const asyncHandler = require('express-async-handler')
const isAdmin = require('../middleware/isAdmin')
const { verifyToken } = require('../middleware/verifyToken')

router.use(verifyToken, isAdmin)

router.get('/:cid', asyncHandler(CategoryController.getCategoryHandler))

router.get('/', asyncHandler(CategoryController.getCategoriesHandler))

router.post('/', asyncHandler(CategoryController.createCategoryHandler))

router.put('/:cid', asyncHandler(CategoryController.updateCategoryHandler))

router.delete('/:cid', asyncHandler(CategoryController.deleteCategoryHandler))

module.exports = router
