import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductAction } from '../../redux/actions/product.action'
import { formatMoney } from '../../utils/helpers'
import icons from '../../utils/icons'
import ConfirmDialog from '../Share/ConfirmDialog'
import UpdateProduct from './UpdateProduct'

const ProductList = ({ products, activePage }) => {
	const dispatch = useDispatch()
	const [textDialog, setTextDialog] = useState('delete this product')
	const [openDialog, setOpenDialog] = useState(false)
	const [currentPId, setCurrentPId] = useState('')
	const [openUpdateProduct, setOpenUpdateProduct] = useState(false)

	const handleClickRemoveUser = async () => {
		dispatch(deleteProductAction(currentPId))
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
							Stocks
						</th>

						<th scope='col' className='p-2'>
							Import Price
						</th>

						<th scope='col' className='p-2'>
							Retail Price
						</th>
						<th scope='col' className='p-2'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product, index) => {
						return (
							<tr className=' bg-gray-800' key={crypto.randomUUID()}>
								<td className='w-4 p-2'>{index + 1 + (activePage - 1) * 10}</td>

								<td className='p-2 capitalize font-medium'>{product?.name}</td>
								<td className='p-2'>
									<img
										src={product?.thumnail}
										alt=''
										className='w-[80px] h-[80px]'
									/>
								</td>
								<td className='p-2'>{product?.investory}</td>
								<td className='p-2'>{formatMoney(product?.importPrice)}</td>
								<td className='p-2'>{formatMoney(product?.retailPrice)}</td>
								<td className='p-2 '>
									<div className='flex gap-4'>
										<icons.FiEdit
											size={20}
											className='hover:cursor-pointer hover:text-white text-green-500'
											onClick={() => {
												setOpenUpdateProduct(true)
												setCurrentPId(product?._id)
											}}
										></icons.FiEdit>

										<icons.FiTrash
											onClick={() => {
												setCurrentPId(product?._id)
												setOpenDialog(true)
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
					text={textDialog}
					handleClickNo={() => setOpenDialog(false)}
					handleClickYes={handleClickRemoveUser}
				/>
			)}

			{openUpdateProduct && (
				<UpdateProduct
					setOpenUpdateProduct={setOpenUpdateProduct}
					pid={currentPId}
				/>
			)}
		</>
	)
}

export default ProductList
