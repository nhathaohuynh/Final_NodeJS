'use strict'
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const sendMail = asyncHandler(async ({ to: email, html, subject }) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_NAME,
			pass: process.env.EMAIL_APP_PASSWORD,
		},
	})

	const info = await transporter.sendMail({
		from: 'andmin 👻 <no-reply@admin.com>', // sender address
		to: email, // list of receivers
		subject: subject, // Subject line
		html: html, // html body
	})
	return info
})

module.exports = sendMail
