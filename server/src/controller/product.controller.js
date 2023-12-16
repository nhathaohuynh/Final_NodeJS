const ProductServices = require('../service/product.services')
const { OkResponse, CreatedResponse } = require('../utils/success.response')

class ProductController {
	async getProduct(req, res) {
		const pid = req.params.pid
		return new OkResponse({
			metaData: await ProductServices.getProduct(pid),
		}).send(res)
	}

	async getProducts(req, res) {
		return new OkResponse({
			metaData: await ProductServices.getProducts(req.query),
		}).send(res)
	}

	async createProduct(req, res) {
		const urlThumb = req.file.path
		const body = {
			thumnail: urlThumb,
			...req.body,
		}
		return new CreatedResponse({
			metaData: await ProductServices.createProduct(body),
		}).send(res)
	}

	async updateProduct(req, res) {
		const pid = req.params.pid
		const urlThumb = req.file?.path
		console.log(req.body)
		const body = {
			thumnail: urlThumb,
			...req.body,
		}
		return new OkResponse({
			metaData: await ProductServices.updateProduct(pid, body),
		}).send(res)
	}

	async removeProduct(req, res) {
		const pid = req.params.pid
		return new OkResponse({
			metaData: await ProductServices.removeProduct(pid),
		}).send(res)
	}

	async createManyProduct(req, res) {
		return new OkResponse({
			metaData: await ProductServices.createManyProduct(),
		}).send(res)
	}
}

module.exports = new ProductController()
