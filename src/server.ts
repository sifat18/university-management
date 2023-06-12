import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { errorlogger, logger } from './shared/logger';
import { Server } from 'http';
let server: Server;

// uncaught exception works in synchronous way so async code will not handle it

process.on('uncaughtException', err => {
  errorlogger.error('caught the uncaughtException', err);
  process.exit(1);
});

// server connection
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🛢Database is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('Failed to connect database', err);
  }
}
// unhandledRejection rejection occurs when promise rejects
process.on('unhandledRejection', err => {
  if (server) {
    server.close(() => {
      errorlogger.error(err);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
boostrap();
// sudden termination of server this is called the SIGTERM, one can manually send this signal to the server to terminate it
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  if (server) {
    server.close(() => {
      logger.info('Process terminated for SIGTERM');
    });
  }
});
