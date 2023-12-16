const { faker } = require('@faker-js/faker')
const { BadRequest } = require('../utils/error.response')
const slugify = require('slugify')
const { LIMIT_USER } = require('../config')

const {
	CheckProductExistById,
	removeProductById,
	findProductById,
	findProductByQueries,
	findAndCountProductByQueries,
	findProductBySlug,
	updateProductById,
	createSingleProduct,
	createListProduct,
} = require('../database/repository/product.repo')
const { findAllOrderRepo } = require('../database/repository/order.repo')
class ProductService {
	async getProduct(productId) {
		const productExist = await CheckProductExistById(productId)

		if (!productExist) throw new BadRequest('Something went wrong')

		const product = await findProductById(productId)

		return {
			product,
		}
	}

	async getProducts(queries) {
		const formattedQueryName = {}

		const formattedQueryBarcode = {}

		// TODO: filtering
		if (queries?.search) {
			formattedQueryName.name = {
				$regex: queries.search,
				$options: 'i',
			}
			formattedQueryBarcode.barcode = {
				$regex: queries.search,
				$options: 'i',
			}
		}

		const page = +queries?.page || 1
		const limit = +queries?.limit || LIMIT_USER
		const skip = (page - 1) * limit

		const product = await findProductByQueries({
			limit,
			skip,
			formattedQueryName,
			formattedQueryBarcode,
		})
		const countProduct = await findAndCountProductByQueries(
			formattedQueryName,
			formattedQueryBarcode,
		)

		return {
			data: {
				counts: countProduct,
				product,
			},
		}
	}

	async createProduct(payload) {
		const slug = slugify(payload?.name, {
			replacement: '-',
			lower: true,
		})
		const foundProduct = await findProductBySlug(slug)

		if (foundProduct) throw new BadRequest('Product already exist')
		const body = {
			name: payload.name,
			slug,
			barcode: crypto.randomUUID(),
			retailPrice: payload.retailPrice,
			importPrice: payload.importPrice,
			thumnail: payload.thumnail,
			category: payload.category,
			description: faker.commerce.productDescription(),
			investory: payload.investory,
		}
		const product = await createSingleProduct(body)

		return {
			product,
		}
	}

	async updateProduct(productId, body) {
		const productExist = await CheckProductExistById(productId)

		if (!productExist) throw new BadRequest('Something went wrong')

		const data = {
			...body,
			slug: slugify(body?.name, {
				replacement: '-',
				lower: true,
			}),
		}

		const product = await updateProductById(productId, data)
		return { product }
	}

	async removeProduct(productId) {
		const productExist = CheckProductExistById(productId)

		if (!productExist) throw new BadRequest('Something went wrong')
		const orders = await findAllOrderRepo()

		let isProductExistOrder = false

		orders.forEach((order) => {
			order?.items.forEach((item) => {
				if (item?.productId.toString() === productId) {
					isProductExistOrder = true
					return
				}
			})
		})

		if (isProductExistOrder)
			throw new BadRequest('Product is existing in an order')

		await removeProductById(productId)
		return {
			product: productId,
		}
	}

	async createManyProduct() {
		const products = []

		for (let i = 0; i <= 100; i++) {
			const name = faker.commerce.productName()
			const slug = slugify(name, {
				replacement: '-',
				lower: true,
			})
			const retailPrice = faker.commerce.price({ min: 5000, max: 50000 })

			products.push({
				name,
				slug,
				barcode: crypto.randomUUID(),
				retailPrice,
				importPrice: retailPrice - 2000,
				thumnail: this.generateCustomEcommerceImageURL(),
				category: faker.commerce.product(),
				description: faker.commerce.productDescription(),
				investory: faker.number.int({ min: 100, max: 1000 }),
			})
		}
		await createListProduct(products)
		return {}
	}

	generateCustomEcommerceImageURL(
		width = 400,
		height = 300,
		category = 'SmartPhone',
	) {
		return faker.image.url(width, height, category, true)
	}
}

module.exports = new ProductService()
