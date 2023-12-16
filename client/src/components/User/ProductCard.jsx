import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	insertOrdertAction,
	updateOrdertAction,
} from '../../redux/actions/invoice.action'
import { updateInvoice } from '../../redux/slices/invoice.slice'
import { formatMoney } from '../../utils/helpers'

const ProductCard = ({ product }) => {
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.authReducer)
	const { orderId, sellerId, items } = useSelector((state) => state.invoices)

	const [orderList, setOrderList] = useState([])
	const [seller, setSleller] = useState('')
	const [order, setOrder] = useState('')

	const insertProductToOrder = () => {
		let updatedItems = []
		const orderProduct = {
			productId: product?._id,
			productName: product?.name,
			quantity: 1,
			price: product?.retailPrice,
			subTotal: product?.retailPrice,
			stocks: product?.investory,
		}

		const indexItems = orderList?.findIndex(
			(item) => item?.productId === orderProduct.productId,
		)

		if (indexItems === -1) {
			updatedItems = [...orderList, orderProduct]
		} else {
			updatedItems = orderList?.map((item) => {
				if (item?.productId === orderProduct.productId) {
					return {
						...item,
						quantity: item?.quantity + 1,
						subTotal: item?.subTotal + item?.price,
					}
				}
				return item
			})
		}

		if (orderId && seller) {
			dispatch(
				updateOrdertAction({
					orderId,
					items: updatedItems,
				}),
			)
		} else {
			dispatch(
				insertOrdertAction({
					sellerId: user._id,
					items: updatedItems,
				}),
			)
		}

		dispatch(updateInvoice(updatedItems))
	}

	useEffect(() => {
		setOrderList(items)
		setSleller(sellerId)
		setOrder(orderId)
	}, [items, sellerId, order])

	return (
		<div className=' py-2 flex justify-between w-[180px] h-[290px] max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md'>
			<div className='mx-auto mt-3 flex overflow-hidden rounded-xl'>
				<img
					className='w-[150px] h-[140px] object-fill'
					src={product?.thumnail}
					alt='product image'
				/>
			</div>
			<div className='mt-2 px-2'>
				<h5 className='text-[14px] tracking-tight text-slate-900 line-clamp-1 font-medium'>
					{product?.name}
				</h5>

				<div className='mt-2 mb-2 flex items-center justify-between'>
					<p>
						<span className='text-[12px] text-slate-900 font-medium'>
							{formatMoney(product?.retailPrice)}
						</span>
					</p>
					<div className='flex items-center'>
						<span className='mr-1 ml-1 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold tex-[12px]'>
							Stocks: {product?.investory}
						</span>
					</div>
				</div>
				<button
					onClick={() => insertProductToOrder()}
					className='flex items-center justify-center rounded-md bg-red-500 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='mr-2 h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
						/>
					</svg>
					Add to cart
				</button>
			</div>
		</div>
	)
}

export default ProductCard
