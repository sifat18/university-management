/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
// const { combine, timestamp, label, printf,prettyPrint } = format;
const { combine, timestamp, label, printf } = format
import path from 'path'

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
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
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
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
    }),
  ],
})

export { logger, errorlogger }
