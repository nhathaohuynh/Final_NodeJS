'use strict'

const asyncHandler = require('express-async-handler')
const { Forbidden } = require('../../utils/error.response')

const isAdmin = asyncHandler(async (req, res, next) => {
	const { role } = req.user
	if (!role === 'admin') return next(new Forbidden('Forbidden'))
	next()
})

module.exports = isAdmin
