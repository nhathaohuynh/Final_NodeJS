import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { apiGetReportsInvoice } from '../../apis/invoice.api'
import { Loading } from '../../components'
import DetailInvoice from '../../components/User/DetailInvoice'
import { formatMoney } from '../../utils/helpers'
import icons from '../../utils/icons'
import { toastError } from '../../utils/toast'

function ManagementReposts() {
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(false)
	const [detailInvoice, setDetailInvoice] = useState(false)
	const [currentInvoice, setCurrentInvoice] = useState(null)

	const [value, setValue] = useState({
		startDate: null,
		endDate: null,
	})

	const handleValueChange = (newValue) => {
		setValue(newValue)
	}

	const fetchDataReports = async (timeline = '') => {
		setLoading(true)

		let response

		if (timeline) {
			const body = {
				timeline,
			}
			response = await apiGetReportsInvoice(body)
		} else {
			response = await apiGetReportsInvoice()
		}
		if (response.code == 1) {
			setData(response.metaData)
			setLoading(false)
		}
	}

	const fetchDataReportWithSelectDate = async () => {
		if (!value.startDate || !value?.endDate) {
			return toastError('Please choose the date start and date end')
		}

		setLoading(true)
		const body = {
			timeline: 'custom',
			...value,
		}
		const response = await apiGetReportsInvoice(body)

		if (response.code == 1) {
			setData(response.metaData)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchDataReports()
	}, [])

	console.log(data)

	return (
		<div className='w-full p-4'>
			{loading ? (
				<Loading />
			) : (
				<div className='relative w-full flex flex-col gap-8 text-white'>
					<h1 className='text-[24px] mb-2 text-blue-500 font-medium uppercase'>
						Reporting And Analytics Admin
					</h1>

					<div>
						<h3 className='mb-2'>Optional Date</h3>
						<div className='flex gap-10'>
							<button
								onClick={() => {
									fetchDataReports('today')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[300px]'
							>
								Today
							</button>
							<button
								onClick={() => {
									fetchDataReports('yesterday')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[300px]'
							>
								Yesterday
							</button>
							<button
								onClick={() => {
									fetchDataReports('last7days')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[300px]'
							>
								last 7 days
							</button>
							<button
								onClick={() => {
									fetchDataReports('thisMonth')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[300px]'
							>
								This Month
							</button>
							<button
								onClick={() => {
									fetchDataReports('lastMonth')
								}}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[300px]'
							>
								Last Month
							</button>
						</div>
					</div>
					<div>
						<h3 className='mb-2'>Selection Date</h3>
						<div className='flex gap-10'>
							<Datepicker
								showShortcuts={true}
								showFooter={true}
								value={value}
								onChange={handleValueChange}
							/>
							<button
								onClick={() => fetchDataReportWithSelectDate()}
								className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[300px]'
							>
								Apply
							</button>
						</div>
					</div>

					<div className='mt-5'>
						<h2 className=' mb-4'>Reporting And Analytics</h2>
						<div className='flex gap-5 text-center'>
							<div className='bg-yellow-500 rounded-sm p-2 text-white hover:bg-yellow-600 w-[300px]'>
								<p className='font-bold'>{data?.numberOfInvoice}</p>
								<p>Invoices</p>
							</div>

							<div className='bg-yellow-500 rounded-sm p-2 text-white hover:bg-yellow-600 w-[300px]'>
								<p className='font-bold'>{data?.totalQuantity}</p>
								<p>Total Quantity</p>
							</div>

							<div className='bg-green-500 rounded-sm p-2 text-white hover:bg-green-600 w-[300px]'>
								<p className='font-bold'>{formatMoney(data?.totalAmount)}</p>
								<p>Total Incomes</p>
							</div>

							<div className='bg-green-500 rounded-sm p-2 text-white hover:bg-green-600 w-[300px]'>
								<p className='font-bold'>{formatMoney(data?.totalProfit)}</p>
								<p>Total Profit</p>
							</div>
						</div>

						<div className='mt-4'>
							<h2 className='mb-2'>Orders Lists</h2>
							<table className='text-sm text-left text-gray-300 w-full'>
								<thead className='text-xs uppercase text-center bg-gray-700 text-white px-4'>
									<tr>
										<th scope='col' className='p-2'>
											Id
										</th>
										<th scope='col' className='p-2'>
											Date
										</th>
										<th scope='col' className='p-2'>
											Quantity
										</th>
										<th scope='col' className='p-2'>
											Incomes
										</th>
										<th scope='col' className='p-2'>
											Money Receives
										</th>

										<th scope='col' className='p-2'>
											MoneyBack
										</th>
										<th scope='col' className='p-2'>
											Detail Invoive
										</th>
									</tr>
								</thead>
								<tbody>
									{data?.orders?.map((order, index) => {
										return (
											<tr
												className=' bg-gray-800 text-center'
												key={crypto.randomUUID()}
											>
												<td className='w-4 p-2'>{index + 1}</td>

												<td className='p-2 capitalize font-medium'>
													{dayjs(new Date(order?.createdAt)).format(
														'DD-MM-YYYY',
													)}
												</td>
												<td className='p-2'>{order?.totalQuantity}</td>
												<td className='p-2'>{formatMoney(order?.total)}</td>

												<td className='p-2'>
													{formatMoney(order?.moneyReceive)}
												</td>
												<td className='p-2'>{formatMoney(order?.moneyBack)}</td>
												<td className='p-2 flex justify-center'>
													<icons.FiEye
														onClick={() => {
															setDetailInvoice(true)
															setCurrentInvoice(index)
														}}
														size={20}
														className='hover:cursor-pointer hover:text-white text-green-500 text-center'
													></icons.FiEye>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}

			{detailInvoice && (
				<DetailInvoice
					inforDetailInvoice={data.orders[currentInvoice]}
					setViewDetailInvoice={setDetailInvoice}
					seller={data.orders[currentInvoice]?.seller}
					customer={data.orders[currentInvoice]?.customer}
				/>
			)}
		</div>
	)
}

export default ManagementReposts
