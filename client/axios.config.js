import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://tdtu-pos.onrender.com/POS/api/v1',
	timeout: 5000,
})

instance.interceptors.request.use(
	function (config) {
		const { token } = JSON.parse(
			window.localStorage.getItem('persist:current-user'),
		)
		if (token) {
			const accessToken = JSON.parse(token)
			config.headers = {
				authorization: 'Bearer ' + accessToken,
			}

			return config
		}
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	},
)

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return error
	},
)
export default instance
