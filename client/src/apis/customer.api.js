import instance from '../../axios.config.js'
import { checkResponseCode } from './auth.api.js'

export const apiInsertCustomer = async (data) => {
	try {
		const response = await instance.post('/customer', data, {
			headers: { 'Content-Type': 'application/json' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiGetCustomerByPhone = async (data) => {
	try {
		const response = await instance.post(`/customer/by-phone`, data, {
			headers: { 'Content-Type': 'application/json' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiUpdateCustomer = async (cId, payload) => {
	try {
		const response = await instance.put(`/customer/${cId}`, payload, {
			headers: { 'Content-Type': 'application/json' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}
