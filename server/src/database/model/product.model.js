const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},

		barcode: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},

		slug: {
			type: String,
		},
		retailPrice: {
			type: Number,
		},
		importPrice: {
			type: Number,
		},
		thumnail: {
			type: String,
		},
		description: {
			type: String,
		},
		category: {
			type: String,
		},
		investory: {
			type: Number,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, productSchema)
