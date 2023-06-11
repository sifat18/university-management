import express from 'express'
import { createUser } from './userController'

const router = express.Router()

router.post('/create', createUser)

export const UserRoutes = router
