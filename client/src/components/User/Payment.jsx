import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiRemoveOrder } from '../../apis/invoice.api'
import { updateOrdertAction } from '../../redux/actions/invoice.action'
import {
	deleteItemInOrder,
	resetItemsOrder,
	updateDescreaseQuantity,
	updateIncreaseQuantity,
} from '../../redux/slices/invoice.slice'
import { formatMoney } from '../../utils/helpers'
import icons from '../../utils/icons'
import { toastError } from '../../utils/toast'
import GettingPhoneCustomer from './GettingPhoneCustomer'
import Invoice from './Invoice'

const Payment = () => {
	const dispatch = useDispatch()
	const { items, total, totalQuantity, orderId, customer } = useSelector(
		(state) => state.invoices,
	)
	const [orders, setOrders] = useState([])
	const [openGettingPhone, setOpenGettingPhone] = useState(false)
	const [order, setOrder] = useState('')
	const [openInvoice, setOpenInvoice] = useState(false)

	const descreaseQuantityHandler = async (productId) => {
		const indexItems = orders?.findIndex(
			(item) => item?.productId === productId,
		)
		if (indexItems === -1) return

		const updatedItems = orders.map((item) => {
			if (item?.productId === productId) {
				return {
					...item,
					quantity: item?.quantity - 1,
					subTotal: item?.subTotal - item?.price,
				}
			}
			return item
		})

		const newItems = updatedItems.filter((item) => item?.quantity > 0)

		dispatch(updateDescreaseQuantity(newItems))

		if (order) {
			console.log(order)
			dispatch(
				updateOrdertAction({
					orderId: order,
					items: newItems,
				}),
			)
		}
	}

	const increaseQuantityHandler = async (productId, stocks) => {
		const indexItems = orders?.findIndex(
			(item) => item?.productId === productId,
		)
		if (indexItems === -1) return

		const updatedItems = orders.map((item) => {
			if (item?.productId === productId) {
				return {
					...item,
					quantity: item?.quantity + 1,
					subTotal: item?.subTotal + item?.price,
				}
			}
			return item
		})

		const isAvaiableProduct = updatedItems?.every(
			(item) => item?.quantity > stocks,
		)

		if (!!isAvaiableProduct) {
			return toastError('Stocks is not avaiable product')
		}

		dispatch(updateIncreaseQuantity(updatedItems))

		if (order) {
			dispatch(
				updateOrdertAction({
					orderId: order,
					items: updatedItems,
				}),
			)
		}
	}

	const deleteOrderHandler = (productId) => {
		const updatedItems = orders?.filter((item) => item?.productId !== productId)
		console.log(updatedItems)
		dispatch(deleteItemInOrder(updatedItems))

		if (order) {
			dispatch(
				updateOrdertAction({
					orderId: order,
					items: updatedItems,
				}),
			)
		}
	}

	const resetOrderHandler = async () => {
		dispatch(resetItemsOrder())

		if (order) {
			await apiRemoveOrder(order)
		}
	}

	useEffect(() => {
		setOrders(items)
		setOrder(orderId)
	}, [items, orderId])

	return (
		<div className='bg-white h-full rounded text-[14px]'>
			{/* Product List */}
			<div className='h-[70%] overflow-auto scrollBar'>
				<div className='flex justify-between items-center bg-neutral-100 h-[36px] px-2 rounded font-medium'>
					<div className='w-2/6'>Product Name</div>
					<div className='w-1/6 text-center'>Quantity</div>
					<div className='w-1/6 text-center'>Price</div>
					<div className='w-1/6 text-center'>Subtotal</div>
					<div className='w-1/6 text-center'>Action</div>
				</div>
				{/* Fake Product 1 */}

				<div>
					{orders?.map((order) => {
						return (
							<div
								className='flex justify-between items-center p-2 border-b text-[12px]'
								key={crypto.randomUUID()}
							>
								<div className='w-2/6 flex items-center space-x-2'>
									<h5 className='line-clamp-1'>{order?.productName}</h5>
								</div>
								<div className='w-1/6 flex items-center justify-center'>
									<button
										onClick={() => descreaseQuantityHandler(order?.productId)}
										className='px-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'
									>
										-
									</button>
									<span className='px-2'>{order?.quantity}</span>
									<button
										onClick={() =>
											increaseQuantityHandler(order?.productId, order?.stocks)
										}
										className='px-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'
									>
										+
									</button>
								</div>
								<div className='w-1/6 flex items-center justify-center'>
									{formatMoney(order?.price)}
								</div>
								<div className='w-1/6 flex items-center justify-center'>
									{formatMoney(order?.price * order?.quantity)}
								</div>
								<div className='w-1/6 flex items-center justify-center'>
									<button onClick={() => deleteOrderHandler(order?.productId)}>
										<icons.AiOutlineDelete color='red' size={16} />
									</button>
								</div>
							</div>
						)
					})}
				</div>
			</div>
			<div>
				{/* Payment Summary */}
				<div className='mt-4 border-t border-gray-200 '>
					<h3 className='text-lg font-semibold underline mt-2 text-red-500 mb-2'>
						Payment Summary
					</h3>
					<div className='flex justify-between items-center'>
						<span className='text-gray-600'>Total Quantity:</span>
						<span className='text-gray-800'>{totalQuantity}</span>
					</div>
					<div className='flex justify-between items-center'>
						<span className='text-gray-600'>Total:</span>
						<span className='text-blue-500 text-xl font-semibold'>
							{formatMoney(total)}
						</span>
					</div>
				</div>

				{/* Payment Button */}
				<div className='mt-4 flex justify-center gap-4 mb-6'>
					<button
						onClick={() => setOpenGettingPhone(true)}
						className='flex gap-2 items-center justify-center px-4 h-[36px] bg-yellow-500 text-white rounded w-[40%] hover:bg-yellow-600 focus:outline-none font-semibold'
					>
						<span>Get Contact</span>
						<icons.AiOutlineUser size={18} />
					</button>
					<button
						onClick={() => {
							if (!customer?.phone)
								return toastError("You must get customer's phone first")

							if (items.length === 0)
								return toastError('Customer must buy some product')

							setOpenInvoice(true)
						}}
						className=' flex gap-2 items-center justify-center px-4 h-[36px] bg-blue-500 text-white rounded w-[40%] hover:bg-blue-600 focus:outline-none font-semibold'
					>
						<span>Pay Now</span>
						<icons.FaRegMoneyBillAlt size={16} />
					</button>
					<button
						onClick={() => resetOrderHandler()}
						className='flex gap-2 items-center justify-center px-4 h-[36px] bg-red-500 text-white rounded w-[40%] hover:bg-red-600 focus:outline-none font-semibold'
					>
						<span>Reset</span>
						<icons.BsArrowCounterclockwise size={18} />
					</button>
				</div>
			</div>
			{openGettingPhone && (
				<GettingPhoneCustomer setOpenGettingPhone={setOpenGettingPhone} />
			)}

			{openInvoice && <Invoice setOpenInvoice={setOpenInvoice} />}
		</div>
	)
}

export default Payment
