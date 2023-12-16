'use strict'

const {
	insertOrderRepo,
	findOrderById,
	findByIdAndUpdateOrder,
	findByIdAndDeleteOrder,
} = require('../database/repository/order.repo')

const { BadRequest } = require('../utils/error.response')

class OrderService {
	async insertOrder(body) {
		const order = await insertOrderRepo(body)
		if (!order) throw new BadRequest('Something went wrong')

		return {
			order: order._id,
			sellerId: order.sellerId,
		}
	}

	async updateOrder(oid, body) {
		const order = await findOrderById(oid)
		if (!order) throw new BadRequest('Cannot update order not existing')

		const updatedOrder = await findByIdAndUpdateOrder(oid, body, {
			new: true,
		})
		return {
			order: updatedOrder._id,
			sellerId: updatedOrder.sellerId,
		}
	}

	async deleteOrder(cid) {
		const foundOrder = await findOrderById(cid)
		if (!foundOrder)
			throw new BadRequest('Cannot delete product category not existing')

		await findByIdAndDeleteOrder(cid)
		return {
			order: foundOrder._id,
		}
	}
}

module.exports = new OrderService()
