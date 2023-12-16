import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiChangePassword } from '../../apis'
import { setCurrentEmployee } from '../../redux/slices/auth.slice'
import { toastError, toastSuccess } from '../../utils/toast'
import InputField from '../Share/InputField'

const ChangePasswordDialog = ({ setModel, oldChange = false }) => {
	const dispatch = useDispatch()
	const initInputChangePasword = {
		newPassword: '',
		comfirmPassword: '',
	}

	const [inputs, setInputs] = useState(initInputChangePasword)

	const onChangeInput = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const isMatch = inputs.newPassword === inputs.comfirmPassword
		if (!isMatch) {
			toastError('Password is incorrect. Please try again')
			return setInputs(initInputChangePasword)
		}

		const response = await apiChangePassword(inputs)
		if (response.code === 1) {
			console.log(response)
			dispatch(setCurrentEmployee({ user: response?.metaData?.user }))
			toastSuccess('Change password successful')
			setModel(false)
		} else {
			toastError('Something went wrong. Please try again')
		}
	}

	return (
		<div className='absolute top-0 left-0 right-0 bottom-0 p-4 overflow-x-hidden overflow-y-auto flex justify-center bg-white'>
			<div className='relative w-full max-w-md max-h-full'>
				{/* Modal content */}
				<div className='relative rounded-lg shadow bg-white mt-12'>
					<div className='px-4 py-4'>
						<h3 className='mb-4 text-xl font-medium text-red-600 uppercase'>
							change password for first time login
						</h3>
						<form className='space-y-3'>
							<div className='mb-2'>
								<InputField
									label='New password'
									name='newPassword'
									type='password'
									onChangeInput={onChangeInput}
									value={inputs.newPassword}
								/>
							</div>

							<div className='mb-2'>
								<InputField
									label='Comfirm password'
									name='comfirmPassword'
									type='password'
									onChangeInput={onChangeInput}
									value={inputs.comfirmPassword}
								/>
							</div>

							<button
								onClick={(e) => handleSubmit(e)}
								type='submit'
								className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
							>
								Change Password
							</button>

							{oldChange && (
								<button
									onClick={(e) => setModel(false)}
									className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
								>
									Back Home
								</button>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChangePasswordDialog
