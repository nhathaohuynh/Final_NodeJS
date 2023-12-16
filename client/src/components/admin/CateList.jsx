import clsx from 'clsx'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	deleteCategoryAction,
	updateCategoryAction,
} from '../../redux/actions/category.action'
import icons from '../../utils/icons'
import { toastError } from '../../utils/toast'
import Button from '../Share/Button'
import ConfirmDialog from '../Share/ConfirmDialog'

const UserList = ({ categories }) => {
	const dispatch = useDispatch()
	const [openDialog, setOpenDialog] = useState(false)
	const [openUpdateCate, setOpenUpdateCate] = useState(false)
	const [cateInputs, setcateInputs] = useState({
		name: '',
		description: '',
	})
	const [cId, setCID] = useState('')

	const handleClickRemoveCate = async () => {
		dispatch(deleteCategoryAction(cId))
		setOpenDialog(false)
	}

	const onChangeInputsCate = (e) => {
		setcateInputs({
			...cateInputs,
			[e.target.name]: e.target.value,
		})
	}

	const onUpdateCateHadnler = (e) => {
		e.preventDefault()

		if (!cateInputs.name || !cateInputs.description)
			return toastError('Name and description is required')

		dispatch(
			updateCategoryAction({
				cid: cId,
				payload: cateInputs,
			}),
		)

		setOpenUpdateCate(false)
	}

	return (
		<>
			<table className='text-sm text-left text-gray-300 w-full'>
				<thead className='text-xs uppercase bg-gray-700 text-white px-4'>
					<tr>
						<th scope='col' className='p-2'>
							Id
						</th>
						<th scope='col' className='p-2'>
							Name
						</th>
						<th scope='col' className='p-2'>
							Image
						</th>
						<th scope='col' className='p-2'>
							Descrion
						</th>
						<th scope='col' className='p-2'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{categories?.map((cate, index) => {
						return (
							<tr className=' bg-gray-800' key={crypto.randomUUID()}>
								<td className='w-4 p-2 pl-2'>{index + 1}</td>

								<td className='p-2 pl-2 capitalize font-medium'>
									{cate?.name}
								</td>
								<td className='p-2 pl-2 capitalize'>
									<img
										src={cate?.image}
										alt='Image Category'
										className='w-[60px] h-[60px]'
									/>
								</td>
								<td className='p-2 pl-2 capitalize'>{cate?.description}</td>

								<td className='p-2 '>
									<div className='flex gap-4'>
										<icons.FiEdit
											size={20}
											className='hover:cursor-pointer hover:text-white text-green-500'
											onClick={() => {
												setOpenUpdateCate(true)
												setcateInputs({
													...cateInputs,
													name: cate.name,
													description: cate.description,
												})
												setCID(cate?._id)
											}}
										></icons.FiEdit>

										<icons.FiTrash
											onClick={() => {
												setOpenDialog(true)
												setCID(cate?._id)
											}}
											size={20}
											className='hover:cursor-pointer hover:text-white text-red-500'
										></icons.FiTrash>
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			{openDialog && (
				<ConfirmDialog
					text='Delete this category'
					handleClickNo={() => setOpenDialog(false)}
					handleClickYes={
						openUpdateCate ? onUpdateCateHadnler : handleClickRemoveCate
					}
				/>
			)}

			{openUpdateCate && (
				<div
					onClick={() => setOpenUpdateCate(false)}
					className='overflow-y-auto h-screen overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className='w-[40%] bg-white h-[400px] p-6 pt-3 gap-4 mt-[100px] rounded-sm'
					>
						<form class='max-w-sm mx-auto'>
							<h3 className='text-[32px] text-blue-500 font-medium text-center mb-5'>
								Update Category
							</h3>
							<div>
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
										value={cateInputs.description}
										onChange={(e) => onChangeInputsCate(e)}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
									/>
								</div>
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
										value={cateInputs.name}
										onChange={(e) => onChangeInputsCate(e)}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5 '
									/>
								</div>

								<Button onClickButton={onUpdateCateHadnler}>
									Update Category
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default UserList
