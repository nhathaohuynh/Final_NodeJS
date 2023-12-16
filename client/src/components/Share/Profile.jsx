import React from 'react'
import { formatMoney } from '../../utils/helpers'
import Button from './Button'

const Profile = ({ userData, isAdmin, setViewProfile, setUpdateProfie }) => {
	const onClickProfileHandler = async () => {
		setViewProfile(false)
		setUpdateProfie(true)
	}
	const invoicesNumber = userData?.invoices?.length
	const totalAmount = userData?.invoices?.reduce((acc, invoice) => {
		return acc + invoice?.total
	}, 0)
	return (
		<div
			className='overflow-y-auto h-screen overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-ufll bg-[rgba(0,0,0,0.7)]'
			onClick={() => setViewProfile(false)}
		>
			<div className='p-4 w-full max-w-md mt-[100px]'>
				{/* Modal content */}
				<div
					className='p-4 text-center rounded-sm shadow'
					onClick={(e) => e.stopPropagation()}
				>
					<div className='flex flex-col justify-center items-center'>
						<div className='relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none'>
							<div className='relative flex h-32 w-full justify-center rounded-xl bg-cover'>
								<img
									src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png'
									className='absolute flex h-32 w-full justify-center rounded-xl bg-cover'
								/>
								<div className='absolute -bottom-12 flex h-[150px] w-[150px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700'>
									<img
										className='h-full w-full rounded-full'
										src={userData?.avatar}
										alt=' avatar user'
									/>
								</div>
							</div>
							<div className='mt-16 flex flex-col items-center'>
								<h4 className='text-xl font-bold text-gray-700'>
									{userData?.fullName}
								</h4>
								<p className='text-base font-normal text-gray-600'>
									{userData?.role}
								</p>
								<p className='text-base font-normal text-gray-600'>
									{userData?.email}
								</p>
							</div>
							<div className='mt-6 mb-3 flex gap-14'>
								<div className='flex flex-col items-center justify-center'>
									<p className='text-xl font-bold text-gray-700 '>
										{invoicesNumber}
									</p>
									<p className='text-sm font-normal text-gray-600'>Invoices</p>
								</div>
								<div className='flex flex-col items-center justify-center'>
									<p className='text-xl font-bold text-gray-700'>
										{formatMoney(totalAmount)}
									</p>
									<p className='text-sm font-normal text-gray-600'>
										Total Sales
									</p>
								</div>
							</div>
							<div>Huynh Nhat Hao</div>

							{!isAdmin && (
								<Button onClickButton={() => onClickProfileHandler()}>
									Update Profile
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Profile
