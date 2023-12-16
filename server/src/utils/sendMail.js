const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const { EMAIL_ACCOUNT, EMAIL_APP_PASSWORD } = require('../config')
const sendMail = asyncHandler(async ({ to: email, html, subject }) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: EMAIL_ACCOUNT,
			pass: EMAIL_APP_PASSWORD,
		},
	})

	const info = await transporter.sendMail({
		from: 'admin@gmail.com 👻 <no-reply@admin.com>', // sender address
		to: email, // list of receivers
		subject: subject, // Subject line
		html: html, // html body
	})
	return info
})

module.exports = sendMail
