import instance from '../../axios.config.js'
import { checkResponseCode } from './auth.api.js'

export const apiGetUserList = async (params) => {
	try {
		const response = await instance('/user', {
			method: 'get',
			params: params,
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiGetUser = async (userId) => {
	try {
		const response = await instance(`/user/${userId}`, {
			method: 'get',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiRemoveUser = async (userId) => {
	try {
		const response = await instance(`/user/${userId}`, {
			method: 'delete',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiAddNewUser = async (data) => {
	try {
		const response = await instance('/access/register', {
			headers: { 'Content-Type': 'application/json' },
			method: 'post',
			data: data,
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiSendEmailActive = async (email) => {
	try {
		const response = await instance('/user/resend-email', {
			headers: { 'Content-Type': 'application/json' },
			method: 'post',
			data: {
				email,
			},
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiToggleLockUser = async (userId) => {
	try {
		const response = await instance('/user/toggle-lock', {
			headers: { 'Content-Type': 'application/json' },
			method: 'post',
			data: {
				userId,
			},
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiUpdateProfile = async (userId, payload) => {
	try {
		const response = await instance.put(`/user/${userId}`, payload, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}
