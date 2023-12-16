const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const SALT = 10

module.exports = {
	checkUserByEmail: async (email) => {
		return await userModel.exists({ email }).lean()
	},

	findUserByEmail: async (email) => {
		return await userModel.findOne({ email }).lean()
	},

	findUserById: async (id) => {
		return await userModel
			.findById(id)
			.select('-password -updatedAt -createdAt')
			.populate('invoices')
			.lean()
	},

	findUserByEmailAndUpdatePassword: async (email, password) => {
		const hashPassword = await bcrypt.hash(password, SALT)
		return await userModel.findOneAndUpdate(
			{
				email,
			},
			{ password: hashPassword },
		)
	},

	findUserByIdAndUpdatePasword: async (id, newPassword) => {
		return await userModel
			.findByIdAndUpdate(id, {
				password: newPassword,
				alreadyChangePassword: true,
			})
			.lean()
	},

	checkUserById: async (userId) => {
		return await userModel.exists({ _id: userId }).lean()
	},

	updateUserById: async (userId, payload) => {
		return await userModel.findByIdAndUpdate(userId, payload)
	},

	removeUserById: async (userId) => {
		return await userModel.findByIdAndRemove(userId)
	},

	createManyUser: async (arrayUser) => {
		return await userModel.insertMany(arrayUser)
	},

	findUserByQueries: async ({ formattedQueries, skip, limit }) => {
		return await userModel
			.find(formattedQueries)
			.sort('-createdAt')
			.select('-password -updatedAt -createdAt')
			.skip(skip)
			.limit(limit)
			.lean()
	},

	findAndCountUserByQueries: async (formattedQueries) => {
		return await userModel.find(formattedQueries).countDocuments()
	},

	toggleAccountLock: async (userId, isLocked) => {
		return await userModel
			.findByIdAndUpdate(userId, { isLock: isLocked })
			.lean()
	},

	updateLastSentEmailTime: async (userId) => {
		return await userModel
			.findByIdAndUpdate(userId, {
				lastSentEmailTime: new Date().getTime(),
			})
			.lean()
	},
}
