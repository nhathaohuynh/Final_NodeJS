const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Invoice'
const COLLECTION_NAME = 'Invoices'

const invoiceSchema = new Schema(
	{
		items: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				productName: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				subTotal: {
					type: Number,
					required: true,
				},
			},
		],

		moneyReceive: {
			type: Number,
		},

		moneyBack: {
			type: Number,
		},

		total: {
			type: Number,
		},
		totalQuantity: {
			type: Number,
		},
		seller: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		customer: {
			type: Schema.Types.ObjectId,
			ref: 'Customer',
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, invoiceSchema)
