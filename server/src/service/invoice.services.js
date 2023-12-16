'use strict'

const {
	findInvoiceById,
	createInvoice,
	findListInvoices,
	findInvoiceByTimeline,
} = require('../database/repository/invoice.repo')
const moment = require('moment')
const { BadRequest } = require('../utils/error.response')

class InvoiceServices {
	async getInvoice(cid) {
		const invoice = await findInvoiceById(cid)
		if (!invoice) throw new BadRequest('Something went wrong')
		return {
			invoice,
		}
	}

	async insertInvoice(body) {
		const invoice = await createInvoice(body)

		if (!invoice) throw new BadRequest('Something went wrong')

		return {
			invoice,
		}
	}

	async getListInvoices() {
		const invoices = await findListInvoices()
		if (invoices.length === 0) throw new BadRequest('Something went wrong')

		return {
			invoice: invoices,
		}
	}

	async analyticsInvoice(queries) {
		const { timeline, startDate, endDate } = queries
		let query = {}

		const toUtc = (localTime) => moment(localTime).utc()

		switch (timeline) {
			case 'today':
				query = {
					createdAt: {
						$gte: toUtc(moment().local().startOf('day')),
						$lt: toUtc(moment().local().endOf('day')),
					},
				}
				break
			case 'yesterday':
				query = {
					createdAt: {
						$gte: toUtc(moment().local().subtract(1, 'days').startOf('day')),
						$lt: toUtc(moment().local().subtract(1, 'days').endOf('day')),
					},
				}
				break
			case 'last7days':
				query = {
					createdAt: {
						$gte: toUtc(moment().local().subtract(6, 'days').startOf('day')),
						$lt: toUtc(moment().local().endOf('day')),
					},
				}
				break
			case 'thisMonth':
				query = {
					createdAt: {
						$gte: toUtc(moment().local().startOf('month')),
						$lt: toUtc(moment().local().endOf('month')),
					},
				}
				break

			case 'lastMonth':
				query = {
					createdAt: {
						$gte: toUtc(
							moment().local().subtract(1, 'months').startOf('month'),
						),
						$lt: toUtc(moment().local().subtract(1, 'months').endOf('month')),
					},
				}
				break
			case 'custom':
				query = {
					createdAt: {
						$gte: toUtc(moment(startDate).local().startOf('day')),
						$lt: toUtc(moment(endDate).local().endOf('day')),
					},
				}
				break
			default:
				break
		}

		const invoices = await findInvoiceByTimeline(query)

		const totalAmount = invoices.reduce((acc, order) => acc + order.total, 0)
		const totalQuantity = invoices.reduce(
			(acc, invoice) => acc + invoice.totalQuantity,
			0,
		)
		const numberOfInvoice = invoices.length

		let priceImportProduct = 0

		invoices?.forEach((invoice) =>
			invoice.items?.forEach((item) => {
				priceImportProduct += item.product?.importPrice
			}),
		)

		return {
			totalAmount,
			totalQuantity,
			numberOfInvoice,
			totalProfit: totalAmount - priceImportProduct,
			orders: invoices,
		}
	}
}

module.exports = new InvoiceServices()
