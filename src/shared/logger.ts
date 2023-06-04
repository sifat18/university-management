/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
// const { combine, timestamp, label, printf,prettyPrint } = format;
const { combine, timestamp, label, printf } = format
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
// custom logger format
const myFormat = printf(({ level, message, label, timestamp }) => {
  // custom time format
  const date = new Date(timestamp)
  const hours = date.getHours()
  const mins = date.getMinutes()
  const secs = date.getSeconds()

  return `${date.toDateString()} ${hours}:${mins}:${secs} [${label}] ${level}: ${message}`
})
//   info
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'success-%DATE%.log'
      ),
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
// error
const errorlogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'error-%DATE%.log'
      ),
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorlogger }
