import { createSlice } from '@reduxjs/toolkit'

import {
	addNewCategoryAction,
	deleteCategoryAction,
	getCategoriesAction,
	updateCategoryAction,
} from '../actions/category.action'

const categorySlice = createSlice({
	name: 'cate-management',

	initialState: {
		categories: [],
		loading: false,
		message: '',
		error: '',
	},
	reducers: {
		clearCategoryError: (state) => {
			state.error = ''
		},

		clearCategoryMessage: (state) => {
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCategoriesAction.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
			state.loading = false
			state.categories = action.payload
		})
		builder.addCase(getCategoriesAction.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})

		builder.addCase(addNewCategoryAction.pending, (state) => {
			state.loading = true
		})

		builder.addCase(addNewCategoryAction.fulfilled, (state, action) => {
			state.loading = false
			state.message = 'Add new Category successfully'
			state.categories = [action.payload, ...state.categories]
		})

		builder.addCase(addNewCategoryAction.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})

		builder.addCase(deleteCategoryAction.pending, (state) => {
			state.loading = true
		})

		builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
			console.log(state.categories)

			const cateIndex = state.categories.findIndex(
				(cate) => cate._id !== action.payload,
			)
			const newCategories =
				cateIndex === -1 ? [] : state.categories.splice(cateIndex, 1)

			state.loading = false
			state.categories = newCategories
			state.message = 'delete user successfully'
		})

		builder.addCase(deleteCategoryAction.rejected, (state, _) => {
			state.loading = false
			state.error = 'Something went wrong'
		})

		builder.addCase(updateCategoryAction.pending, (state) => {
			state.loading = true
		})

		builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
			state.loading = false
			state.message = `Updated category successfully`

			state.categories = state.categories.map((cate) => {
				if (cate._id === action.payload._id) {
					return {
						...action.payload,
					}
				}
				return cate
			})
		})

		builder.addCase(updateCategoryAction.rejected, (state, _) => {
			state.loading = false
			state.error = 'Something went wrong'
		})
	},
})
export const { clearCategoryError, clearCategoryMessage } =
	categorySlice.actions
export default categorySlice.reducer
