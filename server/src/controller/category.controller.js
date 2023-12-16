'use strict'

const CategoryServices = require('../service/category.services')
const { OkResponse, CreatedResponse } = require('../utils/success.response')

class ProductCategoryController {
	async getCategoryHandler(req, res) {
		const cid = req.params.cid
		return new OkResponse({
			metaData: await CategoryServices.getCategory(cid),
			message: 'OK',
		}).send(res)
	}
	async getCategoriesHandler(req, res) {
		return new OkResponse({
			metaData: await CategoryServices.getCategories(),
			message: 'OK',
		}).send(res)
	}

	async createCategoryHandler(req, res) {
		const body = req.body
		console.log(body)
		return new CreatedResponse({
			metaData: await CategoryServices.createCategory(body),
			message: 'OK',
		}).send(res)
	}

	async updateCategoryHandler(req, res) {
		const body = req.body
		const cid = req.params.cid
		return new OkResponse({
			metaData: await CategoryServices.updateCategory(cid, body),
			message: 'OK',
		}).send(res)
	}

	async deleteCategoryHandler(req, res) {
		const cid = req.params.cid
		return new OkResponse({
			metaData: await CategoryServices.deleteCategory(cid),
			message: 'OK',
		}).send(res)
	}
}

module.exports = new ProductCategoryController()
