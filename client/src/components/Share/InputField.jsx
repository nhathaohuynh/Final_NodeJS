import React from 'react'

const InputField = ({
	label,
	type = 'text',
	name,
	onChangeInput,
	value,
	placeholder,
}) => {
	return (
		<div className='mb-4 text-[14px]'>
			<label className='block mb-1 font-medium' htmlFor={name}>
				{label}
			</label>
			<input
				type={type}
				className=' text-black py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full'
				id={name}
				placeholder={placeholder || label}
				name={name}
				value={value}
				onChange={(e) => onChangeInput(e)}
				autoComplete='true'
			/>
		</div>
	)
}

export default InputField
