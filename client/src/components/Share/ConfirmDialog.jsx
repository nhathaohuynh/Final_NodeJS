import React from 'react'

const ConfirmDialog = ({ text, handleClickYes, handleClickNo }) => {
	return (
		<div className='overflow-y-auto h-screen overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full bg-[rgba(0,0,0,0.7)]'>
			<div className='p-4 w-full max-w-md mt-[100px]'>
				{/* Modal content */}
				<div className='p-4 text-center rounded-lg shadow bg-blue-400 sm:p-5'>
					<p className='mb-4 text-white'>Are you sure you want to {text}</p>
					<div className='flex justify-center items-center space-x-4'>
						<button
							onClick={handleClickNo}
							type='button'
							className='py-2 px-3 text-sm font-medium rounded-lg border  focus:outline-none  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-60'
						>
							No, cancel
						</button>
						<button
							onClick={handleClickYes}
							className='py-2 px-3 text-sm font-medium text-center text-white  rounded-lg  focus:outline-none bg-red-500 hover:bg-red-600'
						>
							Yes, I'm sure
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmDialog
