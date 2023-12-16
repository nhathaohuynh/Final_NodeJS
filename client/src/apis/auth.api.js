import axios from 'axios'
import instance from '../../axios.config.js'
import { logout } from '../utils/logout.js'

export const apiLogin = async (payload) =>
	instance('/access/login', {
		method: 'post',
		data: payload,
	})

export const apiChangePassword = async (payload) => {
	try {
		const response = await instance('/access/change-password', {
			method: 'post',
			data: payload,
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiGetCurrentEmployee = async (accessToken) => {
	try {
		const response = await axios(
			'https://tdtu-pos.onrender.com/POS/api/v1/access/current-employee',
			{
				method: 'get',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		)
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const checkResponseCode = (err) => {
	const responseCode = err.response?.status
	if (responseCode) (responseCode == 401 || responseCode === 403) && logout()
}
