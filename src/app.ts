import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './modules/users/userRoutes'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/user', userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app

// install winston
// copy the logger code block
// add the line with console to see the logs in the console
// create separate folder for success and error logs
// go to winston github docs and see how the format works
// format the time in the logger according to your needs
// to auto delete and create separate files on each hour the logs setup winstone daily rotate file
//
