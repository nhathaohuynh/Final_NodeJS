'use strict'

const CustomerServices = require('../service/customer.services')
const { OkResponse, CreatedResponse } = require('../utils/success.response')

class CustomerController {
	async getCustomerHandler(req, res) {
		const cid = req.params.cid
		return new OkResponse({
			metaData: await CustomerServices.getCustomer(cid),
			message: 'OK',
		}).send(res)
	}

	async getCustomerByPhoneHandler(req, res) {
		const phone = req.body.phone
		return new OkResponse({
			metaData: await CustomerServices.getCustomerByPhone(phone),
			message: 'OK',
		}).send(res)
	}

	async insertCustomerHandler(req, res) {
		const body = req.body
		console.log(body)
		return new CreatedResponse({
			metaData: await CustomerServices.insertCustomer(body),
			message: 'OK',
		}).send(res)
	}

	async updateCustomerHandler(req, res) {
		const body = req.body
		const cid = req.params.cid
		return new OkResponse({
			metaData: await CustomerServices.updateCustomer(cid, body),
			message: 'OK',
		}).send(res)
	}
}

module.exports = new CustomerController()
