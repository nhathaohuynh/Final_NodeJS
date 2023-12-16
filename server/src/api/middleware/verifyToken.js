const JWT = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { Authorization, BadRequest } = require('../../utils/error.response')
const { APP_SECRET, URL_CLIENT } = require('../../config')
const { findUserById } = require('../../database/repository/user.repo')

module.exports = {
	verifyToken: asyncHandler((req, res, next) => {
		const isFormatToken = req.headers.authorization.startsWith('Bearer')

		if (!isFormatToken) return next(new Authorization('Authorization!!'))

		const accessToken = req.headers.authorization.split(' ')[1] // or can use replace(/^Beaer\s+/, "")

		if (!accessToken) return next(new BadRequest('Token is not exist'))

		JWT.verify(accessToken, APP_SECRET, async (err, decoded) => {
			if (err) {
				if (err.message === 'JsonWebTokenError') {
					return next(new Authorization('Authorization'))
				} else {
					return next(new BadRequest(err.message))
				}
			}

			const foundUser = await findUserById(decoded?.userId)
			if (!foundUser) return next(new BadRequest('User is not existing'))

			// pass the user for request
			req.user = foundUser
			next()
		})
	}),

	verifyTokenAuthenAccount: asyncHandler((req, res, next) => {
		const token = req.params.informationAccount

		if (!token) return res.redirect(`${URL_CLIENT}/auth/fail`)

		JWT.verify(token, APP_SECRET, async (err, decoded) => {
			if (err) {
				return res.redirect(`${URL_CLIENT}/auth/fail`)
			} else {
				// pass the user for request
				req.informationAccount = decoded
				next()
			}
		})
	}),
}
