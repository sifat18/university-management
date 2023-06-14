import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './userInterface';
import { User } from './userModel';
import { generateStudentID } from './userUtils';
import { Student } from '../student/student.model';
import APIError from '../../errors/APIError';
import httpStatus from 'http-status';

// creating user
export const createStudentDB = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user?.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'student';
  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  );
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentID(academicsemester);
    user.id = id;
    student.id = id;
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  //user --> student ---> academicSemester, academicDepartment , academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

// last usere
export const getLastStudentDb = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};
