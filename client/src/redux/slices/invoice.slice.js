import { createSlice } from '@reduxjs/toolkit'
import {
	insertOrdertAction,
	updateOrdertAction,
} from '../actions/invoice.action'

const InvoiceSlice = createSlice({
	name: 'invoice-management',

	initialState: {
		items: [],
		totalQuantity: 0,
		total: 0,
		customer: {},
		orderId: '',
		sellerId: '',
		error: '',
		message: '',
	},
	reducers: {
		clearInvoiceError: (state) => {
			state.error = ''
		},

		clearInvoiceMessage: (state) => {
			state.message = ''
		},

		updateInvoice: (state, action) => {
			const totalQuantity = action.payload?.reduce((acc, item) => {
				return acc + item?.quantity
			}, 0)

			const total = action.payload?.reduce((acc, item) => {
				return acc + item?.subTotal
			}, 0)

			state.items = action.payload
			state.totalQuantity = totalQuantity
			state.total = total
		},

		updateDescreaseQuantity: (state, action) => {
			const totalQuantity = action.payload?.reduce((acc, item) => {
				return acc + item?.quantity
			}, 0)

			const total = action.payload?.reduce((acc, item) => {
				return acc + item?.subTotal
			}, 0)

			state.items = action.payload
			state.totalQuantity = totalQuantity
			state.total = total
		},

		updateIncreaseQuantity: (state, action) => {
			const totalQuantity = action.payload?.reduce((acc, item) => {
				return acc + item?.quantity
			}, 0)

			const total = action.payload?.reduce((acc, item) => {
				return acc + item?.subTotal
			}, 0)

			state.items = action.payload
			state.totalQuantity = totalQuantity
			state.total = total
		},

		deleteItemInOrder: (state, action) => {
			const totalQuantity = action.payload?.reduce((acc, item) => {
				return acc + item?.quantity
			}, 0)

			const total = action.payload?.reduce((acc, item) => {
				return acc + item?.subTotal
			}, 0)

			state.items = action.payload
			state.totalQuantity = totalQuantity
			state.total = total
		},

		resetItemsOrder: (state) => {
			state.items = []
			state.totalQuantity = 0
			state.total = 0
			state.orderId = ''
			state.customer = {}
			state.sellerId = ''
		},

		updatedInforCustomer: (state, action) => {
			state.customer = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(insertOrdertAction.fulfilled, (state, action) => {
			state.orderId = action.payload?.order
			state.sellerId = action.payload?.sellerId
		})
		builder.addCase(updateOrdertAction.fulfilled, (state, action) => {
			state.orderId = action.payload?.order
			state.sellerId = action.payload?.sellerId
		})
	},
})
export const {
	clearInvoiceError,
	clearInvoiceMessage,
	updateInvoice,
	updateDescreaseQuantity,
	updateIncreaseQuantity,
	deleteItemInOrder,
	resetItemsOrder,
	updatedInforCustomer,
} = InvoiceSlice.actions
export default InvoiceSlice.reducer
