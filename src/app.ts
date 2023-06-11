import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './modules/users/userRoutes'
import { globalErrorHandler } from './middlewears/globalErrorHandler'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/user', userRouter)

// custom error Handler class

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
// global error handler
app.use(globalErrorHandler)
export default app
