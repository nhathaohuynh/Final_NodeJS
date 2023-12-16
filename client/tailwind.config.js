/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
	],
	theme: {
		extend: {
			backgroundColor: {
				main: 'white',
			},
			backgroundImage: {
				'bg-login': "url('/src/assets/bg.jpg')",
			},
			colors: {},
		},
	},
}
