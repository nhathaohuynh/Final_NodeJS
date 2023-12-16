import { set } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatMoney } from '../../utils/helpers'
import icons from '../../utils/icons'

const ViewCustomer = ({
	setViewCustomer,
	setViewDetailInvoice,
	setInforDetailInvoice,
}) => {
	const { customer } = useSelector((state) => state.invoices)
	return (
		<>
			<div
				onClick={() => setViewCustomer(false)}
				className='overflow-x-hidden h-screen fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className='w-[40%] h-[500px] bg-white p-4 pt-3 mt-[50px] rounded-sm pb-6 '
				>
					<div className='flex justify-between items-center mb-3'>
						<h1 className='text-3xl font-semibold text-red-500 uppercase'>
							View Customer
						</h1>
						<icons.AiOutlineClose
							onClick={() => {
								setViewCustomer(false)
							}}
							size={20}
							className='hover:cursor-pointer hover:text-red-500'
						/>
					</div>

					<div className='h-auto'>
						{/* Customer Information */}
						<div className='my-4'>
							<h3 className=' text-xl font-semibold mb-2'>
								Information customer
							</h3>
							<p>Customer Name: {customer?.fullName}</p>
							<p>Customer Address: {customer?.address}</p>
							<p>Customer Phone: {customer?.phone}</p>
						</div>
						{/* Product Items */}
						<div className='mb-2'>
							<h3 className=' text-xl font-semibold mb-2'>List Orders</h3>
							<ul className='text-[14px]'>
								{customer?.invoices?.map((invoice, index) => (
									<li key={crypto.randomUUID()}>
										<p>Invoive ID: {invoice?._id}</p>
										<p>
											Total amount: {formatMoney(invoice?.total)}{' '}
											<span
												onClick={() => {
													setViewDetailInvoice(true)
													setInforDetailInvoice({
														items: invoice?.items,
														moneyBack: invoice?.moneyBack,
														moneyReceive: invoice?.moneyReceive,
														totalQuantity: invoice?.totalQuantity,
														total: invoice?.total,
														invoiceID: invoice?._id,
													})
													setViewCustomer(false)
												}}
												className='underline text-blue-500 cursor-pointer'
											>
												View details
											</span>
										</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ViewCustomer
