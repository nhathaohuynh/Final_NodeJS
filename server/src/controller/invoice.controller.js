'use strict'

const InvoicerServices = require('../service/invoice.services')
const { OkResponse, CreatedResponse } = require('../utils/success.response')

class InvoiceController {
	async getInvoiceHandler(req, res) {
		const id = req.params.id
		return new OkResponse({
			metaData: await InvoicerServices.getInvoice(id),
			message: 'OK',
		}).send(res)
	}

	async getListInvoicesHandler(req, res) {
		return new OkResponse({
			metaData: await InvoicerServices.getListInvoices(),
			message: 'OK',
		}).send(res)
	}

	async insertInvoiceHandler(req, res) {
		const body = req.body
		return new CreatedResponse({
			metaData: await InvoicerServices.insertInvoice(body),
			message: 'OK',
		}).send(res)
	}
	async analyticsInvoiceHandler(req, res) {
		const body = req.body

		return new OkResponse({
			metaData: await InvoicerServices.analyticsInvoice(body),
			message: 'OK',
		}).send(res)
	}
}

module.exports = new InvoiceController()
