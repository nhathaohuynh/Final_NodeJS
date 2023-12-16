import React from 'react'
import icons from '../../utils/icons'
import Button from '../Share/Button'

const AddUser = ({
	user,
	setOpenAddUser,
	addUserHandler,
	submitAddUserHandler,
}) => {
	return (
		<div
			onClick={() => setOpenAddUser(false)}
			className='overflow-y-auto h-screen overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='w-[50%] mx-auto p-4 mt-[50px]'
			>
				<form className='bg-white p-6 rounded shadow-md'>
					<div className='flex justify-between'>
						<h1 className='text-3xl font-semibold mb-4 text-blue-500'>
							Add New User
						</h1>
						<icons.AiOutlineClose
							onClick={(e) => {
								setOpenAddUser(false)
							}}
							size={20}
							className='hover:cursor-pointer hover:text-red-500'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='fullName' className='block text-gray-700'>
							Full Name
						</label>
						<input
							type='text'
							id='fullName'
							name='fullName'
							className='w-full px-3 py-2 border rounded-lg placeholder:font-light outline-none focus:border-blue-400'
							placeholder='Huynh Nhat Hao'
							value={user.fullName}
							onChange={(e) => addUserHandler(e)}
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='email' className='block text-gray-700'>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className='w-full px-3 py-2 border placeholder:font-light rounded-lg outline-none focus:border-blue-400'
							placeholder='huynhnhathao@gmail.com'
							onChange={(e) => addUserHandler(e)}
							value={user.email}
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Role</label>
						<div className='flex items-center space-x-4'>
							<label htmlFor='roleUser' className='flex items-center'>
								<input
									type='radio'
									id='roleUser'
									name='role'
									defaultValue='seller'
									defaultChecked={user.role === 'seller'}
									onChange={(e) => addUserHandler(e)}
								/>
								<span className='ml-2'>Seller</span>
							</label>
							<label htmlFor='roleManagement' className='flex items-center'>
								<input
									type='radio'
									id='roleManagement'
									name='role'
									defaultValue='Management'
									defaultChecked={user.role === 'Management'}
									onChange={(e) => addUserHandler(e)}
								/>
								<span className='ml-2'>Management</span>
							</label>
						</div>
					</div>
					<Button
						className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
						onClickButton={submitAddUserHandler}
					>
						Add User
					</Button>
				</form>
			</div>
		</div>
	)
}

export default AddUser
