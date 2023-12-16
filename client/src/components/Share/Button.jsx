import React from 'react'

const Button = ({ text, onClickButton, isDisable, children }) => {
	return (
		<button
			className='w-full inline-flex  items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-blue-700 active:bg-blue-700 outline-none  disabled:opacity-25 transition'
			onClick={(e) => onClickButton(e)}
			disabled={isDisable}
		>
			{text || children}
		</button>
	)
}

export default Button
