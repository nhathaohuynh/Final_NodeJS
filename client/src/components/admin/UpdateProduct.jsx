import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiGetProduct } from '../../apis'
import { apiGetCategoryList } from '../../apis/category.api'
import {
	addNewProductAction,
	updateProductAction,
} from '../../redux/actions/product.action'
import { toastError } from '../../utils/toast'
import Button from '../Share/Button'

const UpdateProduct = ({ setOpenUpdateProduct, pid }) => {
	const dispatch = useDispatch()
	const thumnailRef = useRef()
	const initProduct = {
		name: '',
		retailPrice: '',
		importPrice: '',
		thumnail: '',
		category: '',
		description: '',
		investory: '',
	}
	const [product, setProduct] = useState(initProduct)

	const [categories, setCategories] = useState([])

	const getCategoriesHandler = async () => {
		const response = await apiGetCategoryList()
		if (response.code === 1) {
			setCategories(response?.metaData?.category)
		}
	}

	const getProductHandler = async () => {
		const response = await apiGetProduct(pid)

		if (response.code === 1) {
			setProduct(response.metaData?.product)
		}
	}

	const onChangeInputHandler = (e) => {
		setProduct({
			...product,
			[e.target.name]:
				e.target.name === 'thumnail' ? e.target.files[0] : e.target.value,
		})
	}

	const onSubmitUpdateProduct = (e) => {
		e.preventDefault()

		if (
			!product.name ||
			!product.retailPrice ||
			!product.importPrice ||
			!product.category ||
			!product.thumnail ||
			!product.description ||
			!product.investory
		) {
			return toastError('All Fileds is required')
		}

		if (
			product.retailPrice < 0 ||
			product.importPrice < 0 ||
			product.investory < 0
		) {
			return toastError('Price and Stock must be greater than zero')
		}

		const formData = new FormData()

		formData.set('name', product.name)
		formData.set('retailPrice', product.retailPrice)
		formData.set('importPrice', product.importPrice)
		formData.set('category', product.category)
		formData.set('description', product.description)
		formData.set('investory', product.investory)
		formData.set('thumnail', product.thumnail)

		dispatch(updateProductAction({ pid: pid, payload: formData }))

		thumnailRef.current.value = ''

		setProduct(initProduct)
	}

	useEffect(() => {
		getCategoriesHandler()
	}, [])

	useEffect(() => {
		getProductHandler()
	}, [pid])

	return (
		<div
			onClick={() => setOpenUpdateProduct(false)}
			className='overflow-y-auto h-screen overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='w-[50%] bg-white h-[110%] p-10 pt-3 gap-4 my-[50px] rounded-sm'
			>
				<form class=' mx-auto'>
					<h3 className='text-[32px] text-blue-500 font-medium text-center mb-5 uppercase'>
						Product Admin
					</h3>
					<div>
						<div className='mb-2'>
							<label
								htmlFor='name-input'
								className='block mb-1 text-sm font-medium text-gray-900 '
							>
								Product name
							</label>
							<input
								type='text'
								id='name-input'
								name='name'
								value={product.name}
								onChange={(e) => onChangeInputHandler(e)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
							/>
						</div>

						<div className='mb-2'>
							<label
								htmlFor='description-input'
								className='block mb-1 text-sm font-medium text-gray-900 '
							>
								Product description
							</label>
							<textarea
								type='text'
								id='description-input'
								name='description'
								value={product.description}
								onChange={(e) => onChangeInputHandler(e)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5 '
							/>
						</div>

						<div className='mb-2'>
							<label
								htmlFor='profileImage'
								className='block text-gray-700 text-sm font-bold mb-2'
							>
								Product Image
							</label>
							<input
								type='file'
								name='thumnail'
								ref={thumnailRef}
								onChange={(e) => onChangeInputHandler(e)}
								accept='image/*'
								className='file-input file-input-bordered file-input-info w-full max-w-xs'
							/>
							{product?.thumnail && (
								<div className='my-1'>
									<img
										className='w-20 h-20'
										alt='Product thumbnail'
										src={
											product.thumnail.length > 0
												? product.thumnail
												: URL.createObjectURL(product?.thumnail)
										}
									/>
								</div>
							)}
						</div>
						<div className='mb-2'>
							<label
								htmlFor='import-input'
								className='block mb-1 text-sm font-medium text-gray-900 '
							>
								Import price
							</label>
							<input
								type='number'
								id='import-input'
								name='importPrice'
								value={product.importPrice}
								onChange={(e) => onChangeInputHandler(e)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5 '
							/>
						</div>

						<div className='mb-2'>
							<label
								htmlFor='retail-input'
								className='block mb-1 text-sm font-medium text-gray-900 '
							>
								Retail price
							</label>
							<input
								type='number'
								id='retail-input'
								name='retailPrice'
								value={product.retailPrice}
								onChange={(e) => onChangeInputHandler(e)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5 '
							/>
						</div>

						<div className='mb-2'>
							<label
								htmlFor='category-input'
								className='block mb-1 text-sm font-medium text-gray-900 w-full'
							>
								Category
							</label>
							<select
								name='category'
								id='category-input'
								value={product.category}
								onChange={(e) => onChangeInputHandler(e)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5 '
							>
								<option value>Select a category</option>
								{categories.map((category) => (
									<option key={category._id} value={category.name}>
										{category.name}
									</option>
								))}
							</select>
						</div>

						<div className='mb-8'>
							<label
								htmlFor='stock-input'
								className='block mb-1 text-sm font-medium text-gray-900 '
							>
								Stocks
							</label>
							<input
								type='number'
								id='stock-input'
								name='investory'
								value={product.investory}
								onChange={(e) => onChangeInputHandler(e)}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5 '
							/>
						</div>
						<Button onClickButton={onSubmitUpdateProduct}>
							Update Product
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateProduct
