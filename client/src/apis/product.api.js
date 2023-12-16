import axios from 'axios'
import instance from '../../axios.config.js'
import { checkResponseCode } from './auth.api.js'

export const apiGetProduct = async (pId) => {
	try {
		const response = await instance(`/product/${pId}`, {
			method: 'get',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}
export const apiGetProductList = async (token, params) => {
	console.log(params)
	try {
		const response = await axios(
			`https://tdtu-pos.onrender.com/POS/api/v1/product`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: 'get',
				params: params,
			},
		)
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiRemoveProduct = async (pId) => {
	try {
		const response = await instance(`/product/${pId}`, {
			method: 'delete',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiAddNewProduct = async (data) => {
	try {
		const response = await instance.post('/product', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiUpdateProduct = async (pId, payload) => {
	try {
		const response = await instance.put(`/product/${pId}`, payload, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}
