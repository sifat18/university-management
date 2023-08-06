import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './userInterface';
import { User } from './userModel';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './userUtils';
import { Student } from '../student/student.model';
import APIError from '../../errors/APIError';
import httpStatus from 'http-status';
import { Admin } from '../admin/admin.model';
import { IAdmin } from '../admin/admin.interface';
import { Faculty } from '../faculty/faculty.model';
import { IFaculty } from '../faculty/faculty.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

// creating user
export const createStudentDB = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  // set role
  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    const id = await generateStudentId(academicsemester as IAcademicSemester);
    // set custom id into both  student & user
    user.id = id;
    student.id = id;

    // Create student using sesssin
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

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
export const createFacultyDB = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  // set role
  user.role = 'faculty';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate faculty id
    const id = await generateFacultyId();
    // set custom id into both  faculty & user
    user.id = id;
    faculty.id = id;
    // Create faculty using sesssin
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }
    // set faculty _id (reference) into user.student
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
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

export const createAdminDB = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  // set role
  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate admin id
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};
