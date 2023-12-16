import React from 'react'
import { formatMoney } from '../../utils/helpers'
import icons from '../../utils/icons'

const DetailInvoice = ({
	inforDetailInvoice,
	setViewDetailInvoice,
	seller,
	customer,
}) => {
	const { items, total, moneyReceive, moneyBack, totalQuantity } =
		inforDetailInvoice
	return (
		<div
			onClick={() => setViewDetailInvoice(false)}
			className='overflow-x-hidden h-screen fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`bg-white w-[50%] ${
					seller ? 'h-[600px]' : 'h-[500px]'
				} p-4 pt-3 my-[50px] rounded-sm pb-6 `}
			>
				<div className='flex justify-between items-center mb-3'>
					<h1 className='text-3xl font-semibold text-red-500 uppercase'>
						Detials Order
					</h1>
					<icons.AiOutlineClose
						onClick={() => {
							setViewDetailInvoice(false)
						}}
						size={20}
						className='hover:cursor-pointer hover:text-red-500'
					/>
				</div>

				<div>
					{/* Product Items */}
					<div className='mb-2'>
						<h3 className=' text-xl font-semibold mb-2'>Product Items</h3>

						{items?.map((item) => (
							<div key={crypto.randomUUID()}>
								{item?.productName} - Quantity: {item.quantity} - Price:{' '}
								{formatMoney(item?.price)} - Subtoal:{' '}
								{formatMoney(item?.subTotal)}
							</div>
						))}
					</div>

					{/* Order Details */}
					<div className='mb-2 text-[16px]'>
						<h3 className='text-xl font-semibold mb-2'>Order Details</h3>
						<p>Total Quantity: {totalQuantity}</p>
						<p>Total Cost: {formatMoney(total)}</p>
						<p>Money Receive: {formatMoney(moneyReceive)}</p>
						<p>Money Back: {formatMoney(moneyBack)}</p>
					</div>

					{seller && (
						<div className='mb-2 text-[16px]'>
							<h3 className='text-xl font-semibold mb-2'>Seller Infor</h3>
							<p>Seller Name: {seller?.fullName}</p>
							<p>sellerID: {seller?._id}</p>
						</div>
					)}

					{customer && (
						<div className='mb-2 text-[16px]'>
							<h3 className='text-xl font-semibold mb-2'>Customer Infor</h3>
							<p>Customer Name: {customer?.fullName}</p>
							<p>customer Address: {customer?.address}</p>
							<p>Customer Phone: {customer?.phone}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default DetailInvoice
