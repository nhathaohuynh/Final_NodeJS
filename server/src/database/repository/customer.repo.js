const { APP_SECRET } = require('../../config')
const customerModel = require('../model/customer.model')
const bcrypt = require('bcrypt')
const salt = 10

module.exports = {
	findCustomerById: async (cid) => {
		return await customerModel.findById(cid).lean()
	},

	findCustomerByPhone: async (phone) => {
		return await customerModel.findOne({ phone }).populate('invoices')
	},

	createCustomer: async (body) => {
		return await customerModel.create(body)
	},

	findByIdAndUpdateCustomer: async (cid, body, options) => {
		return await customerModel.findByIdAndUpdate(cid, body, options)
	},
}
