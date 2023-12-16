const productModel = require('../model/product.model')

module.exports = {
	CheckProductExistById: async (pid) => {
		return await productModel.exists({ _id: pid }).lean()
	},

	findProductById: async (pid) => {
		return await productModel.findById(pid).lean()
	},

	findProductByQueries: async ({
		formattedQueryName,
		skip,
		limit,
		formattedQueryBarcode,
	}) => {
		return await productModel
			.find({
				$or: [formattedQueryName, formattedQueryBarcode],
			})
			.sort('-createdAt')
			.select(' -updatedAt -createdAt')
			.skip(skip)
			.limit(limit)
			.lean()
	},

	findAndCountProductByQueries: async (
		formattedQueryName,
		formattedQueryBarcode,
	) => {
		return await productModel
			.find({
				$or: [formattedQueryName, formattedQueryBarcode],
			})
			.countDocuments()
	},

	findProductBySlug: async (slug) => {
		return await productModel.findOne({ slug: slug }).lean()
	},

	createSingleProduct: async (payload) => {
		return await productModel.create(payload)
	},

	updateProductById: async (pid, body) => {
		return await productModel.findByIdAndUpdate(pid, body, { new: true })
	},

	removeProductById: async (pid) => {
		return await productModel.findByIdAndRemove(pid)
	},

	createListProduct: async (listProduct) => {
		return await productModel.insertMany(listProduct)
	},
}
