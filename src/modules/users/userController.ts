import { NextFunction, Request, RequestHandler, Response } from 'express';
import { createStudentDB } from './userService';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './userInterface';
import catchAsync from '../../shared/catchAsync';
export const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { student, ...userData } = req.body;
      const result = await createStudentDB(student, userData);
      // res.status(200).json({
      //   success: true,
      //   message: 'User created Successfully',
      //   data: result,
      // });
      sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user created successfully!',
        data: result,
      });
    } catch (err) {
      // res.status(500).json({
      //   success: false,
      //   message: 'failure',
      //   data: '',
      // })
      next(err);
    }
  }
);
