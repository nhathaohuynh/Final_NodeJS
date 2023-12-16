const express = require('express')
const { PORT } = require('./config')
const expressApp = require('./express-app')
const { connectDB } = require('./database')
const http = require('http')

const startServer = async () => {
	const app = express()
	const server = http.createServer(app)
	// set up middlewares
	await expressApp(app)
	// connect to db
	await connectDB()

	// run server
	server.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})
	// close app when it error
	app.on('error', (err) => {
		console.log(err)
		process.exit()
	})
}

startServer()
