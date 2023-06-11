import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { errorlogger, logger } from './shared/logger'
import { Server } from 'http'
let server: Server

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`🛢Database is connected successfully`)

    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database', err)
  }
}
// unhandledRejection rejection occurs when promise rejects
process.on('unhandledRejection', err => {
  if (server) {
    server.close(() => {
      errorlogger.error(err)
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})
boostrap()
