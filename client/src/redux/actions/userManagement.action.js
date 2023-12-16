import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	apiAddNewUser,
	apiGetUserList,
	apiRemoveUser,
	apiToggleLockUser,
} from '../../apis'

export const getListUserHandler = createAsyncThunk(
	'getUsers/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiGetUserList(data)

			if (response?.code === 1) {
				return response.metaData.data
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const addUserHandler = createAsyncThunk(
	'addUser/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiAddNewUser(data)

			console.log(response)

			if (response?.code === 1) {
				return response.metaData.user
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const removeUserHandler = createAsyncThunk(
	'removeUser/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiRemoveUser(data)

			if (response?.code === 1) {
				return response.metaData.userId
			} else {
				console.log(response)
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const toggleLockHandler = createAsyncThunk(
	'/toggleLock/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiToggleLockUser(data)
			console.log(response)
			if (response?.code === 1) {
				return response.metaData.userId
			} else {
				return rejectWithValue(response.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)
