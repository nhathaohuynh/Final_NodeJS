import dashboardIcon from '../assets/dashboard.svg'
import logoutIcon from '../assets/logout.svg'
import productIcon from '../assets/product.svg'
import repostIcon from '../assets/repost.svg'
import userIcon from '../assets/user.svg'
import { logout } from './logout'
import path from './path'

export const tabs = [
	{
		id: 1,
		icon: productIcon,
		text: 'Products',
		path: path.ADMIN_PRODUCT,
	},

	{
		id: 2,
		icon: repostIcon,
		text: 'Reports and Analytics',
		path: path.ADMIN_REPOST,
	},
	{
		id: 3,
		icon: userIcon,
		text: 'Employees',
		path: path.ADMIN_USER,
	},
	{
		id: 4,
		icon: dashboardIcon,
		text: 'Categories',
		path: path.ADMIN_CATEGORY,
	},

	{
		id: 5,
		icon: logoutIcon,
		text: 'Logout',
		handleOnClick: logout,
	},
]
