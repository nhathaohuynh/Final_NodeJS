import _debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiGetCurrentEmployee, apiGetProductList } from '../../apis'
import logoImage from '../../assets/Logo.jpg'
import {
	ChangePasswordDialog,
	ConfirmDialog,
	Loading,
	Payment,
	UpdateProfile,
	ViewCustomer,
} from '../../components'
import Profile from '../../components/Share/Profile'
import DetailInvoice from '../../components/User/DetailInvoice'
import ProductCard from '../../components/User/ProductCard'
import {
	insertOrdertAction,
	updateOrdertAction,
} from '../../redux/actions/invoice.action'
import { setCurrentEmployee } from '../../redux/slices/auth.slice'
import { updateInvoice } from '../../redux/slices/invoice.slice'
import icons from '../../utils/icons'
import { logout } from '../../utils/logout'
import { toastError } from '../../utils/toast'
const HomeEmployee = () => {
	const { token, user, isLogin, isGetCurrentUser } = useSelector(
		(state) => state.authReducer,
	)
	const location = useLocation()
	const dispatch = useDispatch()
	const { orderId, sellerId, items, customer } = useSelector(
		(state) => state.invoices,
	)
	const [orderList, setOrderList] = useState([])
	const [seller, setSleller] = useState('')
	const [order, setOrder] = useState('')
	const navigate = useNavigate()
	const queryParams = new URLSearchParams(location.search)
	const [model, setModel] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [viewProfile, setViewProfile] = useState(false)
	const [updateProfile, setUpdateProfie] = useState(false)
	const [productList, setProductList] = useState([])
	const [pageActive, setPageActive] = useState(+queryParams.get('page') || 1)
	const [numberPages, setNumberPages] = useState(100)
	const [inactiveNext, setInactiveNext] = useState(false)
	const [inactivePrevious, setInactivePrevious] = useState(false)
	const [debounceTimeout, setDebounceTimeout] = useState(null)
	const [textSearch, setTextSearch] = useState('')
	const [viewCustomer, setViewCustomer] = useState(false)
	const [viewDetailInvoice, setViewDetailInvoice] = useState(false)
	const [inforDetailInvoice, setInforDetailInvoice] = useState('')

	const getCurrentEmployee = async () => {
		const response = await apiGetCurrentEmployee(token)

		if (response.data.code === 1)
			dispatch(setCurrentEmployee({ user: response.data.metaData?.user }))
	}

	const getProductListHandler = async (params) => {
		const response = await apiGetProductList(token, params)

		if (response.data?.code === 1) {
			const balanceProducts = response.data.metaData.data?.counts % 10
			let pages = 0

			if (balanceProducts > 0) {
				pages = Math.floor(response.data.metaData.data?.counts / 10 + 1)
			} else {
				pages = response.data.metaData.data?.counts / 10
			}

			if (pages === 0) {
				return
			}

			if (pageActive > pages || pageActive <= 0) {
				return toastError('Invalid page number')
			}

			setProductList(response.data.metaData?.data?.product)
			setNumberPages(pages)

			const currentSearch = new URLSearchParams(location.search)

			for (const [key, value] of Object.entries(params)) {
				currentSearch.set(key, value)
			}

			const newUrl = `${location.pathname}?${currentSearch.toString()}`

			navigate(newUrl, { replace: true })
		}
	}

	function isUUID(str) {
		const uuidRegex =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
		return uuidRegex.test(str)
	}

	const onChangeTextSearch = (e) => {
		setTextSearch(e.target.value)
		// Clear the previous timeout
		if (!e.target.value.trim()) return
		if (isUUID(e.target.value)) {
			return
		} else {
			if (debounceTimeout) {
				clearTimeout(debounceTimeout)
			}
			// Set a new timeout to trigger the API call after 300 milliseconds
			const newDebounceTimeout = setTimeout(() => {
				handlerSubmitSearch(e.target.value)
			}, 500)

			// Save the new timeout ID to the state
			setDebounceTimeout(newDebounceTimeout)
		}
	}

	const handlerSubmitSearch = async (text) => {
		setPageActive(1)
		getProductListHandler({
			search: text,
		})
	}

	const handlerClickPrevious = async () => {
		if (pageActive - 1 >= 0) {
			setPageActive(pageActive - 1)
		}
	}

	const handlerClickNext = async () => {
		if (pageActive + 1 <= numberPages) {
			setPageActive(pageActive + 1)
		}
	}

	const updatePaginationState = () => {
		if (+pageActive <= 1) {
			setInactivePrevious(true)
		} else {
			setInactivePrevious(false)
		}
		if (+pageActive >= numberPages) {
			setInactiveNext(true)
		} else {
			setInactiveNext(false)
		}

		if (+pageActive > 1 && pageActive < numberPages) {
			setInactivePrevious(false)
			setInactiveNext(false)
		}
	}

	const onKeyEnterDownHandler = async (e) => {
		if (!e.key == 'Enter') return
		if (!isUUID(e.target.value)) return

		const response = await apiGetProductList(token, { search: e.target.value })

		if (response.data?.code === 1) {
			const product = response.data.metaData?.data?.product[0]
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
			setTextSearch('')
			const newUrl = `${location.pathname}`

			navigate(newUrl, { replace: true })
		}
	}

	useEffect(() => {
		if (!isLogin || user?.role !== 'seller' || user?.isLock) {
			logout()
		}
		if (isLogin && user?._id && !isGetCurrentUser) {
			getCurrentEmployee()
		}
		if (!user?.alreadyChangePassword) {
			setModel(true)
		}
	}, [user, isLogin])

	useEffect(() => {
		updatePaginationState()
		const params = {
			page: pageActive,
		}

		if (textSearch) {
			params.search = textSearch
		}

		getProductListHandler(params)
	}, [pageActive])

	useEffect(() => {
		setOrderList(items)
		setSleller(sellerId)
		setOrder(orderId)
	}, [items, sellerId, order])

	return (
		<>
			<div className='flex h-screen max-h-screen select-none'>
				{/* Left Page - Payment Area */}
				<div className='fixed top-0 left-0 bottom-0 w-[35%] flex flex-col p-4 py-1 border-r border-gray-200 '>
					{/* Manage Account and Employee Section */}
					<div className='h-[80px]'>
						<div className='flex justify-between center'>
							{/* Logo */}
							<img
								src={logoImage}
								loading='lazy'
								alt='Your Logo'
								className='w-20 h-20'
							/>

							{/* Edit Profile Button */}
							<div className='flex items-center gap-1 text-[14px]'>
								{customer?._id && (
									<button
										className='px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex items-center'
										onClick={() => setViewCustomer(true)}
									>
										<span>View Customer</span>
										<icons.FaUserGroup className='inline-block ml-2' />
									</button>
								)}
								<button
									className='px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex items-center'
									onClick={() => setViewProfile(true)}
								>
									<span>View Profile</span>
									<icons.FaUserEdit className='inline-block ml-2' />
								</button>
								<button
									onClick={() => setOpenDialog(true)}
									className='px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex items-center'
								>
									<span>Logout</span>
									<icons.FiLogOut className='inline-block ml-2' />
								</button>
							</div>
						</div>
					</div>
					{/* Payment Area */}
					<div className='flex-1 h-[calc(100%-80px)]'>
						<Payment />
					</div>
				</div>

				{/* Right Page - Product List and Barcode Scanner */}
				<div className='ml-[calc(100%-65%)] w-[65%] p-4 py-1'>
					{/* Barcode Scanner */}
					<div className='flex items-center justify-between gap-2'>
						<div className='flex rounded-sm h-[80px] items-center w-[50%]'>
							<input
								type='text'
								value={textSearch}
								onChange={(e) => onChangeTextSearch(e)}
								onKeyDown={(e) => onKeyEnterDownHandler(e)}
								className='w-full px-2 h-[36px] border focus:border-blue-500 outline-none rounded placeholder:text-[14px] rounded-tr-none'
								placeholder='Scan or search products by barcode, name'
							/>
						</div>
						<nav>
							<ul className='list-style-none flex gap-1'>
								<li>
									<button
										className='px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex items-center'
										onClick={() => setModel(true)}
									>
										<span>Change Password</span>
										<icons.FiLock className='inline-block ml-2' />
									</button>
								</li>
								<li>
									<button
										onClick={() => handlerClickPrevious()}
										className={`${
											inactivePrevious
												? 'bg-blue-300 pointer-events-none select-none'
												: 'bg-blue-500'
										} hover:bg-blue-700 hover:text-white cursor-pointer flex justify-center items-center rounded px-3 h-[36px] text-sm text-white font-medium transition-all duration-300 `}
									>
										Previous
									</button>
								</li>
								<li>
									<span
										onClick={() => handlerClickNext()}
										className={`${
											inactiveNext
												? 'bg-blue-300 pointer-events-none select-none'
												: 'bg-blue-500'
										} hover:bg-blue-700 hover:text-white cursor-pointer flex justify-center items-center  rounded px-3 h-[36px] text-sm text-white font-medium transition-all duration-300 bg-blue-500`}
									>
										Next
									</span>
								</li>
							</ul>
						</nav>
					</div>
					{/* Product List */}
					<div className='z-10 mt-1 flex flex-wrap gap-3'>
						{productList?.map((product) => (
							<div className='mb-3' key={crypto.randomUUID()}>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
			{model && (
				<ChangePasswordDialog
					setModel={setModel}
					oldChange={user?.alreadyChangePassword}
				/>
			)}

			{viewCustomer && (
				<ViewCustomer
					setViewCustomer={setViewCustomer}
					setViewDetailInvoice={setViewDetailInvoice}
					setInforDetailInvoice={setInforDetailInvoice}
				/>
			)}

			{viewDetailInvoice && (
				<DetailInvoice
					inforDetailInvoice={inforDetailInvoice}
					setViewDetailInvoice={setViewDetailInvoice}
				/>
			)}

			{viewProfile && (
				<Profile
					userData={user}
					isAdmin={false}
					setViewProfile={setViewProfile}
					setUpdateProfie={setUpdateProfie}
				/>
			)}

			{updateProfile && (
				<UpdateProfile setUpdateProfile={setUpdateProfie} userData={user} />
			)}

			{openDialog && (
				<ConfirmDialog
					text={'logout'}
					handleClickNo={() => setOpenDialog(false)}
					handleClickYes={logout}
				/>
			)}
		</>
	)
}

export default HomeEmployee
