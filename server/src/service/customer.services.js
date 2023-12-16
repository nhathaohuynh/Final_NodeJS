'use strict'

const {
	findCustomerByPhone,
	findCustomerById,
	findByIdAndUpdateCustomer,
	createCustomer,
} = require('../database/repository/customer.repo')
const { BadRequest } = require('../utils/error.response')

class CustomerServices {
	async getCustomer(cid) {
		const customer = await findCustomerById(cid)
		if (!customer) throw new BadRequest('Something went wrong')
		return {
			customer,
		}
	}

	async insertCustomer(body) {
		const foundCategory = await findCustomerByPhone(body?.phone)

		if (foundCategory) throw new BadRequest('Something went wrong')
		const customer = await createCustomer(body)

		return {
			customer,
		}
	}

	async updateCustomer(cid, body) {
		const customer = await findCustomerById(cid)
		if (!customer)
			throw new BadRequest('Cannot update infomation customer not existing')

		const updatedCustomer = await findByIdAndUpdateCustomer(cid, body, {
			new: true,
		})
		return {
			customer: updatedCustomer,
		}
	}

	async getCustomerByPhone(phone) {
		const customer = await findCustomerByPhone(phone)
		if (!customer) throw new BadRequest('Something went wrong')

		return {
			customer: customer,
		}
	}
}

module.exports = new CustomerServices()
