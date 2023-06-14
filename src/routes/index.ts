import express from 'express';
import { UserRoutes } from '../modules/users/userRoutes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.route';
// import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
// import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/user', UserRoutes);
// router.use('/academic-semesters', AcademicSemesterRoutes);

export default router;
