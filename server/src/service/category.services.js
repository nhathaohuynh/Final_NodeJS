'use strict'

const { faker } = require('@faker-js/faker')
const {
	findAllCategories,
	findAndUpdateCategory,
	findAndDeleteCategory,
	findCategoryByName,
	createCategoryRepo,
	findCategoryById,
} = require('../database/repository/category.repo')
const { BadRequest } = require('../utils/error.response')

class ProductCategoryService {
	async getCategories() {
		const categories = await findAllCategories()
		return {
			category: categories,
		}
	}

	async getCategory(cid) {
		const category = await findCategoryById(cid)
		if (!category) throw new BadRequest('Something went wrong')
		return {
			category,
		}
	}

	async createCategory({ name, description }) {
		const foundCategory = await findCategoryByName(name)

		if (foundCategory) throw new BadRequest('Something went wrong')
		const category = await createCategoryRepo({
			name,
			description,
			image: faker.image.url(400, 200, 'technics', true),
		})

		return {
			category,
		}
	}

	async updateCategory(cid, body) {
		const category = await findCategoryById(cid)
		if (!category)
			throw new BadRequest('Cannot update product category not existing')

		const updatedCategory = await findAndUpdateCategory(cid, body, {
			new: true,
		})
		return {
			category: updatedCategory,
		}
	}

	async deleteCategory(cid) {
		const foundCategory = await findCategoryById(cid)
		if (!foundCategory)
			throw new BadRequest('Cannot delete product category not existing')

		await findAndDeleteCategory(cid)
		return {
			category: foundCategory._id,
		}
	}
}

module.exports = new ProductCategoryService()
