const mongoose = require('mongoose')
const config = require('config')

;(async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log(`Mongoose connected to ${config.get('mongoUri')}`)
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
})()

function gracefulShutdown() {
  mongoose.connection.close(() => {
    console.log('Mongoose disconected')
    process.exit(0)
  })
}

process
  .on('SIGINT', gracefulShutdown)
  .on('SIGTERM', gracefulShutdown)
  .once('SIGUSR2', gracefulShutdown)

require('./locations.js')
