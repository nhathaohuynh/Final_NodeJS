import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddProduct, Loading, ProductList } from '../../components'
import { getProductsAction } from '../../redux/actions/product.action'
import {
	clearProductError,
	clearProductMessage,
} from '../../redux/slices/product.slice'
import { toastError, toastSuccess } from '../../utils/toast'
const ManagementProducts = () => {
	const dispatch = useDispatch()
	const { products, loading, error, message, pages } = useSelector(
		(state) => state.products,
	)
	const [productList, setProductList] = useState([])
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const [pageActive, setPageActive] = useState(+queryParams.get('page') || 1)
	const [numberPages, setNumberPages] = useState(10)
	const [inactiveNext, setInactiveNext] = useState(false)
	const [inactivePrevious, setInactivePrevious] = useState(false)
	const [openAddProduct, setOpenAddProduct] = useState(false)

	const {
		user: userLogin,
		isLogin,
		token,
	} = useSelector((state) => state.authReducer)

	const handlerClickPrevious = async () => {
		if (pageActive > pages || pageActive <= 0) {
			return toastError('Invalid page number')
		}
		if (pageActive - 1 >= 0) {
			setPageActive(pageActive - 1)
		}
	}

	const handlerClickNext = async () => {
		if (pageActive > pages || pageActive <= 0) {
			return toastError('Invalid page number')
		}
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
		if (+pageActive >= numberPages - 1) {
			setInactiveNext(true)
		} else {
			setInactiveNext(false)
		}

		if (+pageActive > 1 && pageActive < numberPages) {
			setInactivePrevious(false)
			setInactiveNext(false)
		}
	}

	useEffect(() => {
		setProductList(products)
		setNumberPages(pages)
	}, [products])

	useEffect(() => {
		updatePaginationState()
		dispatch(
			getProductsAction({
				page: pageActive,
				accessToken: token,
			}),
		)
	}, [pageActive])

	useEffect(() => {
		if (error?.length > 0) {
			toastError(error)
			dispatch(clearProductError())
		}
	}, [error])

	useEffect(() => {
		if (!isLogin && userLogin?.role !== 'admin') {
			logout()
		}
	}, [userLogin, isLogin])

	useEffect(() => {
		if (message?.length > 0) {
			toastSuccess(message)
			dispatch(clearProductMessage())
		}
	}, [message])

	return (
		<div className='w-full p-4'>
			<div className='relative w-full flex flex-col gap-8'>
				<div className='flex items-center justify-between'>
					<button
						onClick={() => setOpenAddProduct(true)}
						className='bg-blue-500 h-[36px] rounded-sm px-3 text-white hover:bg-blue-600 w-[300px]'
					>
						Add New Product
					</button>

					<nav>
						<ul className='list-style-none flex gap-1'>
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
				{openAddProduct && <AddProduct setOpenAddProduct={setOpenAddProduct} />}

				{loading ? (
					<Loading />
				) : (
					<ProductList products={productList} activePage={pageActive} />
				)}
			</div>
		</div>
	)
}

export default ManagementProducts
