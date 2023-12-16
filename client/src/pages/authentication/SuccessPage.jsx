import React from 'react'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'

const SuccessPage = () => {
	const navigate = useNavigate()
	return (
		<div>
			{/* Main modal */}
			<div className='overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-full mt-12'>
				<div className=' p-4 w-full max-w-md h-full md:h-auto'>
					{/* Modal content */}
					<div className=' p-4 text-center rounded-lg shadow bg-white'>
						<div className='w-12 h-12 rounded-full p-2 flex items-center justify-center mx-auto mb-3.5'>
							<svg
								aria-hidden='true'
								className='w-8 h-8 text-green-500'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='sr-only'>Success</span>
						</div>
						<p className='mb-4 text-lg font-semibold text-gray-900'>
							Successfully authentication account.
						</p>
						<button
							onClick={(e) => navigate(`/${path.LOGIN}`)}
							className='w-[50%] inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-blue-700 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition'
						>
							Go Login
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SuccessPage
