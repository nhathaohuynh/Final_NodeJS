const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Customer'
const COLLECTION_NAME = 'Customers'

const customerSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},

		address: {
			type: String,
			require: true,
		},

		invoices: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Invoice',
			},
		],
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, customerSchema)
