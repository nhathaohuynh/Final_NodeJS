const express = require('express')
const cors = require('cors')
const { notFound } = require('./api/middleware/not-found')
const { errorHandler } = require('./api/middleware/error-handler')
const morgan = require('morgan')

module.exports = async (app) => {
	app.use(express.urlencoded({ extended: true, limit: '1mb' }))
	app.use(express.json({ limit: '1mb' }))
	app.use(cors())
	app.use(morgan('dev'))

	// api
	app.use('/POS/api/v1', require('./api'))

	// not found
	app.use(notFound)

	// error handling
	app.use(errorHandler)
}
