import { NextFunction, Request, Response } from 'express'

// global error handler

export const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if(err instanceof Error){
  //   res.status(400).json({error:err})
  //  }else{
  //   res.status(500).json({error:err})
  //  }
  res.status(400).json({ error: err })
  next()
}
