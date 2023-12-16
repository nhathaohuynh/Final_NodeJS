import { createSlice } from '@reduxjs/toolkit'

import {
	addNewProductAction,
	deleteProductAction,
	getProductsAction,
	updateProductAction,
} from '../actions/product.action'

const productSlice = createSlice({
	name: 'product-management',

	initialState: {
		products: [],
		loading: false,
		pages: 10,
		message: '',
		error: '',
	},
	reducers: {
		clearProductError: (state) => {
			state.error = ''
		},

		clearProductMessage: (state) => {
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProductsAction.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getProductsAction.fulfilled, (state, action) => {
			state.loading = false
			state.products = action.payload.product

			const balanceProducts = action.payload.counts % 10
			let pages = 0

			if (balanceProducts > 0) {
				pages = Math.floor(action.payload.counts / 10 + 1)
			} else {
				pages = action.payload.counts / 10
			}
			state.pages = pages
		})
		builder.addCase(getProductsAction.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})

		builder.addCase(addNewProductAction.pending, (state) => {
			state.loading = true
		})

		builder.addCase(addNewProductAction.fulfilled, (state, action) => {
			state.loading = false
			state.message = 'Add new Product successfully'
			state.products = [action.payload, ...state.products]
		})

		builder.addCase(addNewProductAction.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})

		builder.addCase(deleteProductAction.pending, (state) => {
			state.loading = true
		})

		builder.addCase(deleteProductAction.fulfilled, (state, action) => {
			state.loading = false
			state.message = 'delete user successfully'
			state.products = [
				...state.products.filter((product) => product._id !== action.payload),
			]
		})

		builder.addCase(deleteProductAction.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})

		builder.addCase(updateProductAction.pending, (state) => {
			state.loading = true
		})

		builder.addCase(updateProductAction.fulfilled, (state, action) => {
			state.loading = false
			state.message = `Updated Product successfully`
			state.products = state.products.map((product) => {
				if (product._id === action.payload._id) {
					return {
						...action.payload,
					}
				}
				return product
			})
		})

		builder.addCase(updateProductAction.rejected, (state, action) => {
			state.loading = false
			state.error = 'Something went wrong'
		})
	},
})
export const { clearProductError, clearProductMessage } = productSlice.actions
export default productSlice.reducer
