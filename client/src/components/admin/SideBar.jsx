import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/Logo.jpg'
import { tabs } from '../../utils/constants'
import { logout } from '../../utils/logout'
import path from '../../utils/path'
import ConfirmDialog from '../Share/ConfirmDialog'

const SideBar = () => {
	const navigate = useNavigate()
	const [indexTab, setIndexTab] = useState(1)
	const [openDialog, setOpenDialog] = useState(false)

	useEffect(() => {
		if (window.location.pathname.includes(path.ADMIN_USER)) {
			setIndexTab(3)
		} else if (window.location.pathname.includes(path.ADMIN_REPOST)) {
			setIndexTab(2)
		} else if (window.location.pathname.includes(path.ADMIN_PRODUCT)) {
			setIndexTab(1)
		} else if (window.location.pathname.includes(path.ADMIN_CATEGORY)) {
			setIndexTab(4)
		}
	}, [window.location.href])
	return (
		<>
			<div className='bg-gray-800 shadow-xl px-3 overflow-auto py-5 w-full h-full transition-transform duration-300 ease-in-out'>
				<div className='space-y-6'>
					<div className='w-40 h-40 rounded-full mx-auto bg-white flex items-center justify-center p-7'>
						<img src={logo} alt='Avatar app' className='' />
					</div>
					<div>
						<h2 className='font-medium text-xs md:text-sm text-center text-blue-400'>
							Hi! Huynh Nhat Hao
						</h2>
						<p className='text-xs text-gray-500 text-center'>Administrator</p>
					</div>

					<div className='flex flex-col space-y-2'>
						{tabs.map((tab) => (
							<div
								key={tab?.id}
								onClick={() => {
									if (tab?.handleOnClick) {
										setOpenDialog(true)
									} else {
										setIndexTab(tab?.id)
										navigate(`/${tab.path}`)
									}
								}}
								className={clsx(
									{ 'bg-red-500': indexTab === tab.id },
									'text-sm hover:bg-red-500 font-medium flex items-center gap-2 text-white py-2 px-2  hover:text-white hover:cursor-pointer hover:scale-105 rounded-md transition duration-150 ease-in-out',
								)}
							>
								<img src={tab?.icon} className='w-[20px] h-[20px]' alt='' />
								<span>{tab?.text}</span>
							</div>
						))}
					</div>
				</div>
			</div>
			{openDialog && (
				<ConfirmDialog
					handleClickNo={() => setOpenDialog(false)}
					handleClickYes={logout}
					text={'logout'}
				/>
			)}
		</>
	)
}

export default SideBar
