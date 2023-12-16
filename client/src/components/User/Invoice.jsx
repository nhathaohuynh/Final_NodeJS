import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiUpdateProfile } from '../../apis'
import { apiInsertCustomer, apiUpdateCustomer } from '../../apis/customer.api'
import { apiInsertInvoice, apiRemoveOrder } from '../../apis/invoice.api'
import { setCurrentEmployee } from '../../redux/slices/auth.slice'
import { resetItemsOrder } from '../../redux/slices/invoice.slice'
import { formatMoney } from '../../utils/helpers'
import icons from '../../utils/icons'
import { toastError, toastSuccess } from '../../utils/toast'
import Button from '../Share/Button'
import Loading from '../Share/Loading'

import * as pdfMake from 'pdfmake/build/pdfmake'

// PDF Fonts
const pdfFonts = {
	// download default Roboto font from cdnjs.com
	Roboto: {
		normal:
			'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
		bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
		italics:
			'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
		bolditalics:
			'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf',
	},
}

const Invoice = ({ setOpenInvoice }) => {
	const dispatch = useDispatch()
	const { items, totalQuantity, total, customer, orderId, sellerId } =
		useSelector((state) => state.invoices)

	const { user } = useSelector((state) => state.authReducer)
	const [loadingTask, setLoadingTask] = useState(false)
	const [formData, setFormData] = useState({
		fullName: customer?.fullName,
		phone: customer?.phone,
		address: customer?.address,
		moneyReceive: '',
	})

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const generatePDFInvoice = () => {
		const documentDefinition = {
			content: [
				{ text: 'Invoice', style: 'header' },
				{ text: `Order ID: ${orderId}`, margin: [0, 0, 0, 10] },
				{ text: 'Items:', style: 'subheader' },
				{
					ul: items.map(
						(item) =>
							`${item?.productName} - ${item?.quantity} x ${formatMoney(
								item?.price,
							)} - ${formatMoney(item?.subTotal)}`,
					),
				},
				{ text: `Total: ${formatMoney(total)}`, margin: [0, 10, 0, 10] },
				{
					text: `Money Receive: ${formatMoney(formData?.moneyReceive)}`,
					margin: [0, 10, 0, 10],
				},
				{
					text: `Money Back: ${formatMoney(formData?.moneyReceive - total)}`,
					margin: [0, 10, 0, 10],
				},
				{ text: 'Customer Information:', style: 'subheader' },
				{ text: `Name: ${formData?.fullName}`, margin: [0, 0, 0, 5] },
				{ text: `Address: ${formData?.address}`, margin: [0, 0, 0, 10] },
				{ text: `Address: ${formData?.phone}`, margin: [0, 0, 0, 10] },
				{ text: `Seller Information:`, style: 'subheader' },
				{ text: `SellerId: ${sellerId}`, margin: [0, 0, 0, 5] },
				{ text: `Seller Name: ${user?.fullName}`, margin: [0, 0, 0, 5] },
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					margin: [0, 0, 0, 10],
				},
				subheader: {
					fontSize: 14,
					bold: true,
					margin: [0, 10, 0, 5],
				},
			},
		}

		pdfMake
			.createPdf(documentDefinition, null, pdfFonts)
			.download(`invoice_${orderId}.pdf`)
	}

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!formData.fullName || !formData.address || !formData.phone) {
			return toastError(`Please enter information's customer`)
		}

		if (!formData.moneyReceive) {
			return toastError('Money receive is require')
		}

		if (!(formData?.moneyReceive - total >= 0)) {
			return toastError("Customer don't give enough money")
		}

		setLoadingTask(true)

		let customerResponse

		if (customer?._id) {
			const body = {
				invoices: [...customer?.invoices, orderId],
			}

			customerResponse = await apiUpdateCustomer(customer?._id, body)
		} else {
			const dataCustomer = {
				fullName: formData.fullName,
				phone: formData.phone,
				address: formData.address,
				invoices: [orderId],
			}

			customerResponse = await apiInsertCustomer(dataCustomer)
		}

		if (customerResponse.code === 1) {
			const dataInvoice = {
				_id: orderId,
				items: items.map((product) => {
					return {
						product: product?.productId,
						quantity: product.quantity,
						price: product?.price,
						subTotal: product?.subTotal,
						productName: product?.productName,
					}
				}),
				total,
				moneyBack: formData?.moneyReceive - total,
				moneyReceive: formData.moneyReceive,
				totalQuantity: totalQuantity,
				seller: sellerId,
				customer: customerResponse.metaData?.customer?._id,
			}

			const [response, responseUpdateSeller] = await Promise.all([
				apiInsertInvoice(dataInvoice),
				apiUpdateProfile(sellerId, { invoices: [...user?.invoices, orderId] }),
			])

			let responseRemoveOrder
			if (response.code === 1 && responseUpdateSeller.code === 1) {
				responseRemoveOrder = await apiRemoveOrder(orderId)
			}

			if (responseRemoveOrder.code === 1) {
				generatePDFInvoice()
				setLoadingTask(false)
				dispatch(resetItemsOrder())
				dispatch(
					setCurrentEmployee({ user: responseUpdateSeller.metaData?.user }),
				)
				setOpenInvoice(false)
				toastSuccess('We are grateful for the pleasure of serving you')
			}
		}
	}

	return (
		<>
			{loadingTask ? (
				<Loading />
			) : (
				<div
					onClick={() => setOpenInvoice(false)}
					className='overflow-x-hidden h-screen fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className='w-[40%] h-[100%] bg-white p-4 pt-3 my-[30px] rounded-sm pb-6 '
					>
						<div className='flex justify-between items-center mb-3'>
							<h1 className='text-3xl font-semibold text-red-500 uppercase'>
								Confirm Billing
							</h1>
							<icons.AiOutlineClose
								onClick={() => {
									setOpenGettingPhone(false)
								}}
								size={20}
								className='hover:cursor-pointer hover:text-red-500'
							/>
						</div>

						<form className=' h-[calc(100%-40px)] flex flex-col justify-between'>
							{/* Customer Information */}
							<div className='mb-2'>
								<label
									htmlFor='customerName'
									className='block text-sm font-medium text-gray-700'
								>
									Customer Name
								</label>
								<input
									type='text'
									id='customerName'
									name='fullName'
									value={formData.fullName}
									onChange={handleInputChange}
									className='outline-none focus:border-blue-500 mt-1 p-2 w-full border rounded-md'
									required
								/>
							</div>

							{/* Customer Information */}
							<div className='mb-2'>
								<label
									htmlFor='customerAddress'
									className='block text-sm font-medium text-gray-700'
								>
									Customer Address
								</label>
								<input
									type='text'
									id='customerAddress'
									name='address'
									value={formData.address}
									onChange={handleInputChange}
									className='outline-none focus:border-blue-500 mt-1 p-2 w-full border rounded-md'
									required
								/>
							</div>

							<div className='mb-2'>
								<label
									htmlFor='customerPhone'
									className='block text-sm font-medium text-gray-700'
								>
									Customer Phone
								</label>
								<input
									type='text'
									id='customerPhone'
									name='phone'
									value={formData.phone}
									onChange={handleInputChange}
									className='outline-none focus:border-blue-500 mt-1 p-2 w-full border rounded-md'
									required
								/>
							</div>

							{/* Add more customer fields as needed */}

							{/* Product Items */}
							<div className='mb-2'>
								<h3 className=' text-xl font-semibold mb-2'>Product Items</h3>
								<ul className='text-[12px]'>
									{items.map((item, index) => (
										<li key={index}>
											{item?.productName} - Quantity: {item.quantity} - Price:{' '}
											{formatMoney(item?.price)} - Subtoal:{' '}
											{formatMoney(item?.subTotal)}
										</li>
									))}
								</ul>
							</div>

							{/* Order Details */}
							<div className='mb-2 text-[12px]'>
								<h3 className='text-xl font-semibold mb-2'>Order Details</h3>
								<p>Total Quantity: {totalQuantity}</p>
								<p>Total Cost: {formatMoney(total)}</p>
								<p>Order ID: {orderId}</p>
								<p>Seller ID: {sellerId}</p>
							</div>

							{/* Payment Information */}
							<div className='mb-2'>
								<label
									htmlFor='moneyReceive'
									className='block text-sm font-medium text-gray-700'
								>
									Money Receive
								</label>
								<input
									type='number'
									id='moneyReceive'
									name='moneyReceive'
									value={formData.moneyReceive}
									onChange={handleInputChange}
									className='outline-none focus:border-blue-500 mt-1 p-2 w-full border rounded-md'
									required
								/>
							</div>
							<div className='mb-2'>
								<label
									htmlFor='monneyBack'
									className='block text-sm font-medium text-gray-700'
								>
									Money Back
								</label>
								<input
									type='number'
									id='monneyBack'
									name='moneyBack'
									readOnly={true}
									value={
										formData?.moneyReceive ? formData?.moneyReceive - total : ''
									}
									className='outline-none focus:border-blue-500 mt-1 p-2 w-full border rounded-md'
									required
								/>
							</div>

							{/* Add more payment fields as needed */}

							{/* Submit Button */}
							<div className='mt-4'>
								<Button onClickButton={handleSubmit}>Complete Purchase</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default Invoice
