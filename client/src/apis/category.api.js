import instance from '../../axios.config.js'
import { checkResponseCode } from './auth.api.js'

export const apiGetCategoryList = async () => {
	try {
		const response = await instance('/category', {
			method: 'get',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiGetCategory = async (cId) => {
	try {
		const response = await instance(`/category/${cId}`, {
			method: 'get',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiRemoveCategory = async (cId) => {
	try {
		const response = await instance(`/category/${cId}`, {
			method: 'delete',
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiAddNewCategory = async (data) => {
	try {
		const response = await instance('/category', {
			headers: { 'Content-Type': 'application/json' },
			method: 'post',
			data: data,
		})

		return response
	} catch (err) {
		checkResponseCode(err)
	}
}

export const apiUpdateCategory = async (cId, payload) => {
	try {
		const response = await instance(`/category/${cId}`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'put',
			data: payload,
		})
		return response
	} catch (err) {
		checkResponseCode(err)
	}
}
