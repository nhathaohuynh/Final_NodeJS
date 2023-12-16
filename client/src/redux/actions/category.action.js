import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	apiAddNewCategory,
	apiGetCategory,
	apiGetCategoryList,
	apiRemoveCategory,
	apiUpdateCategory,
} from '../../apis/category.api'

export const addNewCategoryAction = createAsyncThunk(
	'addNewCate/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiAddNewCategory(data)

			if (response?.code === 1) {
				return response.metaData.category
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const getCategoriesAction = createAsyncThunk(
	'categories/admin',
	async (_, { rejectWithValue }) => {
		try {
			const response = await apiGetCategoryList()

			if (response?.code === 1) {
				return response.metaData.category
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const getCategoryAction = createAsyncThunk(
	'category/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiGetCategory(data)

			if (response?.code === 1) {
				return response.metaData.category
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const deleteCategoryAction = createAsyncThunk(
	'remove-category/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiRemoveCategory(data)

			if (response?.code === 1) {
				return response.metaData.category
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)

export const updateCategoryAction = createAsyncThunk(
	'update-category/admin',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiUpdateCategory(data.cid, data.payload)

			if (response?.code === 1) {
				return response.metaData.category
			} else {
				return rejectWithValue(response?.response?.data?.message)
			}
		} catch (err) {
			throw err
		}
	},
)
