'use strict'
const { LIMIT_USER, URL_SERVER } = require('../config')
const bcrypt = require('bcrypt')
const {
	checkUserById,
	findUserById,
	removeUserById,
	createManyUser,
	updateUserById,
	findUserByQueries,
	findAndCountUserByQueries,
	findUserByEmail,
	toggleAccountLock,
	updateLastSentEmailTime,
} = require('../database/repository/user.repo')
const { BadRequest } = require('../utils/error.response')

const { faker } = require('@faker-js/faker')
const sendMail = require('../utils/sendMail')
const { generateToken } = require('../utils/generate.jwt')

class UserService {
	async getUser(userId) {
		const userExist = await checkUserById(userId)

		if (!userExist) throw new BadRequest('Something went wrong')

		return {
			user: await findUserById(userId),
		}
	}

	async getUsers(queries) {
		const formattedQueries = {}

		// TODO: filtering
		if (queries?.username)
			formattedQueries.username = {
				$regex: queries.username,
				$options: 'i',
			}

		const page = +queries?.page || 1
		const limit = +queries?.limit || LIMIT_USER
		const skip = (page - 1) * limit

		const user = await findUserByQueries({ limit, skip, formattedQueries })
		const countUser = await findAndCountUserByQueries(formattedQueries)

		const balanceProducts = countUser % limit
		let pages = 0

		if (balanceProducts > 0) {
			pages = Math.floor(countUser / 10 + 1)
		} else {
			pages = countUser / 10
		}
		return {
			data: {
				pages,
				user,
			},
		}
	}

	async updateUser(userId, payload, urlAvatar) {
		const userExist = await checkUserById(userId)
		if (!userExist) throw new BadRequest('Something went wrong')

		const data = {
			...payload,
		}

		if (urlAvatar) data.avatar = urlAvatar

		await updateUserById(userId, data)

		return {
			user: await findUserById(userId),
		}
	}

	async removeUser(userId) {
		const userExist = await checkUserById(userId)
		if (!userExist) throw new BadRequest('Something went wrong')

		await removeUserById(userId)
		return {
			userId,
		}
	}

	async createManyUser() {
		const users = []
		const password = '123456'
		for (let i = 0; i <= 100; i++) {
			const email = faker.internet.email().split('@')[0] + '@gmail.com'

			users.push({
				fullName: faker.person.fullName(),
				email,
				username: email.split('@')[0],
				password: await bcrypt.hash(password, 10),
				avatar: faker.image.avatar(),
			})
		}
		await createManyUser(users)
		return {}
	}

	async lockingUserHandler(userId) {
		const foundUser = await findUserById(userId)
		if (!foundUser || foundUser.role == 'admin')
			throw new BadRequest('Something went wrong')

		await toggleAccountLock(userId, !foundUser.isLock)

		return {
			userId: foundUser._id,
		}
	}

	async resendEmail(email) {
		const foundUser = await findUserByEmail(email)
		if (!foundUser) throw new BadRequest('Something went wrong')

		if (foundUser.alreadyChangePassword)
			throw new BadRequest('Some thing went wrong')

		const currentTime = new Date().getTime()

		const timeElapsed = currentTime - foundUser.lastSentEmailTime

		if (timeElapsed <= 60000) throw new BadRequest('Something went wrong')

		const data = {
			email,
		}

		const timeActiveAccount = 60

		const tokenUser = generateToken(data, timeActiveAccount)

		const html = `Please click in link to authenticate account 
		<a href='${URL_SERVER}/access/authen-account/${tokenUser}'>Click Here</a>`

		const options = {
			html,
			to: email,
			subject: 'Authentication acoount',
		}

		sendMail(options)

		await updateLastSentEmailTime(foundUser._id)

		return {}
	}
}

module.exports = new UserService()
