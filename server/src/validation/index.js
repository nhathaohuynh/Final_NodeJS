const Joi = require('joi')

module.exports = {
	registerSchema: Joi.object({
		fullName: Joi.string().required(),
		email: Joi.string().email().required(),
		role: Joi.string().valid('seller', 'admin', 'management').required(),
	}),

	loginSchema: Joi.object({
		username: Joi.string().min(3).max(20).required(),
		password: Joi.string().min(3).max(20).required(),
	}),

	changePasswordShema: Joi.object({
		newPassword: Joi.string().min(6).max(20).required(),
		comfirmPassword: Joi.string().min(6).max(20).required(),
	}),
}
