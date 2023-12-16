const invoiceModel = require('../model/invoice.model')

module.exports = {
	findInvoiceById: async (id) => {
		return await invoiceModel.findById(id).lean()
	},

	findListInvoices: async () => {
		return await invoiceModel.find({}).lean()
	},

	createInvoice: async (body) => {
		return await invoiceModel.create(body)
	},

	findInvoiceByTimeline: async (query) => {
		return invoiceModel
			.find(query)
			.sort({ createdAt: 'asc' })
			.populate('items.product')
			.populate('seller')
			.populate('customer')
			.lean()
	},
}
