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
