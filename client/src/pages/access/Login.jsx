import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, InputField, Loading } from '../../components'
import { loginAction } from '../../redux/actions/auth.action'
import { clearError } from '../../redux/slices/auth.slice'
import path from '../../utils/path'
import { toastError } from '../../utils/toast'
import { validateLoginForm } from '../../validation'

const Login = () => {
	const { error, isLogin, user, loading } = useSelector(
		(state) => state.authReducer,
	)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initInputs = {
		username: '',
		password: '',
	}
	const [inputs, setInputs] = useState(initInputs)

	const [isFormValid, setIsFormValid] = useState(false)

	const onChangeInput = (e) => {
		if (!isFormValid) setIsFormValid(true)
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmitForm = (e) => {
		e.preventDefault()

		const errors = Object.entries(validateLoginForm(inputs))

		if (errors.length > 0) {
			const arrayErrors = errors.map((error) => error[1])
			setIsFormValid(false)
			toastError(arrayErrors[0])
			return
		}

		dispatch(loginAction(inputs))
		setInputs(initInputs)
	}

	useEffect(() => {
		if (error) {
			setIsFormValid(false)
			toastError(error)
			dispatch(clearError())
		}
		if (isLogin && user) {
			if (user?.isLock) {
				navigate(`/${path.LOGIN}`)
			} else if (user?.role === 'seller') {
				navigate(`/${path.HOME}`)
			} else if (user?.role === 'admin') {
				navigate(`/${path.ADMIN_PRODUCT}`)
			} else {
			}
		}
	}, [error, isLogin])
	return (
		<>
			{loading ? (
				<Loading></Loading>
			) : (
				<>
					<div className="w-full h-screen max-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[url('/src/assets/bg.jpg')]">
						<div className='w-full sm:max-w-md p-5 mx-auto bg-white rounded'>
							<h2 className='mb-12 text-center text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-transparent bg-clip-text '>
								Welcome Back!
							</h2>

							<form>
								<div className='mb-2'>
									<InputField
										label='Username'
										name='username'
										onChangeInput={onChangeInput}
										value={inputs.username}
									/>
								</div>

								<div className='mb-2'>
									<InputField
										label='Password'
										name='password'
										type='password'
										onChangeInput={onChangeInput}
										value={inputs.password}
									/>
								</div>

								<div className='mt-6 flex items-center justify-between'>
									<div className='flex items-center'>
										<input
											id='remember_me'
											type='checkbox'
											className='border border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
										/>
										<label
											htmlFor='remember_me'
											className='ml-2 block text-[16px] text-gray-900'
										>
											Remember me
										</label>
									</div>
								</div>

								<div className='mt-6'>
									<Button
										text='Sign in'
										onClickButton={onSubmitForm}
										isDisable={!isFormValid}
									/>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default Login
