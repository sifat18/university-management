import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
// import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import APIError from '../../errors/APIError';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: acdemicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: acdemicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);
// pre works with save and update
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new APIError(
      httpStatus.CONFLICT,
      'Academic semester is already exist !'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);
