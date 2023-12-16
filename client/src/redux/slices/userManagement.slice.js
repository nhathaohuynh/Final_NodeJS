import { createSlice } from '@reduxjs/toolkit'
import {
	addUserHandler,
	getListUserHandler,
	removeUserHandler,
	toggleLockHandler,
} from '../actions/userManagement.action'

const userManagementSlice = createSlice({
	name: 'user-management',

	initialState: {
		users: [],
		loading: false,
		pages: 10,
		message: '',
		error: '',
	},
	reducers: {
		clearUserManagementError: (state) => {
			state.error = ''
		},

		clearUserManagementMessage: (state) => {
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getListUserHandler.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getListUserHandler.fulfilled, (state, action) => {
			state.loading = false
			state.users = action.payload.user
			state.pages = action.payload.pages
		})
		builder.addCase(getListUserHandler.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})

		builder.addCase(addUserHandler.pending, (state) => {
			state.loading = true
		})

		builder.addCase(addUserHandler.fulfilled, (state, action) => {
			state.loading = false
			state.message = 'Add new user successfully'
			state.users = [action.payload, ...state.users]
		})

		builder.addCase(addUserHandler.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})

		builder.addCase(removeUserHandler.pending, (state) => {
			state.loading = true
		})

		builder.addCase(removeUserHandler.fulfilled, (state, action) => {
			state.loading = false
			state.message = 'delete user successfully'
			state.users = [
				...state.users.filter((user) => user._id !== action.payload),
			]
		})

		builder.addCase(removeUserHandler.rejected, (state, action) => {
			state.loading = false
			state.error = 'Something went wrong'
		})

		builder.addCase(toggleLockHandler.pending, (state) => {
			state.loading = true
		})

		builder.addCase(toggleLockHandler.fulfilled, (state, action) => {
			const userIndex = state.users.findIndex(
				(user) => user._id === action.payload,
			)
			state.loading = false

			state.message = `${
				state.users[userIndex].isLock ? 'Unlock' : 'Lock'
			} user successfully`

			state.users = state.users.map((user, index) => {
				if (index === userIndex) {
					return {
						...user,
						isLock: !user.isLock,
					}
				}
				return user
			})
		})

		builder.addCase(toggleLockHandler.rejected, (state, action) => {
			state.loading = false
			state.error = 'Something went wrong'
		})
	},
})
export const { clearUserManagementError, clearUserManagementMessage } =
	userManagementSlice.actions
export default userManagementSlice.reducer
