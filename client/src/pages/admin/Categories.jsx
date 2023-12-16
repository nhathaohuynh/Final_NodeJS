import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, CateList, Loading } from '../../components'
import {
	addNewCategoryAction,
	getCategoriesAction,
} from '../../redux/actions/category.action'
import {
	clearCategoryError,
	clearCategoryMessage,
} from '../../redux/slices/category.slice'
import { toastError, toastSuccess } from '../../utils/toast'

const Categories = () => {
	const dispatch = useDispatch()
	const { error, message, categories, loading } = useSelector(
		(state) => state.categories,
	)

	const [page, setPage] = useState(1)

	const [listCate, setListCate] = useState([])
	const [isAddNewCate, setIsAddNewCate] = useState(false)

	const initCateInputs = {
		description: '',
		name: '',
	}

	const [categoryInputs, setCategoryInputs] = useState(initCateInputs)

	const onChangeCateInputs = (e) => {
		setCategoryInputs({
			...categoryInputs,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmutNewCategoryHandler = (e) => {
		e.preventDefault()

		if (!categoryInputs.description || !categoryInputs.name) {
			return toastError('Name and description is required')
		}

		dispatch(addNewCategoryAction(categoryInputs))
		setCategoryInputs(initCateInputs)
		setIsAddNewCate(false)
	}

	useEffect(() => {
		setListCate(categories)
	}, [categories])

	useEffect(() => {
		dispatch(getCategoriesAction())
	}, [page])

	useEffect(() => {
		if (error?.length > 0) {
			toastError(error)
			dispatch(clearCategoryError())
		}
	}, [error])

	useEffect(() => {
		if (message?.length > 0) {
			toastSuccess(message)
			dispatch(clearCategoryMessage())
		}
	}, [message])

	return (
		<div className='w-full p-4 flex justify-center'>
			<div className='relative w-[80%] flex flex-col gap-8'>
				<div className='w-[30%]'>
					<Button onClickButton={() => setIsAddNewCate(true)}>
						Add Category
					</Button>
				</div>
				{loading ? <Loading /> : listCate && <CateList categories={listCate} />}
			</div>

			{isAddNewCate && (
				<div
					onClick={() => setIsAddNewCate(false)}
					className='overflow-y-auto h-screen overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className='w-[40%] bg-white h-[350px] p-6 pt-3 gap-4 mt-[100px] rounded-sm'
					>
						<form class=' mx-auto'>
							<h3 className='text-[32px] text-blue-500 font-medium text-center mb-5 uppercase'>
								Category Admin
							</h3>
							<div>
								<div className='mb-8'>
									<label
										htmlFor='base-input'
										className='block mb-2 text-sm font-medium text-gray-900 '
									>
										Category Name
									</label>
									<input
										type='text'
										id='base-input'
										name='name'
										value={categoryInputs.name}
										onChange={(e) => onChangeCateInputs(e)}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5 '
									/>
								</div>

								<div className='mb-5'>
									<label
										htmlFor='large-input'
										className='block mb-2 text-sm font-medium text-gray-900 '
									>
										Category Desciption
									</label>
									<input
										type='text'
										id='base-input'
										name='description'
										value={categoryInputs.description}
										onChange={(e) => onChangeCateInputs(e)}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
									/>
								</div>

								<Button onClickButton={onSubmutNewCategoryHandler}>
									Add Category
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default Categories
