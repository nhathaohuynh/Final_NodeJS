module.exports.errorHandler = (error, req, res, next) => {
	const statusCode = error.status || 500
	return res.status(statusCode).json({
		status: 'Error',
		code: -1,
		message: error.message || 'Internal Server',
		error: error.stack,
	})
}
