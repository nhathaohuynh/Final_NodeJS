export const formatMoney = (number) => {
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 3,
		maximumFractionDigits: 3,
	}).format(number)

	return formattedAmount
}
