import { toast } from 'react-toastify'

export const toastError = (message) => {
	return toast.error(message)
}

export const toastSuccess = (message) => {
	return toast.success(message)
}

export const toastInfo = (message) => {
	return toast.info(message)
}
