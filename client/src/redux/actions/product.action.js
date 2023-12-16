import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
	apiAddNewProduct,
	apiGetProduct,
	apiRemoveProduct,
	apiUpdateProduct,
} from '../../apis/product.api'

export const addNewProductAction = createAsyncThunk(
	'addNewProduct/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiAddNewProduct(data)

			if (response?.code === 1) {
				return response.metaData.product
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const getProductsAction = createAsyncThunk(
	'products/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://tdtu-pos.onrender.com/POS/api/v1/product?page=${data.page}`,
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
					},
				},
			)

			if (response.data?.code === 1) {
				return response.data.metaData.data
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const getProductAction = createAsyncThunk(
	'product/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiGetProduct(data)

			if (response?.code === 1) {
				return response.metaData.product
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const deleteProductAction = createAsyncThunk(
	'remove-product/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiRemoveProduct(data)

			if (response?.code === 1) {
				return response.metaData.product
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const updateProductAction = createAsyncThunk(
	'update-product/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiUpdateProduct(data.pid, data.payload)

			if (response?.code === 1) {
				return response.metaData.product
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)
