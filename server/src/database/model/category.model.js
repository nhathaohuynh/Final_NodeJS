const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'Categories'

const categorySchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},
		description: {
			type: String,
			required: true,
		},

		image: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, categorySchema)
