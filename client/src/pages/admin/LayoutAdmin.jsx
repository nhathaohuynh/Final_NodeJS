import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBarAdmin } from '../../components'

const LayoutAdmin = () => {
	return (
		<div className='flex bg-gray-900 min-h-screen'>
			<div className='w-[250px] fixed top-0 left-0 bottom-0 z-10 '>
				<SideBarAdmin />
			</div>
			<div className='pl-[250px] w-full'>
				<Outlet />
			</div>
		</div>
	)
}

export default LayoutAdmin
