const StatusCode = {
	OK: 200,
	CREATED: 201,
}

const StatusMeassage = {
	OK: 'OK',
	CREATED: 'Created successfully',
}

class SuccessResponse {
	constructor(code = 1, status = 'Success', message, metaData) {
		this.message = message ? message : StatusMeassage.OK
		this.status = status
		this.code = code
		this.metaData = metaData
	}
	send(res, header = {}) {
		return res.status(this.status).json(this)
	}
}

class OkResponse extends SuccessResponse {
	constructor({
		code = 1,
		status = StatusCode.OK,
		message = StatusMeassage.OK,
		metaData,
	}) {
		super(code, status, message, metaData)
	}
}

class CreatedResponse extends SuccessResponse {
	constructor({
		code = 1,
		status = StatusCode.CREATED,
		message = StatusMeassage.CREATED,
		metaData,
	}) {
		super(code, status, message, metaData)
	}
}

module.exports = {
	CreatedResponse,
	OkResponse,
}
