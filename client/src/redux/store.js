import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authSlice } from './slices'
import categorySlice from './slices/category.slice'
import invoiceSlice from './slices/invoice.slice'
import productSlice from './slices/product.slice'
import userManagementSlice from './slices/userManagement.slice'

const commonConfig = {
	key: 'current-user',
	storage,
}

const persistConfig = {
	...commonConfig,
	version: 1,
	whitelist: ['isLogin', 'user', 'token'],
}

const commonConfigOrder = {
	key: 'current-order',
	storage,
}

const persistConfigOrder = {
	...commonConfigOrder,
	version: 1,
	whitelist: [
		'items',
		'totalQuantity',
		'total',
		'moneyReceive',
		'moneyBack',
		'customer',
		'orderId',
		'sellerId',
		'customer',
	],
}

const userPersist = persistReducer(persistConfig, authSlice)
const invoicesPersist = persistReducer(persistConfigOrder, invoiceSlice)

export const store = configureStore({
	reducer: {
		authReducer: userPersist,
		userList: userManagementSlice,
		categories: categorySlice,
		products: productSlice,
		invoices: invoicesPersist,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
