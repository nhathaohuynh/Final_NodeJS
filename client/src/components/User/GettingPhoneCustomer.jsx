import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiGetCustomerByPhone } from '../../apis'
import { updatedInforCustomer } from '../../redux/slices/invoice.slice'
import icons from '../../utils/icons'
import { toastError, toastSuccess } from '../../utils/toast'
const GettingPhoneCustomer = ({ setOpenGettingPhone }) => {
	const [phone, setPhone] = useState('')
	const dispatch = useDispatch()

	const gettingPhonelHandler = async () => {
		const phoneNumberRegex = /^\d{4}\d{3}\d{3}$/
		if (!phone) return toastError('Phone is required')

		if (!phoneNumberRegex.test(phone))
			return toastError('Wrong formatted number phone must be 10 number')
		const response = await apiGetCustomerByPhone({ phone })

		toastSuccess('Already update information for invoice')
		setPhone('')
		setOpenGettingPhone(false)
		if (response?.code === 1) {
			const customer = response.metaData?.customer
			console.log(customer)
			dispatch(
				updatedInforCustomer({
					_id: customer?._id,
					phone: phone,
					fullName: customer?.fullName,
					address: customer?.address,
					invoices: customer?.invoices,
				}),
			)
		} else {
			dispatch(updatedInforCustomer({ phone: phone }))
		}
	}

	return (
		<div
			onClick={() => setOpenGettingPhone(false)}
			className='overflow-y-auto h-screen overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='w-[40%] bg-white h-[150px] p-6 pt-3 gap-4 mt-[100px] rounded-sm'
			>
				<div className='flex justify-between items-center'>
					<h1 className='text-3xl font-semibold text-blue-500'>
						Getting Phone Number
					</h1>
					<icons.AiOutlineClose
						onClick={() => {
							setOpenGettingPhone(false)
						}}
						size={20}
						className='hover:cursor-pointer hover:text-red-500'
					/>
				</div>
				<div className='flex items-center gap-2 mt-5 '>
					<input
						type='text'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						id='helper-text'
						className='bg-gray-50 border h-[40px] border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none'
						placeholder='Example 0399331472'
					/>
					<button
						type='button'
						onClick={() => gettingPhonelHandler()}
						className='text-white w-[30%] mx-auto bg-gradient-to-br h-[40px] from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center text-center'
					>
						Comfirm
					</button>
				</div>
			</div>
		</div>
	)
}

export default GettingPhoneCustomer
