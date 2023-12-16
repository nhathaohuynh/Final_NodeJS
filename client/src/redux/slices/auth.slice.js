import { createSlice } from '@reduxjs/toolkit'
import { loginAction } from '../actions/auth.action'

const authSlice = createSlice({
	name: 'auth',

	initialState: {
		error: '',
		token: '',
		isLogin: false,
		loading: false,
		user: null,
		isGetCurrentUser: false,
	},
	reducers: {
		setCurrentEmployee: (state, action) => {
			state.user = action.payload?.user
			state.isGetCurrentUser = true
		},
		clearError: (state) => {
			state.error = ''
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginAction.pending, (state) => {
			state.loading = true
			state.error = ''
		})
		builder.addCase(loginAction.fulfilled, (state, action) => {
			state.loading = false
			state.isLogin = true
			state.token = action.payload?.accessToken
			state.user = action.payload?.user
		})
		builder.addCase(loginAction.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})
	},
})
export const { clearError, setCurrentEmployee } = authSlice.actions
export default authSlice.reducer
