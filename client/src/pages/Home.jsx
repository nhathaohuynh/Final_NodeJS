import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
	return (
		<div className='w-full h-full'>
			<Outlet />
		</div>
	)
}

export default Home
