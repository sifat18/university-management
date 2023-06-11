import { ErrorRequestHandler } from 'express'
import config from '../config'
import { IGenericErrorMessage } from '../interfaces/error'
import { handleValidationError } from '../errors/handleValidationError'
import APIError from '../errors/APIError'

// global error handler

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : []
  } else if (err instanceof APIError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err?.stack : undefined,
  })
  next()
}
