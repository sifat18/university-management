import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { findLastFacultyId, getLastStudentDb } from './userService';

export const generateStudentID = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const curId = (await getLastStudentDb()) || (0).toString().padStart(5, '0');
  const increamentID = parseInt(curId) + 1;
  let updatedId = increamentID.toString().padStart(5, '0');

  updatedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${updatedId}`;
  return updatedId;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};
