import { NextFunction, Request, Response } from 'express'
import config from '../config'
import { IGenericErrorMessage } from '../interfaces/error'
// import { handleValidationError } from '../errors/handleValidationError'

// global error handler

export const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500
  const message = 'Something went wrong'
  const errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    // const simplifiedError=handleValidationError(err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err?.stack : undefined,
  })
  next()
}
