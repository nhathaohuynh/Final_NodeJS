const UserServices = require('../service/user.services')
const { OkResponse } = require('../utils/success.response')

class UserController {
	async getUser(req, res) {
		const userId = req.params.id
		return new OkResponse({
			message: 'Get user successfull',
			metaData: await UserServices.getUser(userId),
		}).send(res)
	}

	async getUsers(req, res) {
		const queries = req.query
		return new OkResponse({
			message: 'Get Users sucessful',
			metaData: await UserServices.getUsers(queries),
		}).send(res)
	}

	async updateUser(req, res) {
		const payload = req.body
		const userId = req.params.id
		const urlAvatar = req.file?.path
		return new OkResponse({
			message: 'Update user successful',
			metaData: await UserServices.updateUser(userId, payload, urlAvatar),
		}).send(res)
	}

	async removeUser(req, res) {
		const userId = req.params.id
		return new OkResponse({
			message: 'Remove user successful',
			metaData: await UserServices.removeUser(userId),
		}).send(res)
	}

	async createManyUser(req, res) {
		return new OkResponse({
			metaData: await UserServices.createManyUser(),
		}).send(res)
	}

	async resendEmail(req, res) {
		const email = req.body?.email
		return new OkResponse({
			metaData: await UserServices.resendEmail(email),
			message: 'Email already sent. Please check your email',
		}).send(res)
	}

	async toggleLockUser(req, res) {
		const userId = req.body.userId

		return new OkResponse({
			metaData: await UserServices.lockingUserHandler(userId),
			message: 'OK',
		}).send(res)
	}
}

module.exports = new UserController()
