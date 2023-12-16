import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInsertOrder, apiUpdateOrder } from '../../apis/invoice.api'

export const insertOrdertAction = createAsyncThunk(
	'insertOrder/seller',
	async (data, { rejectWithValue }) => {
		console.log(data)
		try {
			const response = await apiInsertOrder(data)

			if (response?.code === 1) {
				return response.metaData
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const updateOrdertAction = createAsyncThunk(
	'updateOrder/seller',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiUpdateOrder(data?.orderId, {
				items: data?.items,
			})

			if (response?.code === 1) {
				return response.metaData
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)
