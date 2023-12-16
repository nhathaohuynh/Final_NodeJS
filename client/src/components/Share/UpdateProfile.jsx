import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiUpdateProfile } from '../../apis'
import { setCurrentEmployee } from '../../redux/slices/auth.slice'
import icons from '../../utils/icons'
import { toastError, toastSuccess } from '../../utils/toast'
import { validateEmail } from '../../validation'
import Button from './Button'

const UpdateProfile = ({ setUpdateProfile, userData }) => {
	const dispatch = useDispatch()
	const initProfile = {
		fullName: userData?.fullName,
		email: userData?.email,
		avatar: userData?.avatar,
		file: '',
	}

	const [profile, setProfile] = useState(initProfile)

	const onChangeInputsHandler = (e) => {
		setProfile({
			...profile,
			[e.target.name]:
				e.target.name === 'file' ? e.target.files[0] : e.target.value,
		})
	}

	const updateProfileHandler = async (e) => {
		e.preventDefault()

		if (!profile.avatar || !profile.email || !profile.fullName) {
			return toastError('Email and fullName is required')
		}

		if (!validateEmail(profile.email)) return toastError('Email is invalid')

		const formData = new FormData()

		formData.set('fullName', profile.fullName)
		formData.set('avatar', profile.file)
		formData.set('email', profile.email)

		const response = await apiUpdateProfile(userData._id, formData)

		if (response.code === 1) {
			toastSuccess('Update profile successful')
			setUpdateProfile(false)
			dispatch(setCurrentEmployee({ user: response.metaData?.user }))
		} else {
			toastError('Update profile failed')
		}
	}
	return (
		<div
			onClick={() => setUpdateProfile(false)}
			className='overflow-y-auto h-screen overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='w-[40%] mx-auto p-4 mt-[50px]'
			>
				<form className='bg-white p-6 rounded shadow-md'>
					<div className='flex justify-between'>
						<h1 className='text-3xl font-semibold mb-4 text-blue-500'>
							Update Profile
						</h1>
						<icons.AiOutlineClose
							onClick={(e) => {
								setUpdateProfile(false)
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
							value={profile?.fullName}
							onChange={(e) => onChangeInputsHandler(e)}
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
							onChange={(e) => onChangeInputsHandler(e)}
							value={profile?.email}
						/>
					</div>

					<div className='mb-4 relative w-ful'>
						<div className='mb-2'>
							<label
								htmlFor='profileImage'
								className='block text-gray-700 text-sm font-bold mb-2'
							>
								Avatar
							</label>
							<input
								type='file'
								name='file'
								className='file-input file-input-bordered file-input-info w-full max-w-xs'
								accept='image/*'
								onChange={(e) => onChangeInputsHandler(e)}
							/>
						</div>
						<div>
							<img
								className='w-24 h-24 rounded-full'
								src={
									!!profile.file
										? URL.createObjectURL(profile.file)
										: profile?.avatar
								}
								alt='User Avatar'
							/>
						</div>
					</div>

					<Button
						className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
						onClickButton={updateProfileHandler}
					>
						Save
					</Button>
				</form>
			</div>
		</div>
	)
}

export default UpdateProfile
