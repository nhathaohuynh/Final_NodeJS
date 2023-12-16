require('dotenv').config()

module.exports = {
	PORT: process.env.PORT,
	MONGODB_URL: process.env.MONGOBD_URL,
	APP_SECRET: process.env.APP_SECRET,
	CLOUD_NAME: process.env.CLOUDINARY_NAME,
	CLOUD_API_KEY: process.env.CLOUDINARY_KEY,
	CLOUD_API_SECRET: process.env.CLOUDINARY_SECRET,
	URL_SERVER: process.env.URL_SERVER,
	URL_CLIENT: process.env.URL_CLIENT,
	EMAIL_ACCOUNT: process.env.EMAIL_ACCOUNT,
	EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
	USERNAME_ADMIN: process.env.USERNAME_ADMIN,
	PASSWORD_ADMIN: process.env.PASSWORD_ADMIN,
	LIMIT_USER: process.env.LIMIT_USER,
}
