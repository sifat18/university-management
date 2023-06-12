import { RequestHandler } from 'express'
import { createUserDB } from './userService'
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    // since asyn process so use parseAsync

    const { user } = req.body
    const result = await createUserDB(user)
    res.status(200).json({
      success: true,
      message: 'User created Successfully',
      data: result,
    })
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: 'failure',
    //   data: '',
    // })
    next(err)
  }
}
