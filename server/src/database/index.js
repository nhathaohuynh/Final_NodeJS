const mongoose = require('mongoose')
const { MONGODB_URL } = require('../config')

class Database {
	async connect() {
		await mongoose
			.connect(MONGODB_URL)
			.then((_) =>
				console.log(
					`Connected to mongooseDB ${_.connection.db.databaseName} successful`,
				),
			)
			.catch((_) => console.log('Connect to mongooDB failed'))
	}

	static async getInstance() {
		if (!this.instance) {
			this.instance = new Database()
			await this.instance.connect()
		}
		return this.instance
	}
}

module.exports = {
	connectDB: async () => {
		return await Database.getInstance()
	},
}
