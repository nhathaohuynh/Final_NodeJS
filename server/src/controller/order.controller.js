'use strict'

const OrderServices = require('../service/order.services')
const { OkResponse, CreatedResponse } = require('../utils/success.response')

class OrderController {
	async insertOrderHandler(req, res) {
		const body = req.body
		return new CreatedResponse({
			metaData: await OrderServices.insertOrder(body),
			message: 'OK',
		}).send(res)
	}

	async updateOrderHandler(req, res) {
		const body = req.body
		const oid = req.params.oid
		return new OkResponse({
			metaData: await OrderServices.updateOrder(oid, body),
			message: 'OK',
		}).send(res)
	}

	async deleteOrderHandler(req, res) {
		const oid = req.params.oid
		return new OkResponse({
			metaData: await OrderServices.deleteOrder(oid),
			message: 'OK',
		}).send(res)
	}
}

module.exports = new OrderController()
