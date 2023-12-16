const { OkResponse, CreatedResponse } = require('../utils/success.response')
const AccessService = require('../service/access.services')
const {
	loginSchema,
	registerSchema,
	changePasswordShema,
} = require('../validation/index')
const { BadRequest } = require('../utils/error.response')
const { URL_CLIENT } = require('../config')

class AccessController {
	async login(req, res) {
		// validate valuf of inputs
		const { error } = loginSchema.validate(req.body, {
			abortEarly: false,
		})
		// if have error send for client now
		if (error) {
			const errorMessage = error.details.map((errorDetail) =>
				errorDetail.message.replace(/["']/g, ''),
			)
			throw new BadRequest(errorMessage[0])
		}
		// if don't have any error excute method login in service
		return new OkResponse({
			metaData: await AccessService.login(req.body),
		}).send(res)
	}

	async register(req, res) {
		// validate valuf of inputs
		const { error } = registerSchema.validate(req.body, {
			abortEarly: false,
		})
		// if have error send for client now
		if (error) {
			const errorMessage = error.details.map((errorDetail) =>
				errorDetail.message.replace(/["']/g, ''),
			)
			throw new BadRequest(errorMessage)
		}
		// if don't have any error excute method register in service
		return new OkResponse({
			metaData: await AccessService.register(req.body),
			message: 'Please check your email to authenticate account',
		}).send(res)
	}

	async authenAccount(req, res) {
		await AccessService.authenAccount(req?.informationAccount)
		return res.redirect(`${URL_CLIENT}/auth/success`)
	}

	async changePassword(req, res) {
		// validate valuf of inputs
		const { error } = changePasswordShema.validate(req.body, {
			abortEarly: false,
		})
		// if have error send for client now
		if (error) {
			const errorMessage = error.details.map((errorDetail) =>
				errorDetail.message.replace(/["']/g, ''),
			)
			throw new BadRequest(errorMessage)
		}

		const payload = {
			...req.body,
			userId: req.user._id,
		}
		return new OkResponse({
			metaData: await AccessService.changePassword(payload),
			message: 'Change password successful',
		}).send(res)
	}

	async getCurrentEmployee(req, res) {
		return new OkResponse({
			metaData: await AccessService.getCurrentEmployee(req.user._id),
			message: 'Change password successful',
		}).send(res)
	}

	async createAdmin(req, res) {
		return new CreatedResponse({
			metaData: await AccessService.createAdmin(),
			message: 'Account admin already created',
		}).send(res)
	}
}

module.exports = new AccessController()
