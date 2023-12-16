import clsx from 'clsx'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiGetUser, apiToggleLockUser } from '../../apis'
import {
	removeUserHandler,
	toggleLockHandler,
} from '../../redux/actions/userManagement.action'
import icons from '../../utils/icons'
import ConfirmDialog from '../Share/ConfirmDialog'
import Profile from '../Share/Profile'

const UserList = ({ users, activePage }) => {
	const dispatch = useDispatch()
	const [textDialog, setTextDialog] = useState('delete this user')
	const [openDialog, setOpenDialog] = useState(false)
	const [currentUserId, setCurrentUserId] = useState('')
	const [viewProfile, setViewProfile] = useState(false)
	const [profileEmployee, setProfileEmployee] = useState({})

	const handleClickRemoveUser = async () => {
		dispatch(removeUserHandler(currentUserId))
	}

	const viewDetailProfileHandler = async (userId) => {
		const response = await apiGetUser(userId)
		if (response.code === 1) {
			setViewProfile(true)
			setProfileEmployee(response.metaData?.user)
		}
	}

	const togleLockUserHandler = async (userId) => {
		dispatch(toggleLockHandler(userId))
	}
	return (
		<>
			<table className='text-sm text-left text-gray-300 w-full'>
				<thead className='text-xs uppercase bg-gray-700 text-white px-4'>
					<tr>
						<th scope='col' className='p-2'>
							Id
						</th>
						<th scope='col' className='p-2'>
							Name
						</th>
						<th scope='col' className='p-2'>
							Role
						</th>
						<th scope='col' className='p-2'>
							Status
						</th>
						<th scope='col' className='p-2'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user, index) => {
						return (
							<tr className=' bg-gray-800' key={crypto.randomUUID()}>
								<td className='w-4 p-2'>
									{activePage > 1 ? activePage * 10 + index + 1 : index + 1}
								</td>
								<th
									scope='row'
									className='flex items-center p-2 whitespace-nowrap marker:text-white'
								>
									<img
										className='w-10 h-10 rounded-full'
										alt='Jese image'
										src={user?.avatar}
									/>
									<div className='pl-3'>
										<div className='text-base font-semibold'>
											{user.fullName}
										</div>
										<div className='font-normal text-gray-500'>
											{user?.email}
										</div>
									</div>
								</th>
								<td className='p-2 capitalize'>{user?.role}</td>
								<td className='p-2'>
									<div className='flex items-center '>
										<span
											className={clsx(
												{ 'bg-green-500': user?.alreadyChangePassword },
												{ 'bg-red-500': !user?.alreadyChangePassword },
												' text-white p-1 px-2 rounded-lg capitalize',
											)}
										>
											{user?.alreadyChangePassword ? 'active' : 'inactive'}
										</span>
									</div>
								</td>
								<td className='p-2 '>
									<div className='flex gap-4'>
										{/* <icons.FiEdit
											size={20}
											className='hover:cursor-pointer hover:text-white text-green-500'
										></icons.FiEdit> */}

										{user.isLock ? (
											<icons.FiUnlock
												size={20}
												className='hover:cursor-pointer hover:text-white text-green-500'
												onClick={() => togleLockUserHandler(user?._id)}
											/>
										) : (
											<icons.FiLock
												size={20}
												className='hover:cursor-pointer hover:text-white text-green-500'
												onClick={() => togleLockUserHandler(user?._id)}
											/>
										)}
										<icons.FiTrash
											onClick={() => {
												setOpenDialog(true)
												setCurrentUserId(user?._id)
											}}
											size={20}
											className='hover:cursor-pointer hover:text-white text-red-500'
										></icons.FiTrash>
										<icons.FiEye
											size={20}
											className='hover:cursor-pointer hover:text-white text-blue-500'
											onClick={() => viewDetailProfileHandler(user?._id)}
										></icons.FiEye>
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			{openDialog && (
				<ConfirmDialog
					text={textDialog}
					handleClickNo={() => setOpenDialog(false)}
					handleClickYes={handleClickRemoveUser}
				/>
			)}

			{viewProfile && (
				<Profile
					userData={profileEmployee}
					isAdmin={true}
					setViewProfile={setViewProfile}
				/>
			)}
		</>
	)
}

export default UserList
