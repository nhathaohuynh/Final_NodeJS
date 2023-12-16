const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = require('.')
cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API_KEY,
	api_secret: CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
	cloudinary,
	allowedFormats: ['jpg', 'png'],
	params: {
		folder: 'POS',
	},
})

const uploadCloud = multer({ storage })

module.exports = uploadCloud
