import instance from '../../axios.config.js'
import { checkResponseCode } from './auth.api.js'

export const apiRemoveOrder = async (oId) => {
	try {
		const response = await instance(`/order/${oId}`, {
			method: 'delete',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiInsertOrder = async (data) => {
	try {
		const response = await instance.post('/order', data, {
			headers: { 'Content-Type': 'application/json' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiUpdateOrder = async (oId, payload) => {
	try {
		const response = await instance.put(`/order/${oId}`, payload, {
			headers: { 'Content-Type': 'application/json' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiGetInvoice = async (oId) => {
	try {
		const response = await instance(`/invoice/${oId}`, {
			method: 'delete',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiInsertInvoice = async (data) => {
	try {
		const response = await instance.post('/invoice', data, {
			headers: { 'Content-Type': 'application/json' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiGetListInvoice = async () => {
	try {
		const response = await instance.put(`/invoice`, {
			headers: { 'Content-Type': 'application/json' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiGetReportsInvoice = async (data) => {
	try {
		const response = await instance.post(`/invoice/analytics`, data, {
			headers: { 'Content-Type': 'application/json' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}
