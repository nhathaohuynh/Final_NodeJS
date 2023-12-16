const userModel = require('../database/model/user.model')
const {
	checkUserByEmail,
	findUserByEmail,
	findUserByIdAndUpdatePasword,
	findUserById,
	findUserByEmailAndUpdatePassword,
} = require('../database/repository/user.repo')
const { unselectFields } = require('../utils')
const { BadRequest, Conflict, Forbidden } = require('../utils/error.response')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generate.jwt')
const { URL_SERVER } = require('../config')
const sendMail = require('../utils/sendMail')
const { faker } = require('@faker-js/faker')
// the time expires of access token
const EXPIRES_ATK = '3days'

class AccessService {
	async login({ username, password }) {
		const email = username + '@gmail.com'
		const userExists = await findUserByEmail(email.toLowerCase())

		//  check user already exists
		if (!userExists) throw new BadRequest('Account is not eixisting')

		if (userExists?.isLock) throw new BadRequest('Something went wrong')

		// compare the password
		const isMatchPassword = await bcrypt.compare(password, userExists.password)

		// if don't match password return common error
		if (!isMatchPassword)
			throw new BadRequest('Invalid credentials. Please try again')

		// unselect field password for client
		const userFields = unselectFields(userExists, [
			'password',
			'createdAt',
			'updatedAt',
		])

		// generate token
		const payload = {
			userId: userExists._id,
			email,
		}
		const accessToken = generateToken(payload, EXPIRES_ATK)

		return {
			accessToken,
			user: {
				...userFields,
			},
		}
	}

	async register({ email, role, fullName }) {
		// check if user exist
		const userExists = await checkUserByEmail(email)

		if (userExists) throw new Conflict('Email already in use. ')

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

		const user = await userModel.create({
			fullName,
			username: email.split('@')[0],
			email: email,
			password: faker.internet.password(),
			role,
			avatar: faker.internet.avatar(),
		})

		sendMail(options)

		return {
			user,
		}
	}

	async authenAccount({ email }) {
		// create user document and save it db
		const password = email.split('@')[0]
		await findUserByEmailAndUpdatePassword(email, password)
		return {}
	}

	async changePassword({ newPassword, comfirmPassword, userId }) {
		const isMatchPasword = newPassword === comfirmPassword

		if (!isMatchPasword)
			throw new BadRequest('Invalid password. Please try again')

		const salt = bcrypt.genSaltSync(10)
		const hashPassword = await bcrypt.hash(newPassword, salt)

		await findUserByIdAndUpdatePasword(userId, hashPassword)

		return {
			user: await findUserById(userId),
		}
	}

	async getCurrentEmployee(userId) {
		return {
			user: await findUserById(userId),
		}
	}

	async createAdmin() {
		const email = 'admin@gmail.com'
		const username = 'admin'
		const password = 'admin123'
		const role = 'admin'
		const fullName = 'Huynh Nhat Hao'
		const userExists = await findUserByEmail(email.toLowerCase())

		//  check user already exists
		if (userExists) throw new Conflict('Admin was already created')

		await userModel.create({
			fullName,
			username,
			email,
			password,
			role,
			avatar: faker.internet.avatar(),
			alreadyChangePassword: true,
		})

		return {}
	}
}

module.exports = new AccessService()
