import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ActiveAccount, AddUser, Loading, UserList } from '../../components'
import {
	addUserHandler,
	getListUserHandler,
} from '../../redux/actions/userManagement.action'
import {
	clearUserManagementError,
	clearUserManagementMessage,
} from '../../redux/slices/userManagement.slice'
import icons from '../../utils/icons'
import { toastError, toastSuccess } from '../../utils/toast'
import { validateEmail } from '../../validation'
const ListUser = () => {
	const dispatch = useDispatch()
	const { users, loading, error, message, pages } = useSelector(
		(state) => state.userList,
	)

	const [userList, setUserList] = useState([])

	const [openAddUser, setOpenAddUser] = useState(false)
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const [pageActive, setPageActive] = useState(+queryParams.get('page') || 1)
	const [numberPages, setNumberPages] = useState(10)
	const [inactiveNext, setInactiveNext] = useState(false)
	const [inactivePrevious, setInactivePrevious] = useState(false)

	const [openActiveAccount, setOpenActiveAccount] = useState(false)
	const initUser = {
		fullName: '',
		email: '',
		role: 'seller',
	}
	const [user, setUser] = useState(initUser)

	const onChangeInputs = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	const handlerClickPrevious = async () => {
		if (pageActive > pages || pageActive <= 0) {
			return toastError('Invalid page number')
		}
		if (pageActive - 1 >= 0) {
			setPageActive(pageActive - 1)
		}
	}

	const handlerClickNext = async () => {
		if (pageActive > pages || pageActive <= 0) {
			return toastError('Invalid page number')
		}
		if (pageActive + 1 <= numberPages) {
			setPageActive(pageActive + 1)
		}
	}

	const updatePaginationState = () => {
		if (+pageActive <= 1) {
			setInactivePrevious(true)
		} else {
			setInactivePrevious(false)
		}
		if (+pageActive >= +numberPages) {
			setInactiveNext(true)
		} else {
			setInactiveNext(false)
		}

		if (+pageActive > 1 && pageActive < numberPages) {
			setInactivePrevious(false)
			setInactiveNext(false)
		}
	}

	const submitAdduserHandler = async (e) => {
		e.preventDefault()

		if (!user.fullName || !user.email)
			return toastError('Full name or email is required')

		if (!validateEmail(user.email)) {
			return toastError('Email is invalid')
		}

		dispatch(addUserHandler(user))
		setUser(initUser)
	}

	useEffect(() => {
		setNumberPages(pages)
		updatePaginationState()
		setUserList(users)
	}, [users])

	useEffect(() => {
		updatePaginationState()
		dispatch(
			getListUserHandler({
				page: pageActive,
			}),
		)
	}, [pageActive])

	useEffect(() => {
		if (error?.length > 0) {
			toastError(error)
			dispatch(clearUserManagementError())
		}
	}, [error])

	useEffect(() => {
		if (message?.length > 0) {
			toastSuccess(message)
			dispatch(clearUserManagementMessage())
		}
	}, [message])

	return (
		<div className='w-full p-4'>
			<div className='relative w-full flex flex-col gap-8'>
				<div className='flex items-center justify-between'>
					<div className='flex gap-2'>
						<button
							onClick={() => setOpenActiveAccount(true)}
							className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600'
						>
							Active Account
						</button>
						<button
							onClick={() => setOpenAddUser(true)}
							className='bg-blue-500 h-[36px] rounded-sm px-3 text-white flex items-center gap-2 hover:bg-blue-600'
						>
							<icons.AiOutlineUserAdd size={20} />
							<span>Add User</span>
						</button>
					</div>
					<nav>
						<ul className='list-style-none flex gap-1'>
							<li>
								<button
									onClick={() => handlerClickPrevious()}
									className={`${
										inactivePrevious
											? 'bg-blue-300 pointer-events-none select-none'
											: 'bg-blue-500'
									} hover:bg-blue-700 hover:text-white cursor-pointer flex justify-center items-center rounded px-3 h-[36px] text-sm text-white font-medium transition-all duration-300 `}
								>
									Previous
								</button>
							</li>
							<li>
								<span
									onClick={() => handlerClickNext()}
									className={`${
										inactiveNext
											? 'bg-blue-300 pointer-events-none select-none'
											: 'bg-blue-500'
									} hover:bg-blue-700 hover:text-white cursor-pointer flex justify-center items-center  rounded px-3 h-[36px] text-sm text-white font-medium transition-all duration-300 bg-blue-500`}
								>
									Next
								</span>
							</li>
						</ul>
					</nav>
				</div>

				{openAddUser && (
					<AddUser
						user={user}
						addUserHandler={onChangeInputs}
						submitAddUserHandler={submitAdduserHandler}
						setOpenAddUser={setOpenAddUser}
					/>
				)}
				{openActiveAccount && (
					<ActiveAccount setOpenActiveAccount={setOpenActiveAccount} />
				)}

				{loading ? (
					<Loading />
				) : (
					<UserList users={userList} activePage={pageActive} />
				)}
			</div>
		</div>
	)
}

export default ListUser
