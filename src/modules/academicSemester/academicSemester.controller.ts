import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../shared/catchAsync';
import { IAcademicSemester } from './academicSemester.interface';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import { pick } from '../../shared/pick';
import {
  academicSemesterFilterableFields,
  paginationFields,
} from './academicSemester.constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    // sendResponse<IAcademicSemester>(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Aademic semester created successfully!',
    //   data: result,
    // });
    next();
  }
);

export const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicSemesterService.getAllsemesters(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
