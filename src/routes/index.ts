import express from 'express';
import { UserRoutes } from '../modules/users/userRoutes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
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
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/user', UserRoutes);
// router.use('/academic-semesters', AcademicSemesterRoutes);

export default router;
