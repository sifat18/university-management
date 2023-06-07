import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './modules/users/userRoutes'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/user', userRouter)

// custom error Handler class

class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string | undefine,
    stack: ''
  ) {
    if(stack;)
    this.stack=stack;
    
    
  }else{
    Error.captureStackTrace(this,this?.constructor)
  }
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
