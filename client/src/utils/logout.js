import path from './path'
export const logout = () => {
	window.location.replace(
		`https://frontend-pos-nhathaohuynh.vercel.app/${path.LOGIN}`,
	)
	localStorage.clear()
}
