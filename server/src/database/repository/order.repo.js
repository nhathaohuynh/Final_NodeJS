const orderModel = require('../model/order.model')
module.exports = {
	insertOrderRepo: async (body) => {
		return await orderModel.create(body)
	},
	findOrderById: async (cid) => {
		return await orderModel.findById(cid)
	},

	findByIdAndUpdateOrder: async (cid, payload, options) => {
		return await orderModel.findByIdAndUpdate(cid, payload, options)
	},

	findByIdAndDeleteOrder: async (cid) => {
		return await orderModel.findByIdAndRemove(cid)
	},

	findAllOrderRepo: async () => {
		return await orderModel.find({}).select('items').lean()
	},
}
