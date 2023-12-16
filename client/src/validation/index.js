const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export const validateLoginForm = ({ username, password }) => {
	const errors = {}

	if (!username) {
		errors.username = 'Username is required'
	} else if (username.length < 3) {
		errors.username = 'Password must be at least 6 characters'
	}

	if (!password) {
		errors.password = 'Password is required'
	} else if (password.length < 6) {
		errors.password = 'Password must be at least 6 characters'
	}

	return errors
}

export const validateEmail = (email) => {
	return emailPattern.test(email)
}
