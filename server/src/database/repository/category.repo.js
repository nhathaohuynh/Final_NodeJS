const categoryModel = require('../model/category.model')

module.exports = {
	findAllCategories: async () => {
		return await categoryModel.find({}).sort('-createdAt').lean()
	},

	findCategoryById: async (cid) => {
		return await categoryModel.findById(cid)
	},

	findCategoryByName: async (name) => {
		return await categoryModel.findOne({ name: name }).lean()
	},

	createCategoryRepo: async (body) => {
		return await categoryModel.create(body)
	},

	findAndUpdateCategory: async (cid, payload, options) => {
		return await categoryModel.findByIdAndUpdate(cid, payload, options)
	},

	findAndDeleteCategory: async (cid) => {
		return await categoryModel.findByIdAndRemove(cid)
	},
}
