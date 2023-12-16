const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

const orderSchema = new Schema(
	{
		items: [
			{
				productId: {
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
				stocks: {
					type: Number,
				},
			},
		],

		sellerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, orderSchema)
